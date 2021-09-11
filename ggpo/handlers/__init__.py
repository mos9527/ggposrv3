# -*- coding: utf-8 -*-
from enum import Enum

class GGPOSequence:
    QUARKURI           = 0xffffffff - 0x5 #'\xff\xff\xff\xfa'
    PEERFOUND          = 0xffffffff - 0x6 #'\xff\xff\xff\xf9'
    INGAME_PRIVMSG     = 0xffffffff - 0x7 #'\xff\xff\xff\xf8'
    SPEC_VIEWS         = 0xffffffff - 0x9 #'\xff\xff\xff\xf6'
    AUTOSPEC           = 0xffffffff - 0xa #'\xff\xff\xff\xf5'
    GAMEBUFFER         = 0xffffffff - 0xb #'\xff\xff\xff\xf4'
    SAVESTATE          = 0xffffffff - 0xc #'\xff\xff\xff\xf3'

class GGPOCommand(Enum):
    # client
    AUTH              = 0x1
    PRIVMSG           = 0x7
    STATUS            = 0x10
    NEWUSER           = 0x20
    # client channels
    CHAT_CHANNEL      = 0x6
    JOIN_CHANNEL      = 0x21
    PART_CHANNEL      = 0x22
    # client challenges
    SEND_CHALLENGE    = 0x8
    ACCEPT_CHALLENGE  = 0x9
    DECLINE_CHALLENGE = 0xa
    CANCEL_CHALLENGE  = 0x1c
    NOTIFY_CHALLENGE  = 0x1d
    WATCH_CHALLENGE   = 0x1e
    # players
    CONNECT           = 0x0
    PEER              = 0xb
    MATCHINFO         = 0xc
    INGAME_CHAT       = 0xf
    SAVESTATE         = 0x11
    GAMEBUFFER        = 0x12
    SPECTATE          = 0x14
    # speicals
    ERRORMSG          = 0xff

class GGPOClientStatus(Enum):
    AVAILABLE = 0
    AWAY = 1
    PLAYING = 2
    SPECTATING = 3

class GGPOClientSide(Enum):
    PLAYER1 = 1
    PLAYER2 = 2
    SPEC_PRESAVE = 0
    SPEC_POSTSAVE = 3

class GGPOClientType(Enum):
    PLAYER = 0
    SPECTATOR = 1

class GGPOClientErrorcodes(Enum):
    COMMAND_INVALID   = 0x00
    INTERNAL_ERROR    = 0x01
    PEER_NOT_FOUND    = 0x02
    PEER_BAD_STATUS   = 0x03
    CHANNEL_INVALID   = 0x04
    USER_INVALID      = 0x05
    SUCCESS           = 0xff
