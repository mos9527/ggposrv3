(function(e){function n(n){for(var a,c,r=n[0],i=n[1],s=n[2],u=0,h=[];u<r.length;u++)c=r[u],Object.prototype.hasOwnProperty.call(o,c)&&o[c]&&h.push(o[c][0]),o[c]=0;for(a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a]);g&&g(n);while(h.length)h.shift()();return l.push.apply(l,s||[]),t()}function t(){for(var e,n=0;n<l.length;n++){for(var t=l[n],a=!0,c=1;c<t.length;c++){var r=t[c];0!==o[r]&&(a=!1)}a&&(l.splice(n--,1),e=i(i.s=t[0]))}return e}var a={},c={app:0},o={app:0},l=[];function r(e){return i.p+"js/"+({about:"about"}[e]||e)+"."+{"chunk-0b3c0cf0":"bf1c3a05","chunk-5e7ef160":"5ade4e5b",about:"a4dc96c9","chunk-a18b9b2c":"efc6edab","chunk-349a64db":"d44c1257","chunk-624bb791":"16c9522b"}[e]+".js"}function i(n){if(a[n])return a[n].exports;var t=a[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t={"chunk-0b3c0cf0":1,"chunk-5e7ef160":1,"chunk-a18b9b2c":1,"chunk-349a64db":1,"chunk-624bb791":1};c[e]?n.push(c[e]):0!==c[e]&&t[e]&&n.push(c[e]=new Promise((function(n,t){for(var a="css/"+({about:"about"}[e]||e)+"."+{"chunk-0b3c0cf0":"91905662","chunk-5e7ef160":"6de87173",about:"31d6cfe0","chunk-a18b9b2c":"9b425298","chunk-349a64db":"3f248658","chunk-624bb791":"9aa1be17"}[e]+".css",o=i.p+a,l=document.getElementsByTagName("link"),r=0;r<l.length;r++){var s=l[r],u=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(u===a||u===o))return n()}var h=document.getElementsByTagName("style");for(r=0;r<h.length;r++){s=h[r],u=s.getAttribute("data-href");if(u===a||u===o)return n()}var g=document.createElement("link");g.rel="stylesheet",g.type="text/css",g.onload=n,g.onerror=function(n){var a=n&&n.target&&n.target.src||o,l=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");l.code="CSS_CHUNK_LOAD_FAILED",l.request=a,delete c[e],g.parentNode.removeChild(g),t(l)},g.href=o;var d=document.getElementsByTagName("head")[0];d.appendChild(g)})).then((function(){c[e]=0})));var a=o[e];if(0!==a)if(a)n.push(a[2]);else{var l=new Promise((function(n,t){a=o[e]=[n,t]}));n.push(a[2]=l);var s,u=document.createElement("script");u.charset="utf-8",u.timeout=120,i.nc&&u.setAttribute("nonce",i.nc),u.src=r(e);var h=new Error;s=function(n){u.onerror=u.onload=null,clearTimeout(g);var t=o[e];if(0!==t){if(t){var a=n&&("load"===n.type?"missing":n.type),c=n&&n.target&&n.target.src;h.message="Loading chunk "+e+" failed.\n("+a+": "+c+")",h.name="ChunkLoadError",h.type=a,h.request=c,t[1](h)}o[e]=void 0}};var g=setTimeout((function(){s({type:"timeout",target:u})}),12e4);u.onerror=u.onload=s,document.head.appendChild(u)}return Promise.all(n)},i.m=e,i.c=a,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)i.d(t,a,function(n){return e[n]}.bind(null,a));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=n,s=s.slice();for(var h=0;h<s.length;h++)n(s[h]);var g=u;l.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"3e1e":function(e){e.exports=JSON.parse('{"challenge-became-not-available":"挑战已失效","challenge-waiting-for-player":"等待玩家加入","challenge-join-match":"加入比赛","challenge-cancel":"取消挑战","chat-channel-message":"公屏","chat-private-message":"私信","chat-private-message-send-failed":"发送失败","common-back":"返回","common-back-to":"返回到 {0}","challenge-spectate-match":"观战 {0} 的比赛","t-chat-private-message-send-failed-code":"{0}：{1}","challenge-textfield-message":"{0} Ctrl+Enter","challenge-spectate-match-failed":"观战失败：{0}","challenge-canceled-by-remote":"挑战已被取消","challenge-cancel-failed":"挑战取消失败:{0}","challenge-challenging-opponent":"挑战 {0}","challenge-challenging-opponent-failed":"邀请失败：{0}","challenge-challenge-sent":"已发送挑战邀请","challenge-challenge-accept-from":"接受 {0} 的挑战","challenge-failed-to-accept-from":"接受失败：{0}","challenge-hello-message":"{0} 已加入","challenge-quark-for-spectating":"观战 QUARK: {0}","challenge-new-chat":"[{0}] {1} : {2}","challenge-chat-new-message":"[{0}] {1} : {2}","chat-ingame-message":"游戏内","challenge-chat-pm":"[私信] {0} : {1}","challenge-cancel-reason-client-quit":"原因：观战客户端已退出，请重新进入观战","challenge-cancel-reason-unknown":"原因：{0}","challenge-quark-for-match":"比赛 QUARK:{0}","common-accept":"接受","common-decline":"拒绝","common-send":"发送","common-spectate":"观战","chat-message-send-failed":"发送失败：{0}","channels-online-player-count":"在线：{0}","login-username":"密码","login-password":"密码","login-action":"登陆","login-failed":"登陆失败：{0}","common-conncecting":"连接中","common-connection-unavailable":"已断开","title-root":"{0} - {1}","title-home":"主页","title-login":"登陆","title-channels":"频道列表","title-channel":"{0}","title-challenge":"{0} vs {1}","prompt-login":"登陆 {0}","prompt-challenge":"究極鬥技 · 改"}')},4360:function(e,n,t){"use strict";var a,c,o,l,r=t("2b0e"),i=t("2f62"),s=t("ade3"),u=(t("d3b7"),t("57f5")),h="SUCCESS",g=t("e8d7"),d={username:void 0,password:void 0,servername:"GGPOSRV3",authenticated:!1},f={username:function(e){return e.username},channel:function(e){return e.channel},authenticated:function(e){return e.authenticated},servername:function(e){return e.servername}},p=Object(s["a"])({},u["b"],(function(e,n){return new Promise((function(e,t){d.username=n.username,d.password=n.password,g["a"].login(d.username,d.password,(function(n){console.log("[AUTH]",n),n==h?(d.authenticated=!0,e(n)):(d.authenticated=!1,t(n))}))}))})),m={state:d,actions:p,getters:f},b=t("44ae"),C={channels:[],channel_current:"lobby",channel_users:[]},E={channels:function(e){return e.channels},channel_current:function(e){return e.channel_current},channel_users:function(e){return e.channel_users}},v=(a={},Object(s["a"])(a,u["g"],(function(e,n){return new Promise((function(e,t){g["a"].join_channel(n,(function(a){a==h?(e(a),C.channel_current=n):t(a)}))}))})),Object(s["a"])(a,b["h"],(function(e,n){console.log("[CHANNEL] Client joined:",n.username,n.channel),C.channel_current=n.channel,e.dispatch(u["i"]),e.dispatch(u["l"])})),Object(s["a"])(a,b["j"],(function(e,n){console.log("[CHANNEL] Client left:",n.username,n.channel),n.username!=G.getters.username&&e.dispatch(u["l"]),e.dispatch(u["i"])})),Object(s["a"])(a,u["i"],(function(){return console.log("[CHANNEL] Refreshing list."),fetch(g["a"].url_list_channel).then((function(e){return e.json()})).then((function(e){return C.channels=e}))})),Object(s["a"])(a,u["l"],(function(){return console.log("[CHANNEL] Refreshing users of channel:",C.channel_current),fetch(g["a"].url_list_users+C.channel_current).then((function(e){return e.json()})).then((function(e){return C.channel_users=e}))})),a),_={state:C,actions:v,getters:E},N={connected:void 0,ggpo_port:void 0,ggpo_host:window.location.hostname},L={connected:function(e){return e.connected},ggpo_host:function(e){return e.ggpo_host},ggpo_port:function(e){return e.ggpo_port}},w=(c={},Object(s["a"])(c,u["e"],(function(e,n){1==n?(console.log("[CONNECTION] Connection established"),e.dispatch(u["k"]).then((function(e){console.log("[CONNECTION] Conection ready. Got port:",e.port),N.ggpo_port=e.port,N.connected=!0}))):(console.log("[CONNECTION] DISCONNECTED"),N.connected=!1)})),Object(s["a"])(c,u["k"],(function(){return fetch(g["a"].url_ref_port).then((function(e){return e.json()}))})),c),A={state:N,actions:w,getters:L},O={},y={},S=(o={},Object(s["a"])(o,b["d"],(function(e,n){console.log("[CHAT] Channel message received from:",n.username,n.message)})),Object(s["a"])(o,u["d"],(function(e,n){return new Promise((function(e,t){g["a"].send_chnmsg(n,(function(n){n==h?e(n):t(n)}))}))})),Object(s["a"])(o,b["k"],(function(e,n){console.log("[CHAT] PM recevied from:",n.sender,n.message)})),Object(s["a"])(o,u["h"],(function(e,n){return new Promise((function(e,t){g["a"].send_privmsg(n.username,n.message,(function(n){n==h?e(n):t(n)}))}))})),Object(s["a"])(o,b["g"],(function(e,n){console.log("[CHAT] Ingame chat recevied from:",n.username,n.message)})),Object(s["a"])(o,u["j"],(function(e,n){return fetch(g["a"].url_chat_history+n).then((function(e){return e.json()}))})),o),j={state:O,actions:S,getters:y},k={challenging:void 0,challenger:void 0,quark:void 0,status:void 0},T={challenging:function(e){return e.challenging},challenger:function(e){return e.challenger},quark:function(e){return e.quark}},H=(l={},Object(s["a"])(l,u["m"],(function(e,n){return console.log("[CHALLENGE] Sending to:",n),new Promise((function(e,t){g["a"].send_challenge(n,(function(a){a==h?(e(a),k.challenging=n):t(a)}))}))})),Object(s["a"])(l,b["l"],(function(e,n){console.log("[CHALLENGE] Being Challenged! Challenger:",n),k.challenger=n})),Object(s["a"])(l,b["e"],(function(e,n){console.log("[CHALLENGE] Challenge deliced by:",n),k.challenging=void 0})),Object(s["a"])(l,u["f"],(function(e,n){return console.log("[CHALLENGE] Declining challenge from:",n),new Promise((function(e,t){g["a"].delice_challenge(n,(function(n){n==h?(e(n),k.challenger=void 0):t(n)}))}))})),Object(s["a"])(l,b["c"],(function(e,n){console.log("[CHALLENGE] Challenge canceled by:",n),k.challenger=void 0})),Object(s["a"])(l,u["c"],(function(e,n){return console.log("[CHALLENGE] Canceling challenge to:",n),new Promise((function(e,t){g["a"].cancel_challenge(n,(function(n){n==h?(e(n),k.challenging=void 0):t(n)}))}))})),Object(s["a"])(l,u["a"],(function(e,n){return console.log("[CHALLENGE] Accepting challenge from:",n),new Promise((function(e,t){g["a"].accept_challenge(n,(function(n){n==h?e(n):t(n)}))}))})),Object(s["a"])(l,b["a"],(function(e,n){console.log("[CHALLENGE] Quark distributed:",n),k.quark=n})),Object(s["a"])(l,b["n"],(function(e,n){console.log("[STATUS] Update:",n),k.status=n})),Object(s["a"])(l,b["i"],(function(e,n){console.log("[SPEC] Challenge available for spectating,from:",n),e.dispatch(u["l"])})),Object(s["a"])(l,b["o"],(function(e,n){console.log("[SPEC] Quark distributed:",n)})),Object(s["a"])(l,u["n"],(function(e,n){return console.log("[SPEC] Sending request to watch match of:",n),new Promise((function(e,t){g["a"].watch_challenge(n,(function(n){n==h?e(n):t(n)}))}))})),Object(s["a"])(l,b["m"],(function(e,n){console.log("[SPEC] Current spectators",n)})),l),P={state:k,actions:H,getters:T};r["a"].use(i["b"]);var G=n["a"]=new i["b"].Store({modules:{connection:A,auth:m,channels:_,chat:j,challenge:P}})},"44ae":function(e,n,t){"use strict";t.d(n,"b",(function(){return a})),t.d(n,"k",(function(){return c})),t.d(n,"n",(function(){return o})),t.d(n,"d",(function(){return l})),t.d(n,"h",(function(){return r})),t.d(n,"j",(function(){return i})),t.d(n,"l",(function(){return s})),t.d(n,"a",(function(){return u})),t.d(n,"e",(function(){return h})),t.d(n,"c",(function(){return g})),t.d(n,"i",(function(){return d})),t.d(n,"o",(function(){return f})),t.d(n,"g",(function(){return p})),t.d(n,"m",(function(){return m})),t.d(n,"f",(function(){return b}));var a="AUTH",c="PRIVMSG",o="STATUS",l="CHAT_CHANNEL",r="JOIN_CHANNEL",i="PART_CHANNEL",s="SEND_CHALLENGE",u="ACCEPT_CHALLENGE",h="DECLINE_CHALLENGE",g="CANCEL_CHALLENGE",d="NOTIFY_CHALLENGE",f="WATCH_CHALLENGE",p="INGAME_CHAT",m="SPECTATE",b="ERRORMSG"},"56d7":function(e,n,t){"use strict";t.r(n);var a=t("3835"),c=(t("e260"),t("e6cf"),t("cca6"),t("a79d"),t("4fad"),t("2b0e")),o=t("f2f3"),l=t("2f62"),r=t("3e1e"),i=t("fdfc"),s={"zh-CN":r,"en-US":i},u=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("v-app",[t("v-main",[t("v-container",{staticClass:"pa-0",attrs:{fluid:""}},[t("router-view")],1),t("v-footer",{attrs:{app:""}},[t("v-container",{staticStyle:{display:"flex"}},[e.DEVELOPMENT||!e.authenticated?t("v-btn",{staticStyle:{flex:"1"},attrs:{to:"/login"}},[t("v-icon",[e._v("mdi-account")]),e._v(" "+e._s(e.$t("title-login"))+" ")],1):e._e(),t("v-btn",{staticStyle:{flex:"1"},attrs:{to:"/"}},[t("v-icon",[e._v("mdi-home")]),e._v(" "+e._s(e.$t("title-home"))+" ")],1),e.DEVELOPMENT||e.authenticated?t("v-btn",{staticStyle:{flex:"1"},attrs:{to:"/channels"}},[t("v-icon",[e._v("mdi-controller-classic")]),e._v(" "+e._s(e.$t("title-channels"))+" ")],1):e._e()],1)],1)],1),e.connected?e._e():t("div",{staticClass:"overlay",class:0==e.connected?"overlay-fatal":""},[e._v(" "+e._s(void 0==e.connected?e.$t("common-conncecting"):e.$t("common-connection-unavailable"))+" ")])],1)},h=[],g=t("5530"),d=t("a49b"),f={data:function(){return{DEVELOPMENT:d["a"]}},computed:Object(g["a"])({},Object(l["c"])(["authenticated","connected"]))},p=f,m=t("2877"),b=t("6544"),C=t.n(b),E=t("7496"),v=t("8336"),_=t("a523"),N=t("553a"),L=t("132d"),w=t("f6c4"),A=Object(m["a"])(p,u,h,!1,null,null,null),O=A.exports;C()(A,{VApp:E["a"],VBtn:v["a"],VContainer:_["a"],VFooter:N["a"],VIcon:L["a"],VMain:w["a"]});t("d3b7"),t("3ca3"),t("ddb0"),t("b0c0");var y=t("8c4f"),S=function(){var e=this,n=e.$createElement;e._self._c;return e._m(0)},j=[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("iframe",{staticStyle:{border:"none",width:"100%",height:"calc(100vh - 56px)"},attrs:{src:"/static/html/home.html"}})])}],k=t("90b9"),T={mounted:function(){k["a"].setPageTitle(this.$t("title-home"))}},H=T,P=Object(m["a"])(H,S,j,!1,null,null,null),G=P.exports,U=t("4360");c["a"].use(y["a"]);var I=[{path:"/",component:G},{path:"/login",component:function(){return Promise.all([t.e("chunk-5e7ef160"),t.e("about")]).then(t.bind(null,"a55b"))}},{path:"/channels",component:function(){return t.e("chunk-0b3c0cf0").then(t.bind(null,"3010"))}},{path:"/channel",component:function(){return Promise.all([t.e("chunk-5e7ef160"),t.e("chunk-a18b9b2c"),t.e("chunk-349a64db")]).then(t.bind(null,"92d6"))},props:function(e){return{name:e.query.name}}},{path:"/challenge",component:function(){return Promise.all([t.e("chunk-5e7ef160"),t.e("chunk-a18b9b2c"),t.e("chunk-624bb791")]).then(t.bind(null,"98ed"))},props:function(e){return{challenging:e.query.challenging,challenger:e.query.challenger,spectating:e.query.spectating}}}],R=new y["a"]({routes:I});R.beforeEach((function(e,n,t){U["a"].getters&&(d["a"]||("/login"==e.path&&U["a"].getters.authenticated&&t({path:"/channels"}),"/channels"!=e.path||U["a"].getters.authenticated||t({path:"/login"}),"/channel"!=e.path||U["a"].getters.authenticated||t({path:"/login"}),"/challenge"!=e.path||U["a"].getters.authenticated||t({path:"/login"}))),t()}));var M=R,x=t("e8d7"),D=t("f309");c["a"].use(D["a"]);var q=new D["a"]({}),V=new l["a"];c["a"].use(o["a"].plugin,V),c["a"].config.productionTip=!1;for(var F=0,$=Object.entries(s);F<$.length;F++){var W=Object(a["a"])($[F],2),J=W[0],B=W[1];c["a"].i18n.add(J,B)}navigator.language in s?c["a"].i18n.set(navigator.language):c["a"].i18n.set("en-US"),new c["a"]({router:M,store:U["a"],vuetify:q,render:function(e){return e(O)},mounted:function(){this.$vuetify.theme.dark=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches}}).$mount("#app"),x["a"].init()},"57f5":function(e,n,t){"use strict";t.d(n,"b",(function(){return a})),t.d(n,"h",(function(){return c})),t.d(n,"d",(function(){return o})),t.d(n,"g",(function(){return l})),t.d(n,"m",(function(){return r})),t.d(n,"a",(function(){return i})),t.d(n,"f",(function(){return s})),t.d(n,"c",(function(){return u})),t.d(n,"n",(function(){return h})),t.d(n,"e",(function(){return g})),t.d(n,"k",(function(){return d})),t.d(n,"i",(function(){return f})),t.d(n,"l",(function(){return p})),t.d(n,"j",(function(){return m}));var a="L_AUTH",c="L_PRIVMSG",o="L_CHAT_CHANNEL",l="L_JOIN_CHANNEL",r="L_SEND_CHALLENGE",i="L_ACCEPT_CHALLENGE",s="L_DECLINE_CHALLENGE",u="L_CANCEL_CHALLENGE",h="L_WATCH_CHALLENGE",g="L_CONNECT",d="L_REFRESH_PORT",f="L_REFRESH_CHANNELS",p="L_REFRESH_USERS",m="L_REFRESH_HISTROY"},"90b9":function(e,n,t){"use strict";t("99af");var a=t("2b0e"),c=t("4360"),o={getDateString:function(e){return"".concat(new Date(e).toLocaleDateString("zh-CN")," ").concat(new Date(e).toLocaleTimeString("zh-CN"))},setPageTitle:function(e){c["a"].getters&&(document.title=a["a"].i18n.translate("title-root",[c["a"].getters.servername,e]))}};n["a"]=o},a49b:function(e,n,t){"use strict";t.d(n,"a",(function(){return a})),t.d(n,"b",(function(){return c}));var a=!1,c=a?"http://localhost:8000":window.location.protocol+"//"+window.location.hostname+(window.location.port?":"+window.location.port:"");console.log("[UTILS] Devlopment",a)},e8d7:function(e,n,t){"use strict";t("ac1f"),t("5319");var a=t("a49b"),c=t("44ae"),o=t("4360"),l=t("57f5"),r={init:function(){this.ws=new WebSocket(a["b"].replace("https://","ws://").replace("http://","ws://")+"/ws"),this.ws.onmessage=this.onWsMessage,this.ws.onopen=this.onWsOpen,this.ws.onclose=this.onWsClose,this.onCodeUpdate=void 0,console.log("[API] Service initialized")},reply:function(e,n){var t=JSON.stringify({type:e,data:n});return this.ws.send(t)},onWsClose:function(){o["a"].dispatch(l["e"],!1)},onWsOpen:function(){o["a"].dispatch(l["e"],!!r.ws&&r.ws.readyState)},onWsMessage:function(e){var n=JSON.parse(e.data),t=n.type,a=n.data;t==c["f"]?r.onCodeUpdate&&r.onCodeUpdate(a):o["a"].dispatch(t,a)},login:function(e,n,t){r.onCodeUpdate=t,r.reply(c["b"],{username:e,password:n})},join_channel:function(e,n){r.onCodeUpdate=n,r.reply(c["h"],e)},send_chnmsg:function(e,n){r.onCodeUpdate=n,r.reply(c["d"],e)},send_privmsg:function(e,n,t){r.onCodeUpdate=t,r.reply(c["k"],{username:e,message:n})},send_challenge:function(e,n){r.onCodeUpdate=n,r.reply(c["l"],e)},delice_challenge:function(e,n){r.onCodeUpdate=n,r.reply(c["e"],e)},cancel_challenge:function(e,n){r.onCodeUpdate=n,r.reply(c["c"],e)},accept_challenge:function(e,n){r.onCodeUpdate=n,r.reply(c["a"],e)},watch_challenge:function(e,n){r.onCodeUpdate=n,r.reply(c["o"],e)},url_ref_port:a["b"]+"/port",url_list_channel:a["b"]+"/channels",url_list_users:a["b"]+"/channels/users?channel=",url_chat_history:a["b"]+"/channels/chathistory?channel="};n["a"]=r},fdfc:function(e){e.exports=JSON.parse('{"challenge-became-not-available":"Challenge Expired","challenge-waiting-for-player":"Waiting for players","challenge-join-match":"JOIN MATCH","challenge-cancel":"CANCEL CHALLENGE","chat-channel-message":"CHANNEL MESSAGE","chat-private-message":"PRIVATE MESSAGE","chat-private-message-send-failed":"Failed to send message","challenge-spectate-match":"Spectating {0}","t-chat-private-message-send-failed-code":"{0}：{1}","challenge-textfield-message":"{0} Ctrl+Enter","challenge-spectate-match-failed":"Unable to spectate：{0}","challenge-canceled-by-remote":"Challenge canceled by remote","challenge-cancel-failed":"Failed to canncel challenge:{0}","challenge-challenging-opponent":"Challenging {0}","challenge-challenging-opponent-failed":"Failed to challenge：{0}","challenge-challenge-sent":"Challenge sent!","challenge-challenge-accept-from":"Accepting challenge from {0}","challenge-failed-to-accept-from":"Failed to accept：{0}","challenge-hello-message":"{0} has joined the match","challenge-quark-for-spectating":"Spectator QUARK: {0}","challenge-new-chat":"[{0}] {1} : {2}","challenge-chat-new-message":"[{0}] {1} : {2}","chat-ingame-message":"GAME","challenge-chat-pm":"[PM] {0} : {1}","challenge-cancel-reason-client-quit":"Exception : Spectator\'s emulator has quit / crashed. Please re-enter this match","challenge-cancel-reason-unknown":"Exception ：{0}","challenge-quark-for-match":"Match QUARK:{0}","chat-message-send-failed":"Unable to send：{0}","channels-online-player-count":"ONLINE ：{0}","login-username":"Username","login-password":"Password","login-action":"LOGIN","login-failed":"Cannot login ：{0}","common-accept":"ACCEPT","common-decline":"DECLINE","common-send":"SEND","common-spectate":"SPECTATE","common-back":"BACK","common-back-to":"BACK TO {0}","common-conncecting":"CONNECTING","common-connection-unavailable":"DISCONNECTED","title-root":"{0} - {1}","title-home":"Home","title-login":"Login","title-channels":"Channels","title-channel":"Channel {0}","title-challenge":"Challenge {0} vs. {1}","prompt-login":"Login to {0}","prompt-challenge":"Challenge Status"}')}});
//# sourceMappingURL=app.12c3577b.js.map