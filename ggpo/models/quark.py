from ggpo.models import ThreadsafeDict, ThreadsafeObject
import os,time,random
from pathlib import Path
from threading import Lock

class GGPOQuark(object):
	"""Object representing a GGPO quark: an ongoing match that can be spectated."""
	def __init__(self, quark):
		self.quark = quark
		self.p1 = None
		self.p2 = None
		self.spectators = dict()

class QuarkStorage(ThreadsafeDict):
	def __setitem__(self, k,v):
		'''set item by quark ts'''
		super().__setitem__(ts_from_quark(k),v)		
	def __getitem__(self, k) -> GGPOQuark:
		'''get item by quark ts'''
		return super().__getitem__(ts_from_quark(k))	
	def pop(self,k):
		super().pop(ts_from_quark(k))
	def hasquark(self,k):
		return ts_from_quark(k) in self

import hashlib,base64
def uuid_md5():
	'''produces astronomically unpredictable strings based on time and other factors'''
	seed=0
	while True:
		rand='%s%f%d'%(time.time_ns(),random.random(),seed)
		hash_ = hashlib.md5(rand.encode())
		yield base64.b64encode(hash_.digest()).decode()
		seed+=1
uuid = uuid_md5()

def generate_new_ts():
	return next(uuid)

def ts_from_quark(quark):
	'''Our quark format: [const string]-[quark ident]-[quark ts]
	ident,ts 
	'''
	if quark:return quark.split('-')[-1]

def quark_same_ts(lhs,rhs):
	return ts_from_quark(lhs) == ts_from_quark(rhs)	

def allocate_quark(ts):
	'''generates a unique quark with differnet identity but same ts'''
	return f'quark-{generate_new_ts()}-{ts}'

def _create_file(fn):
	os.makedirs(os.path.dirname(fn),exist_ok=True)
	return Path(fn).touch()
def _quark_fn(ts,gamebuffer=False,savestate=False):
	if gamebuffer:typeof = 'gamebuffer'
	if savestate:typeof = 'savestate'
	return f'quarks/quark-challenge-{ts}-{typeof}.fs'	

def allocate_quark_file(ts,gamebuffer=False,savestate=False):
	f = _quark_fn(ts,gamebuffer,savestate)	
	if not os.path.isfile(f):
		_create_file(f)
	return f
def get_quark_file(ts,gamebuffer=False,savestate=False):
	f = _quark_fn(ts,gamebuffer,savestate)	
	if not os.path.isfile(f):
		return None
	return f
