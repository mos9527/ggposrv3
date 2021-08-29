# -*- coding: utf-8 -*-
INSTALL_DIR = 'moscade'
import os,sys,shutil
cd = os.getcwd()
if not os.path.isfile('LAUNCHER.py'):    
    print('! 当前目录：',cd)
    input('! 找不到 LAUNCHER.py')
    sys.exit(1)
install_path = os.path.join(os.path.expanduser('~'),INSTALL_DIR)
print('- 安装目录',install_path,sep='...')
print('- 解释器' ,sys.executable,sep='...')
# create the .reg file
registery = r'''Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\moscade]
@="URL:moscade Protocol"
"URL Protocol"=""

[HKEY_CLASSES_ROOT\moscade\shell]

[HKEY_CLASSES_ROOT\moscade\shell\open]

[HKEY_CLASSES_ROOT\moscade\shell\open\command]
@="\"{}\" \"{}\" \"%1\""

'''.format(
    sys.executable.replace('\\','\\\\'),
    os.path.join(install_path,'LAUNCHER.py').replace('\\','\\\\'))

open('REGISTER.reg','w',encoding='utf-8').write(registery)
# write to target folder
try:
    os.makedirs(install_path,exist_ok=True)
    shutil.copy('REGISTER.reg',install_path)
    shutil.copy('LAUNCHER.py' ,install_path)
except PermissionError:
    print('! 文件复制失败：权限不足')
    sys.exit(1)
# change to target folder
os.chdir(install_path)
print('- 准备注册，检查任务栏')
code = os.system('REGISTER.reg')
if code!=0:
    print('! 注册失败')
    sys.exit(1)
else: # ready for tests
    os.system('start moscade://install')
    sys.exit(0)