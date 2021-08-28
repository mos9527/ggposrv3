import sys

HOST_OFFSET = 0x32152
HOST_LENGTH = 0x12

def prase_uri(uri):    
    '''formatting : mosclub://[spectate,match],[romname],[host]:[port]@quark-........-........'''
    assert uri[:10] == 'mosclub://','URI protocol not supported'
    action,quark = uri[10:].split('@')
    action,rom,server   = action.split(',')
    host,port = server.split(':')
    return action,rom,quark,host,port

def patch_ggponet_dll(f,host):
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
        args = ''
        if action == 'spectate':
            # sscanf(connect, "quark:stream,%[^,],%[^,],%d", game, quarkid, &remotePort);            
            args = 'quark:stream,%s,%s,%s' % (rom,quark,port)
        elif  action == 'match':
            # sscanf(connect, "quark:served,%[^,],%[^,],%d,%d,%d", game, quarkid, &port, &delay, &ranked);
            args = 'quark:served,%s,%s,%s,0,1' % (rom,quark,port)            
        print('> Running',args)                    
        assert args,'Invalid action'
    except AssertionError as e:
        print('! Bad URI : %s' % e)
