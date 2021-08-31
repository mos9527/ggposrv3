# -*- coding: utf-8 -*-
from __init__ import to_re
import re,mmap

fp = input('- 拖入 fcadefbneo.exe 文件，然后回车：')
with open(fp,'r+b') as f:
    mm = mmap.mmap(f.fileno(),0)
    m  = re.search(to_re('C7 05 30 6A 1C 01 ?? ?? ?? ??'),mm) # mov kNetLua , dword
    mm.seek(m.end() - 4)
    state = bool(int.from_bytes(mm.read(4),'big'))
    print('- Lua 启用：',state,'->',not state)
    mm.seek(m.end() - 4)    
    mm.write(int.to_bytes(int(not state),4,'big'))