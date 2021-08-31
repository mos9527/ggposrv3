# -*- coding: utf-8 -*-
from threading import Lock

class ThreadsafeObject:
    '''Limited threadsafe using `with` statements'''
    def __init__(self,*a,**k):
        super().__init__(*a,**k)
        self.lock = Lock()
    def __enter__(self):
        self.lock.acquire()
        return self
    def __exit__(self,*a,**k):
        self.lock.release()

class ThreadsafeDict(ThreadsafeObject,dict):
    '''Threadsafe dictionary.aquire / release lock with `with`'''
    def __init__(self,*a,**k):
        super().__init__(*a,**k)

class ThreadsafeList(ThreadsafeObject,list):
    '''Threadsafe list.aquire / release lock with `with`'''
    def __init__(self,*a,**k):
        super().__init__(*a,**k)
