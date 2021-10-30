# -*- coding: utf-8 -*-
from typing import Union
from pywebhost.modules.websocket import WebsocketFrame, WebsocketSession
from ggpo.models.quark import GGPOQuark
from logging import ERROR, getLogger,DEBUG

class GGPONexusSession(WebsocketSession):
    quark = None

    @property
    def quarkobject(self):
        return self.server.quarks[self.quark]

    @property
    def is_p2(self):
        return not self.is_p1
        
    def __init__(self, request, raw_frames=True, *a, **k):
        from ggpo import GGPOServer                  
        super().__init__(request, raw_frames=raw_frames, *a, **k)
        self.server : GGPOServer  = self.request.server            
        self.logger = getLogger('GGPONexusNode')
        self.is_p1 = False

    def log(self,msg,*args,level=DEBUG):
        header = '\033[1m{%s} \033[0m' % self
        self.logger.log(level,header+msg,*args)      

    def onOpen(self, request=None, content=None):                
        self.quark = self.request.query['quark'][-1]
        if not self.server.quarks.hasquark(self.quark):
            self.server.quarks[self.quark] = GGPOQuark(self.quark)                 
        if not self.quarkobject.np1: 
            self.quarkobject.np1 = self
            self.is_p1 = True
        elif not self.quarkobject.np2:
            self.quarkobject.np2 = self
            self.is_p1 = False
        else:
            self.log('In a full quark',level=ERROR)
            return self.close()                       
        self.log("Joinied to quark. ")

    def onClose(self, request=None, content=None):             
        if self.quark:               
            if request: return                   
            self.log("Leaving current quark game")
            if self.is_p1:
                self.quarkobject.np1 = None
            elif self.is_p2:
                self.quarkobject.np2 = None                        
    
    def onReceive(self, frame: Union[bytearray, WebsocketFrame]):
        # sends data to the other player upon receive
        target = None
        if self.is_p1:
            target = self.quarkobject.np2
        elif self.is_p2:
            target = self.quarkobject.np1
        target = target or self # Fallback to echo packets when no other client is present
        target.send(WebsocketFrame(PAYLOAD=frame,OPCODE=2))  

    def __eq__(self, o: object) -> bool:
        return id(self) == id(o)

    def __repr__(self) -> str:
        return '%s - nexus - P%s' % (self.quark,1 + int(self.is_p2))