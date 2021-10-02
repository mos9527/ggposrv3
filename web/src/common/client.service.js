import { ENDPOINT } from "./config";
import { ERRORMSG , AUTH, JOIN_CHANNEL, PRIVMSG, CHAT_CHANNEL, SEND_CHALLENGE, DECLINE_CHALLENGE, CANCEL_CHALLENGE, ACCEPT_CHALLENGE, WATCH_CHALLENGE } from "../store/actions.remote"
import store from "../store"
import { CONNECT } from "../store/actions.local";
const Client = {
  init() {    
    this.ws = new WebSocket( ENDPOINT.replace('https://','wss://').replace('http://','ws://') + '/ws')
    this.ws.onmessage = this.onWsMessage
    this.ws.onopen  = this.onWsOpen
    this.ws.onclose = this.onWsClose
    this.onCodeUpdate = undefined
    console.log('[API] Service initialized')
  },
  reply(command,payload){
    var data = JSON.stringify({type:command,data:payload})
    return this.ws.send(data)
  },
  onWsClose(){
    store.dispatch(CONNECT,false)
  },
  onWsOpen() {
    store.dispatch(CONNECT,Client.ws ? Client.ws.readyState : false)
  },
  onWsMessage(e) {
    /* parses incoming command by COMMAND and PAYLOAD */
    var data = JSON.parse(e.data)
    var command = data.type
    var payload = data.data;
    if (command == ERRORMSG){
      if (Client.onCodeUpdate) Client.onCodeUpdate(payload) // cb for xhr-like communitcation
    } else {
      store.dispatch(command,payload)
    }      
  },
  /* exports */
  login(username,password,callback){
    Client.onCodeUpdate = callback
    Client.reply(AUTH,{'username':username,'password':password})        
  },  
  join_channel(channel,callback){
    Client.onCodeUpdate = callback
    Client.reply(JOIN_CHANNEL,channel)
  },
  send_chnmsg(message,callback){
    Client.onCodeUpdate = callback
    Client.reply(CHAT_CHANNEL,message)
  },
  send_privmsg(username_to,message,callback){
    Client.onCodeUpdate = callback
    Client.reply(PRIVMSG,{'username':username_to,'message':message})
  },
  send_challenge(username,callback){
    Client.onCodeUpdate = callback
    Client.reply(SEND_CHALLENGE,username)
  },
  delice_challenge(username,callback){
    Client.onCodeUpdate = callback
    Client.reply(DECLINE_CHALLENGE,username)
  },
  cancel_challenge(username,callback){
    Client.onCodeUpdate = callback
    Client.reply(CANCEL_CHALLENGE,username)
  },  
  accept_challenge(username,callback){
    Client.onCodeUpdate = callback
    Client.reply(ACCEPT_CHALLENGE,username)
  }, 
  watch_challenge(username,callback){
    Client.onCodeUpdate = callback
    Client.reply(WATCH_CHALLENGE,username)
  },       
  url_ref_port : ENDPOINT + '/port',
  url_list_channel : ENDPOINT + '/channels',
  url_list_users : ENDPOINT + '/channels/users?channel=',
  url_chat_history : ENDPOINT + '/channels/chathistory?channel=',
};

export default Client
