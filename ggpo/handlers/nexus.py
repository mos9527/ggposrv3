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

class GGPONexusSession(WebsocketSession):
    quark = None

    def __init__(self, request, raw_frames=True, *a, **k):
        from ggpo import GGPOServer                  
        super().__init__(request, raw_frames=raw_frames, *a, **k)
        self.server : GGPOServer  = self.request.server            
        self.logger = getLogger('GGPONexusNode')

    def log(self,msg,*args,level=DEBUG):
        header = '\033[1m{%s} \033[0m' % self
        self.logger.log(level,header+msg,*args)      

    def onOpen(self, request=None, content=None):                
        self.quark = self.request.query['quark'][-1]
        if not self.server.quarks.hasquark(self.quark):
            self.server.quarks[self.quark] = GGPOQuark(self.quark)         
        self.server.quarks[self.quark].nexus_nodes.append(self)
        self.current_nodes = self.server.quarks[self.quark].nexus_nodes
        self.log("Joinied to quark. (current : %s)" % len(self.server.quarks[self.quark].nexus_nodes))

    def onClose(self, request=None, content=None):     
        if request: return
        if self.quark:               
            index = self.server.quarks[self.quark].nexus_nodes.index(self)
            self.log("Leaving current quark game @ %d" % index)
            del self.server.quarks[self.quark].nexus_nodes[index]
    
    def onReceive(self, frame: Union[bytearray, WebsocketFrame]):
        # boardcast to everyone in the same quark        
        for node in self.current_nodes:
            node : GGPONexusSession                        
            node.send(WebsocketFrame(PAYLOAD=frame,OPCODE=2))            

    def __eq__(self, o: object) -> bool:
        return id(self) == id(o)

    def __repr__(self) -> str:
        return '%s - nexus - %s' % (self.quark,self.server.quarks[self.quark].nexus_nodes.index(self))