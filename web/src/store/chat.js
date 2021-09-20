import Client from "../common/client.service"
import Utils from "../common/utils";
import { CHAT_CHANNEL, INGAME_CHAT, PRIVMSG } from "./actions.remote";
import { CHAT_CHANNEL as CHAT_CHANNEL_L ,PRIVMSG as PRIVMSG_L, REFRESH_HISTROY} from "./actions.local";
import { SUCCESS } from "./errcode";
const state = {
    
}

const getters = {
    
}

const actions = {
    [CHAT_CHANNEL](context,payload){
        console.log('[CHAT] Channel message received from:',payload.username,payload.message)
        Utils.emitSound(Utils.SOUNDS.GenericNotification)
    },
    [CHAT_CHANNEL_L](context,message){
        return new Promise((resolve, reject) => {    
            Client.send_chnmsg(message,(code)=>{                            
                if (code == SUCCESS) resolve(code); else reject(code)
            })            
        })
    },
    [PRIVMSG](context,payload){
        console.log('[CHAT] PM recevied from:',payload.sender,payload.message)
        Utils.emitSound(Utils.SOUNDS.GenericNotificationAlt)

    },
    [PRIVMSG_L](context,payload){
        return new Promise((resolve, reject) => {                
            Client.send_privmsg(payload.username,payload.message,(code)=>{                            
                if (code == SUCCESS) resolve(code); else reject(code)
            })            
        })
    },
    
    [INGAME_CHAT](context,payload){
        console.log('[CHAT] Ingame chat recevied from:',payload.username,payload.message)
        Utils.emitSound(Utils.SOUNDS.GenericNotificationAlt)
    },
    [REFRESH_HISTROY](context,channel){
        return fetch(Client.url_chat_history + channel).then(r=>r.json())
    }
}

export default {
    state,
    actions,
    getters
};