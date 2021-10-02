import Client from "../common/client.service";
import { CONNECT , REFRESH_PORT } from "./actions.local"

const state = {
    connected : undefined,
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
            console.log('[CONNECTION] DISCONNECTED')
            state.connected = false
        }
    },
    [REFRESH_PORT](){
        return fetch(Client.url_ref_port).then(r=>r.json())
    }
}

export default {
    state,
    actions,
    getters
};