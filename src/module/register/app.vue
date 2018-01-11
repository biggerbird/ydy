<template>
<div class="scroll-bg">
  <div class="centerbox">
  	<div class="logo">
  		<img :src="logobig" alt="艺朵云">
  	</div>
      <ul class="list">
          <li><input name="userName" placeholder="手机号码" type="text" v-model="mobile" minlength="11" maxlength="11"></li>

          <li>
          	<input name="code" placeholder="验证码" type="text" v-model="code">
          	<a  class="getcode" v-if="timershow" @click="getCode">获取</a>
          	<a  class="getcode" v-else>{{time}}秒</a>
          </li>

          <li><input name="password" placeholder="请输入密码（以字母开头，长度在6-18位之间）" type="password" v-model="password" minlength="6" maxlength="18"></li>

          <li>
            <input name="password2" placeholder="请确认密码" type="password"  v-model="password2" minlength="6" maxlength="18" @keyup.enter="register">
          </li>
      </ul>
      <div class="agree agree2">
  	    <mt-checklist :value.sync="agree" :options="[{
  		    label: '阅读并同意',
  		    value: 'true'
  		  }]">
  	    </mt-checklist>
  	    <a href="agreement.html">《艺朵云注册协议》</a>
  	</div>
      <div class="page-button">
          <button class="mint-button mint-button--primary mint-button--large" @click="register">立即注册</button>
      </div>

      <div class="login"><a href="login.html">立即登录</a></div>

  </div>
</div>
</template>

<script>
import Lib from 'assets/Lib.js'
Lib.Vue.use(Lib.Resource);
import { Toast } from 'mint-ui';
import { Checklist } from 'mint-ui';
Lib.Vue.component(Checklist.name, Checklist);
export default {
  data() {
    return {logobig:Lib.C.baseimg.logobig,agree:["true"],"mobile":"","code":"","password":"","password2":"","timershow":true,time:'60',timer:''}
  },
  components: {
  },
  ready(){
  },
  methods: {
	register (){
		var path=Lib.C.Mpath+'login/Register?tel='+this.mobile+"&password="+this.password;
      if(!this.code){
        Toast("验证码不能为空");
        return false;
      }
      if(this.agree != 'true'){
        Toast('请阅读并同意《艺朵云注册协议》');
        return false;
      }
      this.$http.jsonp(Lib.C.Mpath+'login/checkCodeExist?tel='+this.mobile+'&code='+this.code).then(function(respoce){
        if(!respoce.data){
          Toast("验证码错误");
          return false;
        }else{
        	if(!this.testPass(this.password) || !this.testPass(this.password2)){
              return false;
            }
          if(this.password != this.password2){
            Toast("2次输入的密码不一致")
            return false;
          }
          this.$http.jsonp(path).then(function(respoce){
            if(respoce.data.status == 1){
              Toast("注册成功");
              setTimeout(function(){
                  window.location.href="login.html";
                },1000)
            }else{
              Toast("账号或验证码错误");
            }
          })
        }
      },function(){
          Toast('请求出错');
        })
	},
	getCode (){
		if(!this.testTel(this.mobile)){
			return false;
		}
		this.$http.jsonp(Lib.C.Mpath+'login/checkMobileExist?tel='+this.mobile).then(function(respoce){
        	if(!respoce.data){
        		Toast('手机已注册');
        	}else{
				this.$http.jsonp(Lib.C.Mpath+'login/ajaxSendVerifyCode?mobile='+this.mobile+'&tempid=1').then(function(respoce){
		        	if(respoce.data.status == 1){
		        		Toast(respoce.data.message);
		        		this.timershow=false;
		        		this.timer=setInterval(this.countDown,1000);
		        	}else if(respoce.data.status == -1){
		        		Toast("该号码已经注册");
		        	}else{
		        		Toast("发送失败");
		        	}
		      	})
        	}
      	},function(){
          Toast('请求出错');
        })
	},
	testTel(value){
      var g = /^1[3|4|5|7|8]\d{9}$/;
      if(!g.test(value) || value == ''){
        Toast("请输入正确的手机号码");
        return false;
      }else{
        return true;
      }
    },
    testPass(value){
      var g = /^[a-zA-Z]\w{5,17}$/;
      if(!g.test(value)){
        Toast('密码只能以字母开头，长度在6-18位之间');
        return false;
      }else{
        return true;
      }
    },
    countDown(){
      this.time--;
      if(this.time==0){
          clearInterval(this.timer);
          this.time=60;
          this.timershow=true;
      }
    }
  }  
}
</script>

<style scoped>
.mint-checklist-label{padding: 0;}
.page-button{padding: 0 20px;margin-top: 20px;}
.logo{margin: 0 auto;text-align: center;width:200px;padding: 20px 0;}
.logo img{width:100%;}
.list,.login{padding:0 20px;}
.list li{height:40px;line-height:40px;margin-top:10px;float: none;overflow: hidden;position: relative;}
.list li:first-child{
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
}
.list li:last-child{
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
}
.getcode{position: absolute;top: 0;right: 0;display: block;height: 40px;background: #26a2ff;text-align: center;width: 3rem;color: #fff;font-size: 16px;}
input{border:none;width: 100%;height:40px;line-height:40px;padding-left:4px;display: block;}
.agree{overflow: hidden;position: relative;height: 44px;}
.agree a{position: absolute;left:150px;top: 22px;font-size: 16px;color: #fff;font-weight: bold;text-shadow:0 0 4px #005d71;}
.login{margin-top: 10px;text-align: right;margin-bottom:40px;font-size: 16px;}
.login a{color: #fff}
</style>





