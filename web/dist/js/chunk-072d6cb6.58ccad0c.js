(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-072d6cb6"],{"4c53":function(t,e,s){"use strict";var a=s("23e7"),i=s("857a"),n=s("af03");a({target:"String",proto:!0,forced:n("sub")},{sub:function(){return i(this,"sub","","")}})},"608c":function(t,e,s){},"7efd":function(t,e,s){"use strict";var a=s("5530"),i=(s("caad"),s("99af"),s("fb6a"),s("608c"),s("9d26")),n=s("0789"),c=s("604c"),o=(s("a9e3"),s("b0c0"),s("d9bd")),r=s("2b0e"),l=r["a"].extend({name:"mobile",props:{mobileBreakpoint:{type:[Number,String],default:function(){return this.$vuetify?this.$vuetify.breakpoint.mobileBreakpoint:void 0},validator:function(t){return!isNaN(Number(t))||["xs","sm","md","lg","xl"].includes(String(t))}}},computed:{isMobile:function(){var t=this.$vuetify.breakpoint,e=t.mobile,s=t.width,a=t.name,i=t.mobileBreakpoint;if(i===this.mobileBreakpoint)return e;var n=parseInt(this.mobileBreakpoint,10),c=!isNaN(n);return c?s<n:a===this.mobileBreakpoint}},created:function(){this.$attrs.hasOwnProperty("mobile-break-point")&&Object(o["d"])("mobile-break-point","mobile-breakpoint",this)}}),h=s("dc22"),u=(s("159b"),s("80d2")),p=function(t){var e=t.touchstartX,s=t.touchendX,a=t.touchstartY,i=t.touchendY,n=.5,c=16;t.offsetX=s-e,t.offsetY=i-a,Math.abs(t.offsetY)<n*Math.abs(t.offsetX)&&(t.left&&s<e-c&&t.left(t),t.right&&s>e+c&&t.right(t)),Math.abs(t.offsetX)<n*Math.abs(t.offsetY)&&(t.up&&i<a-c&&t.up(t),t.down&&i>a+c&&t.down(t))};function d(t,e){var s=t.changedTouches[0];e.touchstartX=s.clientX,e.touchstartY=s.clientY,e.start&&e.start(Object.assign(t,e))}function f(t,e){var s=t.changedTouches[0];e.touchendX=s.clientX,e.touchendY=s.clientY,e.end&&e.end(Object.assign(t,e)),p(e)}function v(t,e){var s=t.changedTouches[0];e.touchmoveX=s.clientX,e.touchmoveY=s.clientY,e.move&&e.move(Object.assign(t,e))}function g(t){var e={touchstartX:0,touchstartY:0,touchendX:0,touchendY:0,touchmoveX:0,touchmoveY:0,offsetX:0,offsetY:0,left:t.left,right:t.right,up:t.up,down:t.down,start:t.start,move:t.move,end:t.end};return{touchstart:function(t){return d(t,e)},touchend:function(t){return f(t,e)},touchmove:function(t){return v(t,e)}}}function m(t,e,s){var a=e.value,i=a.parent?t.parentElement:t,n=a.options||{passive:!0};if(i){var c=g(e.value);i._touchHandlers=Object(i._touchHandlers),i._touchHandlers[s.context._uid]=c,Object(u["q"])(c).forEach((function(t){i.addEventListener(t,c[t],n)}))}}function y(t,e,s){var a=e.value.parent?t.parentElement:t;if(a&&a._touchHandlers){var i=a._touchHandlers[s.context._uid];Object(u["q"])(i).forEach((function(t){a.removeEventListener(t,i[t])})),delete a._touchHandlers[s.context._uid]}}var b={inserted:m,unbind:y},w=b,_=s("58df"),$=Object(_["a"])(c["a"],l).extend({name:"base-slide-group",directives:{Resize:h["a"],Touch:w},props:{activeClass:{type:String,default:"v-slide-item--active"},centerActive:Boolean,nextIcon:{type:String,default:"$next"},prevIcon:{type:String,default:"$prev"},showArrows:{type:[Boolean,String],validator:function(t){return"boolean"===typeof t||["always","desktop","mobile"].includes(t)}}},data:function(){return{internalItemsLength:0,isOverflowing:!1,resizeTimeout:0,startX:0,isSwipingHorizontal:!1,isSwiping:!1,scrollOffset:0,widths:{content:0,wrapper:0}}},computed:{canTouch:function(){return"undefined"!==typeof window},__cachedNext:function(){return this.genTransition("next")},__cachedPrev:function(){return this.genTransition("prev")},classes:function(){return Object(a["a"])(Object(a["a"])({},c["a"].options.computed.classes.call(this)),{},{"v-slide-group":!0,"v-slide-group--has-affixes":this.hasAffixes,"v-slide-group--is-overflowing":this.isOverflowing})},hasAffixes:function(){switch(this.showArrows){case"always":return!0;case"desktop":return!this.isMobile;case!0:return this.isOverflowing||Math.abs(this.scrollOffset)>0;case"mobile":return this.isMobile||this.isOverflowing||Math.abs(this.scrollOffset)>0;default:return!this.isMobile&&(this.isOverflowing||Math.abs(this.scrollOffset)>0)}},hasNext:function(){if(!this.hasAffixes)return!1;var t=this.widths,e=t.content,s=t.wrapper;return e>Math.abs(this.scrollOffset)+s},hasPrev:function(){return this.hasAffixes&&0!==this.scrollOffset}},watch:{internalValue:"setWidths",isOverflowing:"setWidths",scrollOffset:function(t){this.$refs.content.style.transform="translateX(".concat(-t,"px)")}},beforeUpdate:function(){this.internalItemsLength=(this.$children||[]).length},updated:function(){this.internalItemsLength!==(this.$children||[]).length&&this.setWidths()},methods:{genNext:function(){var t=this,e=this.$scopedSlots.next?this.$scopedSlots.next({}):this.$slots.next||this.__cachedNext;return this.$createElement("div",{staticClass:"v-slide-group__next",class:{"v-slide-group__next--disabled":!this.hasNext},on:{click:function(){return t.onAffixClick("next")}},key:"next"},[e])},genContent:function(){return this.$createElement("div",{staticClass:"v-slide-group__content",ref:"content"},this.$slots.default)},genData:function(){return{class:this.classes,directives:[{name:"resize",value:this.onResize}]}},genIcon:function(t){var e=t;this.$vuetify.rtl&&"prev"===t?e="next":this.$vuetify.rtl&&"next"===t&&(e="prev");var s="".concat(t[0].toUpperCase()).concat(t.slice(1)),a=this["has".concat(s)];return this.showArrows||a?this.$createElement(i["a"],{props:{disabled:!a}},this["".concat(e,"Icon")]):null},genPrev:function(){var t=this,e=this.$scopedSlots.prev?this.$scopedSlots.prev({}):this.$slots.prev||this.__cachedPrev;return this.$createElement("div",{staticClass:"v-slide-group__prev",class:{"v-slide-group__prev--disabled":!this.hasPrev},on:{click:function(){return t.onAffixClick("prev")}},key:"prev"},[e])},genTransition:function(t){return this.$createElement(n["b"],[this.genIcon(t)])},genWrapper:function(){var t=this;return this.$createElement("div",{staticClass:"v-slide-group__wrapper",directives:[{name:"touch",value:{start:function(e){return t.overflowCheck(e,t.onTouchStart)},move:function(e){return t.overflowCheck(e,t.onTouchMove)},end:function(e){return t.overflowCheck(e,t.onTouchEnd)}}}],ref:"wrapper"},[this.genContent()])},calculateNewOffset:function(t,e,s,a){var i=s?-1:1,n=i*a+("prev"===t?-1:1)*e.wrapper;return i*Math.max(Math.min(n,e.content-e.wrapper),0)},onAffixClick:function(t){this.$emit("click:".concat(t)),this.scrollTo(t)},onResize:function(){this._isDestroyed||this.setWidths()},onTouchStart:function(t){var e=this.$refs.content;this.startX=this.scrollOffset+t.touchstartX,e.style.setProperty("transition","none"),e.style.setProperty("willChange","transform")},onTouchMove:function(t){if(this.canTouch){if(!this.isSwiping){var e=t.touchmoveX-t.touchstartX,s=t.touchmoveY-t.touchstartY;this.isSwipingHorizontal=Math.abs(e)>Math.abs(s),this.isSwiping=!0}this.isSwipingHorizontal&&(this.scrollOffset=this.startX-t.touchmoveX,document.documentElement.style.overflowY="hidden")}},onTouchEnd:function(){if(this.canTouch){var t=this.$refs,e=t.content,s=t.wrapper,a=e.clientWidth-s.clientWidth;e.style.setProperty("transition",null),e.style.setProperty("willChange",null),this.$vuetify.rtl?this.scrollOffset>0||!this.isOverflowing?this.scrollOffset=0:this.scrollOffset<=-a&&(this.scrollOffset=-a):this.scrollOffset<0||!this.isOverflowing?this.scrollOffset=0:this.scrollOffset>=a&&(this.scrollOffset=a),this.isSwiping=!1,document.documentElement.style.removeProperty("overflow-y")}},overflowCheck:function(t,e){t.stopPropagation(),this.isOverflowing&&e(t)},scrollIntoView:function(){if(!this.selectedItem&&this.items.length){var t=this.items[this.items.length-1].$el.getBoundingClientRect(),e=this.$refs.wrapper.getBoundingClientRect();(this.$vuetify.rtl&&e.right<t.right||!this.$vuetify.rtl&&e.left>t.left)&&this.scrollTo("prev")}this.selectedItem&&(0===this.selectedIndex||!this.centerActive&&!this.isOverflowing?this.scrollOffset=0:this.centerActive?this.scrollOffset=this.calculateCenteredOffset(this.selectedItem.$el,this.widths,this.$vuetify.rtl):this.isOverflowing&&(this.scrollOffset=this.calculateUpdatedOffset(this.selectedItem.$el,this.widths,this.$vuetify.rtl,this.scrollOffset)))},calculateUpdatedOffset:function(t,e,s,a){var i=t.clientWidth,n=s?e.content-t.offsetLeft-i:t.offsetLeft;s&&(a=-a);var c=e.wrapper+a,o=i+n,r=.4*i;return n<=a?a=Math.max(n-r,0):c<=o&&(a=Math.min(a-(c-o-r),e.content-e.wrapper)),s?-a:a},calculateCenteredOffset:function(t,e,s){var a=t.offsetLeft,i=t.clientWidth;if(s){var n=e.content-a-i/2-e.wrapper/2;return-Math.min(e.content-e.wrapper,Math.max(0,n))}var c=a+i/2-e.wrapper/2;return Math.min(e.content-e.wrapper,Math.max(0,c))},scrollTo:function(t){this.scrollOffset=this.calculateNewOffset(t,{content:this.$refs.content?this.$refs.content.clientWidth:0,wrapper:this.$refs.wrapper?this.$refs.wrapper.clientWidth:0},this.$vuetify.rtl,this.scrollOffset)},setWidths:function(){var t=this;window.requestAnimationFrame((function(){var e=t.$refs,s=e.content,a=e.wrapper;t.widths={content:s?s.clientWidth:0,wrapper:a?a.clientWidth:0},t.isOverflowing=t.widths.wrapper+1<t.widths.content,t.scrollIntoView()}))}},render:function(t){return t("div",this.genData(),[this.genPrev(),this.genWrapper(),this.genNext()])}});e["a"]=$.extend({name:"v-slide-group",provide:function(){return{slideGroup:this}}})},"8adc":function(t,e,s){},"8ce9":function(t,e,s){},"98ed":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("v-container",{staticClass:"centered-horizontal",staticStyle:{width:"80vw"},attrs:{flex:""}},[s("h1",[t._v(t._s(t.$t("prompt-challenge")))]),t.player1Status||t.player2Status?s("v-container",{attrs:{app:"",color:"transparent",inset:""}},[s("v-container",{staticStyle:{display:"flex","flex-direction":"column"}},[t.canceled?s("div",{staticClass:"overlay on-element"},[t._v(" "+t._s(t.$t("challenge-became-not-available"))+" ")]):t._e(),t.player1Status?s("v-container",{staticClass:"mb-0 pa-0"},[s("p",{staticStyle:{float:"left"}},[s("b",[t._v("P"),s("sub",[t._v("1")])]),t._v("："+t._s(t.player1Status.username)+" ")]),s("p",{staticStyle:{float:"right"}},[s("strong",{staticClass:"pr-2"},[s("v-icon",{attrs:{color:t.player1Status.emulator?"green":"red"}},[t._v("mdi-switch")])],1),s("strong",{staticClass:"pr-2"},[s("v-icon",{attrs:{color:"PLAYING"==t.player1Status.status?"green":"red"}},[t._v("mdi-state-machine")]),t._v(" "+t._s(t.player1Status.status)+" ")],1),s("strong",{staticClass:"pr-2"},[s("v-icon",{attrs:{color:"PLAYER1"==t.player1Status.side?"green":"red"}},[t._v("mdi-account")]),t._v(" "+t._s(t.player1Status.side)+" ")],1)])]):t._e(),t.player2Status?s("v-container",{staticClass:"mb-0 pa-0"},[s("p",{staticStyle:{float:"left"}},[s("b",[t._v("P"),s("sub",[t._v("2")])]),t._v("："+t._s(t.player2Status.username)+" ")]),s("p",{staticStyle:{float:"right"}},[s("strong",{staticClass:"pr-2"},[s("v-icon",{attrs:{color:t.player2Status.emulator?"green":"red"}},[t._v("mdi-switch")])],1),s("strong",{staticClass:"pr-2"},[s("v-icon",{attrs:{color:"PLAYING"==t.player2Status.status?"green":"red"}},[t._v("mdi-state-machine")]),t._v(" "+t._s(t.player2Status.status)+" ")],1),s("strong",{staticClass:"pr-2"},[s("v-icon",{attrs:{color:"PLAYER2"==t.player2Status.side?"green":"red"}},[t._v("mdi-account")]),t._v(" "+t._s(t.player2Status.side)+" ")],1)])]):t._e()],1),s("v-slide-group",{staticClass:"pa-2",attrs:{multiple:"","show-arrows":""}},t._l(t.spectators,(function(e){return s("v-slide-item",{key:e},[s("v-chip",{staticClass:"mx-2 text-none"},[t._v(" "+t._s(e)+" ")])],1)})),1),s("v-divider",{staticClass:"mt-0"})],1):t._e(),s("v-container",[t.canceled||this.spectating?t._e():s("v-btn",{staticClass:"pr-4",staticStyle:{width:"100%"},attrs:{color:"error"},on:{click:t.cancel_challenge}},[t._v(t._s(t.$t("challenge-cancel")))]),t.canceled?s("v-btn",{staticClass:"pr-4",staticStyle:{width:"100%","z-index":"100"},attrs:{to:"/channel/?name="+t.channel_current}},[t._v(t._s(t.$t("common-back-to",[this.channel_current])))]):t._e()],1),s("ul",{directives:[{name:"chat-scroll",rawName:"v-chat-scroll",value:{always:!1,smooth:!0},expression:"{ always: false, smooth: true }"}],staticClass:"log-view pt-0"},t._l(t.logs,(function(e){return s("li",{key:e.id,staticClass:"log-message",style:"color:"+t.logColors[e.level]},[e.islink?t._e():s("div",[t._v(" ["+t._s(e.level)+"] "+t._s(t.Utils.getDateString(e.ts))+" "+t._s(e.msg)+" ")]),e.islink&&!t.canceled?s("div",[s("v-btn",{key:t.statusUpdateKey,staticStyle:{width:"100%",height:"48px"},attrs:{disabled:t.spectating&&!t.getIsReadyForSpectating(),color:"primary"},on:{click:function(e){return t.launchPrecursor(e)}}},[t._v(" "+t._s(t.spectating&&!t.getIsReadyForSpectating()?t.$t("challenge-waiting-for-player"):t.$t("challenge-join-match"))+" ")])],1):t._e()])})),0),s("div",{staticStyle:{display:"flex"}},[s("v-text-field",{attrs:{placeholder:(t.opponent?t.$t("chat-private-message"):t.$t("chat-channel-message"))+" [Enter]"},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.send(t.opponent)}},model:{value:t.chatMessage,callback:function(e){t.chatMessage=e},expression:"chatMessage"}})],1)],1),t.globalStatus.match&&t.globalStatus.match.characters?s("div",{key:t.statusUpdateKey,staticClass:"left-fixed"},[s("img",{staticClass:"portrait",staticStyle:{left:"0"},attrs:{src:"/portraits/"+this.channel_current+"/p1/"+this.globalStatus.match.characters.p1}}),s("img",{staticClass:"portrait",staticStyle:{right:"0"},attrs:{src:"/portraits/"+this.channel_current+"/p2/"+this.globalStatus.match.characters.p2}})]):t._e()],1)},i=[],n=s("5530"),c=s("b85c"),o=(s("b0c0"),s("99af"),s("4c53"),s("2f62")),r=s("57f5"),l=s("90b9"),h=s("44ae"),u={props:["challenging","challenger","spectating"],data:function(){return{logs:[],logId:0,logColors:{D:"blue",I:"green",E:"red"},chatMessage:void 0,quark:void 0,spectators:[],player1Status:{},player2Status:{},globalStatus:{},statusUpdateKey:0,canceled:!1,sub:void 0,Utils:l["a"]}},methods:{getIsReadyForSpectating:function(){return this.player1Status&&this.player2Status&&this.player1Status.emulator&&this.player2Status.emulator},getChannelObject:function(t){var e,s=Object(c["a"])(this.channels);try{for(s.s();!(e=s.n()).done;){var a=e.value;if(a.name==t)return a}}catch(i){s.e(i)}finally{s.f()}},launchPrecursor:function(t){console.log(this.channels),t.currentTarget.classList.remove("primary");var e=this.getChannelObject(this.channel_current),s="".concat(e.rom,",").concat(document.location.host).concat(document.location.pathname,"@").concat(this.quark);this.opponent&&(s="moscade://match,".concat(s,"/")),this.spectating&&(s="moscade://spectate,".concat(s,"/")),console.log("[CHALLENGE] Opening MOSCADE URI",s),window.open(s)},log:function(t,e){var s=arguments.length>2&&void 0!==arguments[2]&&arguments[2];this.logs.push({id:this.logId++,ts:(new Date).getTime(),level:t,msg:e,islink:s})},send:function(t){var e=this;t?this.$store.dispatch(r["h"],{username:this.opponent,message:this.chatMessage}).then((function(){console.log("[CHAT] PM Sent:",e.chatMessage),e.chatMessage=""})).catch((function(t){e.showError("".concat(e.$t("chat-private-message-send-failed")," ").concat(t))})):this.$store.dispatch(r["d"],this.chatMessage).then((function(){console.log("[CHAT] Channel chat:",e.chatMessage),e.chatMessage=""}))},spectate:function(){var t=this;this.log("I",this.$t("challenge-spectate-match",[this.spectating])),this.$store.dispatch(r["n"],this.spectating).catch((function(e){t.log("E",t.$t("challenge-spectate-match-failed",[e])),t.canceled=!0}))},cancel_challenge:function(){var t=this;this.$store.dispatch(r["c"],this.opponent).then((function(){t.log("E",t.$t("challenge-canceled-by-remote")),t.canceled=!0})).catch((function(e){t.log("E",t.$t("challenge-cancel-failed",[e])),t.canceled=!0}))},send_challenge:function(){var t=this;this.log("D",this.$t("challenge-challenging-opponent",[this.opponent])),this.$store.dispatch(r["m"],this.opponent).then((function(){t.log("I",t.$t("challenge-challenge-sent"))})).catch((function(e){t.log("E",t.$t("challenge-challenging-opponent-failed",[e])),t.canceled=!0}))},accept_challenge:function(){var t=this;this.log("D",this.$t("challenge-challenge-accept-from",[this.opponent])),this.$store.dispatch(r["a"],this.opponent).catch((function(e){t.log("E",t.$t("challenge-failed-to-accept-from",[e])),t.canceled=!0}))},onload:function(){var t=this;this.log("D",this.$t("challenge-hello-message",[this.username])),this.sub||(this.sub=this.$store.subscribeAction((function(e){e.type==h["m"]&&(t.spectators=e.payload),e.type==h["o"]&&(t.quark=e.payload.quark,t.log("I",t.$t("challenge-quark-for-spectating",[e.payload.quark])),t.log("I",t.quark,!0),t.statusUpdateKey+=1),e.type!=h["d"]&&e.type!=h["g"]||t.log("I",t.$t("challenge-chat-new-message",[e.type==h["d"]?t.$t("chat-channel-message"):t.$t("chat-ingame-message"),e.payload.username,e.payload.message])),e.type==h["k"]&&t.log("I",t.$t("challenge-chat-pm",[e.payload.sender,e.payload.message])),e.type!=h["c"]&&e.type!=h["j"]&&e.type!=h["e"]||(t.log("E",t.$t("challenge-became-not-available")),"PLAYING"==t.player1Status.status||"PLAYING"==t.player2Status.status?t.log("E",t.$t("challenge-cancel-reason-client-quit")):t.log("E",t.$t("challenge-cancel-reason-unknown",[e.type])),t.canceled=!0,t.statusUpdateKey+=1),e.type==h["a"]&&(t.quark=e.payload,t.log("I",t.$t("challenge-quark-for-match",[t.quark])),t.log("I",t.quark,!0),t.statusUpdateKey+=1),e.type==h["n"]&&(t.player1Status&&(e.payload.username==t.player1Status.username||"PLAYER1"==e.payload.side)&&(t.player1Status=e.payload),t.globalStatus=e.payload,t.player2Status&&(e.payload.username==t.player2Status.username||"PLAYER2"==e.payload.side)&&(t.player2Status=e.payload),t.player1Status&&t.player2Status&&l["a"].setPageTitle(t.$t("title-challenge",[t.player1Status.username,t.player2Status.username])),t.statusUpdateKey+=1)}))),this.challenging&&this.send_challenge(),this.challenger&&this.accept_challenge(),this.spectating&&this.spectate()}},computed:Object(n["a"])(Object(n["a"])({},Object(o["c"])(["channel_current","channel_users","channels","username","connected"])),{},{opponent:function(){return this.challenging?this.challenging:this.challenger}}),destroy:function(){this.sub&&this.sub()},mounted:function(){l["a"].setPageTitle(this.$t("challenge-waiting-for-player")),this.connected&&this.onload()},watch:{connected:function(){this.connected&&this.onload()}}},p=u,d=s("2877"),f=s("6544"),v=s.n(f),g=s("8336"),m=s("cc20"),y=s("a523"),b=s("ce7e"),w=s("132d"),_=s("7efd"),$=s("9dbe"),S=s("8654"),O=Object(d["a"])(p,a,i,!1,null,null,null);e["default"]=O.exports;v()(O,{VBtn:g["a"],VChip:m["a"],VContainer:y["a"],VDivider:b["a"],VIcon:w["a"],VSlideGroup:_["a"],VSlideItem:$["a"],VTextField:S["a"]})},"9dbe":function(t,e,s){"use strict";var a=s("ade3"),i=s("4e82"),n=s("58df"),c=s("d9bd"),o=s("2b0e"),r=o["a"].extend({props:{activeClass:String,value:{required:!1}},data:function(){return{isActive:!1}},methods:{toggle:function(){this.isActive=!this.isActive}},render:function(){return this.$scopedSlots.default?(this.$scopedSlots.default&&(t=this.$scopedSlots.default({active:this.isActive,toggle:this.toggle})),Array.isArray(t)&&1===t.length&&(t=t[0]),t&&!Array.isArray(t)&&t.tag?(t.data=this._b(t.data||{},t.tag,{class:Object(a["a"])({},this.activeClass,this.isActive)}),t):(Object(c["c"])("v-item should only contain a single element",this),t)):(Object(c["c"])("v-item is missing a default scopedSlot",this),null);var t}});Object(n["a"])(r,Object(i["a"])("itemGroup","v-item","v-item-group")).extend({name:"v-item"}),e["a"]=Object(n["a"])(r,Object(i["a"])("slideGroup")).extend({name:"v-slide-item"})},cc20:function(t,e,s){"use strict";var a=s("3835"),i=s("5530"),n=(s("4de4"),s("8adc"),s("58df")),c=s("0789"),o=s("9d26"),r=s("a9ad"),l=s("4e82"),h=s("7560"),u=s("f2e7"),p=s("1c87"),d=s("af2b"),f=s("d9bd");e["a"]=Object(n["a"])(r["a"],d["a"],p["a"],h["a"],Object(l["a"])("chipGroup"),Object(u["b"])("inputValue")).extend({name:"v-chip",props:{active:{type:Boolean,default:!0},activeClass:{type:String,default:function(){return this.chipGroup?this.chipGroup.activeClass:""}},close:Boolean,closeIcon:{type:String,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},disabled:Boolean,draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:Boolean,outlined:Boolean,pill:Boolean,tag:{type:String,default:"span"},textColor:String,value:null},data:function(){return{proxyClass:"v-chip--active"}},computed:{classes:function(){return Object(i["a"])(Object(i["a"])(Object(i["a"])(Object(i["a"])({"v-chip":!0},p["a"].options.computed.classes.call(this)),{},{"v-chip--clickable":this.isClickable,"v-chip--disabled":this.disabled,"v-chip--draggable":this.draggable,"v-chip--label":this.label,"v-chip--link":this.isLink,"v-chip--no-color":!this.color,"v-chip--outlined":this.outlined,"v-chip--pill":this.pill,"v-chip--removable":this.hasClose},this.themeClasses),this.sizeableClasses),this.groupClasses)},hasClose:function(){return Boolean(this.close)},isClickable:function(){return Boolean(p["a"].options.computed.isClickable.call(this)||this.chipGroup)}},created:function(){var t=this,e=[["outline","outlined"],["selected","input-value"],["value","active"],["@input","@active.sync"]];e.forEach((function(e){var s=Object(a["a"])(e,2),i=s[0],n=s[1];t.$attrs.hasOwnProperty(i)&&Object(f["a"])(i,n,t)}))},methods:{click:function(t){this.$emit("click",t),this.chipGroup&&this.toggle()},genFilter:function(){var t=[];return this.isActive&&t.push(this.$createElement(o["a"],{staticClass:"v-chip__filter",props:{left:!0}},this.filterIcon)),this.$createElement(c["a"],t)},genClose:function(){var t=this;return this.$createElement(o["a"],{staticClass:"v-chip__close",props:{right:!0,size:18},attrs:{"aria-label":this.$vuetify.lang.t(this.closeLabel)},on:{click:function(e){e.stopPropagation(),e.preventDefault(),t.$emit("click:close"),t.$emit("update:active",!1)}}},this.closeIcon)},genContent:function(){return this.$createElement("span",{staticClass:"v-chip__content"},[this.filter&&this.genFilter(),this.$slots.default,this.hasClose&&this.genClose()])}},render:function(t){var e=[this.genContent()],s=this.generateRouteLink(),a=s.tag,n=s.data;n.attrs=Object(i["a"])(Object(i["a"])({},n.attrs),{},{draggable:this.draggable?"true":void 0,tabindex:this.chipGroup&&!this.disabled?0:n.attrs.tabindex}),n.directives.push({name:"show",value:this.active}),n=this.setBackgroundColor(this.color,n);var c=this.textColor||this.outlined&&this.color;return t(a,this.setTextColor(c,n),e)}})},ce7e:function(t,e,s){"use strict";var a=s("5530"),i=(s("8ce9"),s("7560"));e["a"]=i["a"].extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render:function(t){var e;return this.$attrs.role&&"separator"!==this.$attrs.role||(e=this.vertical?"vertical":"horizontal"),t("hr",{class:Object(a["a"])({"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical},this.themeClasses),attrs:Object(a["a"])({role:"separator","aria-orientation":e},this.$attrs),on:this.$listeners})}})}}]);
//# sourceMappingURL=chunk-072d6cb6.58ccad0c.js.map