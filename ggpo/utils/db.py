'''placeholder for actual databases'''
from threading import Lock

database = dict()
db_lock = Lock()

def db_synchronized(function):
    def wrapper(*a,**k):
        db_lock.acquire()
        ret = function(*a,**k)
        db_lock.release()
        return ret
    return wrapper

@db_synchronized
def get(key):
    if key in database:return database[key]
    return None

@db_synchronized
def set(key,value):    
    database[key] = value