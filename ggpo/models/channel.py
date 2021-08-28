from ggpo.events import EventDict, EventThread, ServerEvents


class GGPOChannel:
    """Object representing an GGPO channel."""
    def __init__(self,evt : EventThread,name,rom='',desc='',chunksize=1096):        
        self.name = name
        self.rom = rom
        self.chunksize = chunksize        
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
        'jjbahftf': GGPOChannel(evt,"jojoban", "jojobanr1",desc="ジョジョの奇妙な冒険 未来への遺産 - JOJO的奇妙冒险 未来遗产", chunksize=496),    
    })