import { CONNECT } from "./actions.local"

const state = {
    connected : false
}

const getters = {
    connected(state) {
        return state.connected;
    },
}
const actions = {
    [CONNECT](context,result) {
        if (result == 1){            
            console.log('[CONNECTION] Connection established')
            state.connected = true    
        } else {
            console.log('[CONNECTION] Connection failed!')
            state.connected = false
        }
    }
}

export default {
    state,
    actions,
    getters
};