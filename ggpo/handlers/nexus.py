from threading import Thread
import socket,struct,logging

from ggpo import GGPOServer
from ggpo.models.quark import ts_from_quark

RESP_OK = b'\x00\x00\x00\x00'
RESP_REJCT = b'\xff\xff\xff\xfe'
RESP_SYNC = b'\xff\xff\xff\xff'

class GGPONexusForwarder(Thread):
    def __init__(self,server:GGPOServer,port=10000):
        super().__init__()
        self.server = server

        self.fd = socket.socket(socket.AF_INET,socket.SOCK_DGRAM)
        self.fd.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self.fd.bind(('',port))
        self.keep_alive = True
        
        self.logger = logging.getLogger('Nexus')

        self.min_routes = 2                
        self.daemon = True

    @property
    def quarks(self):
        return self.server.quarks

    def run(self):        
        while self.keep_alive:
            data,addr = self.fd.recvfrom(256)            
            # The client is expected to send a valid quark which is accessible from the server quark store
            quark = data.decode()
            # Since the Client object will always create the quark first, expect the quark to be here already
            if not self.quarks.hasquark(quark):
                self.logger.warning('REJECT Quark %s - Not found' % ts_from_quark(quark))
                self.fd.sendto(RESP_REJCT,addr)
                continue
            
            quarkobject = self.quarks[quark]
            # Get quark by TS, which is shared across all the participants
            if not addr in quarkobject.routes:
                quarkobject.routes[addr] = quark
                self.logger.debug('ACCEPT Quark %s from %s (%d/%d)' % (ts_from_quark(quark),addr,len(quarkobject.routes),self.min_routes))
                self.fd.sendto(RESP_OK,addr)                 
            
            if len(quarkobject.routes) >= self.min_routes:
                # Let occupants know each other's IP/Addr pairs
                for target in quarkobject.routes:                    
                    for addr in quarkobject.routes:
                        if target != addr:
                            self.fd.sendto(RESP_SYNC + socket.inet_aton(addr[0]) + struct.pack('<H',addr[1]),target)
                            self.logger.info('SYNC Quark %s : %s <-> %s' % (ts_from_quark(quark),target,addr))                
    