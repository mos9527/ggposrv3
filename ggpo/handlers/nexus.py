# -*- coding: utf-8 -*-
import enum
import json
import mimetypes
import traceback
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

from ggpo.models.quark import GGPOQuark, QuarkStorage, allocate_quark, generate_new_ts, quark_same_ts, ts_from_quark
from ggpo.handlers import GGPOClientStatus, GGPOClientSide, GGPOCommand , GGPOClientErrorcodes , player as player_handler
from ggpo.models.channel import GGPOChannel, get_default_channels , get_channels_from_json
from ggpo.events import EventDict, EventThread, ServerEvents

from threading import Lock

class GGPONexusQuarks(QuarkStorage):
    def add_to_quark(self, quark, node):        
        if not self.hasquark(quark):
            self[quark] = []
        self[quark].append(node)
            
    def index_from_quark(self,quark,node):        
        if not self.hasquark(quark): return
        for idx,node_ in enumerate(self[quark]):
            if node_.quark == node.quark:
                return idx
        return None

    def remove_from_quark(self,quark,node):
        if not self.hasquark(quark): return
        del self[quark][self.index_from_quark(quark,node)]

quarks = GGPONexusQuarks()

class GGPONexusSession(WebsocketSession):
    quark = None

    def __init__(self, request, raw_frames=True, *a, **k):
        from ggpo import GGPOServer
        self.server : GGPOServer        
        super().__init__(request, raw_frames=raw_frames, *a, **k)
        self.logger = getLogger('GGPONexusNode')

    def log(self,msg,*args,level=DEBUG):
        header = '\033[1m{%s} \033[0m' % self
        self.logger.log(level,header+msg,*args)      

    def onOpen(self, request=None, content=None):                
        self.quark = self.request.query['quark'][-1]
        if not self.quark:            
            return self.close()        
        self.log("Joining current quark game")
        quarks.add_to_quark(self.quark,self)
        
    def onClose(self, request=None, content=None):     
        if self.quark:   
            self.log("Leaving current quark game")
            quarks.remove_from_quark(self.quark,self)
    
    def onReceive(self, frame: Union[bytearray, WebsocketFrame]):
        # boardcast to everyone in the same quark
        for node in quarks[self.quark]:
            node : GGPONexusSession
            if str(node) != str(self):
                self.log('Sending to : %s' % node)
                node.send(frame)            

    def __repr__(self) -> str:
        return '%s - nexus - %s' % (self.quark,id(self))