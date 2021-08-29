import ggpo
from os import path
from enum import Enum
from json import dumps,loads

from logging import DEBUG, ERROR, INFO, WARN, WARNING, getLogger
from struct import unpack, pack
from time import time
from typing import Union
from random import randint

from pywebhost import PyWebHost
from pywebhost.handler import Request
from pywebhost.modules import JSONMessageWrapper, WriteContentToRequest
from pywebhost.modules.websocket import WebsocketFrame, WebsocketSession, WebsocketSessionWrapper
from ggpo.models import quark

from ggpo.models.quark import allocate_quark, generate_new_ts, quark_same_ts, ts_from_quark
from ggpo.handlers import GGPOClientStatus, GGPOClientSide, GGPOCommand , GGPOClientErrorcodes , player as player_handler
from ggpo.models.channel import GGPOChannel, get_default_channels
from ggpo.events import EventDict, EventThread,RegisterEvent, ServerEvents

from threading import Lock

def int32(b: bytes) -> int:
    return unpack('>I', b)[0]

def pad2hex(length: int):
    if type(length) != int:
        length = length.value
    return pack('>I', length)

class ClientServer(PyWebHost):

    @property
    def channels(self):
        '''All available channels'''
        return self._channels

    @property
    def clients(self):
        '''Clients indexed by their usernames'''
        return self._clients

    @property
    def default_channel(self):
        return self.channels.get('lobby')
    
    def get_client_by_username(self, username):
        '''Fetches client by given name,returns None if not found'''        
        if username in self.clients:
            client: Client = self.clients[username]
            return client
        return None

    def get_clients_by_quark(self, quark):
        '''Fetches all the clients with the quark. Only sensitive to ts.'''
        for client in self.clients.values():
            client: Client
            if quark_same_ts(client.quark, quark):
                yield client
    
    def get_spectator_client_by_quark(self,quark):
        for client in self.get_clients_by_quark(quark):
            if client.status == GGPOClientStatus.SPECTATING:
                yield client
    
    def get_player_client_by_quark(self,quark):
        for client in self.get_clients_by_quark(quark):
            if client.status == GGPOClientStatus.PLAYING:
                yield client

    def get_p1_p2_client_by_quark(self,quark):
        p1,p2 = None,None
        for client in self.get_player_client_by_quark(quark):
            if client.side == GGPOClientSide.PLAYER1:p1=client
            if client.side == GGPOClientSide.PLAYER2:p2=client        
        return p1,p2

    def bind_and_active(self,address_tuple):
        super().__init__(address_tuple)
        return True

    def boardcast(self,to,command : GGPOCommand, payload):  
        replied = 0         
        for client in to if isinstance(to,list) else to.values():
            client : Client
            try: replied += client.reply(command,payload)
            except: pass
        return replied    

    def on_user_new(self,client):
        pass

    def on_user_left(self,client):
        pass
    
    def on_channel_new(self,client):
        client : Client
        self.boardcast(client.channel.clients,GGPOCommand.JOIN_CHANNEL,{'username':client.username,'channel':client.channel.name})

    def on_channel_left(self,client):
        client : Client
        self.boardcast(client.channel.clients,GGPOCommand.PART_CHANNEL,{'username':client.username,'channel':client.channel.name})

    def __init__(self):                
        self.events = EventThread(ServerEvents)
        self._clients = EventDict(self.events,ServerEvents.USER_NEW,ServerEvents.USER_LEFT)
        self._channels = get_default_channels(self.events)
        self.logger = getLogger('ClientServer')        
        self.ggpo_address = ('',0)
        # Registering events
        self.events.register(ServerEvents.USER_NEW,lambda n:self.on_user_new(n))
        self.events.register(ServerEvents.USER_LEFT,lambda n:self.on_user_left(n))
        self.events.register(ServerEvents.CHANNEL_NEW,lambda n:self.on_channel_new(n))
        self.events.register(ServerEvents.CHANNEL_LEFT,lambda n:self.on_channel_left(n))

