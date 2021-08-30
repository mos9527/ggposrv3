import { AUTH } from "./actions.local"
import { SUCCESS } from "./errcode"
import Client from '../common/client.service'
const state = {
    username: undefined,
    password: undefined, 
    servername : 'GGPOSRV3',
    authenticated : false
}

const getters = {
    username(state) {
        return state.username;
    },
    channel(state) {
        return state.channel
    },
    authenticated(state) {
        return state.authenticated
    },
    servername(state){
        return state.servername
    }
}
const actions = {
    [AUTH](context, credentials) {
        return new Promise((resolve, reject) => {
            state.username = credentials.username
            state.password = credentials.password
            Client.login(state.username, state.password, (code) => {
                console.log('[AUTH]', code)
                if (code == SUCCESS) { state.authenticated = true; resolve(code) } else { state.authenticated = false ; reject(code) } 
            })
        })
    }
}

export default {
    state,
    actions,
    getters
};