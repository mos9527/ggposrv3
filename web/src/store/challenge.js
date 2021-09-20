import Client from "../common/client.service"
import Utils from "../common/utils";
import { WATCH_CHALLENGE as L_WATCH_CHALLENGE,ACCEPT_CHALLENGE as ACCEPT_CHALLENGE_L,CANCEL_CHALLENGE as CANCEL_CHALLENGE_L,DECLINE_CHALLENGE as DECLINE_CHALLENGE_L,SEND_CHALLENGE as SEND_CHALLENGE_L,REFRESH_USERS } from "./actions.local";
import { WATCH_CHALLENGE , ACCEPT_CHALLENGE, CANCEL_CHALLENGE, DECLINE_CHALLENGE, NOTIFY_CHALLENGE, SEND_CHALLENGE , STATUS, SPECTATE } from "./actions.remote";
import { SUCCESS } from "./errcode";

const state = {
    challenging : undefined,
    challenger : undefined,
    quark:undefined,
    status:undefined
}

const getters = {
    challenging(state) {
        return state.challenging;
    },
    challenger(state) {
        return state.challenger;
    },
    quark(state) {
        return state.quark;
    },
}
const actions = {

    [SEND_CHALLENGE_L](context,username){
        console.log('[CHALLENGE] Sending to:',username)
        return new Promise((resolve, reject) => {    
            Client.send_challenge(username,(code)=>{                            
                if (code == SUCCESS) { resolve(code); state.challenging = username } else reject(code)
            })            
        })
    },
    [SEND_CHALLENGE](context,username){
        console.log('[CHALLENGE] Being Challenged! Challenger:',username)
        state.challenger = username
        Utils.emitSound(Utils.SOUNDS.ChallengeAlert)
    },

    [DECLINE_CHALLENGE](context,username){
        console.log('[CHALLENGE] Challenge deliced by:',username)        
        state.challenging = undefined
        Utils.emitSound(Utils.SOUNDS.ChallengeCancel)
    },    
    [DECLINE_CHALLENGE_L](context,username){
        console.log('[CHALLENGE] Declining challenge from:',username)
        return new Promise((resolve, reject) => {    
            Client.delice_challenge(username,(code)=>{                            
                if (code == SUCCESS) { 
                    resolve(code); 
                    state.challenger = undefined 
                    Utils.emitSound(Utils.SOUNDS.ChallengeCancel)
                } else reject(code)
            })            
        })
    },
    
    [CANCEL_CHALLENGE](context,username){
        console.log('[CHALLENGE] Challenge canceled by:',username)
        state.challenger = undefined
        Utils.emitSound(Utils.SOUNDS.ChallengeCancel)
    },    
    [CANCEL_CHALLENGE_L](context,username){
        console.log('[CHALLENGE] Canceling challenge to:',username)
        return new Promise((resolve, reject) => {    
            Client.cancel_challenge(username,(code)=>{                            
                if (code == SUCCESS) { 
                    resolve(code); 
                    state.challenging = undefined 
                    Utils.emitSound(Utils.SOUNDS.ChallengeCancel)
            } else reject(code)
            })            
        })
    },

    [ACCEPT_CHALLENGE_L](context,username){
        console.log('[CHALLENGE] Accepting challenge from:',username)
        return new Promise((resolve, reject) => {    
            Client.accept_challenge(username,(code)=>{                            
                if (code == SUCCESS) {
                     resolve(code) 
                     Utils.emitSound(Utils.SOUNDS.ChallengeAccept)
                } else reject(code)
            })            
        })
    },
    [ACCEPT_CHALLENGE](context,quark){
        console.log('[CHALLENGE] Quark distributed:',quark)
        state.quark = quark
        Utils.emitSound(Utils.SOUNDS.ChallengeAccept)
    },     
    
    [STATUS](context,payload){
        console.log('[STATUS] Update:',payload)
        state.status = payload
        Utils.emitSound(Utils.SOUNDS.GenericNotification)
    },

    [NOTIFY_CHALLENGE](context,username){
        console.log('[SPEC] Challenge available for spectating,from:',username)
        context.dispatch(REFRESH_USERS)
    },
    [WATCH_CHALLENGE](context,payload){
        console.log('[SPEC] Quark distributed:',payload)
        Utils.emitSound(Utils.SOUNDS.GenericNotification)
    },
    [L_WATCH_CHALLENGE](context,username){
        console.log('[SPEC] Sending request to watch match of:',username)
        return new Promise((resolve, reject) => {    
            Client.watch_challenge(username,(code)=>{                            
                if (code == SUCCESS) {
                     resolve(code) 
                     Utils.emitSound(Utils.SOUNDS.GenericNotification)
                } else reject(code)
            })            
        })        
    },
    [SPECTATE](context,payload){
        console.log('[SPEC] Current spectators',payload)
        Utils.emitSound(Utils.SOUNDS.GenericNotification)
    }
}

export default {
    state,
    actions,
    getters
};