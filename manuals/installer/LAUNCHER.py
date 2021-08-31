# -*- coding: utf-8 -*-
'''URI handler for the custom moscade:// protocol
Currently tested on Windows and Manjaro Linux. Feel
free to provide more testing data on other distros 
and OSes!
'''
import sys,os
from time import sleep

HOST_OFFSET = 0x32152
HOST_LENGTH = 0x12

EMULATOR_PATH = 'FBNEO'

def prase_uri(uri):    
    '''formatting : moscade://[spectate,match],[romname],[host]:[port]@quark-........-......../'''
    assert uri[:10] == 'moscade://','URI protocol not supported'
    action,quark = uri[10:].split('@')
    action,rom,server   = action.split(',')
    host,port = server.split(':')
    quark = quark.replace('/','')
    return action,rom,quark,host,port

def patch_ggponet_dll(host,f=f'{EMULATOR_PATH}/ggponet.dll'):
    payload = host.encode()[:HOST_LENGTH]
    payload = payload.ljust(HOST_LENGTH,b'\x00')
    try:        
        with open(f,'r+b') as f:        
            f.seek(HOST_OFFSET)
            orignal_host = f.read(HOST_LENGTH)
            print('- Host :',orignal_host)
            if orignal_host != payload:
                f.seek(HOST_OFFSET)
                f.write(payload)    
                print('- Host*:',payload)
    except:
        return False
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
        if not os.path.isfile(f'{EMULATOR_PATH}/fcadefbneo.exe'):
            print('! PATH',os.getcwd(),sep='...')            
            input('! EMULATOR NOT FOUND, PLEASE REFER TO MANUAL')
        else:                        
            # patch the dll, do nothing when file is occupied i.e. client running
            if not patch_ggponet_dll(host=host):
                print('! UNABLE TO PATCH ggponet.dll')
                input('! Be sure that it\'s FcadeFBNeo that you\'re using and it contains this file.')
                sys.exit(1)
            # launching fbneo per os            
            if sys.platform == 'linux':
                # on linux
                launcher = 'wine'                               
            elif sys.platform == 'darwin':
                # on macos
                raise Exception("macOS not yet supported")
            else:
                # on windows / cygwin  
                launcher = 'start'       
            assert print(os.system('%s' % launcher)) != 127,"Runtime (wine) not installed!"
            cmd = f'{launcher} {EMULATOR_PATH}/fcadefbneo.exe "{params}"'
            os.system(cmd)            
            sys.exit(0)
    except Exception as e:
        if uri == 'moscade://install/':            
            print('- 注册 OK!')
            print('moscade:// Handler installed successfully.')            
        elif uri == 'moscade://browse/':
            if sys.platform == 'linux':
                os.system('xdg-open "%s"' % os.path.dirname(__file__))
            elif sys.platform == 'darwin':
                raise Exception("macOS not yet supported")
            else:
                os.system('explorer "%s"' % os.path.dirname(__file__))
                sys.exit(0)
        else:            
            print('- Invalid URI : %s' % repr(e))
            print('- Be sure a backslash (/) is at the end of your URI')
        sleep(2) or sys.exit(1)