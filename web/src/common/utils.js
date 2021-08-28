const Utils = {
    getDateString(ts) {
        // i18n anyone?
        return `${new Date(ts).toLocaleDateString("zh-CN")} ${new Date(ts).toLocaleTimeString("zh-CN")}`;
    }
}

export default Utils