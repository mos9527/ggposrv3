import Client from "../common/client.service";
import { CONNECT , REFRESH_PORT } from "./actions.local"

const state = {
    connected : undefined,
    ggpo_port : undefined,
    ggpo_host : window.location.hostname // XXX
}

const getters = {
    connected(state) {
        return state.connected;
    },
    ggpo_host(state) { 
        return state.ggpo_host;
    },
    ggpo_port(state) {
        return state.ggpo_port
    }
}
const actions = {
    [CONNECT](context,result) {
        if (result == 1){            
            console.log('[CONNECTION] Connection established')
            context.dispatch(REFRESH_PORT).then(d=>{
                console.log('[CONNECTION] Conection ready. Got port:',d.port)
                state.ggpo_port=d.port
                state.connected = true                    
            })
            
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