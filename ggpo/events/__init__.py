# -*- coding: utf-8 -*-
from threading import Thread
from queue import Queue
from enum import Enum
from time import sleep
from copy import copy

class ServerEvents(Enum):
    USER_NEW    = 0x01
    USER_LEFT   = 0x02
    CHANNEL_NEW = 0x03
    CHANNEL_LEFT= 0x04

class EventThread(Thread):
    '''Processes GGPO/Client events'''
    def __init__(self,event_class,run_on_init=True):
        self.event_queue = Queue()
        self.event_handlers = dict()
        self.event_class = event_class
        super().__init__(daemon=True)
        if run_on_init:
            self.start()

    def emit(self,event : Enum,payload):
        event = self.event_class(event)
        self.event_queue.put((event,payload))

    def handle(self,event : Enum,payload):
        if event in self.event_handlers:
            for handlers in self.event_handlers[event]:
                handlers(payload)

    def register(self,event : Enum,function):
        self.event_handlers.setdefault(event,list())
        return self.event_handlers[event].append(function)

    def clear(self,event : Enum):
        self.event_handlers.setdefault(event,list())
        self.event_handlers[event].clear()

    def run(self):
        while True:
            command,payload = self.event_queue.get()
            if not command and not payload:return # end-of-life,quitting
            self.handle(command,payload)

class RegisterEvent:
    def __init__(self,command,evt : EventThread):
        '''Registers an event temporarily. Once left,restores original event handlers'''
        self.evt = evt
        self.command = command
        self.hit = False
        self.payload = None

    def wait(self,timeout=2):
        '''Wait until event was hit. Returns False if overtime'''
        for i in range(0,timeout * 100,1):
            sleep(0.01)
            if self.hit:return True
        return False

    def __enter__(self):
        def wrapper(payload):
            self.hit = True
            self.payload = payload
        self.wrapper = self.evt.event_handlers[self.command].append(wrapper)
        return self

    def __exit__(self,*a,**k):
        self.evt.event_handlers[self.command].remove(self.wrapper)

class EventDict(dict):
    def __init__(self,evt : EventThread,on_set : Enum,on_del : Enum):
        self.evt = evt
        self.on_set = on_set
        self.on_del = on_del
        super().__init__()
    def __setitem__(self, k,v):
        super().__setitem__(k, v)
        if self.evt: self.evt.emit(self.on_set,v)
    def __delitem__(self, k):
        if self.evt:
            copy_ = copy(self[k])
            super().__delitem__(k)
            return self.evt.emit(self.on_del,copy_)
        super().__delitem__(k)
