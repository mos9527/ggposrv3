# -*- coding: utf-8 -*-
from ggpo.events import EventDict, EventThread, ServerEvents
import json
class GGPOChannel:
    """Object representing an GGPO channel."""
    def __init__(self,evt : EventThread,name,rom='',desc=''):
        self.name = name
        self.rom = rom
        self.desc = desc
        self.chat_history = list()
        self.clients = EventDict(evt,ServerEvents.CHANNEL_NEW,ServerEvents.CHANNEL_LEFT)

    def __dict__(self):
        return {
            'name':self.name,'rom':self.rom,'desc':self.desc,'online':len(self.clients)
        }
# Default channels
def get_default_channels(evt : EventThread):
    return ({
        'lobby' : GGPOChannel(evt,"lobby",desc="大厅"),        
    })

def get_channels_from_json(f_:str,evt : EventThread):
    '''Loads a set of channels from JSON'''
    channels = dict()
    with open(f_,encoding='utf-8') as f:
        channels = json.load(f)
    return {
        ch['name']:
        GGPOChannel(evt,ch['name'],ch['rom'],ch.get('desc') or '') for ch in channels
    }
