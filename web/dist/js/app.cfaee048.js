(function(n){function e(e){for(var o,r,u=e[0],i=e[1],l=e[2],s=0,d=[];s<u.length;s++)r=u[s],Object.prototype.hasOwnProperty.call(c,r)&&c[r]&&d.push(c[r][0]),c[r]=0;for(o in i)Object.prototype.hasOwnProperty.call(i,o)&&(n[o]=i[o]);f&&f(e);while(d.length)d.shift()();return a.push.apply(a,l||[]),t()}function t(){for(var n,e=0;e<a.length;e++){for(var t=a[e],o=!0,r=1;r<t.length;r++){var u=t[r];0!==c[u]&&(o=!1)}o&&(a.splice(e--,1),n=i(i.s=t[0]))}return n}var o={},r={app:0},c={app:0},a=[];function u(n){return i.p+"js/"+({about:"about"}[n]||n)+"."+{"chunk-1261700a":"0275d56f",about:"53d4532f","chunk-2c61c8d2":"829ae3f1","chunk-21e3e626":"6a4f1846","chunk-be3d6554":"5e36e4a5"}[n]+".js"}function i(e){if(o[e])return o[e].exports;var t=o[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(n){var e=[],t={"chunk-1261700a":1,"chunk-2c61c8d2":1,"chunk-21e3e626":1,"chunk-be3d6554":1};r[n]?e.push(r[n]):0!==r[n]&&t[n]&&e.push(r[n]=new Promise((function(e,t){for(var o="css/"+({about:"about"}[n]||n)+"."+{"chunk-1261700a":"a3adb0ea",about:"31d6cfe0","chunk-2c61c8d2":"3b3acb6f","chunk-21e3e626":"c216951c","chunk-be3d6554":"9aa1be17"}[n]+".css",c=i.p+o,a=document.getElementsByTagName("link"),u=0;u<a.length;u++){var l=a[u],s=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(s===o||s===c))return e()}var d=document.getElementsByTagName("style");for(u=0;u<d.length;u++){l=d[u],s=l.getAttribute("data-href");if(s===o||s===c)return e()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=e,f.onerror=function(e){var o=e&&e.target&&e.target.src||c,a=new Error("Loading CSS chunk "+n+" failed.\n("+o+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=o,delete r[n],f.parentNode.removeChild(f),t(a)},f.href=c;var h=document.getElementsByTagName("head")[0];h.appendChild(f)})).then((function(){r[n]=0})));var o=c[n];if(0!==o)if(o)e.push(o[2]);else{var a=new Promise((function(e,t){o=c[n]=[e,t]}));e.push(o[2]=a);var l,s=document.createElement("script");s.charset="utf-8",s.timeout=120,i.nc&&s.setAttribute("nonce",i.nc),s.src=u(n);var d=new Error;l=function(e){s.onerror=s.onload=null,clearTimeout(f);var t=c[n];if(0!==t){if(t){var o=e&&("load"===e.type?"missing":e.type),r=e&&e.target&&e.target.src;d.message="Loading chunk "+n+" failed.\n("+o+": "+r+")",d.name="ChunkLoadError",d.type=o,d.request=r,t[1](d)}c[n]=void 0}};var f=setTimeout((function(){l({type:"timeout",target:s})}),12e4);s.onerror=s.onload=l,document.head.appendChild(s)}return Promise.all(e)},i.m=n,i.c=o,i.d=function(n,e,t){i.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:t})},i.r=function(n){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},i.t=function(n,e){if(1&e&&(n=i(n)),8&e)return n;if(4&e&&"object"===typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var o in n)i.d(t,o,function(e){return n[e]}.bind(null,o));return t},i.n=function(n){var e=n&&n.__esModule?function(){return n["default"]}:function(){return n};return i.d(e,"a",e),e},i.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},i.p="/",i.oe=function(n){throw console.error(n),n};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],s=l.push.bind(l);l.push=e,l=l.slice();for(var d=0;d<l.length;d++)e(l[d]);var f=s;a.push([0,"chunk-vendors"]),t()})({0:function(n,e,t){n.exports=t("56d7")},"44ae":function(n,e,t){"use strict";t.d(e,"b",(function(){return o})),t.d(e,"j",(function(){return r})),t.d(e,"l",(function(){return c})),t.d(e,"d",(function(){return a})),t.d(e,"h",(function(){return u})),t.d(e,"i",(function(){return i})),t.d(e,"k",(function(){return l})),t.d(e,"a",(function(){return s})),t.d(e,"e",(function(){return d})),t.d(e,"c",(function(){return f})),t.d(e,"g",(function(){return h})),t.d(e,"f",(function(){return p}));var o="AUTH",r="PRIVMSG",c="STATUS",a="CHAT_CHANNEL",u="JOIN_CHANNEL",i="PART_CHANNEL",l="SEND_CHALLENGE",s="ACCEPT_CHALLENGE",d="DECLINE_CHALLENGE",f="CANCEL_CHALLENGE",h="INGAME_CHAT",p="ERRORMSG"},"56d7":function(n,e,t){"use strict";t.r(e);t("e260"),t("e6cf"),t("cca6"),t("a79d");var o=t("2b0e"),r=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("v-app",[t("v-card",[t("v-app-bar",[t("v-toolbar-title",[n._v(n._s(n.$route.name))]),t("v-spacer"),n.authenticated?n._e():t("v-btn",{attrs:{to:"/login",icon:""}},[t("v-icon",[n._v("mdi-account")])],1),t("v-btn",{attrs:{to:"/",icon:""}},[t("v-icon",[n._v("mdi-home")])],1),n.authenticated?t("v-btn",{attrs:{to:"/channels",icon:""}},[t("v-icon",[n._v("mdi-controller-classic")])],1):n._e()],1)],1),t("v-main",[t("v-container",{attrs:{fluid:""}},[t("router-view")],1)],1)],1)},c=[],a=t("5530"),u=t("2f62"),i={name:"App",computed:Object(a["a"])({},Object(u["b"])(["authenticated"]))},l=i,s=t("2877"),d=t("6544"),f=t.n(d),h=t("7496"),p=t("40dc"),g=t("8336"),m=t("b0af"),b=t("a523"),_=t("132d"),v=t("f6c4"),C=t("2fa4"),E=t("2a7f"),L=Object(s["a"])(l,r,c,!1,null,null,null),N=L.exports;f()(L,{VApp:h["a"],VAppBar:p["a"],VBtn:g["a"],VCard:m["a"],VContainer:b["a"],VIcon:_["a"],VMain:v["a"],VSpacer:C["a"],VToolbarTitle:E["a"]});t("d3b7"),t("3ca3"),t("ddb0"),t("b0c0");var y=t("8c4f"),A=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("pre",[n._v("WELCOME \n\nwell...welcome\ndont have anything for ya yet,but things are getting promising ;]\n")])},w=[],O={name:"Home"},j=O,H=Object(s["a"])(j,A,w,!1,null,null,null),k=H.exports,S=t("ade3"),T=t("57f5"),P="SUCCESS",G=(t("ac1f"),t("5319"),"http://localhost:8000");console.log(window.location.protocol+"//"+window.location.hostname+(window.location.port?":"+window.location.port:""));var U,R,I,M=t("44ae"),V={init:function(){this.ws=new WebSocket(G.replace("https://","ws://").replace("http://","ws://")+"/ws"),this.ws.onmessage=this.onWsMessage,this.ws.onopen=this.onWsOpen,this.onCodeUpdate=void 0,console.log("[API] Service initialized")},reply:function(n,e){var t=JSON.stringify({type:n,data:e});return this.ws.send(t)},onWsOpen:function(){un.dispatch(T["e"],!!V.ws&&V.ws.readyState)},onWsMessage:function(n){var e=JSON.parse(n.data),t=e.type,o=e.data;t==M["f"]?V.onCodeUpdate&&V.onCodeUpdate(o):un.dispatch(t,o)},login:function(n,e,t){V.onCodeUpdate=t,V.reply(M["b"],{username:n,password:e})},join_channel:function(n,e){V.onCodeUpdate=e,V.reply(M["h"],n)},send_chnmsg:function(n,e){V.onCodeUpdate=e,V.reply(M["d"],n)},send_privmsg:function(n,e,t){V.onCodeUpdate=t,V.reply(M["j"],{username:n,message:e})},send_challenge:function(n,e){V.onCodeUpdate=e,V.reply(M["k"],n)},delice_challenge:function(n,e){V.onCodeUpdate=e,V.reply(M["e"],n)},cancel_challenge:function(n,e){V.onCodeUpdate=e,V.reply(M["c"],n)},accept_challenge:function(n,e){V.onCodeUpdate=e,V.reply(M["a"],n)},url_list_channel:G+"/channels",url_list_users:G+"/channels/users?channel=",url_chat_history:G+"/channels/chathistory?channel="},x=V,q={username:void 0,password:void 0,authenticated:!1},D={username:function(n){return n.username},channel:function(n){return n.channel},authenticated:function(n){return n.authenticated}},B=Object(S["a"])({},T["b"],(function(n,e){return new Promise((function(n,t){q.username=e.username,q.password=e.password,x.login(q.username,q.password,(function(e){console.log("[AUTH]",e),e==P?(q.authenticated=!0,n(e)):(q.authenticated=!1,t(e))}))}))})),J={state:q,actions:B,getters:D},W={channels:[],channel_current:"lobby",channel_users:[]},F={channels:function(n){return n.channels},channel_current:function(n){return n.channel_current},channel_users:function(n){return n.channel_users}},$=(U={},Object(S["a"])(U,T["g"],(function(n,e){return new Promise((function(n,t){x.join_channel(e,(function(o){o==P?(n(o),W.channel_current=e):t(o)}))}))})),Object(S["a"])(U,M["h"],(function(n,e){console.log("[CHANNEL] Client joined:",e.username,e.channel),W.channel_current=e.channel,n.dispatch(T["i"]),n.dispatch(T["k"])})),Object(S["a"])(U,M["i"],(function(n,e){console.log("[CHANNEL] Client left:",e.username,e.channel),e.username!=un.getters.username&&n.dispatch(T["k"])})),Object(S["a"])(U,T["i"],(function(){return console.log("[CHANNEL] Refreshing list."),fetch(x.url_list_channel).then((function(n){return n.json()})).then((function(n){return W.channels=n}))})),Object(S["a"])(U,T["k"],(function(){return console.log("[CHANNEL] Refreshing users of channel:",W.channel_current),fetch(x.url_list_users+W.channel_current).then((function(n){return n.json()})).then((function(n){return W.channel_users=n}))})),U),z={state:W,actions:$,getters:F},K={connected:!1},Q={connected:function(n){return n.connected}},Y=Object(S["a"])({},T["e"],(function(n,e){1==e?(console.log("[CONNECTION] Connection established"),K.connected=!0):(console.log("[CONNECTION] Connection failed!"),K.connected=!1)})),X={state:K,actions:Y,getters:Q},Z={},nn={},en=(R={},Object(S["a"])(R,M["d"],(function(n,e){console.log("[CHAT] Channel message received from:",e.username,e.message)})),Object(S["a"])(R,T["d"],(function(n,e){return new Promise((function(n,t){x.send_chnmsg(e,(function(e){e==P?n(e):t(e)}))}))})),Object(S["a"])(R,M["j"],(function(n,e){console.log("[CHAT] PM recevied from:",e.sender,e.message)})),Object(S["a"])(R,T["h"],(function(n,e){return new Promise((function(n,t){x.send_privmsg(e.username,e.message,(function(e){e==P?n(e):t(e)}))}))})),Object(S["a"])(R,M["g"],(function(n,e){console.log("[CHAT] Ingame chat recevied from:",e.username,e.message)})),Object(S["a"])(R,T["j"],(function(n,e){return fetch(x.url_chat_history+e).then((function(n){return n.json()}))})),R),tn={state:Z,actions:en,getters:nn},on={challenging:void 0,challenger:void 0,quark:void 0,status:void 0},rn={challenging:function(n){return n.challenging},challenger:function(n){return n.challenger},quark:function(n){return n.quark}},cn=(I={},Object(S["a"])(I,T["l"],(function(n,e){return console.log("[CHALLENGE] Sending to:",e),new Promise((function(n,t){x.send_challenge(e,(function(o){o==P?(n(o),on.challenging=e):t(o)}))}))})),Object(S["a"])(I,M["k"],(function(n,e){console.log("[CHALLENGE] Being Challenged! Challenger:",e),on.challenger=e})),Object(S["a"])(I,M["e"],(function(n,e){console.log("[CHALLENGE] Challenge deliced by:",e),on.challenging=void 0})),Object(S["a"])(I,T["f"],(function(n,e){return console.log("[CHALLENGE] Declining challenge from:",e),new Promise((function(n,t){x.delice_challenge(e,(function(e){e==P?(n(e),on.challenger=void 0):t(e)}))}))})),Object(S["a"])(I,M["c"],(function(n,e){console.log("[CHALLENGE] Challenge canceled by:",e),on.challenger=void 0})),Object(S["a"])(I,T["c"],(function(n,e){return console.log("[CHALLENGE] Canceling challenge to:",e),new Promise((function(n,t){x.cancel_challenge(e,(function(e){e==P?(n(e),on.challenging=void 0):t(e)}))}))})),Object(S["a"])(I,T["a"],(function(n,e){return console.log("[CHALLENGE] Accepting challenge from:",e),new Promise((function(n,t){x.accept_challenge(e,(function(e){e==P?n(e):t(e)}))}))})),Object(S["a"])(I,M["a"],(function(n,e){console.log("[CHALLENGE] Quark distributed:",e),on.quark=e})),Object(S["a"])(I,M["l"],(function(n,e){console.log("[STATUS] Update:",e),on.status=e})),I),an={state:on,actions:cn,getters:rn};o["a"].use(u["a"]);var un=new u["a"].Store({modules:{connection:X,auth:J,channels:z,chat:tn,challenge:an}});o["a"].use(y["a"]);var ln=[{path:"/",name:"主页",component:k},{path:"/login",name:"登陆",component:function(){return Promise.all([t.e("chunk-1261700a"),t.e("about")]).then(t.bind(null,"a55b"))}},{path:"/channels",name:"频道列表",component:function(){return t.e("chunk-be3d6554").then(t.bind(null,"3010"))}},{path:"/channel",name:"频道",component:function(){return Promise.all([t.e("chunk-1261700a"),t.e("chunk-2c61c8d2")]).then(t.bind(null,"92d6"))},props:function(n){return{name:n.query.name}}},{path:"/challenge",name:"挑战",component:function(){return t.e("chunk-21e3e626").then(t.bind(null,"98ed"))},props:function(n){return{challenging:n.query.challenging,challenger:n.query.challenger}}}],sn=new y["a"]({routes:ln});sn.beforeEach((function(n,e,t){un.getters&&("登陆"==n.name&&un.getters.authenticated&&t({path:"/channels"}),"频道列表"!=n.name||un.getters.authenticated||t({path:"/login"}),"频道"!=n.name||un.getters.authenticated||t({path:"/login"}),"挑战"!=n.name||un.getters.authenticated||t({path:"/login"}),t())})),sn.afterEach((function(n){o["a"].nextTick((function(){document.title=n.name}))}));var dn=sn,fn=t("f309");o["a"].use(fn["a"]);var hn=new fn["a"]({});o["a"].config.productionTip=!1,x.init(),new o["a"]({router:dn,store:un,vuetify:hn,render:function(n){return n(N)}}).$mount("#app")},"57f5":function(n,e,t){"use strict";t.d(e,"b",(function(){return o})),t.d(e,"h",(function(){return r})),t.d(e,"d",(function(){return c})),t.d(e,"g",(function(){return a})),t.d(e,"l",(function(){return u})),t.d(e,"a",(function(){return i})),t.d(e,"f",(function(){return l})),t.d(e,"c",(function(){return s})),t.d(e,"e",(function(){return d})),t.d(e,"i",(function(){return f})),t.d(e,"k",(function(){return h})),t.d(e,"j",(function(){return p}));var o="L_AUTH",r="L_PRIVMSG",c="L_CHAT_CHANNEL",a="L_JOIN_CHANNEL",u="L_SEND_CHALLENGE",i="L_ACCEPT_CHALLENGE",l="L_DECLINE_CHALLENGE",s="L_CANCEL_CHALLENGE",d="L_CONNECT",f="L_REFRESH_CHANNEL",h="L_REFRESH_USERS",p="L_REFRESH_HISTROY"}});
//# sourceMappingURL=app.cfaee048.js.map