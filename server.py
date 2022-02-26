# -*- coding: utf-8 -*-
from threading import Thread
import time
if not hasattr(time, 'time_ns'): # for Py3.6
    time.time_ns = lambda: int(time.time() * 1e9)

from argparse import ArgumentParser
import logging
from os import path
import socket

from pywebhost.handler import Request
from pywebhost.modules import JSONMessageWrapper, WriteContentToRequest
from pywebhost.modules.websocket import WebsocketSessionWrapper
from ggpo import GGPOServer
from ggpo.handlers.client import GGPOClientSession
from ggpo.handlers.player import GGPOPlayerSession
from ggpo.handlers.nexus import GGPOGenericSTUNServer
from ggpo.models.quark import ts_from_quark

try:    
    import coloredlogs
    coloredlogs.DEFAULT_LOG_FORMAT = '%(asctime)s [%(levelname).1s] %(name)s %(message)s'
    coloredlogs.install(level=0)
except:
    logging.getLogger().setLevel(0)
    print('WARNING: coloredlogs is not installed. Using default logger.')

def get_ip():
    # https://stackoverflow.com/questions/166506/finding-local-ip-addresses-using-pythons-stdlib
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:        
        s.connect(('10.255.255.255', 1))
        IP = s.getsockname()[0]
    except Exception:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP

if __name__ == '__main__':
    argparse = ArgumentParser(description='GGPO Python3 Server')
    argparse.add_argument('--port',help='HTTP/TCP/UDP port',default=7000,type=int)    
    args = argparse.parse_args()
    
    server = GGPOServer()
    server.bind_and_active(('0.0.0.0',args.port))
    def allow_cors(function):
        def method(initator, request: Request, content):
            request.send_header('Access-Control-Allow-Origin','*')
            return function(initator,request,content)
        return method

    @server.route('/.*')
    def static(initator, request: Request, content):
        return WriteContentToRequest(request,'./web/dist/'+request.path,mime_type='')

    @server.route('/')
    def index(initator, request: Request, content):
        return WriteContentToRequest(request,'./web/dist/'+'index.html',mime_type='text/html; charset=UTF-8')
    
    @server.route('/channels')
    @JSONMessageWrapper(read=False)
    @allow_cors
    def channels(initator, request: Request, content):
        request.send_response(200)
        return [channel.__dict__() for channel in server.channels.values()]

    @server.route('/channels/chathistory')
    @JSONMessageWrapper(read=False)
    @allow_cors
    def users(initator, request: Request, content):
        channel = request.query['channel'][-1]
        if not channel:return request.send_response(404)
        request.send_response(200)
        return server.channels[channel].chat_history

    @server.route('/channels/users')
    @JSONMessageWrapper(read=False)
    @allow_cors
    def users(initator, request: Request, content):
        channel = request.query['channel'][-1]
        if not channel:return request.send_response(404)
        request.send_response(200)
        clients = server.channels[channel].clients
        return [{
            'name': username, 'channel': client.channelobject.name,'status': client.status.name,
            'quark_ts': ts_from_quark(client.quark)} for username, client in clients.items()
        ]
    # Routing banners
    @server.route('/banners/.*')
    @allow_cors
    def banners_static(initator, request: Request, content):
        try:
            WriteContentToRequest(request,'./banners/'+ request.path.split('/banners/')[-1] + '.png',mime_type='image/png')
        except:
            WriteContentToRequest(request,'./banners/default.png',mime_type='image/png')

    @server.route('/portraits/.*')
    @allow_cors
    def portraits_static(initator, request: Request, content):
        try:
            WriteContentToRequest(request,'./portraits/'+ request.path.split('/portraits/')[-1] + '.png',mime_type='image/png')
        except:
            WriteContentToRequest(request,'.'+'/'.join(request.path.split('/')[:-1]) + '/default.png',mime_type='image/png')

    @server.route('/sounds/.*')
    @allow_cors
    def sound_static(initator, request: Request, content):                
        WriteContentToRequest(request,'./sounds/'+ request.path.split('/sounds/')[-1] + '.wav',mime_type='audio/wav')

    @server.route('/home.*')
    @allow_cors
    def home(initator, request: Request, content):
        if request.path == '/home' or request.path == '/home/':
            return WriteContentToRequest(request,'./home/index.html',mime_type='text/html; charset=UTF-8')
        else:
            WriteContentToRequest(request,'.' + request.path,partial_acknowledge=True)

    @server.route('/ws')
    @WebsocketSessionWrapper()
    def websocket(initator, request: Request, content):
        return GGPOClientSession

    @server.route('/ggpo')
    @WebsocketSessionWrapper()
    def websocket3(initator, request: Request, content):
        return GGPOPlayerSession

    logging.getLogger('PyWebHost').setLevel(logging.CRITICAL)
    logging.info('SERVING : http://127.0.0.1:%d' % args.port)
    logging.info('          http://%s:%d' % (get_ip(),args.port))
    logging.info('          udp://%s:%d' % (get_ip(),args.port))    
    udp_handler = GGPOGenericSTUNServer(server=server,port=args.port)
    udp_handler.start()
    tServer = Thread(target=server.serve_forever,name="GGPOTCP",daemon=True)
    tServer.start()
    # The main thread spawns an interactive terminal for more administrative operations
    from code import interact
    interact(banner='* Console is now ready (Press Ctrl+D to exit).',local=locals())