webpackJsonp([8],{0:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}var r=n(11),i=o(r),u=n(754),a=o(u);new i.default({el:"body",components:{App:a.default}})},20:function(t,e,n){t.exports=!n(32)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},21:function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},22:function(t,e){var n=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},27:function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},29:function(t,e,n){var o=n(33),r=n(56),i=n(48),u=Object.defineProperty;e.f=n(20)?Object.defineProperty:function(t,e,n){if(o(t),e=i(e,!0),o(n),r)try{return u(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},32:function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},33:function(t,e,n){var o=n(27);t.exports=function(t){if(!o(t))throw TypeError(t+" is not an object!");return t}},34:function(t,e,n){var o=n(29),r=n(42);t.exports=n(20)?function(t,e,n){return o.f(t,e,r(1,n))}:function(t,e,n){return t[e]=n,t}},37:function(t,e,n){var o=n(21),r=n(22),i=n(41),u=n(34),a="prototype",s=function(t,e,n){var c,d,f,l=t&s.F,p=t&s.G,v=t&s.S,h=t&s.P,m=t&s.B,w=t&s.W,y=p?r:r[e]||(r[e]={}),b=y[a],_=p?o:v?o[e]:(o[e]||{})[a];p&&(n=e);for(c in n)d=!l&&_&&void 0!==_[c],d&&c in y||(f=d?_[c]:n[c],y[c]=p&&"function"!=typeof _[c]?n[c]:m&&d?i(f,o):w&&_[c]==f?function(t){var e=function(e,n,o){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,o)}return t.apply(this,arguments)};return e[a]=t[a],e}(f):h&&"function"==typeof f?i(Function.call,f):f,h&&((y.virtual||(y.virtual={}))[c]=f,t&s.R&&b&&!b[c]&&u(b,c,f)))};s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,t.exports=s},41:function(t,e,n){var o=n(46);t.exports=function(t,e,n){if(o(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,o){return t.call(e,n,o)};case 3:return function(n,o,r){return t.call(e,n,o,r)}}return function(){return t.apply(e,arguments)}}},42:function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},46:function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},47:function(t,e,n){var o=n(27),r=n(21).document,i=o(r)&&o(r.createElement);t.exports=function(t){return i?r.createElement(t):{}}},48:function(t,e,n){var o=n(27);t.exports=function(t,e){if(!o(t))return t;var n,r;if(e&&"function"==typeof(n=t.toString)&&!o(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!o(r=n.call(t)))return r;if(!e&&"function"==typeof(n=t.toString)&&!o(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")}},56:function(t,e,n){t.exports=!n(20)&&!n(32)(function(){return 7!=Object.defineProperty(n(47)("div"),"a",{get:function(){return 7}}).a})},82:function(t,e,n){t.exports={default:n(84),__esModule:!0}},83:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var r=n(82),i=o(r);e.default=function(t,e,n){return e in t?(0,i.default)(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},84:function(t,e,n){n(87);var o=n(22).Object;t.exports=function(t,e,n){return o.defineProperty(t,e,n)}},87:function(t,e,n){var o=n(37);o(o.S+o.F*!n(20),"Object",{defineProperty:n(29).f})},284:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(83),i=o(r),u=n(2),a=o(u),s=n(4);a.default.Vue.use(a.default.Resource),a.default.Vue.component(s.Field.name,s.Field),a.default.Vue.component(s.Cell.name,s.Cell),e.default={data:function(){var t;return t={logobig:a.default.C.baseimg.logobig,tel:"",password:"",from:"mobile",time1:"60",timer1:"",timershow1:!0,code1:""},(0,i.default)(t,"password",""),(0,i.default)(t,"password2",""),(0,i.default)(t,"password3",""),(0,i.default)(t,"account",""),t},components:{},ready:function(){},methods:{bind:function(){var t=a.default.C.Mpath+"wap/bind?tel="+this.account+"&password="+this.password2;return this.code1?void this.$http.jsonp(a.default.C.Mpath+"login/checkCodeExist?tel="+this.account+"&code="+this.code1).then(function(e){if(e.data){if(!this.testPass(this.password2)||!this.testPass(this.password3))return!1;if(this.password2!=this.password3)return(0,s.Toast)("2次输入的密码不一致"),!1;this.$http.jsonp(t).then(function(t){1==t.data.status?((0,s.Toast)(t.data.message),setTimeout(function(){window.location.href="home.html"},1e3)):(0,s.Toast)(t.data.message)})}else(0,s.Toast)("验证码错误")}):((0,s.Toast)("验证码不能为空"),!1)},testTel:function(t){var e=/^1[3|4|5|7|8]\d{9}$/;return!(!e.test(t)||""==t)||((0,s.Toast)("请输入正确的手机号码"),!1)},testPass:function(t){var e=/^[a-zA-Z]\w{5,17}$/;return!!e.test(t)||((0,s.Toast)("请填写正确的登录密码"),!1)},getCode1:function(){return!!this.testTel(this.account)&&void this.$http.jsonp("http://api.yiduoyun.com/login/ajaxSendVerifyCode?mobile="+this.account+"&tempid=1").then(function(t){1==t.data.status?((0,s.Toast)("验证码已发送"),this.timershow1=!1,this.timer1=setInterval(this.countDown1,1e3)):(0,s.Toast)(t.data.status)})},countDown1:function(){this.time1--,0==this.time1&&(clearInterval(this.timer1),this.time1=60,this.timershow1=!0)}}}},617:function(t,e){},684:function(t,e){t.exports=' <div class=scroll-bg _v-03d1dda2=""> <div class=centerbox _v-03d1dda2=""> <div class=logo _v-03d1dda2=""> <img :src=logobig alt=艺朵云 _v-03d1dda2=""> </div> <ul class=list _v-03d1dda2=""> <mt-cell title=密码规则：字母开头，6~18位的字母、数字和下划线 _v-03d1dda2=""></mt-cell> <mt-field placeholder=输入手机号码 :value.sync=account type=tel :attr={maxlength:11} _v-03d1dda2=""></mt-field> <mt-field placeholder=输入验证码 :value.sync=code1 _v-03d1dda2=""> <span class=get @click=getCode1 v-if=timershow1 _v-03d1dda2="">获取验证码</span> <span class=get v-else="" _v-03d1dda2="">{{time1}}秒</span> </mt-field> <mt-field placeholder=输入登录密码 type=password :attr={minlength:6,maxlength:18} :value.sync=password2 _v-03d1dda2=""></mt-field> <mt-field placeholder=确认登录密码 type=password :attr={minlength:6,maxlength:18} :value.sync=password3 _v-03d1dda2=""></mt-field> <div class=page-button _v-03d1dda2=""> <button class="mint-button mint-button--primary mint-button--normal" @click=bind _v-03d1dda2="">马上绑定</button> </div> </ul> </div> </div> '},754:function(t,e,n){var o,r,i={};n(617),o=n(284),r=n(684),t.exports=o||{},t.exports.__esModule&&(t.exports=t.exports.default);var u="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;r&&(u.template=r),u.computed||(u.computed={}),Object.keys(i).forEach(function(t){var e=i[t];u.computed[t]=function(){return e}})}});