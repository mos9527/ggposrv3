(function(e){function n(n){for(var a,c,r=n[0],i=n[1],u=n[2],s=0,h=[];s<r.length;s++)c=r[s],Object.prototype.hasOwnProperty.call(o,c)&&o[c]&&h.push(o[c][0]),o[c]=0;for(a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a]);d&&d(n);while(h.length)h.shift()();return l.push.apply(l,u||[]),t()}function t(){for(var e,n=0;n<l.length;n++){for(var t=l[n],a=!0,c=1;c<t.length;c++){var r=t[c];0!==o[r]&&(a=!1)}a&&(l.splice(n--,1),e=i(i.s=t[0]))}return e}var a={},c={app:0},o={app:0},l=[];function r(e){return i.p+"js/"+({about:"about"}[e]||e)+"."+{"chunk-5e7ef160":"5ade4e5b",about:"cd12fed2","chunk-a18b9b2c":"efc6edab","chunk-624bb791":"c257d1ec","chunk-cdfff800":"a0489adb","chunk-d17515a0":"c23c1212"}[e]+".js"}function i(n){if(a[n])return a[n].exports;var t=a[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t={"chunk-5e7ef160":1,"chunk-a18b9b2c":1,"chunk-624bb791":1,"chunk-cdfff800":1,"chunk-d17515a0":1};c[e]?n.push(c[e]):0!==c[e]&&t[e]&&n.push(c[e]=new Promise((function(n,t){for(var a="css/"+({about:"about"}[e]||e)+"."+{"chunk-5e7ef160":"6de87173",about:"31d6cfe0","chunk-a18b9b2c":"9b425298","chunk-624bb791":"9aa1be17","chunk-cdfff800":"3f248658","chunk-d17515a0":"23c26c10"}[e]+".css",o=i.p+a,l=document.getElementsByTagName("link"),r=0;r<l.length;r++){var u=l[r],s=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(s===a||s===o))return n()}var h=document.getElementsByTagName("style");for(r=0;r<h.length;r++){u=h[r],s=u.getAttribute("data-href");if(s===a||s===o)return n()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=n,d.onerror=function(n){var a=n&&n.target&&n.target.src||o,l=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");l.code="CSS_CHUNK_LOAD_FAILED",l.request=a,delete c[e],d.parentNode.removeChild(d),t(l)},d.href=o;var f=document.getElementsByTagName("head")[0];f.appendChild(d)})).then((function(){c[e]=0})));var a=o[e];if(0!==a)if(a)n.push(a[2]);else{var l=new Promise((function(n,t){a=o[e]=[n,t]}));n.push(a[2]=l);var u,s=document.createElement("script");s.charset="utf-8",s.timeout=120,i.nc&&s.setAttribute("nonce",i.nc),s.src=r(e);var h=new Error;u=function(n){s.onerror=s.onload=null,clearTimeout(d);var t=o[e];if(0!==t){if(t){var a=n&&("load"===n.type?"missing":n.type),c=n&&n.target&&n.target.src;h.message="Loading chunk "+e+" failed.\n("+a+": "+c+")",h.name="ChunkLoadError",h.type=a,h.request=c,t[1](h)}o[e]=void 0}};var d=setTimeout((function(){u({type:"timeout",target:s})}),12e4);s.onerror=s.onload=u,document.head.appendChild(s)}return Promise.all(n)},i.m=e,i.c=a,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)i.d(t,a,function(n){return e[n]}.bind(null,a));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/ggpo/",i.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],s=u.push.bind(u);u.push=n,u=u.slice();for(var h=0;h<u.length;h++)n(u[h]);var d=s;l.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"3e1e":function(e){e.exports=JSON.parse('{"challenge-became-not-available":"挑战已失效","challenge-waiting-for-player":"等待玩家加入","challenge-join-match":"加入比赛","challenge-cancel":"取消挑战","chat-channel-message":"公屏","chat-private-message":"私信","chat-private-message-send-failed":"发送失败","common-back":"返回","common-back-to":"返回到 {0}","challenge-spectate-match":"观战 {0} 的比赛","t-chat-private-message-send-failed-code":"{0}：{1}","challenge-textfield-message":"{0} 私信 [Enter]","challenge-spectate-match-failed":"观战失败：{0}","challenge-canceled-by-remote":"挑战已被取消","challenge-cancel-failed":"挑战取消失败:{0}","challenge-challenging-opponent":"挑战 {0}","challenge-challenging-opponent-failed":"邀请失败：{0}","challenge-challenge-sent":"已发送挑战邀请","challenge-challenge-accept-from":"接受 {0} 的挑战","challenge-failed-to-accept-from":"接受失败：{0}","challenge-hello-message":"{0} 已加入","challenge-quark-for-spectating":"观战 QUARK: {0}","challenge-new-chat":"[{0}] {1} : {2}","challenge-chat-new-message":"[{0}] {1} : {2}","chat-ingame-message":"游戏内","challenge-chat-pm":"[私信] {0} : {1}","challenge-cancel-reason-client-quit":"原因：观战客户端已退出，请重新进入观战","challenge-cancel-reason-unknown":"原因：{0}","challenge-quark-for-match":"比赛 QUARK:{0}","common-accept":"接受","common-decline":"拒绝","common-send":"发送","common-spectate":"观战","chat-message-send-failed":"发送失败：{0}","channels-online-player-count":"在线：{0}","login-username":"用户名","login-password":"密码","login-action":"登陆","login-failed":"登陆失败：{0}","common-conncecting":"连接中","common-connection-unavailable":"已断开","title-root":"{0} - {1}","title-home":"主页","title-login":"登陆","title-channels":"频道列表","title-channel":"{0}","title-challenge":"{0} vs {1}","prompt-login":"登陆 {0}","prompt-challenge":"究極鬥技 · 改","prompt-incoming-challenge":"速速来战！","prompt-incoming-challenge-canceled":"挑战已取消"}')},4360:function(e,n,t){"use strict";var a,c,o,l,r=t("2b0e"),i=t("2f62"),u=t("ade3"),s=(t("d3b7"),t("57f5")),h="SUCCESS",d=t("90b9"),f=t("e8d7"),g={username:void 0,password:void 0,servername:"GGPOSRV3",authenticated:!1},m={username:function(e){return e.username},channel:function(e){return e.channel},authenticated:function(e){return e.authenticated},servername:function(e){return e.servername}},p=Object(u["a"])({},s["b"],(function(e,n){return new Promise((function(e,t){g.username=n.username,g.password=n.password,f["a"].login(g.username,g.password,(function(n){console.log("[AUTH]",n),n==h?(g.authenticated=!0,e(n),d["a"].emitSound(d["a"].SOUNDS.Welcome)):(g.authenticated=!1,t(n))}))}))})),E={state:g,actions:p,getters:m},b=t("44ae"),C={channels:[],channel_current:"lobby",channel_users:[]},v={channels:function(e){return e.channels},channel_current:function(e){return e.channel_current},channel_users:function(e){return e.channel_users}},N=(a={},Object(u["a"])(a,s["g"],(function(e,n){return new Promise((function(e,t){f["a"].join_channel(n,(function(a){a==h?(e(a),C.channel_current=n,d["a"].emitSound(d["a"].SOUNDS.GenericNotification)):t(a)}))}))})),Object(u["a"])(a,b["h"],(function(e,n){console.log("[CHANNEL] Client joined:",n.username,n.channel),C.channel_current=n.channel,e.dispatch(s["i"]),e.dispatch(s["l"])})),Object(u["a"])(a,b["j"],(function(e,n){console.log("[CHANNEL] Client left:",n.username,n.channel),n.username!=U.getters.username&&e.dispatch(s["l"]),e.dispatch(s["i"])})),Object(u["a"])(a,s["i"],(function(){return console.log("[CHANNEL] Refreshing list."),fetch(f["a"].url_list_channel).then((function(e){return e.json()})).then((function(e){return C.channels=e}))})),Object(u["a"])(a,s["l"],(function(){return console.log("[CHANNEL] Refreshing users of channel:",C.channel_current),fetch(f["a"].url_list_users+C.channel_current).then((function(e){return e.json()})).then((function(e){return C.channel_users=e}))})),a),_={state:C,actions:N,getters:v},S={connected:void 0},O={connected:function(e){return e.connected}},L=(c={},Object(u["a"])(c,s["e"],(function(e,n){1==n?(console.log("[CONNECTION] Connection established"),S.connected=!0):(console.log("[CONNECTION] DISCONNECTED"),S.connected=!1)})),Object(u["a"])(c,s["k"],(function(){return fetch(f["a"].url_ref_port).then((function(e){return e.json()}))})),c),A={state:S,actions:L,getters:O},y={},w={},j=(o={},Object(u["a"])(o,b["d"],(function(e,n){console.log("[CHAT] Channel message received from:",n.username,n.message),d["a"].emitSound(d["a"].SOUNDS.GenericNotification)})),Object(u["a"])(o,s["d"],(function(e,n){return new Promise((function(e,t){f["a"].send_chnmsg(n,(function(n){n==h?e(n):t(n)}))}))})),Object(u["a"])(o,b["k"],(function(e,n){console.log("[CHAT] PM recevied from:",n.sender,n.message),d["a"].emitSound(d["a"].SOUNDS.GenericNotificationAlt)})),Object(u["a"])(o,s["h"],(function(e,n){return new Promise((function(e,t){f["a"].send_privmsg(n.username,n.message,(function(n){n==h?e(n):t(n)}))}))})),Object(u["a"])(o,b["g"],(function(e,n){console.log("[CHAT] Ingame chat recevied from:",n.username,n.message),d["a"].emitSound(d["a"].SOUNDS.GenericNotificationAlt)})),Object(u["a"])(o,s["j"],(function(e,n){return fetch(f["a"].url_chat_history+n).then((function(e){return e.json()}))})),o),T={state:y,actions:j,getters:w},P={challenging:void 0,challenger:void 0,quark:void 0,status:void 0},k={challenging:function(e){return e.challenging},challenger:function(e){return e.challenger},quark:function(e){return e.quark}},H=(l={},Object(u["a"])(l,s["m"],(function(e,n){return console.log("[CHALLENGE] Sending to:",n),new Promise((function(e,t){f["a"].send_challenge(n,(function(a){a==h?(e(a),P.challenging=n):t(a)}))}))})),Object(u["a"])(l,b["l"],(function(e,n){console.log("[CHALLENGE] Being Challenged! Challenger:",n),P.challenger=n,d["a"].emitSound(d["a"].SOUNDS.ChallengeAlert)})),Object(u["a"])(l,b["e"],(function(e,n){console.log("[CHALLENGE] Challenge deliced by:",n),P.challenging=void 0,d["a"].emitSound(d["a"].SOUNDS.ChallengeCancel)})),Object(u["a"])(l,s["f"],(function(e,n){return console.log("[CHALLENGE] Declining challenge from:",n),new Promise((function(e,t){f["a"].delice_challenge(n,(function(n){n==h?(e(n),P.challenger=void 0,d["a"].emitSound(d["a"].SOUNDS.ChallengeCancel)):t(n)}))}))})),Object(u["a"])(l,b["c"],(function(e,n){console.log("[CHALLENGE] Challenge canceled by:",n),P.challenger=void 0,d["a"].emitSound(d["a"].SOUNDS.ChallengeCancel)})),Object(u["a"])(l,s["c"],(function(e,n){return console.log("[CHALLENGE] Canceling challenge to:",n),new Promise((function(e,t){f["a"].cancel_challenge(n,(function(n){n==h?(e(n),P.challenging=void 0,d["a"].emitSound(d["a"].SOUNDS.ChallengeCancel)):t(n)}))}))})),Object(u["a"])(l,s["a"],(function(e,n){return console.log("[CHALLENGE] Accepting challenge from:",n),new Promise((function(e,t){f["a"].accept_challenge(n,(function(n){n==h?(e(n),d["a"].emitSound(d["a"].SOUNDS.ChallengeAccept)):t(n)}))}))})),Object(u["a"])(l,b["a"],(function(e,n){console.log("[CHALLENGE] Quark distributed:",n),P.quark=n,d["a"].emitSound(d["a"].SOUNDS.ChallengeAccept)})),Object(u["a"])(l,b["n"],(function(e,n){console.log("[STATUS] Update:",n),P.status=n,d["a"].emitSound(d["a"].SOUNDS.GenericNotification)})),Object(u["a"])(l,b["i"],(function(e,n){console.log("[SPEC] Challenge available for spectating,from:",n),e.dispatch(s["l"])})),Object(u["a"])(l,b["o"],(function(e,n){console.log("[SPEC] Quark distributed:",n),d["a"].emitSound(d["a"].SOUNDS.GenericNotification)})),Object(u["a"])(l,s["n"],(function(e,n){return console.log("[SPEC] Sending request to watch match of:",n),new Promise((function(e,t){f["a"].watch_challenge(n,(function(n){n==h?(e(n),d["a"].emitSound(d["a"].SOUNDS.GenericNotification)):t(n)}))}))})),Object(u["a"])(l,b["m"],(function(e,n){console.log("[SPEC] Current spectators",n),d["a"].emitSound(d["a"].SOUNDS.GenericNotification)})),l),D={state:P,actions:H,getters:k};r["a"].use(i["b"]);var U=n["a"]=new i["b"].Store({modules:{connection:A,auth:E,channels:_,chat:T,challenge:D}})},"44ae":function(e,n,t){"use strict";t.d(n,"b",(function(){return a})),t.d(n,"k",(function(){return c})),t.d(n,"n",(function(){return o})),t.d(n,"d",(function(){return l})),t.d(n,"h",(function(){return r})),t.d(n,"j",(function(){return i})),t.d(n,"l",(function(){return u})),t.d(n,"a",(function(){return s})),t.d(n,"e",(function(){return h})),t.d(n,"c",(function(){return d})),t.d(n,"i",(function(){return f})),t.d(n,"o",(function(){return g})),t.d(n,"g",(function(){return m})),t.d(n,"m",(function(){return p})),t.d(n,"f",(function(){return E}));var a="AUTH",c="PRIVMSG",o="STATUS",l="CHAT_CHANNEL",r="JOIN_CHANNEL",i="PART_CHANNEL",u="SEND_CHALLENGE",s="ACCEPT_CHALLENGE",h="DECLINE_CHALLENGE",d="CANCEL_CHALLENGE",f="NOTIFY_CHALLENGE",g="WATCH_CHALLENGE",m="INGAME_CHAT",p="SPECTATE",E="ERRORMSG"},"56d7":function(e,n,t){"use strict";t.r(n);var a=t("3835"),c=(t("e260"),t("e6cf"),t("cca6"),t("a79d"),t("4fad"),t("2b0e")),o=t("f2f3"),l=t("2f62"),r=t("123d"),i=t.n(r),u=t("3e1e"),s=t("fdfc"),h={"zh-CN":u,"en-US":s},d=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("v-app",[t("v-main",[t("v-container",{staticClass:"pa-0",attrs:{fluid:""}},[t("router-view")],1),t("v-footer",{attrs:{app:""}},[t("v-container",{staticStyle:{display:"flex"}},[e.DEVELOPMENT||!e.authenticated?t("v-btn",{staticStyle:{flex:"1"},attrs:{to:"/login"}},[t("v-icon",[e._v("mdi-account")]),e._v(" "+e._s(e.$t("title-login"))+" ")],1):e._e(),e.DEVELOPMENT||e.authenticated?t("v-btn",{staticStyle:{flex:"1"},attrs:{to:"/"}},[t("v-icon",[e._v("mdi-home")]),e._v(" "+e._s(e.$t("title-home"))+" ")],1):e._e(),e.DEVELOPMENT||e.authenticated?t("v-btn",{staticStyle:{flex:"1"},attrs:{to:"/channels"}},[t("v-icon",[e._v("mdi-controller-classic")]),e._v(" "+e._s(e.$t("title-channels"))+" ")],1):e._e()],1)],1)],1),e.connected||e.DEVELOPMENT?e._e():t("div",{staticClass:"overlay",class:0==e.connected?"overlay-fatal":""},[e._v(" "+e._s(void 0==e.connected?e.$t("common-conncecting"):e.$t("common-connection-unavailable"))+" ")]),t("audio",{attrs:{id:"player",autoplay:"",hidden:""}})],1)},f=[],g=t("5530"),m=t("a49b"),p={data:function(){return{DEVELOPMENT:m["a"]}},computed:Object(g["a"])({},Object(l["c"])(["authenticated","connected"]))},E=p,b=t("2877"),C=t("6544"),v=t.n(C),N=t("7496"),_=t("8336"),S=t("a523"),O=t("553a"),L=t("132d"),A=t("f6c4"),y=Object(b["a"])(E,d,f,!1,null,null,null),w=y.exports;v()(y,{VApp:N["a"],VBtn:_["a"],VContainer:S["a"],VFooter:O["a"],VIcon:L["a"],VMain:A["a"]});t("d3b7"),t("3ca3"),t("ddb0"),t("b0c0");var j=t("8c4f"),T=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[e.DEVELOPMENT?e._e():t("iframe",{staticStyle:{border:"none",width:"100%",height:"calc(100vh - 56px)"},attrs:{src:"/home",onload:"\n    if(this.contentDocument.title.indexOf('404') >= 0)\n      this.src='/static/html/home.html'      \n  "}}),e.DEVELOPMENT?t("h1",{staticClass:"centered"},[t("h1",[e._v("DEVELOPMENT MODE")]),e._m(0),1!=e.connected?t("span",[e._v(" Expecting GGPOSRV3 on: "),t("code",[e._v(e._s(e.ENDPOINT))]),e._v("... "+e._s(e.connected)+" "),0==e.connected?t("span",{staticStyle:{color:"red"}},[e._v("FAILED.Refresh the page to retry connection")]):e._e()]):e._e()]):e._e()])},P=[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("h3",{staticStyle:{opacity:"0.5"}},[t("table",[t("tr",[e._v("- Fault overlay is disabled")]),t("tr",[e._v("- Route & login checks are inactive")]),t("tr",[e._v("- Dynamic banners are disabled")])])])}],k=t("90b9"),H={data:function(){return{DEVELOPMENT:m["a"],ENDPOINT:m["b"]}},computed:Object(g["a"])({},Object(l["c"])(["connected"])),mounted:function(){k["a"].setPageTitle(this.$t("title-home"))}},D=H,U=Object(b["a"])(D,T,P,!1,null,null,null),G=U.exports,M=t("4360");c["a"].use(j["a"]);var R=[{path:"/",component:G},{path:"/login",component:function(){return Promise.all([t.e("chunk-5e7ef160"),t.e("about")]).then(t.bind(null,"a55b"))}},{path:"/channels",component:function(){return t.e("chunk-d17515a0").then(t.bind(null,"3010"))}},{path:"/channel",component:function(){return Promise.all([t.e("chunk-5e7ef160"),t.e("chunk-a18b9b2c"),t.e("chunk-cdfff800")]).then(t.bind(null,"92d6"))},props:function(e){return{name:e.query.name}}},{path:"/challenge",component:function(){return Promise.all([t.e("chunk-5e7ef160"),t.e("chunk-a18b9b2c"),t.e("chunk-624bb791")]).then(t.bind(null,"98ed"))},props:function(e){return{challenging:e.query.challenging,challenger:e.query.challenger,spectating:e.query.spectating}}}],I=new j["a"]({routes:R});I.beforeEach((function(e,n,t){M["a"].getters&&(m["a"]||("/"!=e.path||M["a"].getters.authenticated||t({path:"/login"}),"/login"==e.path&&M["a"].getters.authenticated&&t({path:"/channels"}),"/channels"!=e.path||M["a"].getters.authenticated||t({path:"/login"}),"/channel"!=e.path||M["a"].getters.authenticated||t({path:"/login"}),"/challenge"!=e.path||M["a"].getters.authenticated||t({path:"/login"}))),t()}));var x=I,V=t("e8d7"),q=t("f309");c["a"].use(q["a"]);var F=new q["a"]({});c["a"].use(i.a);var W=new l["a"];c["a"].use(o["a"].plugin,W),c["a"].config.productionTip=!1;for(var $=0,J=Object.entries(h);$<J.length;$++){var B=Object(a["a"])(J[$],2),K=B[0],Q=B[1];c["a"].i18n.add(K,Q)}navigator.language in h?c["a"].i18n.set(navigator.language):c["a"].i18n.set("en-US"),new c["a"]({router:x,store:M["a"],vuetify:F,render:function(e){return e(w)},mounted:function(){this.$vuetify.theme.dark=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches}}).$mount("#app"),V["a"].init()},"57f5":function(e,n,t){"use strict";t.d(n,"b",(function(){return a})),t.d(n,"h",(function(){return c})),t.d(n,"d",(function(){return o})),t.d(n,"g",(function(){return l})),t.d(n,"m",(function(){return r})),t.d(n,"a",(function(){return i})),t.d(n,"f",(function(){return u})),t.d(n,"c",(function(){return s})),t.d(n,"n",(function(){return h})),t.d(n,"e",(function(){return d})),t.d(n,"k",(function(){return f})),t.d(n,"i",(function(){return g})),t.d(n,"l",(function(){return m})),t.d(n,"j",(function(){return p}));var a="L_AUTH",c="L_PRIVMSG",o="L_CHAT_CHANNEL",l="L_JOIN_CHANNEL",r="L_SEND_CHALLENGE",i="L_ACCEPT_CHALLENGE",u="L_DECLINE_CHALLENGE",s="L_CANCEL_CHALLENGE",h="L_WATCH_CHALLENGE",d="L_CONNECT",f="L_REFRESH_PORT",g="L_REFRESH_CHANNELS",m="L_REFRESH_USERS",p="L_REFRESH_HISTROY"},"90b9":function(e,n,t){"use strict";t("99af");var a=t("2b0e"),c=t("4360"),o={SOUNDS:{ChallengeAlert:"sounds/alert",ChallengeCancel:"sounds/cancel",ChallengeAccept:"sounds/accept",GenericNotification:"sounds/notify",GenericNotificationAlt:"sounds/notify2",Welcome:"sounds/welcome"},getDateString:function(e){return"".concat(new Date(e).toLocaleDateString("zh-CN")," ").concat(new Date(e).toLocaleTimeString("zh-CN"))},setPageTitle:function(e){c["a"].getters&&(document.title=a["a"].i18n.translate("title-root",[c["a"].getters.servername,e]))},emitSound:function(e){var n=document.getElementById("player");n.src=e,n.play()}};n["a"]=o},a49b:function(e,n,t){"use strict";t.d(n,"a",(function(){return a})),t.d(n,"b",(function(){return c}));var a=!1,c=a?"http://localhost:8000":window.location.protocol+"//"+window.location.hostname+(window.location.port?":"+window.location.port:"")+"/ggpo";console.log("[UTILS] Devlopment",a)},e8d7:function(e,n,t){"use strict";t("ac1f"),t("5319");var a=t("a49b"),c=t("44ae"),o=t("4360"),l=t("57f5"),r={init:function(){this.ws=new WebSocket(a["b"].replace("https://","wss://").replace("http://","ws://")+"/ws"),this.ws.onmessage=this.onWsMessage,this.ws.onopen=this.onWsOpen,this.ws.onclose=this.onWsClose,this.onCodeUpdate=void 0,console.log("[API] Service initialized")},reply:function(e,n){var t=JSON.stringify({type:e,data:n});return this.ws.send(t)},onWsClose:function(){o["a"].dispatch(l["e"],!1)},onWsOpen:function(){o["a"].dispatch(l["e"],!!r.ws&&r.ws.readyState)},onWsMessage:function(e){var n=JSON.parse(e.data),t=n.type,a=n.data;t==c["f"]?r.onCodeUpdate&&r.onCodeUpdate(a):o["a"].dispatch(t,a)},login:function(e,n,t){r.onCodeUpdate=t,r.reply(c["b"],{username:e,password:n})},join_channel:function(e,n){r.onCodeUpdate=n,r.reply(c["h"],e)},send_chnmsg:function(e,n){r.onCodeUpdate=n,r.reply(c["d"],e)},send_privmsg:function(e,n,t){r.onCodeUpdate=t,r.reply(c["k"],{username:e,message:n})},send_challenge:function(e,n){r.onCodeUpdate=n,r.reply(c["l"],e)},delice_challenge:function(e,n){r.onCodeUpdate=n,r.reply(c["e"],e)},cancel_challenge:function(e,n){r.onCodeUpdate=n,r.reply(c["c"],e)},accept_challenge:function(e,n){r.onCodeUpdate=n,r.reply(c["a"],e)},watch_challenge:function(e,n){r.onCodeUpdate=n,r.reply(c["o"],e)},url_ref_port:a["b"]+"/port",url_list_channel:a["b"]+"/channels",url_list_users:a["b"]+"/channels/users?channel=",url_chat_history:a["b"]+"/channels/chathistory?channel="};n["a"]=r},fdfc:function(e){e.exports=JSON.parse('{"challenge-became-not-available":"Challenge Expired","challenge-waiting-for-player":"Waiting for players","challenge-join-match":"JOIN MATCH","challenge-cancel":"CANCEL CHALLENGE","chat-channel-message":"CHANNEL MESSAGE","chat-private-message":"PRIVATE MESSAGE","chat-private-message-send-failed":"Failed to send message","challenge-spectate-match":"Spectating {0}","t-chat-private-message-send-failed-code":"{0}：{1}","challenge-textfield-message":"{0} PM [Enter]","challenge-spectate-match-failed":"Unable to spectate：{0}","challenge-canceled-by-remote":"Challenge canceled by remote","challenge-cancel-failed":"Failed to canncel challenge:{0}","challenge-challenging-opponent":"Challenging {0}","challenge-challenging-opponent-failed":"Failed to challenge：{0}","challenge-challenge-sent":"Challenge sent!","challenge-challenge-accept-from":"Accepting challenge from {0}","challenge-failed-to-accept-from":"Failed to accept：{0}","challenge-hello-message":"{0} has joined the match","challenge-quark-for-spectating":"Spectator QUARK: {0}","challenge-new-chat":"[{0}] {1} : {2}","challenge-chat-new-message":"[{0}] {1} : {2}","chat-ingame-message":"GAME","challenge-chat-pm":"[PM] {0} : {1}","challenge-cancel-reason-client-quit":"Exception : Spectator\'s emulator has quit / crashed. Please re-enter this match","challenge-cancel-reason-unknown":"Exception ：{0}","challenge-quark-for-match":"Match QUARK:{0}","chat-message-send-failed":"Unable to send：{0}","channels-online-player-count":"ONLINE ：{0}","login-username":"Username","login-password":"Password","login-action":"LOGIN","login-failed":"Cannot login ：{0}","common-accept":"ACCEPT","common-decline":"DECLINE","common-send":"SEND","common-spectate":"SPECTATE","common-back":"BACK","common-back-to":"BACK TO {0}","common-conncecting":"CONNECTING","common-connection-unavailable":"DISCONNECTED","title-root":"{0} - {1}","title-home":"Home","title-login":"Login","title-channels":"Channels","title-channel":"Channel {0}","title-challenge":"Challenge {0} vs. {1}","prompt-login":"Login to {0}","prompt-challenge":"Challenge Status","prompt-incoming-challenge":"A NEW CHALLENGER","prompt-incoming-challenge-canceled":"Challenge Canceled"}')}});
//# sourceMappingURL=app.336abd42.js.map