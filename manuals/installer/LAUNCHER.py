# -*- coding: utf-8 -*-
# wait am I supposed to i18n THIS thing?
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
            print('! 当前路径',os.getcwd(),sep='...')
            input('! 找不到模拟器！请注意路径大小写及文件结构。')
        else:
            # patch the dll, do nothing when file is occupied i.e. client running
            if not patch_ggponet_dll(host=host):
                print('! 无法编辑 ggponet.dll')
                print('! 可能有正在运行的 FBNeo 占用之，或是文件丢失')
                print('! 联机有概率出现问题')
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
            if launcher != 'start': # check for wine if not running on windows
                assert print(os.system('%s' % launcher)) != 127,"未安装 Wine"
            cmd = f'{launcher} {EMULATOR_PATH}/fcadefbneo.exe "{params}"'
            os.system(cmd)
            print('- 启动成功，5s 后自动关闭该窗口')
            sleep(5) or sys.exit(0)
    except Exception as e:
        if uri == 'moscade://install/':
            print('- moscade:// 注册 OK!')
        elif uri == 'moscade://browse/':
            if sys.platform == 'linux':
                os.system('xdg-open "%s"' % os.path.dirname(__file__))
            elif sys.platform == 'darwin':
                raise Exception("macOS not yet supported")
            else:
                os.system('explorer "%s"' % os.path.dirname(__file__))
                sys.exit(0)
        else:
            print('- 无效的 URI : %s' % repr(e))
        sleep(2) or sys.exit(1)
