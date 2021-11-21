# -*- coding: utf-8 -*-
from logging import getLogger
from os import path
import socket
from struct import pack, unpack
from pywebhost import PyWebHost

from ggpo.events import EventDict, EventThread, ServerEvents
from ggpo.handlers import GGPOClientSide, GGPOClientStatus, GGPOCommand
from ggpo.handlers.client import GGPOClientSession

from ggpo.models.channel import get_channels_from_json, get_default_channels
from ggpo.models.quark import QuarkStorage, quark_same_ts, ts_from_quark

CONFIG_BANNER = 'config/banners.json'
CONFIG_CHANNELS = 'config/channels.json'

def int32(b: bytes) -> int:
    return unpack('>I', b)[0]

def pad2hex(length: int):
    if type(length) != int:
        length = length.value
    return pack('>I', length)

class GGPOServer(PyWebHost):

    @property
    def players(self):
        '''Current players LIST, spectators dont live here'''
        return self._players
    @property
    def quarks(self):
        '''Current qurak & quarkobjects'''
        return self._quarks

    @property
    def clients(self):
        '''Clients indexed by their usernames'''
        return self._clients

    @property
    def channels(self):
        '''All available channels'''
        return self._channels

    @property
    def default_channel(self):
        return self.channels.get('lobby')

    def get_client_by_username(self, username):
        '''Fetches client by given name,returns None if not found'''
        if username in self.clients:
            client: GGPOClientSession = self.clients[username]
            return client
        return None

    def get_clients_by_quark(self, quark):
        '''Fetches all the clients with the quark. Only sensitive to ts.'''
        for client in self.clients.values():
            client: GGPOClientSession
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

    def get_peer_player_by_quark(self, quark):
        """
        Returns a GGPOClient object representing our FBA *peer*'s ggpofba connection, or None if not found
        """
        for player in self.players:
            if quark_same_ts(player.quark,quark) and quark != player.quark:
                return player # ts is the same,but ident is diffrent
        return None

    def get_player_by_qurak(self,quark):
        for player in self.players:
            if quark == player.quark:                
                return player  # ts and ident are the same
        return None

    def get_player_by_username(self,username):
        for player in self.players:
            if username == player.username:
                return player  # ts and ident are the same
        return None

    def bind_and_active(self,address_tuple):
        super().__init__(address_tuple)
        self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        return True

    def boardcast(self,to,*args):
        replied = 0
        for client in to if isinstance(to,list) else to.values():         
            try:                 
                replied += client.reply(*args)
            except: pass
        return replied

    def on_user_new(self,client):
        pass

    def on_user_left(self,client):
        pass

    def on_channel_new(self,client):
        client : GGPOClientSession        
        self.boardcast(client.channelobject.clients,GGPOCommand.JOIN_CHANNEL,{'username':client.username,'channel':client.channelobject.name})

    def on_channel_left(self,client):
        client : GGPOClientSession
        self.boardcast(client.channelobject.clients,GGPOCommand.PART_CHANNEL,{'username':client.username,'channel':client.channelobject.name})

    def __init__(self):
        self.events = EventThread(ServerEvents)
        
        self._clients = EventDict(self.events,ServerEvents.USER_NEW,ServerEvents.USER_LEFT)
        self._channels = get_default_channels(self.events)  
        self._players = list()
        self._quarks = QuarkStorage()
        self.logger = getLogger('GGPOServer')
        
        # Registering events
        self.events.register(ServerEvents.USER_NEW,lambda n:self.on_user_new(n))
        self.events.register(ServerEvents.USER_LEFT,lambda n:self.on_user_left(n))
        self.events.register(ServerEvents.CHANNEL_NEW,lambda n:self.on_channel_new(n))
        self.events.register(ServerEvents.CHANNEL_LEFT,lambda n:self.on_channel_left(n))

        if path.isfile(CONFIG_CHANNELS):
            self._channels.update(get_channels_from_json(CONFIG_CHANNELS,self.events))
