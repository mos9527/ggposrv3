import { JOIN_CHANNEL , PART_CHANNEL } from "./actions.remote"
import { JOIN_CHANNEL as L_JOIN_CHANNEL, REFRESH_CHANNELS, REFRESH_USERS } from "./actions.local"
import { SUCCESS } from "./errcode"
import Client from '../common/client.service'
import Utils from "../common/utils";
import store from "."

const state = {
    channels:[],
    channel_current:'lobby',
    channel_users:[]
}

const getters = {
    channels(state) {
        return state.channels;
    },
    channel_current(state) {
        return state.channel_current
    },
    channel_users(state) {
        return state.channel_users
    }
}
const actions = {
    [L_JOIN_CHANNEL](context, channel_name) {
        return new Promise((resolve, reject) => {    
            Client.join_channel(channel_name,(code)=>{                            
                if (code == SUCCESS) {
                     resolve(code); 
                     state.channel_current = channel_name
                     Utils.emitSound(Utils.SOUNDS.GenericNotification)
                } else reject(code)
            })            
        })
    },    
    [JOIN_CHANNEL](context, payload) {             
        console.log('[CHANNEL] Client joined:',payload.username,payload.channel)
        state.channel_current = payload.channel // this means we're there too
        context.dispatch(REFRESH_CHANNELS); // refreshes everytime someone joins,including ourselves
        context.dispatch(REFRESH_USERS);
    },   
    [PART_CHANNEL](context, payload) {        
        console.log('[CHANNEL] Client left:',payload.username,payload.channel)
        if (payload.username != store.getters.username) context.dispatch(REFRESH_USERS); 
        context.dispatch(REFRESH_CHANNELS);
    },      
    [REFRESH_CHANNELS]() {
        console.log('[CHANNEL] Refreshing list.')
        return fetch(Client.url_list_channel)
            .then(r=>r.json())
            .then(d=>state.channels=d)
    },
    [REFRESH_USERS]() {
        console.log('[CHANNEL] Refreshing users of channel:',state.channel_current)
        return fetch(Client.url_list_users+state.channel_current)
            .then(r=>r.json())
            .then(d=>state.channel_users=d)
    }
}

export default {
    state,
    actions,
    getters
};