import Vue from 'vue'
import store from "../store"
const Utils = {
    SOUNDS:{
        'ChallengeAlert':'sounds/alert',
        'ChallengeCancel':'sounds/cancel',
        'ChallengeAccept':'sounds/accept',
        'GenericNotification':'sounds/notify',
        'GenericNotificationAlt':'sounds/notify2',
        'Welcome':'sounds/welcome',        
    },
    getDateString(ts) {
        // i18n anyone?
        return `${new Date(ts).toLocaleDateString("zh-CN")} ${new Date(ts).toLocaleTimeString("zh-CN")}`;
    },
    setPageTitle(title){
        if (store.getters)
            document.title = Vue.i18n.translate('title-root',[store.getters.servername,title])                    
    },
    emitSound(src){
        var player = document.getElementById('player')
        player.src = src
        player.play()
    }
}

export default Utils