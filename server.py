from threading import Thread
from argparse import ArgumentParser
import coloredlogs,time
coloredlogs.DEFAULT_LOG_FORMAT = '%(asctime)s [%(levelname).1s] %(name)s %(message)s'
coloredlogs.install(level=0)

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
    print(f'''WebUI : http://127.0.0.1:{args.client_port}''')
    while thread_client.is_alive() and thread_player.is_alive():
        time.sleep(0.1) # otherwise MainThread takes up a lot of cycles for literally nothing :/