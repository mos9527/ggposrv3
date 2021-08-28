import { STATUS } from "./actions.remote"
const state = {
    emulator:false,
    status:undefined    
}

const getters = {
    emulator(state) {
        return state.emulator;
    },
    status(state) {
        return state.status;
    },
}
const actions = {
    [STATUS](context, payload) {
        console.log('[STATUS] Update:',payload)
        state.emulator = payload.emulator
        state.status = payload.status        
    }
}

export default {
    state,
    actions,
    getters
};