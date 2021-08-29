from logging import info, warn
from threading import Thread
from argparse import ArgumentParser
import time,socket,sys,multiprocessing
try:
    import coloredlogs
    coloredlogs.DEFAULT_LOG_FORMAT = '%(asctime)s [%(levelname).1s] %(name)s %(message)s'
    coloredlogs.install(level=0)
except:
    print('WARNING: coloredlogs is not installed!')
def get_ip():
    # https://stackoverflow.com/questions/166506/finding-local-ip-addresses-using-pythons-stdlib
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # doesn't even have to be reachable
        s.connect(('10.255.255.255', 1))
        IP = s.getsockname()[0]
    except Exception:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP

if __name__ == '__main__':  
    argparse = ArgumentParser(description='GGPO Python3 Server')
    argparse.add_argument('--ggpo-port',help='GGPO portocol port',default=7000)
    argparse.add_argument('--client-port',help='HTTP/Websocket interface port',default=8000)
    args = argparse.parse_args()
    
    ggpo_address = ('0.0.0.0',args.ggpo_port)
    client_address = ('0.0.0.0',args.client_port)

    from ggpo.handlers import player
    thread_player = Thread(target=player.run,daemon=True,args=(client_address,ggpo_address))
    from ggpo.handlers import client
    thread_client = Thread(target=client.run,daemon=True,args=(client_address,ggpo_address))
    thread_player.start()
    thread_client.start()
    time.sleep(.2) # wait for threads to start up
    info(f''' Server is READY!
How to access:
    - Local : http://127.0.0.1:{args.client_port}
    - LAN   : http://{get_ip()}:{args.client_port}
    ''')
    try:
        while thread_client.is_alive() and thread_player.is_alive():
            time.sleep(0.1) # otherwise MainThread takes up a lot of cycles for literally nothing :/
    except:
        info('Handling exit gracefully')
        info('Player server shutdown...')
        player.server.shutdown()
        info('...done...Client server shutdown...')
        if not client.server.shutdown():
            warn('Shutting down forcibly')        
        info('... All done , going home...')
        sys.exit(0)