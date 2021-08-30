import Vue from 'vue'
import store from "../store"
const Utils = {
    getDateString(ts) {
        // i18n anyone?
        return `${new Date(ts).toLocaleDateString("zh-CN")} ${new Date(ts).toLocaleTimeString("zh-CN")}`;
    },
    setPageTitle(title){
        if (store.getters)
            document.title = Vue.i18n.translate('title-root',[store.getters.servername,title])                    
    }
}

export default Utils