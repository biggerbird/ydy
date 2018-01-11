<template>
  <div class="scroll-bg">
    <div class="centerbox ">
    	<div class="logo">
    		<img :src="logobig" alt="艺朵云">
    	</div>
      <ul class="list">
        <mt-cell title="密码规则：字母开头，6~18位的字母、数字和下划线"></mt-cell>
        <mt-field placeholder="输入手机号码" :value.sync="account" type="tel" :attr={maxlength:11}></mt-field>
        <mt-field placeholder="输入验证码" :value.sync="code1">
          <span class="get" @click="getCode1" v-if="timershow1">获取验证码</span>
          <span class="get" v-else>{{time1}}秒</span>
        </mt-field>
        <mt-field placeholder="输入登录密码" type="password" :attr={minlength:6,maxlength:18} :value.sync="password2"></mt-field>
        <mt-field placeholder="确认登录密码" type="password" :attr={minlength:6,maxlength:18} :value.sync="password3"></mt-field>
        <div class="page-button">
          <button class="mint-button mint-button--primary mint-button--normal" @click="bind">马上绑定</button>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import Lib from 'assets/Lib.js';
Lib.Vue.use(Lib.Resource);
import { Toast } from 'mint-ui';
import { Field } from 'mint-ui';
Lib.Vue.component(Field.name, Field);
import { Cell } from 'mint-ui';
Lib.Vue.component(Cell.name, Cell);
export default {
  data() {
    return {logobig:Lib.C.baseimg.logobig,tel:'',password:'',from:'mobile',
  time1:'60',timer1:'',timershow1:true,code1:'',"password":"","password2":"",password3:'',account:''}
  },
  components: {
  },
  ready(){
  },
  methods: {
  bind(){
      var path=Lib.C.Mpath+'wap/bind?tel='+this.account+"&password="+this.password2;
      if(!this.code1){
        Toast("验证码不能为空");
        return false;
      }
      this.$http.jsonp(Lib.C.Mpath+'login/checkCodeExist?tel='+this.account+'&code='+this.code1).then(function(respoce){
        if(respoce.data){
          if(!this.testPass(this.password2) || !this.testPass(this.password3)){
            return false;
          }
          if(this.password2 != this.password3){
            Toast("2次输入的密码不一致")
            return false;
          }
          this.$http.jsonp(path).then(function(respoce){
            if(respoce.data.status == 1){
              Toast(respoce.data.message);
              setTimeout(function(){
                  window.location.href="home.html";
                },1000)
            }else{
              Toast(respoce.data.message);
            }
          })
        }else{
          Toast("验证码错误");
        }
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
        Toast('请填写正确的登录密码');
        return false;
      }else{
        return true;
      }
    },
    getCode1(){
      if(!this.testTel(this.account)){
        return false;
      }
      this.$http.jsonp('http://api.yiduoyun.com/login/ajaxSendVerifyCode?mobile='+this.account+'&tempid=1').then(function(respoce){
        if(respoce.data.status == 1){
          Toast('验证码已发送');
          this.timershow1=false;
          this.timer1=setInterval(this.countDown1,1000);
        }else{
          Toast(respoce.data.status);
        }
      })
    },
    countDown1(){
      this.time1--;
      if(this.time1==0){
          clearInterval(this.timer1);
          this.time1=60;
          this.timershow1=true;
      }
    }
  
  }  
}
</script>

<style scoped>
.page-button{padding: 0 20px;margin-top: 20px;}
.logo{margin: 0 auto;text-align: center;width:200px;padding: 20px 0;}
.logo img{width:100%;}
.list,.login{padding:0 20px;}
.list li{height:40px;line-height:40px;margin-top:10px;float: none;overflow: hidden;position: relative;}
.list li .iconfont{position: absolute;left: 8px;top:10px;}
.list li:first-child{
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
}
.list li:last-child{
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
}
input{border:none;width: 100%;height:40px;line-height:40px;padding-left:4px;display: block;padding-left: 36px;}
.login{margin-top: 10px;text-align: right;margin-bottom:10px;font-size: 16px;}
.login a{color: #fff}
.ologin{padding: 0 20px;display: flex;}
.ologin li{flex:1;border-top:1px solid #fff;padding-top:30px;position: relative;}
.ologin li a{display: block;width: 40px;height: 40px;border-radius: 50%;background: #26a2ff;color:#fff;margin:0 auto;text-align: center;line-height: 40px;}
.ologin li .iconfont{color: #fff;font-size: 24px;}
.ologin li span{position: absolute;top:30px;opacity: 0.01;left:50%;width: 40px;height: 40px;margin-left:-20px;}
</style>





