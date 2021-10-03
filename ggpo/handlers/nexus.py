# -*- coding: utf-8 -*-
from typing import Union
from pywebhost.modules.websocket import WebsocketFrame, WebsocketSession
from ggpo.models.quark import GGPOQuark
from logging import getLogger,DEBUG

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