class Client(WebsocketSession):
    server: ClientServer

    def log(self, msg, *args, level=DEBUG):
        header = '\033[1m[%s] \033[0m' % self
        self.logger.log(level, header+msg, *args)

    def reply(self, command : GGPOCommand, payload):           
        if not self.keep_alive: return
        if command == GGPOCommand.ERRORMSG and payload != GGPOClientErrorcodes.SUCCESS:
            self.log('%s - %s', command.name, payload.name, level=WARNING) 
        # prints log when something goes wrong       
        if isinstance(payload,Enum): payload = payload.name
        payload = {'type':command.name,'data':payload} 
        payload = dumps(payload).encode()        
        try:
            self.send(WebsocketFrame(PAYLOAD_LENGTH=len(payload), PAYLOAD=payload))
        except Exception as e:
            self.log('Failed to send frame! Marking connection as finished - %s',e,level=ERROR)
            self.keep_alive = False
            return False
        return True

    def __init__(self, request, raw_frames, *a, **k):
        self.command_mapping = {
            GGPOCommand.AUTH: self.do_auth,
            GGPOCommand.SEND_CHALLENGE: self.challenge_send,
            GGPOCommand.ACCEPT_CHALLENGE: self.challenge_accept,
            GGPOCommand.DECLINE_CHALLENGE: self.challenge_decline,
            GGPOCommand.CANCEL_CHALLENGE: self.challenge_cancel,
            GGPOCommand.JOIN_CHANNEL: self.channel_join,
            GGPOCommand.CHAT_CHANNEL: self.channel_chat,            
            GGPOCommand.PRIVMSG: self.privmsg,
            GGPOCommand.STATUS:self.status_update,
            GGPOCommand.WATCH_CHALLENGE:self.watch_challenge,            
        }
        super().__init__(request, raw_frames=raw_frames, *a, **k)
        self.server = self.request.server
        self.logger = getLogger('Client')

        self.username = ''  # who we are        
        self.status = GGPOClientStatus.AVAILABLE  # player status
        self.channel = None  # player current channel
        self.quark = None  # game quark we currently in
        self.side = None  # what side we are on    
        self.emulator_running = False # is player running the emulator    
        self.opponent : Client = None # the client we are playing against
        self.lock = Lock()
    
    @property
    def status_report(self): 
        '''Client / player status. Updates to both self and opponent during / after matches'''
        return {'username':self.username,'status':self.status.name,'side':self.side.name,'emulator':self.emulator_running}

    @property
    def player(self):
        '''Represents our own GGPOPlayer object, None if not found'''
        return player_handler.server.get_player_by_qurak(self.quark)    

    def leave_current_channel(self):        
        del self.server.channels[self.channel.name].clients[self.username]
        self.channel = None
    
    def is_client_available_for_match(self,client):
        return client.status == GGPOClientStatus.AVAILABLE and client.channel == self.channel            

    def set_current_channel(self,channel_name):
        self.channel = self.server.channels[channel_name]
        self.server.channels[channel_name].clients[self.username] = self

    def push_status(self):
        self.log('CHALLENGE : Current status : %s',self.status_report)
        self.reply(GGPOCommand.STATUS,self.status_report)

    def update_spectators(self):
        spectators = list(self.server.get_spectator_client_by_quark(self.quark))
        players    = list(self.server.get_player_client_by_quark(self.quark))
        self.server.boardcast(spectators + players,GGPOCommand.SPECTATE,[client.username for client in spectators])
        
    def onReceive(self, frame: bytearray):
        '''handles frames'''        
        try:
            frame = loads(frame.decode())
            frame_cmd,frame_payload = frame['type'],frame['data']            
            frame_cmd = GGPOCommand[frame_cmd]
            self.command_mapping.get(frame_cmd)(frame_payload)
        except ValueError:
            self.reply(GGPOCommand.ERRORMSG, GGPOClientErrorcodes.COMMAND_INVALID)
        except AssertionError as e_:
            e = e_.args[0]
            if type(e) == GGPOClientErrorcodes:
                self.reply(GGPOCommand.ERRORMSG, e)
        except Exception as e:
            self.reply(GGPOCommand.ERRORMSG, GGPOClientErrorcodes.INTERNAL_ERROR)
            self.log('RECEIVE : %s', e, level=ERROR)

    def onClose(self, request=None, content=None):
        '''handling connection finalization'''
        if request:return
        if self.opponent or self.status==GGPOClientStatus.SPECTATING:
            self.log('... Resetting match status',level=WARNING)
            self.reset_match()                        
        if self.username in self.server.clients:            
            self.leave_current_channel()
            del self.server.clients[self.username]            
            self.log('... Removed self from server',level=WARNING)
    
    def onIngameChat(self, username , msg):
        self.reply(GGPOCommand.INGAME_CHAT,{'username':username,'message':msg})
        for client in self.server.get_spectator_client_by_quark(self.quark):
            client.reply(GGPOCommand.INGAME_CHAT,{'username':username,'message':msg})
            
    def onEmulatorConnected(self , player):
        self.emulator_running = True        
        self.reply(GGPOCommand.STATUS,self.status_report)
        if self.opponent:
            self.opponent.reply(GGPOCommand.STATUS,self.status_report)
        for client in self.server.get_spectator_client_by_quark(self.quark):
            client.reply(GGPOCommand.STATUS,self.status_report)

    def onEmulatorDisconnect(self , player):
        self.log('CHALLENGE : Handling emulator disconnect',level=WARNING)        
        self.emulator_running = False        
        self.reset_match()

    def do_auth(self, payload):
        '''step 1 of creating a conenction. authenticate and join the club'''
        username,password = str(payload['username']),str(payload['password'])
        # auth success!
        if not username in self.server.clients:            
            self.username = username        
            self.server.clients[username] = self    
            self.set_current_channel(self.server.default_channel.name)
            self.log('LOGIN : OK w/password %s',password,level=INFO)
            return self.reply(GGPOCommand.ERRORMSG, GGPOClientErrorcodes.SUCCESS)
        else:
            self.log('LOGIN : Duped w/password %s',password,level=WARN)
            return self.reply(GGPOCommand.ERRORMSG,GGPOClientErrorcodes.USER_INVALID)
    # region Challenging
    def reset_match(self):
        if self.opponent: # Resets status for both of us if this was in a match
            self.log('CHALLENGE : Reverting match status , Opponent was:%s',self.opponent)
            self.opponent.opponent = None # Do this only on one side
            client_inmatch = list(self.server.get_player_client_by_quark(self.quark)) + list(self.server.get_spectator_client_by_quark(self.quark))            
            for client in client_inmatch:
                player = player_handler.server.get_player_by_username(client.username)
                if player : player.finish() # only when there is a emulator attached
            # Kills the emulators,making both clients' on_disconnect() handled
            # so we don't need to mess with thier states anymore
            # Should this be done by GGPOPlayer already unless it's a client-issued disconenct
            self.status = GGPOClientStatus.AVAILABLE 
            self.opponent.status = GGPOClientStatus.AVAILABLE
            self.side = GGPOClientSide.SPEC_PRESAVE
            self.opponent.side = GGPOClientSide.SPEC_PRESAVE 
            # reset misc status
            self.reply(GGPOCommand.STATUS,self.status_report)
            self.reply(GGPOCommand.STATUS,self.opponent.status_report)
            self.opponent.reply(GGPOCommand.STATUS,self.opponent.status_report)
            self.opponent.reply(GGPOCommand.STATUS,self.status_report)            
            # syncing up status of both players sperately so we dont get repeated message                           
            self.server.boardcast(client_inmatch,GGPOCommand.CANCEL_CHALLENGE,self.username)
            self.server.boardcast(client_inmatch,GGPOCommand.CANCEL_CHALLENGE,self.opponent.username)
            # notify everyone in the same channel that the match is no longer available           
            for client in self.server.get_spectator_client_by_quark(self.quark):
                client.reply(GGPOCommand.STATUS,self.status_report)
                client.reply(GGPOCommand.STATUS,self.opponent.status_report)                
                client.quark = None
                client.status = GGPOClientStatus.AVAILABLE                     
                self.log('SPECTATE : Reverted for non-watching spectator %s',client.username)                
            # revert status for spectators that dont have their game launched
            self.quark = ''
            self.opponent.quark = ''
            # reset quark                
            self.opponent = None
            # no longer in a match
            self.log('CHALLENGE : Reverted match status for all players / spectators in quark')
            return True
        if self.status == GGPOClientStatus.SPECTATING:
            # quit spectation
            self.log('SPECTATE : Quit spectating')
            p1,p2 = self.server.get_p1_p2_client_by_quark(self.quark)
            if p1:
                self.reply(GGPOCommand.STATUS,p1.status_report)
                self.reply(GGPOCommand.CANCEL_CHALLENGE,p1.username)
            if p2:
                self.reply(GGPOCommand.STATUS,p1.status_report)
                self.reply(GGPOCommand.CANCEL_CHALLENGE,p2.username)
            # update the latest status,we wont be getting any as a spectator
            self.status = GGPOClientStatus.AVAILABLE
            self.update_spectators()            
            self.quark = None
            # update viewers            

    def challenge_send(self, peer_username):
        '''sending a challenge'''         
        peer = self.server.get_client_by_username(peer_username)

        assert peer!=self,GGPOClientErrorcodes.USER_INVALID
        assert peer,GGPOClientErrorcodes.PEER_NOT_FOUND
        assert self.is_client_available_for_match(peer),GGPOClientErrorcodes.PEER_BAD_STATUS

        # found our peer,and is avaible for match,send the request!        
        peer.reply(GGPOCommand.SEND_CHALLENGE, self.username)
        self.log('CHALLENGE : Sent to %s', peer.username)
        return self.reply(GGPOCommand.ERRORMSG, GGPOClientErrorcodes.SUCCESS)

    def challenge_accept(self, peer_username):
        '''challenge accepted!'''
        peer = self.server.get_client_by_username(peer_username)

        assert peer!=self,GGPOClientErrorcodes.USER_INVALID
        assert peer,GGPOClientErrorcodes.PEER_NOT_FOUND
        assert self.is_client_available_for_match(peer),GGPOClientErrorcodes.PEER_BAD_STATUS
        # create quraks with same ts but different idents
        ts = generate_new_ts()
        self.quark = allocate_quark(ts=ts)
        peer.quark = allocate_quark(ts=ts)
        # being challenged, become P2
        self.side = GGPOClientSide.PLAYER2
        peer.side = GGPOClientSide.PLAYER1
        # gaming time >:]
        self.status = GGPOClientStatus.PLAYING
        peer.status = GGPOClientStatus.PLAYING
        # the quark is ready        
        self.reply(GGPOCommand.ACCEPT_CHALLENGE,self.quark)
        peer.reply(GGPOCommand.ACCEPT_CHALLENGE,peer.quark)                
        peer.opponent = self
        self.opponent = peer    
        # let everyone in the same channel know             
        self.server.boardcast(self.channel.clients,GGPOCommand.NOTIFY_CHALLENGE,self.username)
        # syncing up status of both clients
        self.reply(GGPOCommand.STATUS,self.status_report)
        self.reply(GGPOCommand.STATUS,self.opponent.status_report)
        self.opponent.reply(GGPOCommand.STATUS,self.opponent.status_report)
        self.opponent.reply(GGPOCommand.STATUS,self.status_report)            
            
        self.reply(GGPOCommand.ERRORMSG,GGPOClientErrorcodes.SUCCESS)
        self.log('CHALLENGE ACCEPT : Quark TS %s', ts)
    
    def challenge_decline(self, peer_username):
        '''NO,not you'''
        peer = self.server.get_client_by_username(peer_username)

        assert peer!=self,GGPOClientErrorcodes.USER_INVALID
        assert peer,GGPOClientErrorcodes.PEER_NOT_FOUND
        assert self.is_client_available_for_match(peer),GGPOClientErrorcodes.PEER_BAD_STATUS
        
        peer.reply(GGPOCommand.DECLINE_CHALLENGE,self.username)
        self.reply(GGPOCommand.ERRORMSG, GGPOClientErrorcodes.SUCCESS)
    
    def challenge_cancel(self, peer_username):
        '''cancels a requests or an ongoing game'''
        peer = self.server.get_client_by_username(peer_username)

        assert peer!=self,GGPOClientErrorcodes.USER_INVALID
        assert peer,GGPOClientErrorcodes.PEER_NOT_FOUND                
        self.reset_match()        
        self.reply(GGPOCommand.ERRORMSG, GGPOClientErrorcodes.SUCCESS)
    # endregion

    # region Channels
    def channel_join(self, payload):
        channel_name = payload        
        if channel_name in self.server.channels:            
            self.leave_current_channel()
            self.set_current_channel(channel_name)
            self.log('CHANNEL Joining : %s', self.channel.name)
            return self.reply(GGPOCommand.ERRORMSG, GGPOClientErrorcodes.SUCCESS)
        self.reply(GGPOCommand.ERRORMSG, GGPOClientErrorcodes.CHANNEL_INVALID)

    def channel_chat(self,msg):
        '''boardcast channel chat to EVERYONE in the same channel'''
        self.log('CHANNEL Chat : %s',msg)
        chat = {'username':self.username,'message':msg}
        self.server.boardcast(self.channel.clients,GGPOCommand.CHAT_CHANNEL,chat)
        self.channel.chat_history.append({**chat,'ts':int(time()*1000)})
        return self.reply(GGPOCommand.ERRORMSG, GGPOClientErrorcodes.SUCCESS)
    # endregion

    # region Peer-to-peer
    def watch_challenge(self,username):
        peer = self.server.get_client_by_username(username)
        if peer.quark: # peer is either playing or specing a game as well
            ts = ts_from_quark(peer.quark)
            self.side = GGPOClientSide.SPEC_PRESAVE
            self.status = GGPOClientStatus.SPECTATING
            self.quark = allocate_quark(ts) # special quark for us only
            p1,p2 = self.server.get_p1_p2_client_by_quark(self.quark)
            self.reply(GGPOCommand.WATCH_CHALLENGE,{'quark':self.quark,'player1':p1.username,'player2':p2.username})
            self.reply(GGPOCommand.STATUS,p1.status_report)
            self.reply(GGPOCommand.STATUS,p2.status_report)                 
            self.update_spectators()
            return self.reply(GGPOCommand.ERRORMSG,GGPOClientErrorcodes.SUCCESS)
        return self.reply(GGPOCommand.ERRORMSG,GGPOClientErrorcodes.USER_INVALID)

    def privmsg(self,payload):
        '''PMing'''        
        username,msg = payload['username'],payload['message']
        peer = self.server.get_client_by_username(username)
        self.log('PM -> %s : %s',username,msg)        
        assert peer!=self,GGPOClientErrorcodes.USER_INVALID
        assert peer,GGPOClientErrorcodes.PEER_NOT_FOUND
        self.reply(GGPOCommand.PRIVMSG,{'sender':self.username,'recipient':peer.username,'message':msg})
        peer.reply(GGPOCommand.PRIVMSG,{'sender':self.username,'recipient':peer.username,'message':msg})
        return self.reply(GGPOCommand.ERRORMSG, GGPOClientErrorcodes.SUCCESS)
        
    def status_update(self,newstatus):
        '''Updates status'''
        self.status = GGPOClientStatus[newstatus]
        self.push_status()
        return self.reply(GGPOCommand.ERRORMSG, GGPOClientErrorcodes.SUCCESS)
    # endregion

    def __repr__(self):
        return f'{self.username if self.username else "???"}@{self.channel.name if self.channel else "???"}{","+self.quark if self.quark else ""}'
    
    def __bool__(self):
        return True
        
    def __ne__(self, o: object) -> bool:
        return not self.__eq__(o)

    def __eq__(self, o) -> bool:
        if type(o) != type(self):return False
        return self.username == o.username

