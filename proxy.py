from argparse import ArgumentParser
import logging
from select import select
from socketserver import StreamRequestHandler, ThreadingMixIn , TCPServer
import websocket,coloredlogs
coloredlogs.install(1)

WS_URI = None

class TCPServer(ThreadingMixIn,TCPServer):
    def __init__(self, listen_address , listen_port):
        super().__init__((listen_address,int(listen_port)),TCPClient,True)
        print('** Ready to serve : tcp/%s:%s' % self.server_address)
        
class TCPClient(StreamRequestHandler):
    def handle(self) -> None:        
        global WS_URI
        self.ws = websocket.WebSocket()        
        self.ws.connect(WS_URI)
        self.connection.setblocking(False)
        self.logger = logging.getLogger('TCP %s:%s' % self.client_address)        
        # Maintain this connection whilst both sockets are alive
        buf = bytearray()
        while True:            
            s1,s2 = self.connection,self.ws.sock
            r,w,_ = select([s1,s2],[s1,s2],[])
            try:
                if (s1 in r):                
                    buf_ = s1.recv(4096)                    
                    self.logger.debug('TCP: %s' % buf_.hex(' '))
                    self.ws.send_binary(buf_)
                if (s2 in r):                
                    buf_ = self.ws.recv()
                    self.logger.debug('WS: %s' % buf_.hex(' '))
                    buf += buf_
                if (s1 in w and buf):                
                    buf = buf[s1.send(buf):]            
            except Exception as e:
                self.logger.fatal("Exception : %s" % e)
                self.ws.close()
                if self.conection : self.connection.close()        
                break
        self.logger.fatal("LOST CONNECTION")                
if __name__ == '__main__':
    argparse = ArgumentParser(description='WS2TCP proxy')
    argparse.add_argument('--uri',help='Websocket target URI',default='ws://localhost:7000/ggpo')
    argparse.add_argument('--port',help='TCP listening port',default=8000,type=int)

    args = argparse.parse_args()
    WS_URI = args.uri
    PORT = args.port

    srv = TCPServer('0.0.0.0',PORT)
    srv.serve_forever()    