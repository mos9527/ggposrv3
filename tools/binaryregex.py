# -*- coding: utf-8 -*-
def to_re(pattern):    
    regex   = bytearray()
    nOmit = 0
    for hex_str in pattern.split():
        if hex_str != '??':
            if nOmit:
                regex.extend(b'.{%d}'%nOmit)
                nOmit = 0
            regex.append(int(hex_str,base=16))           
        else:            
            nOmit += 1        
    if nOmit:
        regex.extend(b'.{%d}'%nOmit)                            
    return bytes(regex)