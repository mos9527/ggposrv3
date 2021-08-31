# -*- coding: utf-8 -*-
INSTALL_DIR = 'moscade'
# where to install within user's Home
import os,sys,shutil
cd = os.getcwd()
if not os.path.isfile('LAUNCHER.py'):
    print('! 当前目录',cd)
    input('! 找不到 LAUNCHER.py')
    sys.exit(1)
install_path = os.path.join(os.path.expanduser('~'),INSTALL_DIR)
print('- 安装路径',install_path,sep='...')
print('- Python 解释器' ,sys.executable,sep='...')

def copy_launcher(extra=None):
    # write to target folder
    try:
        print('- 复制必要文件')
        os.makedirs(install_path,exist_ok=True)
        shutil.copy('LAUNCHER.py' ,install_path)
        if extra:
            for f in extra:shutil.copy(f,install_path)
        return True
    except Exception as e:
        print('! 复制失败：%s' % e)
        return False

def install_linux():
    '''Creating handler with xdg-mime : https://unix.stackexchange.com/questions/497146/create-a-custom-url-protocol-handler'''
    entry = r'''[Desktop Entry]
Type=Application
Name=moscade Quark Protocol
Exec={} {} %u
StartupNotify=false
MimeType=x-scheme-handler/moscade;'''.format(
    sys.executable,
    os.path.join(install_path,'LAUNCHER.py'))
    open('moscade-handler.desktop','w',encoding='utf-8').write(entry)
    handler = os.path.join(os.path.expanduser('~'),'.local/share/applications/')
    cmd = '/bin/cp -f moscade-handler.desktop %s' % handler
    assert os.system(cmd) == 0
    assert copy_launcher()
    assert os.system('xdg-mime default %s/moscade-handler.desktop x-scheme-handler/moscade' % handler) == 0
    return True

def install_windows():
    '''Creating handler with Registery in Windows'''
    registery = r'''Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\moscade]
@="URL:moscade Protocol"
"URL Protocol"=""

[HKEY_CLASSES_ROOT\moscade\shell]

[HKEY_CLASSES_ROOT\moscade\shell\open]

[HKEY_CLASSES_ROOT\moscade\shell\open\command]
@="\"{}\" \"{}\" \"%1\""'''.format(
        sys.executable.replace('\\','\\\\'),
        os.path.join(install_path,'LAUNCHER.py').replace('\\','\\\\'))
    open('REGISTER.reg','w',encoding='utf-8').write(registery)
    assert copy_launcher(extra=['REGISTER.reg'])
    # change to target folder
    os.chdir(install_path)
    print('- 正在注册，注意任务栏')
    code = os.system('REGISTER.reg')
    return code == 0

if __name__ == '__main__':
    try:
        if sys.platform == 'linux':
            assert install_linux()
            os.system('xdg-open moscade://install/')
        elif sys.platform == 'darwin':
            raise Exception("macOS not yet supported")
        else:
            assert install_windows()
            os.system('start moscade://install/')
    except Exception as e:
        input('! 注册失败:%s' % repr(e))
