(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-69475355"],{"0481":function(t,e,n){"use strict";var i=n("23e7"),a=n("a2bf"),r=n("7b0b"),s=n("50c4"),o=n("a691"),l=n("65f0");i({target:"Array",proto:!0},{flat:function(){var t=arguments.length?arguments[0]:void 0,e=r(this),n=s(e.length),i=l(e,0);return i.length=a(i,e,e,n,0,void 0===t?1:o(t)),i}})},"0789":function(t,e,n){"use strict";n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return d})),n.d(e,"a",(function(){return h}));n("99af");var i=n("d9f7");function a(){for(var t,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length,i=new Array(n>1?n-1:0),a=1;a<n;a++)i[a-1]=arguments[a];return(t=Array()).concat.apply(t,[e].concat(i))}function r(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"top center 0",n=arguments.length>2?arguments[2]:void 0;return{name:t,functional:!0,props:{group:{type:Boolean,default:!1},hideOnLeave:{type:Boolean,default:!1},leaveAbsolute:{type:Boolean,default:!1},mode:{type:String,default:n},origin:{type:String,default:e}},render:function(e,n){var r="transition".concat(n.props.group?"-group":""),s={props:{name:t,mode:n.props.mode},on:{beforeEnter:function(t){t.style.transformOrigin=n.props.origin,t.style.webkitTransformOrigin=n.props.origin}}};return n.props.leaveAbsolute&&(s.on.leave=a(s.on.leave,(function(t){var e=t.offsetTop,n=t.offsetLeft,i=t.offsetWidth,a=t.offsetHeight;t._transitionInitialStyles={position:t.style.position,top:t.style.top,left:t.style.left,width:t.style.width,height:t.style.height},t.style.position="absolute",t.style.top=e+"px",t.style.left=n+"px",t.style.width=i+"px",t.style.height=a+"px"})),s.on.afterLeave=a(s.on.afterLeave,(function(t){if(t&&t._transitionInitialStyles){var e=t._transitionInitialStyles,n=e.position,i=e.top,a=e.left,r=e.width,s=e.height;delete t._transitionInitialStyles,t.style.position=n||"",t.style.top=i||"",t.style.left=a||"",t.style.width=r||"",t.style.height=s||""}}))),n.props.hideOnLeave&&(s.on.leave=a(s.on.leave,(function(t){t._initialDisplay=t.style.display,t.style.display="none"})),s.on.afterLeave=a(s.on.afterLeave,(function(t){t&&(t.style.display=t._initialDisplay||"")}))),e(r,Object(i["a"])(n.data,s),n.children)}}}function s(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"in-out";return{name:t,functional:!0,props:{mode:{type:String,default:n}},render:function(n,a){return n("transition",Object(i["a"])(a.data,{props:{name:t},on:e}),a.children)}}}var o=n("ade3"),l=n("80d2"),c=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=e?"width":"height",i="offset".concat(Object(l["u"])(n));return{beforeEnter:function(t){t._parent=t.parentNode,t._initialStyle=Object(o["a"])({transition:t.style.transition,overflow:t.style.overflow},n,t.style[n])},enter:function(e){var a=e._initialStyle;e.style.setProperty("transition","none","important"),e.style.overflow="hidden";var r="".concat(e[i],"px");e.style[n]="0",e.offsetHeight,e.style.transition=a.transition,t&&e._parent&&e._parent.classList.add(t),requestAnimationFrame((function(){e.style[n]=r}))},afterEnter:r,enterCancelled:r,leave:function(t){t._initialStyle=Object(o["a"])({transition:"",overflow:t.style.overflow},n,t.style[n]),t.style.overflow="hidden",t.style[n]="".concat(t[i],"px"),t.offsetHeight,requestAnimationFrame((function(){return t.style[n]="0"}))},afterLeave:a,leaveCancelled:a};function a(e){t&&e._parent&&e._parent.classList.remove(t),r(e)}function r(t){var e=t._initialStyle[n];t.style.overflow=t._initialStyle.overflow,null!=e&&(t.style[n]=e),delete t._initialStyle}},u=(r("carousel-transition"),r("carousel-reverse-transition"),r("tab-transition"),r("tab-reverse-transition"),r("menu-transition"),r("fab-transition","center center","out-in"),r("dialog-transition"),r("dialog-bottom-transition"),r("dialog-top-transition"),r("fade-transition")),d=(r("scale-transition"),r("scroll-x-transition"),r("scroll-x-reverse-transition"),r("scroll-y-transition"),r("scroll-y-reverse-transition"),r("slide-x-transition")),h=(r("slide-x-reverse-transition"),r("slide-y-transition"),r("slide-y-reverse-transition"),s("expand-transition",c()),s("expand-x-transition",c("",!0)))},"297c":function(t,e,n){"use strict";n("a9e3");var i=n("2b0e"),a=n("5530"),r=n("ade3"),s=(n("c7cd"),n("6ece"),n("0789")),o=n("90a2"),l=n("a9ad"),c=n("fe6c"),u=n("a452"),d=n("7560"),h=n("80d2"),f=n("58df"),v=Object(f["a"])(l["a"],Object(c["b"])(["absolute","fixed","top","bottom"]),u["a"],d["a"]),p=v.extend({name:"v-progress-linear",directives:{intersect:o["a"]},props:{active:{type:Boolean,default:!0},backgroundColor:{type:String,default:null},backgroundOpacity:{type:[Number,String],default:null},bufferValue:{type:[Number,String],default:100},color:{type:String,default:"primary"},height:{type:[Number,String],default:4},indeterminate:Boolean,query:Boolean,reverse:Boolean,rounded:Boolean,stream:Boolean,striped:Boolean,value:{type:[Number,String],default:0}},data:function(){return{internalLazyValue:this.value||0,isVisible:!0}},computed:{__cachedBackground:function(){return this.$createElement("div",this.setBackgroundColor(this.backgroundColor||this.color,{staticClass:"v-progress-linear__background",style:this.backgroundStyle}))},__cachedBar:function(){return this.$createElement(this.computedTransition,[this.__cachedBarType])},__cachedBarType:function(){return this.indeterminate?this.__cachedIndeterminate:this.__cachedDeterminate},__cachedBuffer:function(){return this.$createElement("div",{staticClass:"v-progress-linear__buffer",style:this.styles})},__cachedDeterminate:function(){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__determinate",style:{width:Object(h["f"])(this.normalizedValue,"%")}}))},__cachedIndeterminate:function(){return this.$createElement("div",{staticClass:"v-progress-linear__indeterminate",class:{"v-progress-linear__indeterminate--active":this.active}},[this.genProgressBar("long"),this.genProgressBar("short")])},__cachedStream:function(){return this.stream?this.$createElement("div",this.setTextColor(this.color,{staticClass:"v-progress-linear__stream",style:{width:Object(h["f"])(100-this.normalizedBuffer,"%")}})):null},backgroundStyle:function(){var t,e=null==this.backgroundOpacity?this.backgroundColor?1:.3:parseFloat(this.backgroundOpacity);return t={opacity:e},Object(r["a"])(t,this.isReversed?"right":"left",Object(h["f"])(this.normalizedValue,"%")),Object(r["a"])(t,"width",Object(h["f"])(Math.max(0,this.normalizedBuffer-this.normalizedValue),"%")),t},classes:function(){return Object(a["a"])({"v-progress-linear--absolute":this.absolute,"v-progress-linear--fixed":this.fixed,"v-progress-linear--query":this.query,"v-progress-linear--reactive":this.reactive,"v-progress-linear--reverse":this.isReversed,"v-progress-linear--rounded":this.rounded,"v-progress-linear--striped":this.striped,"v-progress-linear--visible":this.isVisible},this.themeClasses)},computedTransition:function(){return this.indeterminate?s["b"]:s["c"]},isReversed:function(){return this.$vuetify.rtl!==this.reverse},normalizedBuffer:function(){return this.normalize(this.bufferValue)},normalizedValue:function(){return this.normalize(this.internalLazyValue)},reactive:function(){return Boolean(this.$listeners.change)},styles:function(){var t={};return this.active||(t.height=0),this.indeterminate||100===parseFloat(this.normalizedBuffer)||(t.width=Object(h["f"])(this.normalizedBuffer,"%")),t}},methods:{genContent:function(){var t=Object(h["l"])(this,"default",{value:this.internalLazyValue});return t?this.$createElement("div",{staticClass:"v-progress-linear__content"},t):null},genListeners:function(){var t=this.$listeners;return this.reactive&&(t.click=this.onClick),t},genProgressBar:function(t){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__indeterminate",class:Object(r["a"])({},t,!0)}))},onClick:function(t){if(this.reactive){var e=this.$el.getBoundingClientRect(),n=e.width;this.internalValue=t.offsetX/n*100}},onObserve:function(t,e,n){this.isVisible=n},normalize:function(t){return t<0?0:t>100?100:parseFloat(t)}},render:function(t){var e={staticClass:"v-progress-linear",attrs:{role:"progressbar","aria-valuemin":0,"aria-valuemax":this.normalizedBuffer,"aria-valuenow":this.indeterminate?void 0:this.normalizedValue},class:this.classes,directives:[{name:"intersect",value:this.onObserve}],style:{bottom:this.bottom?0:void 0,height:this.active?Object(h["f"])(this.height):0,top:this.top?0:void 0},on:this.genListeners()};return t("div",e,[this.__cachedStream,this.__cachedBackground,this.__cachedBuffer,this.__cachedBar,this.genContent()])}}),g=p;e["a"]=i["a"].extend().extend({name:"loadable",props:{loading:{type:[Boolean,String],default:!1},loaderHeight:{type:[Number,String],default:2}},methods:{genProgress:function(){return!1===this.loading?null:this.$slots.progress||this.$createElement(g,{props:{absolute:!0,color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,height:this.loaderHeight,indeterminate:!0}})}}})},3010:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{staticClass:"pa-8",attrs:{fluid:""}},[n("h1",{staticClass:"mb-5"},[t._v(t._s(t.$t("title-channels")))]),t._l(t.channels,(function(e){return n("v-row",{key:e.name},[n("v-card",{staticStyle:{width:"100%","margin-top":"1vh","z-index":"2",overflow:"hidden",height:"10vh"},attrs:{to:"/channel/?name="+e.name}},[n("img",{staticClass:"hero-video",attrs:{src:t.DEVELOPMENT?"":"banners/"+e.name,autoplay:"",loop:"",muted:""}}),n("v-container",{staticClass:"hero-content"},[n("span",{staticClass:"float-left mt-5 headline font-weight-bold",staticStyle:{position:"absolute"}},[t._v(t._s(e.desc))]),n("v-chip",{key:t.channelsUpdate,staticClass:"mt-5 float-right",attrs:{color:t.channel_current==e.name?"red":"primary",label:"","text-color":"white"}},[t._v(" "+t._s(t.$t("channels-online-player-count",[e.online]))+" ")])],1)],1)],1)}))],2)},a=[],r=n("5530"),s=(n("4c53"),n("2f62")),o=n("90b9"),l=n("57f5"),c=n("a49b"),u={data:function(){return{channelsUpdate:0,sub:void 0,DEVELOPMENT:c["a"]}},computed:Object(r["a"])({},Object(s["c"])(["channels","channel_current"])),mounted:function(){var t=this;o["a"].setPageTitle(this.$t("title-channels")),this.$store.dispatch(l["i"]),this.sub=this.$store.subscribeAction((function(e){e.type==l["i"]&&t.channelsUpdate++}))},destory:function(){this.sub()}},d=u,h=n("2877"),f=n("6544"),v=n.n(f),p=n("b0af"),g=n("cc20"),b=n("a523"),y=n("ade3"),m=(n("caad"),n("2532"),n("99af"),n("b64b"),n("ac1f"),n("5319"),n("4ec9"),n("d3b7"),n("3ca3"),n("ddb0"),n("159b"),n("4b85"),n("2b0e")),_=n("d9f7"),C=n("80d2"),x=["sm","md","lg","xl"],O=["start","end","center"];function k(t,e){return x.reduce((function(n,i){return n[t+Object(C["u"])(i)]=e(),n}),{})}var j=function(t){return[].concat(O,["baseline","stretch"]).includes(t)},w=k("align",(function(){return{type:String,default:null,validator:j}})),B=function(t){return[].concat(O,["space-between","space-around"]).includes(t)},S=k("justify",(function(){return{type:String,default:null,validator:B}})),$=function(t){return[].concat(O,["space-between","space-around","stretch"]).includes(t)},E=k("alignContent",(function(){return{type:String,default:null,validator:$}})),z={align:Object.keys(w),justify:Object.keys(S),alignContent:Object.keys(E)},L={align:"align",justify:"justify",alignContent:"align-content"};function V(t,e,n){var i=L[t];if(null!=n){if(e){var a=e.replace(t,"");i+="-".concat(a)}return i+="-".concat(n),i.toLowerCase()}}var T=new Map,I=m["a"].extend({name:"v-row",functional:!0,props:Object(r["a"])(Object(r["a"])(Object(r["a"])({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:j}},w),{},{justify:{type:String,default:null,validator:B}},S),{},{alignContent:{type:String,default:null,validator:$}},E),render:function(t,e){var n=e.props,i=e.data,a=e.children,r="";for(var s in n)r+=String(n[s]);var o=T.get(r);return o||function(){var t,e;for(e in o=[],z)z[e].forEach((function(t){var i=n[t],a=V(e,t,i);a&&o.push(a)}));o.push((t={"no-gutters":n.noGutters,"row--dense":n.dense},Object(y["a"])(t,"align-".concat(n.align),n.align),Object(y["a"])(t,"justify-".concat(n.justify),n.justify),Object(y["a"])(t,"align-content-".concat(n.alignContent),n.alignContent),t)),T.set(r,o)}(),t(n.tag,Object(_["a"])(i,{staticClass:"row",class:o}),a)}}),P=Object(h["a"])(d,i,a,!1,null,null,null);e["default"]=P.exports;v()(P,{VCard:p["a"],VChip:g["a"],VContainer:b["a"],VRow:I})},"4c53":function(t,e,n){"use strict";var i=n("23e7"),a=n("857a"),r=n("af03");i({target:"String",proto:!0,forced:r("sub")},{sub:function(){return a(this,"sub","","")}})},"4ec9":function(t,e,n){"use strict";var i=n("6d61"),a=n("6566");t.exports=i("Map",(function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}}),a)},"615b":function(t,e,n){},6566:function(t,e,n){"use strict";var i=n("9bf2").f,a=n("7c73"),r=n("e2cc"),s=n("0366"),o=n("19aa"),l=n("2266"),c=n("7dd0"),u=n("2626"),d=n("83ab"),h=n("f183").fastKey,f=n("69f3"),v=f.set,p=f.getterFor;t.exports={getConstructor:function(t,e,n,c){var u=t((function(t,i){o(t,u,e),v(t,{type:e,index:a(null),first:void 0,last:void 0,size:0}),d||(t.size=0),void 0!=i&&l(i,t[c],{that:t,AS_ENTRIES:n})})),f=p(e),g=function(t,e,n){var i,a,r=f(t),s=b(t,e);return s?s.value=n:(r.last=s={index:a=h(e,!0),key:e,value:n,previous:i=r.last,next:void 0,removed:!1},r.first||(r.first=s),i&&(i.next=s),d?r.size++:t.size++,"F"!==a&&(r.index[a]=s)),t},b=function(t,e){var n,i=f(t),a=h(e);if("F"!==a)return i.index[a];for(n=i.first;n;n=n.next)if(n.key==e)return n};return r(u.prototype,{clear:function(){var t=this,e=f(t),n=e.index,i=e.first;while(i)i.removed=!0,i.previous&&(i.previous=i.previous.next=void 0),delete n[i.index],i=i.next;e.first=e.last=void 0,d?e.size=0:t.size=0},delete:function(t){var e=this,n=f(e),i=b(e,t);if(i){var a=i.next,r=i.previous;delete n.index[i.index],i.removed=!0,r&&(r.next=a),a&&(a.previous=r),n.first==i&&(n.first=a),n.last==i&&(n.last=r),d?n.size--:e.size--}return!!i},forEach:function(t){var e,n=f(this),i=s(t,arguments.length>1?arguments[1]:void 0,3);while(e=e?e.next:n.first){i(e.value,e.key,this);while(e&&e.removed)e=e.previous}},has:function(t){return!!b(this,t)}}),r(u.prototype,n?{get:function(t){var e=b(this,t);return e&&e.value},set:function(t,e){return g(this,0===t?0:t,e)}}:{add:function(t){return g(this,t=0===t?0:t,t)}}),d&&i(u.prototype,"size",{get:function(){return f(this).size}}),u},setStrong:function(t,e,n){var i=e+" Iterator",a=p(e),r=p(i);c(t,e,(function(t,e){v(this,{type:i,target:t,state:a(t),kind:e,last:void 0})}),(function(){var t=r(this),e=t.kind,n=t.last;while(n&&n.removed)n=n.previous;return t.target&&(t.last=n=n?n.next:t.state.first)?"keys"==e?{value:n.key,done:!1}:"values"==e?{value:n.value,done:!1}:{value:[n.key,n.value],done:!1}:(t.target=void 0,{value:void 0,done:!0})}),n?"entries":"values",!n,!0),u(e)}}},"6d61":function(t,e,n){"use strict";var i=n("23e7"),a=n("da84"),r=n("94ca"),s=n("6eeb"),o=n("f183"),l=n("2266"),c=n("19aa"),u=n("861d"),d=n("d039"),h=n("1c7e"),f=n("d44e"),v=n("7156");t.exports=function(t,e,n){var p=-1!==t.indexOf("Map"),g=-1!==t.indexOf("Weak"),b=p?"set":"add",y=a[t],m=y&&y.prototype,_=y,C={},x=function(t){var e=m[t];s(m,t,"add"==t?function(t){return e.call(this,0===t?0:t),this}:"delete"==t?function(t){return!(g&&!u(t))&&e.call(this,0===t?0:t)}:"get"==t?function(t){return g&&!u(t)?void 0:e.call(this,0===t?0:t)}:"has"==t?function(t){return!(g&&!u(t))&&e.call(this,0===t?0:t)}:function(t,n){return e.call(this,0===t?0:t,n),this})},O=r(t,"function"!=typeof y||!(g||m.forEach&&!d((function(){(new y).entries().next()}))));if(O)_=n.getConstructor(e,t,p,b),o.enable();else if(r(t,!0)){var k=new _,j=k[b](g?{}:-0,1)!=k,w=d((function(){k.has(1)})),B=h((function(t){new y(t)})),S=!g&&d((function(){var t=new y,e=5;while(e--)t[b](e,e);return!t.has(-0)}));B||(_=e((function(e,n){c(e,_,t);var i=v(new y,e,_);return void 0!=n&&l(n,i[b],{that:i,AS_ENTRIES:p}),i})),_.prototype=m,m.constructor=_),(w||S)&&(x("delete"),x("has"),p&&x("get")),(S||j)&&x(b),g&&m.clear&&delete m.clear}return C[t]=_,i({global:!0,forced:_!=y},C),f(_,t),g||n.setStrong(_,t,p),_}},"6ece":function(t,e,n){},"8adc":function(t,e,n){},"9d26":function(t,e,n){"use strict";var i=n("132d");e["a"]=i["a"]},a2bf:function(t,e,n){"use strict";var i=n("e8b5"),a=n("50c4"),r=n("0366"),s=function(t,e,n,o,l,c,u,d){var h,f=l,v=0,p=!!u&&r(u,d,3);while(v<o){if(v in n){if(h=p?p(n[v],v,e):n[v],c>0&&i(h))f=s(t,e,h,a(h.length),f,c-1)-1;else{if(f>=9007199254740991)throw TypeError("Exceed the acceptable array length");t[f]=h}f++}v++}return f};t.exports=s},b0af:function(t,e,n){"use strict";var i=n("5530"),a=(n("a9e3"),n("0481"),n("615b"),n("10d2")),r=n("297c"),s=n("1c87"),o=n("58df");e["a"]=Object(o["a"])(r["a"],s["a"],a["a"]).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes:function(){return Object(i["a"])(Object(i["a"])({"v-card":!0},s["a"].options.computed.classes.call(this)),{},{"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised},a["a"].options.computed.classes.call(this))},styles:function(){var t=Object(i["a"])({},a["a"].options.computed.styles.call(this));return this.img&&(t.background='url("'.concat(this.img,'") center center / cover no-repeat')),t}},methods:{genProgress:function(){var t=r["a"].options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[t]):null}},render:function(t){var e=this.generateRouteLink(),n=e.tag,i=e.data;return i.style=this.styles,this.isClickable&&(i.attrs=i.attrs||{},i.attrs.tabindex=0),t(n,this.setBackgroundColor(this.color,i),[this.genProgress(),this.$slots.default])}})},cc20:function(t,e,n){"use strict";var i=n("3835"),a=n("5530"),r=(n("4de4"),n("8adc"),n("58df")),s=n("0789"),o=n("9d26"),l=n("a9ad"),c=n("4e82"),u=n("7560"),d=n("f2e7"),h=n("1c87"),f=n("af2b"),v=n("d9bd");e["a"]=Object(r["a"])(l["a"],f["a"],h["a"],u["a"],Object(c["a"])("chipGroup"),Object(d["b"])("inputValue")).extend({name:"v-chip",props:{active:{type:Boolean,default:!0},activeClass:{type:String,default:function(){return this.chipGroup?this.chipGroup.activeClass:""}},close:Boolean,closeIcon:{type:String,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},disabled:Boolean,draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:Boolean,outlined:Boolean,pill:Boolean,tag:{type:String,default:"span"},textColor:String,value:null},data:function(){return{proxyClass:"v-chip--active"}},computed:{classes:function(){return Object(a["a"])(Object(a["a"])(Object(a["a"])(Object(a["a"])({"v-chip":!0},h["a"].options.computed.classes.call(this)),{},{"v-chip--clickable":this.isClickable,"v-chip--disabled":this.disabled,"v-chip--draggable":this.draggable,"v-chip--label":this.label,"v-chip--link":this.isLink,"v-chip--no-color":!this.color,"v-chip--outlined":this.outlined,"v-chip--pill":this.pill,"v-chip--removable":this.hasClose},this.themeClasses),this.sizeableClasses),this.groupClasses)},hasClose:function(){return Boolean(this.close)},isClickable:function(){return Boolean(h["a"].options.computed.isClickable.call(this)||this.chipGroup)}},created:function(){var t=this,e=[["outline","outlined"],["selected","input-value"],["value","active"],["@input","@active.sync"]];e.forEach((function(e){var n=Object(i["a"])(e,2),a=n[0],r=n[1];t.$attrs.hasOwnProperty(a)&&Object(v["a"])(a,r,t)}))},methods:{click:function(t){this.$emit("click",t),this.chipGroup&&this.toggle()},genFilter:function(){var t=[];return this.isActive&&t.push(this.$createElement(o["a"],{staticClass:"v-chip__filter",props:{left:!0}},this.filterIcon)),this.$createElement(s["a"],t)},genClose:function(){var t=this;return this.$createElement(o["a"],{staticClass:"v-chip__close",props:{right:!0,size:18},attrs:{"aria-label":this.$vuetify.lang.t(this.closeLabel)},on:{click:function(e){e.stopPropagation(),e.preventDefault(),t.$emit("click:close"),t.$emit("update:active",!1)}}},this.closeIcon)},genContent:function(){return this.$createElement("span",{staticClass:"v-chip__content"},[this.filter&&this.genFilter(),this.$slots.default,this.hasClose&&this.genClose()])}},render:function(t){var e=[this.genContent()],n=this.generateRouteLink(),i=n.tag,r=n.data;r.attrs=Object(a["a"])(Object(a["a"])({},r.attrs),{},{draggable:this.draggable?"true":void 0,tabindex:this.chipGroup&&!this.disabled?0:r.attrs.tabindex}),r.directives.push({name:"show",value:this.active}),r=this.setBackgroundColor(this.color,r);var s=this.textColor||this.outlined&&this.color;return t(i,this.setTextColor(s,r),e)}})}}]);
//# sourceMappingURL=chunk-69475355.54001d8d.js.map