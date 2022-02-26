'''A Generalized STUN server implemented with UDP

Supports both -coned NAT & symmetric NAT by supervisng packet throughput
'''
from threading import Thread
import socket,struct,logging,time
from typing import Dict

from ggpo import GGPOServer
from ggpo.models.quark import GGPOQuark, ts_from_quark

# Request
RQST_JOIN            = b'\xff\xfe'
RQST_SYMM_PROTO      = b'\xff\xfc'
RQST_CONE_PROTO      = b'\xff\xfa'
RQST_PROXY           = b'\xff\xf0'
# Responses
RESP_OK              = b'\x00\x00'
RESP_REJCT           = b'\x00\x01'
RESP_SYNC            = b'\x00\x02'
RESP_SYMM_PROTO      = b'\x00\x03'
RESP_CONE_PROTO      = b'\xff\x05'
RESP_PROXY           = b'\xff\x0f'
# Protocols
PROTOCOL_CONE        = 'PROTOCOL_CONE'
PROTOCOL_SYMM        = 'PROTOCOL_SYMM'

TTL = 30 * 1e9 # 30s, applies to UDPSession when using SYMM porto
class UDPSession:
    def __init__(self,addr,quark,proto=PROTOCOL_SYMM) -> None:
        self.addr = addr
        self.quark = quark
        self.proto = proto
        self.tick = time.time_ns()
    @property
    def expired(self):
        return time.time_ns() - self.tick >= TTL
    def update(self):
        self.tick = time.time_ns()
    def __repr__(self) -> str:
        return f'{self.quark} @ {self.addr}'

class GGPOGenericSTUNServer(Thread):
    def __init__(self,server:GGPOServer,port=10000):
        super().__init__(name="GGPOUDP")
        self.server = server

        self.fd = socket.socket(socket.AF_INET,socket.SOCK_DGRAM)
        self.fd.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self.fd.bind(('',port))
        self.keep_alive = True
        
        self.logger = logging.getLogger('Nexus')

        self.min_routes = 2                
        self.daemon = True

        self.rev_routes : Dict[tuple,GGPOQuark] = dict()

    @property
    def quarks(self):
        return self.server.quarks

    def proxy_packet(self,addr,data):        
        '''Proxies data from addr to its pre-constructed routes. 
        
        Respects `UDPSession.expired`. Sessions are removed once TTL is hit'''
        quarkobject = self.rev_routes[addr]        
        for addr_,session in quarkobject.routes.items():
            if session.expired:
                pass
            else:
                if session.addr != addr:                            
                    self.fd.sendto(RESP_PROXY + data,session.addr)
                session.update()
         
    def sync_quark_addr(self,quarkobject : GGPOQuark):
        '''Let occupants know each other's IP/Addr pairs'''                    
        for target in quarkobject.routes:                    
            for addr in quarkobject.routes:
                if target != addr:
                    self.fd.sendto(RESP_SYNC + socket.inet_aton(addr[0]) + struct.pack('<H',addr[1]),target)
                    self.logger.info('SYNC Quark %s : %s <-> %s' % (quarkobject.quark_ts,target,addr))  

    def join_by_quark(self,addr,quark):
        # Since the Client object will always create the quark first, expect the quark to be here already
        if not self.quarks.hasquark(quark):
            self.logger.warning('REJECT Quark %s - Not found' % ts_from_quark(quark))
            return self.fd.sendto(RESP_REJCT,addr)            
        
        quarkobject = self.quarks[quark]
        # Get quark by TS, which is shared across all the participants
        if not addr in quarkobject.routes:            
            
            quarkobject.routes[addr] = UDPSession(addr=addr,quark=quark)
            self.rev_routes[addr] = quarkobject

            self.logger.debug('ACCEPT Quark %s from %s (%d/%d)' % (ts_from_quark(quark),addr,len(quarkobject.routes),self.min_routes))
            self.fd.sendto(RESP_OK,addr)                 
            # When done, assuming it would be possible to sync IPs by quarks if the routes reached the limit
            if len(quarkobject.routes) >= self.min_routes:
                self.sync_quark_addr(quarkobject)
        else:
            return self.fd.sendto(RESP_REJCT,addr)

    def update_proto(self,addr,proto):
        quarkobject = self.rev_routes[addr]
        for addr_,session in quarkobject.routes.items():
            session.proto = proto
            if proto == PROTOCOL_SYMM:
                self.fd.sendto(RESP_SYMM_PROTO,session.addr)
            elif proto == PROTOCOL_CONE:
                self.fd.sendto(RESP_CONE_PROTO,session.addr)
            self.logger.debug('UPGRAGE Protocol to %s for %s' % (proto,session))

    def run(self):        
        while self.keep_alive:
            data,addr = self.fd.recvfrom(256)            
            # The client is expected to send a valid quark which is accessible from the server quark store            
            request,data = data[:2],data[2:]
            if request == RQST_JOIN:
                quark = data.decode()
                self.join_by_quark(addr,quark)
            elif addr in self.rev_routes:
                if request == RQST_SYMM_PROTO:
                    self.update_proto(addr,PROTOCOL_SYMM)
                if request == RQST_CONE_PROTO:
                    self.update_proto(addr,PROTOCOL_CONE)
                if request == RQST_PROXY:
                    if self.rev_routes[addr].routes[addr].proto == PROTOCOL_SYMM:
                        self.proxy_packet(addr,data)
                    else:
                        self.fd.sendto(RESP_REJCT,addr)
            else:
                self.fd.sendto(RESP_REJCT,addr)