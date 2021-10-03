# -*- coding: utf-8 -*-
import traceback
from logging import DEBUG, ERROR, INFO, WARN, WARNING, getLogger
from json import dumps,loads
from time import time
from enum import Enum

from ggpo.models.quark import allocate_quark, generate_new_ts, ts_from_quark
from ggpo.handlers import GGPOClientStatus, GGPOClientSide, GGPOCommand , GGPOClientErrorcodes

from pywebhost.modules.websocket import WebsocketFrame, WebsocketSession
from threading import Lock

class GGPOClientSession(WebsocketSession):

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
        super().__init__(request, raw_frames=raw_frames, *a, **k)
        
        self.command_mapping = {
            GGPOCommand.AUTH:                 self.do_auth,
            GGPOCommand.SEND_CHALLENGE:       self.challenge_send,
            GGPOCommand.ACCEPT_CHALLENGE:     self.challenge_accept,
            GGPOCommand.DECLINE_CHALLENGE:    self.challenge_decline,
            GGPOCommand.CANCEL_CHALLENGE:     self.challenge_cancel,
            GGPOCommand.JOIN_CHANNEL:         self.channel_join,
            GGPOCommand.CHAT_CHANNEL:         self.channel_chat,
            GGPOCommand.PRIVMSG:              self.privmsg,
            GGPOCommand.STATUS:               self.status_update,
            GGPOCommand.WATCH_CHALLENGE:      self.watch_challenge,
        }
        
        from ggpo import GGPOServer                
        self.server : GGPOServer = self.request.server

        self.logger = getLogger('Client')

        self.username = ''  # who we are
        self.status = GGPOClientStatus.AVAILABLE  # player status
        
        self.channelobject = None  # player current channel
        self.quark = None  # game quark we currently in
        
        self.side = None  # what side we are on
        self.emulator_running = False # is player running the emulator
        
        self.opponent : GGPOClientSession = None # the client we are playing against        
        
        self.lock = Lock()
        
    @property
    def status_report(self):
        '''Client / player status. Updates to both self and opponent during / after matches'''
        return {
            'username':self.username,
            'status':self.status.name,
            'side':self.side.name,
            'emulator':self.emulator_running,
            'match':{
                'score':self.player.quarkobject.score,
                'characters':self.player.quarkobject.characters
                } if self.player and self.player.quarkobject else {}
            }     
    @property
    def quarkobject(self):
        if self.server.quarks.hasquark(self.quark):
            return self.server.quarks[self.quark]
        return None            
    @property
    def player(self):
        '''Represents our own GGPOPlayer object, None if not found'''
        return self.server.get_player_by_qurak(self.quark)

    def leave_current_channel(self):
        if self.channelobject != None: # channel can be none if in dev mode
            del self.server.channels[self.channelobject.name].clients[self.username]
            self.channelobject = None

    def is_client_available_for_match(self,client):
        return client.status == GGPOClientStatus.AVAILABLE and client.channelobject == self.channelobject

    def set_current_channel(self,channel_name):
        self.channelobject = self.server.channels[channel_name]
        self.server.channels[channel_name].clients[self.username] = self

    def push_status(self):
        # self.log('CHALLENGE : Current status : %s',self.status_report)        
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
            self.log('RECEIVE : AssertionError : %s',e)
        except Exception as e:
            self.reply(GGPOCommand.ERRORMSG, GGPOClientErrorcodes.INTERNAL_ERROR)
            self.log('RECEIVE : %s', e, level=ERROR)
            self.log(traceback.format_exc())

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
    # player events
    def onMatchStatusUpdate(self):        
        if self.opponent:
            self.opponent.push_status()
        for client in self.server.get_spectator_client_by_quark(self.quark):
            client.push_status()

    def onIngameChat(self, username , msg):
        self.reply(GGPOCommand.INGAME_CHAT,{'username':username,'message':msg})

    def onEmulatorConnected(self):
        self.emulator_running = True
        self.reply(GGPOCommand.STATUS,self.status_report)
        if self.opponent:
            self.opponent.reply(GGPOCommand.STATUS,self.status_report)
        for client in self.server.get_spectator_client_by_quark(self.quark):
            client.reply(GGPOCommand.STATUS,self.status_report)

    def onEmulatorDisconnect(self):
        self.log('CHALLENGE : Handling emulator disconnect',level=WARNING)
        self.emulator_running = False
        self.reset_match()

    def do_auth(self, payload):
        '''step 1 of creating a conenction. authenticate and join the club'''
        username,password = str(payload['username']),str(payload['password'])
        # auth success!
        if username and not username in self.server.clients:
            self.username = username
            self.server.clients[username] = self
            self.set_current_channel(self.server.default_channel.name)
            self.log('LOGIN : OK w/password %s',password,level=INFO)
            return self.reply(GGPOCommand.ERRORMSG, GGPOClientErrorcodes.SUCCESS)
        else:
            self.log('LOGIN : Duped / empty username w/password %s',password,level=WARN)
            return self.reply(GGPOCommand.ERRORMSG,GGPOClientErrorcodes.USER_INVALID)
    # region Challenging
    def reset_match(self):
        if self.opponent: # Resets status for both of us if this was in a match            
            self.opponent.opponent = None # Do this only on one side            
            client_inmatch = list(self.server.get_player_client_by_quark(self.quark)) + list(self.server.get_spectator_client_by_quark(self.quark))
            for client in client_inmatch:
                player = self.server.get_player_by_username(client.username)
                if player : player.finish() # only when there is a emulator attached
            # Kills the emulators,making both clients' on_disconnect() handled
            # so we don't need to mess with thier states anymore
            # Should this be done by GGPOPlayer already unless it's a client-issued disconenct
            self.status = GGPOClientStatus.AVAILABLE
            if self.opponent:self.opponent.status = GGPOClientStatus.AVAILABLE
            self.side = GGPOClientSide.SPEC_PRESAVE
            if self.opponent:self.opponent.side = GGPOClientSide.SPEC_PRESAVE
            # reset misc status
            self.reply(GGPOCommand.STATUS,self.status_report)
            if self.opponent:self.reply(GGPOCommand.STATUS,self.opponent.status_report)
            if self.opponent:self.opponent.reply(GGPOCommand.STATUS,self.opponent.status_report)
            if self.opponent:self.opponent.reply(GGPOCommand.STATUS,self.status_report)
            # syncing up status of both players sperately so we dont get repeated message
            self.server.boardcast(client_inmatch,GGPOCommand.CANCEL_CHALLENGE,self.username)
            if self.opponent:self.server.boardcast(client_inmatch,GGPOCommand.CANCEL_CHALLENGE,self.opponent.username)
            # notify everyone in the same channel that the match is no longer available
            for client in self.server.get_spectator_client_by_quark(self.quark):
                client.reply(GGPOCommand.STATUS,self.status_report)
                if self.opponent:client.reply(GGPOCommand.STATUS,self.opponent.status_report)
                client.quark = None
                client.status = GGPOClientStatus.AVAILABLE
                self.log('SPECTATE : Reverted for non-watching spectator %s',client.username)
            # revert status for spectators that dont have their game launched
            self.quark = ''
            if self.opponent:self.opponent.quark = ''
            # reset quark
            if self.opponent:self.opponent = None
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
        assert self.username,"Not logged in"
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
        self.server.boardcast(self.channelobject.clients,GGPOCommand.NOTIFY_CHALLENGE,self.username)
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
        assert self.username,"Not logged in"
        channel_name = payload
        if channel_name in self.server.channels:
            self.leave_current_channel()
            self.set_current_channel(channel_name)
            self.log('CHANNEL Joining : %s', self.channelobject.name)
            return self.reply(GGPOCommand.ERRORMSG, GGPOClientErrorcodes.SUCCESS)
        self.reply(GGPOCommand.ERRORMSG, GGPOClientErrorcodes.CHANNEL_INVALID)

    def channel_chat(self,msg):
        '''boardcast channel chat to EVERYONE in the same channel'''
        assert self.username,"Not logged in"
        self.log('CHANNEL Chat : %s',msg)
        chat = {'username':self.username,'message':msg}
        self.server.boardcast(self.channelobject.clients,GGPOCommand.CHAT_CHANNEL,chat)
        self.channelobject.chat_history.append({**chat,'ts':int(time()*1000)})
        return self.reply(GGPOCommand.ERRORMSG, GGPOClientErrorcodes.SUCCESS)
    # endregion

    # region Peer-to-peer
    def watch_challenge(self,username):
        assert self.username,"Not logged in"
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
        assert self.username,"Not logged in"
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
        return f'{self.username if self.username else "???"}@{self.channelobject.name if self.channelobject else "???"}{","+self.quark if self.quark else ""}'

    def __bool__(self):
        return True

    def __ne__(self, o: object) -> bool:
        return not self.__eq__(o)

    def __eq__(self, o) -> bool:
        if type(o) != type(self):return False
        return self.username == o.username