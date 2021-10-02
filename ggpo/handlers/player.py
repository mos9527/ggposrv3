# -*- coding: utf-8 -*-
from typing import Union
from struct import pack,unpack
from time import sleep
from logging import ERROR, getLogger,DEBUG,WARNING
from datetime import datetime
from pywebhost.handler import Request

from pywebhost.modules.websocket import WebsocketFrame, WebsocketSession
from ggpo.models.quark import GGPOQuark
from ggpo.handlers import GGPOSysMessage,GGPOClientSide,GGPOClientStatus,GGPOClientType,GGPOCommand,GGPOSequence

import traceback,base64

class GGPOPlayerSession(WebsocketSession):
    """
    Implements a subset of GGPO TcpConnect protocol over websockets
    """
    PEER_TIMEOUT = 30
    ENCODING = 'gbk'

    def __init__(self, request, raw_frames=False, *a, **k):
        super().__init__(request, raw_frames, *a, **k)

        from ggpo import GGPOServer

        self.server : GGPOServer = self.request.server

        self.username = None            # Client's currently registered username
        self.host = self.request.client_address[0]
                                                        # Client's hostname / ip.for tcpconnection
        self.clienttype = None
                                                    # Client's type
        self.quark = None               # Client's quark (in-game uri)
        self.port = 0               # UDP port for ggpo
        self.side = GGPOClientSide.SPEC_PRESAVE
                                                # Client's side

        self.closing = False    # Are we currently closing connection
        self.channelobject = None     # The channel we are currently in,for logging
        # Match details
        self.score = 0  # What score do we have
        self.character = '' # what character are we playing as

        self.logger = getLogger('GGPOPlayer')
        self.buffer = bytearray()
                
    # region Utility
    def log(self,msg,*args,level=DEBUG):
        header = '\033[1m<%s> \033[0m' % self
        self.logger.log(level,header+msg,*args)              
    @staticmethod
    def to_base64(v):
        return base64.b64encode(v)
    @staticmethod
    def from_base64(v):
        return base64.b64decode(v)
    @property
    def ascii_username(self):
        '''ASCII character only username,pads unrenderable-chars with ?'''
        return ''.join([char if ord(char) < 127 else '?' for char in self.username][:60])    
    def decode_from_gbk_b64(self,src):
        '''decodes string with gbk w/ b64'''
        return self.from_base64(src).decode(self.ENCODING)
    def encode_to_gbk_b64(self,str_):
        '''encodes string with gbk w/ b64'''
        return self.to_base64(str_.encode(self.ENCODING))
    @property
    def encoded_username(self):
        return self.encode_to_gbk_b64(self.username)
    @property
    def now(self):
        return datetime.today().strftime("%Y-%m-%d %H:%M:%S")
    @property
    def listen_port(self):
        return self.server.server_address[1]    

    def send(self,msg:Union[str,bytes]):
        if type(msg) == str : msg = msg.encode()
        try:super().send(WebsocketFrame(OPCODE=2,PAYLOAD=msg))
        except:self.finish()

    def pad2hex(self,length : int):
        return pack('>I',length)

    def int32(self,b : bytes) -> int:
        return unpack('>I',b)[0]

    def sizepad(self,data : bytes):
        '''pads first 4 bytes with size of `data`'''
        if data==None:return b''
        if type(data) == str:data = data.encode()
        pdu = self.pad2hex(len(data)) + data
        return pdu

    def make_reply(self,sequence : int,pdu : Union[bytes,str]):
        length=4+len(pdu)
        if type(pdu) == str:pdu = pdu.encode()
        return self.pad2hex(length) + self.pad2hex(sequence) + pdu

    def send_ack(self, sequence):
        ACK=b'\x00\x00\x00\x00'
        response = self.make_reply(sequence,ACK)
        self.send(response)

    @property
    def client(self):
        '''Returns a GGPOClient object representing our *own* client connection, or self if not found'''
        if not self.quark: raise Exception("Trying to fetch client whilst outside a match")
        for client_ in self.server.get_clients_by_quark(self.quark):
            if client_.quark == self.quark:
                return client_ # ts and ident are the same
            if client_.username == self.username:
                return client_ # quark could been deleted beforehand, use usernames as a fallback
        return None

    @property
    def quarkobject(self):
        if self.server.quarks.hasquark(self.quark):
            return self.server.quarks[self.quark]
        return None
    # endregion
    # region Netcode interpreting
    def on_command(self,command,sequence,data,length):
        if (command==GGPOCommand.CONNECT):
            return self.handle_connect(sequence)

        if (command==GGPOCommand.PEER):
            quarklen=self.int32(data[12:16])
            quark=data[16:16+quarklen]
            fbaport=self.int32(data[16+quarklen:16+quarklen+4])
            return self.handle_getpeer(quark,fbaport,sequence)

        if (command==GGPOCommand.MATCHINFO):
            quarklen=self.int32(data[12:16])
            quark=data[16:16+quarklen]
            return self.handle_matchinfo(quark,sequence)

        if (command==GGPOCommand.INGAME_CHAT):
            quarklen=self.int32(data[12:16])
            quark=data[16:16+quarklen]
            msglen=self.int32(data[16+quarklen:16+quarklen+4])
            msg=data[20+quarklen:20+quarklen+msglen]
            return self.handle_ingame_privmsg(quark,msg,sequence)

        if (command==GGPOCommand.SAVESTATE):
            quarklen=self.int32(data[12:16])
            quark=data[16:16+quarklen]
            block1=data[16+quarklen:20+quarklen]
            block2=data[20+quarklen:24+quarklen]
            gamebuf=data[24+quarklen:length+4]
            return self.handle_savestate(quark,block1,block2,gamebuf,sequence)

        if (command==GGPOCommand.GAMEBUFFER):
            quarklen=self.int32(data[12:16])
            quark=data[16:16+quarklen]
            gamebuf=data[20+quarklen:length+4]
            return self.handle_gamebuffer(quark,gamebuf,sequence)

        if (command==GGPOCommand.SPECTATE):
            quarklen=self.int32(data[12:16])
            quark=data[16:16+quarklen]
            return self.handle_spectator(quark,sequence)

        return False

    def parse(self, data):
        response = ''
        length=self.int32(data[:4])
        if len(data)<length-4: return
        sequence=0
        if length >= 4:
            sequence=self.int32(data[4:8])
        if length >= 8:
            command=self.int32(data[8:12])
            try:
                command=GGPOCommand(command)
                response = self.on_command(command,sequence,data,length)
                assert response != False
            except (AttributeError,AssertionError,ValueError) as e:
                self.log('BAD COMMAND - %s [%s]',e, command,level=WARNING)
                raise e            
            except Exception as e:
                self.log('INTERNAL ERROR - %s [%s]',e, command,level=ERROR)
                self.log(traceback.format_exc())
                self.finish()
        if (len(data) > length+4): # parse the rest
            pdu=data[length+4:]
            self.parse(pdu)
        return response

    def onReceive(self,data):        
        # See if the client has any commands for us.
        try:
            self.buffer += data

            if (len(self.buffer) < 4):return
            while (len(self.buffer)-4 > self.int32(self.buffer[0:4])):
                length=self.int32(self.buffer[0:4])
                response = self.parse(self.buffer[0:length+4])
                self.buffer=self.buffer[length+4:]
            if len(self.buffer)-4 == self.int32(self.buffer[0:4]):
                response = self.parse(self.buffer)                
                if response:
                    self.log('RESPOND : %s',response)
                self.buffer.clear()
        except Exception as e:
                self.log('When reading: %s',e,level=ERROR)
                self.finish()
                return        
    # endregion
    # region GGPO Interfacing
    def send_sysmessage(self,message):
        '''Sending System messages. Unlike others, the message is ANSI-only'''
        pdu=self.sizepad(self.quark)
        pdu+=self.sizepad('System')
        pdu+=self.sizepad(message.encode('ascii'))
        self.send(self.make_reply(GGPOSequence.INGAME_PRIVMSG,pdu))

    def handle_connect(self, sequence):
        '''
        Handling WELCOME message, first step of everything
        '''
        self.send_ack(sequence)
        self.server.players.append(self)

    def handle_ingame_privmsg(self, quark, msg, sequence):
        """
        Handle sending messages inside the emulator.
        """
        # send the ACK to the client
        #self.send_ack(sequence)
        quark = quark.decode()
        t_msg,msg = msg[:1],msg[1:]
        # for newer emulators,string comes with a prefix
        if t_msg==b'V': # V - netcode version
            return self.log('PRIVMSG Version : 0x%s',self.decode_from_gbk_b64(msg.hex))
        if t_msg==b'T': # T - user chat            
            self.log('PRIVMSG : %s',self.decode_from_gbk_b64(msg))
        elif t_msg==b'S': # S - client command
            return self.log('PRIVMGS COMMAND : %s',msg)       
        elif t_msg==b'M': # M - match progress        
            p1_score,p2_score,p1_char,p2_char = self.decode_from_gbk_b64(msg).split(',')
            quarkobject = self.server.quarks[self.quark]
            score = quarkobject.score
            score['p1'] = p1_score
            score['p2'] = p2_score
            characters = quarkobject.characters
            characters['p1'] = p1_char
            characters['p2'] = p2_char            
            return self.client.onMatchStatusUpdate()
        elif t_msg==b'W': # W - match complete with one party winning
            winner,s1,s2,c1,c2 = self.decode_from_gbk_b64(msg).split(',')
            if (winner == '1' and self.side == GGPOClientSide.PLAYER1) or (winner == '2' and self.side == GGPOClientSide.PLAYER2):
                msg = self.encode_to_gbk_b64("回合结束 - P%s (%s) 获胜" % (winner,self.quarkobject.characters['p' + winner]))
            else:return

        for client in [self,self.server.get_peer_player_by_quark(quark)] + list(self.quarkobject.spectators.values()):
            pdu=self.sizepad(client.quark)
            pdu+=self.sizepad(self.encoded_username)
            pdu+=self.sizepad(msg)
            client.send(self.make_reply(GGPOSequence.INGAME_PRIVMSG,pdu))
        
        self.client.server.get_client_by_username(self.username).onIngameChat(self.client.username,self.decode_from_gbk_b64(msg))

    def handle_gamebuffer(self, quark, gamebuf, sequence):
        """
        Handling gamebuffer pushes, used for syncing gameplay 
        """
        self.send_ack(sequence)
        if not self.quarkobject.spectators: return
        response = self.make_reply(GGPOSequence.GAMEBUFFER,gamebuf)                
        for spectator in self.quarkobject.spectators.values():
            # self.log('GAMEBUFFER -> %s : %r',spectator, response)
            spectator.send(response)
            spectator.side=GGPOClientSide.SPEC_POSTSAVE     # big chunk transmitted,spectator is to receive states in a smaller size

    def handle_savestate(self, quark, block1, block2, gamebuf, sequence):
        """
        Handling savestate pushes, used for replays & specing
        """
        # send ACK to the player
        self.send_ack(sequence)
        if not self.quarkobject.spectators: return
        pdu=block2+block1+gamebuf   
        response = self.make_reply(GGPOSequence.SAVESTATE,pdu)  
        for spectator in self.quarkobject.spectators.values():
            # self.log('SAVESTATE -> %s : %r',spectator, response)
            spectator.send(response)

    def handle_matchinfo(self, quark, sequence):
        '''
        Handling matchinfo pulling, used for displaying match info on emulator overlay
        '''
        quark = quark.decode()
        if self.server.quarks.hasquark(quark):
            # an ongoing match
            quarkobject = self.quarkobject
        else:
            # nothing to spectate, go away
            return self.finish()
        # ongoing match:
        for i in range(0,self.PEER_TIMEOUT): # wait for 30s until someone joins
            if (quarkobject.p1 != None and quarkobject.p2 != None):break
            sleep(1)
        pdu=self.pad2hex(0)
        if (i<self.PEER_TIMEOUT-1):
            p1 = '%s#%d,%d,%s' % (quarkobject.p1.username,0,0,'')
            p2 = '%s#%d,%d,%s' % (quarkobject.p2.username,0,0,'')     
            pdu+=self.sizepad(self.encode_to_gbk_b64(p1))   
            pdu+=self.sizepad(self.encode_to_gbk_b64(p2))                                 
        else:
            # avoid crashing fba if we can't get our peer - sending null usernames
            pdu+=self.pad2hex(0)
            pdu+=self.pad2hex(0)
        pdu+=self.pad2hex(0)
        if self.clienttype==GGPOClientType.PLAYER:
            pdu+=self.pad2hex(len(quarkobject.spectators))
        else: # im specing the match,count me in
            pdu+=self.pad2hex(len(quarkobject.spectators)+1)
        response = self.make_reply(sequence,pdu)
        self.send(response)
        if self.clienttype==GGPOClientType.PLAYER:
            # call auto_spectate() to record the game here
            self.log('SAVESTATE -> Calling AUTO-SPECTATE')
            self.auto_spectate(quark)
            # announce the match to the public
            self.client.status=GGPOClientStatus.PLAYING

    def handle_getpeer(self, quark, fbaport, sequence):
        '''
        Handling peer reqeusts, second step of the lifecycle
        '''
        # send ack to the client's ggpofba
        quark = quark.decode()
        self.send_ack(sequence)
        self.clienttype=GGPOClientType.PLAYER
        self.quark=quark
        self.port=fbaport
        if not self.server.quarks.hasquark(quark):
            self.server.quarks[quark] = GGPOQuark(quark)
        quarkobject : GGPOQuark = self.quarkobject
        # transfering info
        self.username = self.client.username
        self.side = self.client.side
        self.channelobject = self.client.channelobject      
        # Notify the client that we have connected
        self.client.onEmulatorConnected()
        if quarkobject.p1 and quarkobject.p2:
            self.log('GETPEER : In a full quark',level=ERROR)
            return self.finish()
        for i in range(0,self.PEER_TIMEOUT): # until we find a peer for ourself
            peer=self.server.get_peer_player_by_quark(quark)
            if peer:break
            sleep(1)
        if not peer:
            self.log('GETPEER : couldnt find peer!')
            return self.finish()
        else:
            self.log('GETPEER : Found peer: %s [%s:%s <-> %s:%s]', peer, self.host,self.port,peer.host,peer.port)
        if self.side==GGPOClientSide.PLAYER1 and quarkobject.p1==None:
            quarkobject.p1=self
        elif self.side==GGPOClientSide.PLAYER2 and quarkobject.p2==None:
            quarkobject.p2=self        
        pdu=self.sizepad(peer.host) # if not self.server.holepunch else '127.0.0.1')
        pdu+=self.pad2hex(peer.port)
        if self.side==GGPOClientSide.PLAYER1:
            pdu+=self.pad2hex(1)
        else:
            pdu+=self.pad2hex(0)
        response = self.make_reply(GGPOSequence.PEERFOUND,pdu)                
        self.send(response)

    def auto_spectate(self, quark):
        '''
        Calls auto_spectate() of remote
        '''
        self.log('AUTO-SPECTATE : Entering')
        response = self.make_reply(GGPOSequence.AUTOSPEC,b'') + self.make_reply(GGPOSequence.SPEC_VIEWS,self.pad2hex(1))
        # make the player's FBA send us the game data, to store it on the server
        # self.log('AUTO-SPECTATE reply : %r',response)
        self.send(response)

    def handle_spectator(self,quark, sequence):
        '''
        Handling spectator requests and updating live views. Second-to-connect step of spectator lifecycle
        '''
        quark = quark.decode()
        if self.server.quarks.hasquark(quark):
            quarkobject = self.quarkobject
        else:
            # no match to quark,go away
            return self.finish()
        # send ack to the client's ggpofba
        self.send_ack(sequence)
        self.clienttype=GGPOClientType.SPECTATOR
        self.quark=quark
        self.channelobject = self.client.channelobject
        self.username = self.client.username # the spectotor must have a quark bound to it
        quarkobject.spectators[self.username] = self
        # spectator count
        response = self.make_reply(GGPOSequence.AUTOSPEC,b'') + self.make_reply(GGPOSequence.SPEC_VIEWS,self.pad2hex(len(quarkobject.spectators)+1))
        # this updates the number of spectators in both players FBAs , and enables autospec if havent already
        quarkobject.p1.send(response)
        quarkobject.p2.send(response)
        self.log('SPEC : Spectating real-time quark: %s' % quark)
        for spectator in quarkobject.spectators.values():
            spectator.send(response)

    def spectator_leave(self, quark):
        '''
        Handling spectator leaving, and updating views
        '''
        if not self.server.quarks.hasquark(quark):
            return # quark is already gone
        quarkobject = self.quarkobject
        quarkobject.spectators.pop(self.username)
        response=self.make_reply(GGPOSequence.SPEC_VIEWS,self.pad2hex(len(quarkobject.spectators)+1))
        # this updates the number of spectators in both players FBAs
        quarkobject.p1.send(response)
        quarkobject.p2.send(response)
        for spectator in quarkobject.spectators.values():
            spectator.send(response)
    # endregion
    def __repr__(self):
        """
        Return the client identifier as included in many command replies.
        """
        return f"{self.username} - {self.channelobject.name if self.channelobject else '???'} - {self.quark}"

    def onClose(self, request=None, content=None):
        if (not Request):
            self.finish()

    def finish(self):
        """
        The client conection is finished. Do some cleanup to ensure that the
        client doesn't linger around in any channel or the client list.
        """
        if self.closing:
            return # self.log('DISCONNECT : Player already in closing state!') # avoid calling multipule times
        self.log('DISCONNECT : Cleaning self & peers\' connection',level=WARNING)
        self.closing = True

        if self.clienttype==GGPOClientType.PLAYER:        
            if self.quarkobject:                
                # terminate our peer's connection if they're still up,including spectators
                for player in list(self.quarkobject.spectators.values())+[self.quarkobject.p1,self.quarkobject.p2]:
                    if player and player!=self and not player.closing: # p1 / p2 may have not connected yet                        
                        # player.send(b'\xff\xff\x00\x00\xde\xad') # crashes via buffer overflow, should cause AV
                        player.send_sysmessage(GGPOSysMessage.CLIENT_LEFT) # a cleaner method                        
                        player.finish()
                self.log('... Removing quark %s',self.quark)
                self.server.quarks.pop(self.quark) # the quark is gone
                # Notify the client(s),which will then revert the states
            if self.client:self.client.onEmulatorDisconnect()

        if self.clienttype==GGPOClientType.SPECTATOR:
            # this client is an spectator
            self.log("... Spectator leaving quark %s" , self.quark)
            self.spectator_leave(self.quark)
            if self.client:self.client.onEmulatorDisconnect()

        players = self.server.players
        if self in players:
            del players[players.index(self)] # removing reference
            self.log("... Removing myself from players")
        self.log("... All done , going home...")
        self.request.close()

    def __bool__(self):
        return True

    def __ne__(self, o: object) -> bool:
        return not self.__eq__(o)

    def __eq__(self, o) -> bool:
        if type(o) != type(self):return False
        return self.username == o.username
