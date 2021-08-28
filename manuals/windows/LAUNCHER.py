# -*- coding: utf-8 -*-
from genericpath import isfile
import sys,os

HOST_OFFSET = 0x32152
HOST_LENGTH = 0x12

def prase_uri(uri):    
    '''formatting : moscade://[spectate,match],[romname],[host]:[port]@quark-........-......../'''
    assert uri[:10] == 'moscade://','URI protocol not supported'
    action,quark = uri[10:].split('@')
    action,rom,server   = action.split(',')
    host,port = server.split(':')
    return action,rom,quark,host,port

def patch_ggponet_dll(host,f='fbneo/ggponet.dll'):
    payload = host.encode()[:HOST_LENGTH]
    payload = payload.ljust(HOST_LENGTH,b'\x00')
    with open(f,'r+b') as f:        
        f.seek(HOST_OFFSET)
        orignal_host = f.read(HOST_LENGTH)
        print('- Host :',orignal_host.hex())
        if orignal_host != payload:
            f.seek(HOST_OFFSET)
            f.write(payload)    
            print('- Host*:',payload.hex())
    return True

if __name__ == '__main__':
    uri = sys.argv[-1]    
    try:        
        action,rom,quark,host,port = prase_uri(uri)           
        assert action and rom and quark and host and port # cant miss!        
        params = ''
        if action == 'spectate':
            # sscanf(connect, "quark:stream,%[^,],%[^,],%d", game, quarkid, &remotePort);            
            params = 'quark:stream,%s,%s,%s' % (rom,quark,port)
        elif  action == 'match':
            # sscanf(connect, "quark:served,%[^,],%[^,],%d,%d,%d", game, quarkid, &port, &delay, &ranked);
            params = 'quark:served,%s,%s,%s,0,1' % (rom,quark,port) 
        assert params,'Invalid action'
        # enter script root        
        os.chdir(os.path.dirname(__file__))
        # locate the emulator
        if not os.path.isfile('./fbneo/fcadefbneo.exe'):
            print('! PATH',os.getcwd(),sep='...')
            input('! EMULATOR NOT FOUND, PLEASE REFER TO MANUAL')
        else:                        
            # patch the dll, do nothing when file is occupied i.e. client running
            try: patch_ggponet_dll(host=host)
            except: pass
            cmd = r'start fbneo/fcadefbneo.exe ' + params
            os.system(cmd)
            input(cmd)
            sys.exit(0)
    except Exception as e:
        if uri != 'moscade://test/':
            input('- Invalid URI : %s' % e)
        else:
            print('- moscade:// Handler installed!')
            input('- You may now close this window.')