def setup_routing():
    def allow_cors(function):
        def method(initator, request: Request, content):
            request.send_header('Access-Control-Allow-Origin','*')
            return function(initator,request,content)
        return method

    @server.route('/.*')
    def static(initator, request: Request, content):
        return WriteContentToRequest(request,'./web/dist/'+request.path,mime_type='')

    @server.route('/')
    def index(initator, request: Request, content):
        return WriteContentToRequest(request,'./web/dist/'+'index.html',mime_type='text/html; charset=UTF-8')

    @server.route('/port')
    @JSONMessageWrapper(read=False)
    @allow_cors
    def port(initator, request: Request, content):
        request.send_response(200)
        return {'host':server.ggpo_address[0],'port':server.ggpo_address[1]}

    @server.route('/ws')
    @WebsocketSessionWrapper()
    def websocket(initator, request: Request, content):
        return Client

    @server.route('/channels')
    @JSONMessageWrapper(read=False)
    @allow_cors
    def channels(initator, request: Request, content):        
        request.send_response(200)
        return [channel.__dict__() for channel in server.channels.values()]

    @server.route('/channels/chathistory')
    @JSONMessageWrapper(read=False)
    @allow_cors
    def users(initator, request: Request, content):
        channel = request.query['channel'][-1]
        if not channel:return request.send_response(404)
        request.send_response(200)
        return server.channels[channel].chat_history

    @server.route('/channels/users')
    @JSONMessageWrapper(read=False)
    @allow_cors
    def users(initator, request: Request, content):
        channel = request.query['channel'][-1]
        if not channel:return request.send_response(404)
        request.send_response(200)
        clients = server.channels[channel].clients
        return [{
            'name': username, 'channel': client.channel.name,'status': client.status.name, 
            'quark_ts': ts_from_quark(client.quark)} for username, client in clients.items()
        ]

server = ClientServer()

def run(client_address,ggpo_address): 
    getLogger('Request').setLevel(ERROR)
    getLogger('PyWebHost').setLevel(ERROR)
    server.ggpo_address = ggpo_address
    server.bind_and_active(client_address) and setup_routing()    
    server.logger.info('Client Server started http://%s:%s' % server.server_address)
    return server.serve_forever()