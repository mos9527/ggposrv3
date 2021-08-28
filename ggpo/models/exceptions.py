class GGPOError(Exception):
	"""Exception thrown by GGPO command handlers to notify client of a server/client error."""
	def __init__(self, code, value):
		self.code = code
		self.value = value

	def __str__(self):
		return repr(self.value)
