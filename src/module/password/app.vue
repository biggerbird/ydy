<template>
  <top-back></top-back>
	<div>
    <div class="form">
      <mt-cell title="修改登录密码：字母开头，6~18位的字母、数字和下划线"></mt-cell>
      <mt-field label="旧密码" placeholder="请输入密码" type="password" :attr={minlength:6,maxlength:18} :value.sync="password"></mt-field>
      <mt-field label="新密码" placeholder="请输入密码" type="password" :attr={minlength:6,maxlength:18} :value.sync="password2"></mt-field>
      <mt-field label="密码确认" placeholder="请输入密码" type="password" :attr={minlength:6,maxlength:18} :value.sync="password3"></mt-field>
      <div class="page-button">
        <button class="mint-button mint-button--primary mint-button--normal" @click="reset">确定</button>
        <a @click="show">忘记登录密码？</a>
      </div>
    </div>

    <div class="form" v-if="!paypwd">
      <mt-cell title="修改支付密码：6位数字"></mt-cell>
      <mt-field label="旧密码" placeholder="请输入密码" type="password" :attr="{minlength:6,maxlength:6}" :value.sync="repassword"></mt-field>
      <mt-field label="新密码" placeholder="请输入密码" type="password" :attr="{minlength:6,maxlength:6}" :value.sync="repassword2"></mt-field>
      <mt-field label="确认密码" placeholder="请输入密码" type="password" :attr="{minlength:6,maxlength:6}" :value.sync="repassword3"></mt-field>
      <div class="page-button">
        <button class="mint-button mint-button--primary mint-button--normal" @click="reset2">确定</button>
        <a @click="show2">忘记支付密码？</a>
      </div>
    </div>
    <div class="form" v-else>
      <mt-cell title="设置支付密码：6位数字"></mt-cell>
      <mt-field label="支付密码" placeholder="请输入密码" type="password" :attr="{minlength:6,maxlength:6}" :value.sync="repassword2"></mt-field>
      <mt-field label="确认密码" placeholder="请输入密码" type="password" :attr="{minlength:6,maxlength:6}" :value.sync="repassword3"></mt-field>
      <div class="page-button">
        <button class="mint-button mint-button--primary mint-button--normal" @click="setpay">确定</button>
      </div>
    </div>

    <mt-popup :visible.sync="popupVisible" popup-transition="popup-fade">
      <div class="popupbox">
        <mt-cell title="重置登录密码"></mt-cell>
        <mt-field :value.sync="user.account" type="tel" readonly></mt-field>
        <mt-field placeholder="输入验证码" :value.sync="code1">
          <span class="get" @click="getCode1" v-if="timershow1">获取</span>
          <span class="get" v-else>{{time1}}秒</span>
        </mt-field>
        <mt-field placeholder="输入新的登录密码" type="password" :attr={minlength:6,maxlength:18} :value.sync="password2"></mt-field>
        <mt-field placeholder="确认新的登录密码" type="password" :attr={minlength:6,maxlength:18} :value.sync="password3"></mt-field>
        <div class="page-button">
          <button class="mint-button mint-button--primary mint-button--normal" @click="changepassword">确定</button>
        </div>
      </div>
    </mt-popup>

    <mt-popup :visible.sync="popupVisible2" popup-transition="popup-fade">
      <div class="popupbox">
        <mt-cell title="重置支付密码"></mt-cell>
        <mt-field :value.sync="user.account" type="tel"></mt-field>
        <mt-field placeholder="输入验证码" :value.sync="code2">
          <span class="get" @click="getCode2" v-if="timershow2">获取</span>
          <span class="get" v-else>{{time2}}秒</span>
        </mt-field>
        <mt-field placeholder="输入新的支付密码" type="password" :attr="{minlength:6,maxlength:6}" :value.sync="repassword2"></mt-field>
        <mt-field placeholder="输入新的支付密码" type="password" :attr="{minlength:6,maxlength:6}" :value.sync="repassword3"></mt-field>
        <div class="page-button">
          <button class="mint-button mint-button--primary mint-button--normal" @click="changepassword2">确定</button>
        </div>
      </div>
    </mt-popup>
</template>

<script>
import Lib from 'assets/Lib.js'
Lib.Vue.use(Lib.Resource);
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { Cell } from 'mint-ui';
Lib.Vue.component(Cell.name, Cell);
import { Field } from 'mint-ui';
Lib.Vue.component(Field.name, Field);
import { Popup } from 'mint-ui';
Lib.Vue.component(Popup.name, Popup);
import topBack from 'components/top-back'
export default {
  data() {
    return {user:'',paypwd:false,
    time1:'60',timer1:'',timershow1:true,code1:'',"password":"","password2":"",password3:'',popupVisible:false,
    time2:'60',timer2:'',timershow2:true,code2:'',"repassword":"","repassword2":"","repassword3":"",popupVisible2:false}
  },
  components: {
    topBack
  },
  ready(){
    this.getData();
  },
  methods: {
    getData(){
      Indicator.open();
      this.$http.jsonp(Lib.C.Mpath+'userIndex').then(function(respoce){
        Indicator.close();
        this.user = respoce.data.user;
        this.paypwd = respoce.data.paypwd;
      },function(){
        Indicator.close();
        Toast('请求出错');
      })
    },
    setpay(){
      if(!this.testPaypass(this.repassword2) || !this.testPaypass(this.repassword3)){
          return false;
        }
      if(this.repassword2 != this.repassword3){
        Toast("2次输入的密码不一致")
        return false;
      }
      var path=Lib.C.Mpath+'password/newPay?password='+this.repassword2;
      this.$http.jsonp(path).then(function(respoce){
        if(respoce.data.status == 1){
          Toast('支付密码设置成功');
          setTimeout(function(){
              window.location.reload();
            },1000)
        }else{
          Toast(respoce.data.message);
        }
      },function(){
          Toast('请求出错');
      })
    },
    reset (){
      var path=Lib.C.Mpath+'password/loginPassword?lastpassword='+this.password+"&newpassword="+this.password2;
      if(!this.password){
        Toast("请输入旧登录密码")
        return false;
      }
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
              window.location.href="user.html";
            },1000)
        }else{
          Toast(respoce.data.message);
        }
      },function(){
          Toast('请求出错');
        })
    },
    reset2 (){
      var path=Lib.C.Mpath+'password/updatePay?lastpassword='+this.repassword+"&newpassword="+this.repassword2;
        if(!this.testPaypass(this.repassword2) || !this.testPaypass(this.repassword3)){
          return false;
        }
      if(this.repassword2 != this.repassword3){
        Toast("2次输入的密码不一致")
        return false;
      }
      this.$http.jsonp(path).then(function(respoce){
        if(respoce.data.status == 1){
          Toast(respoce.data.message);
          setTimeout(function(){
              window.location.href="user.html";
            },1000)
        }else{
          Toast(respoce.data.message);
        }
      },function(){
          Toast('请求出错');
        })
    },
    changepassword(){
      var path=Lib.C.Mpath+'login/Retrieve?tel='+this.user.account+"&password="+this.password2;
      if(!this.code1){
        Toast("验证码不能为空");
        return false;
      }
      this.$http.jsonp(Lib.C.Mpath+'login/checkCodeExist?tel='+this.user.account+'&code='+this.code1).then(function(respoce){
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
                  window.location.href="user.html";
                },1000)
            }else{
              Toast(respoce.data.message);
            }
          })
        }else{
          Toast("验证码错误");
        }
      },function(){
          Toast('请求出错');
        })
    },
    changepassword2(){
      var path=Lib.C.Mpath+'password/newPay?password='+this.repassword2;
      if(!this.code2){
        Toast("验证码不能为空");
        return false;
      }
      this.$http.jsonp(Lib.C.Mpath+'login/checkCodeExist?tel='+this.user.account+'&code='+this.code2).then(function(respoce){
        if(respoce.data){
          if(!this.testPaypass(this.repassword2) || !this.testPaypass(this.repassword3)){
              return false;
            }
          if(this.repassword2 != this.repassword3){
            Toast("2次输入的密码不一致")
            return false;
          }
          this.$http.jsonp(path).then(function(respoce){
            if(respoce.data.status == 1){
              Toast(respoce.data.message);
              setTimeout(function(){
                  window.location.href="user.html";
                },1000)
            }else{
              Toast(respoce.data.message);
            }
          })
        }else{
          Toast("验证码错误");
        }
      },function(){
          Toast('请求出错');
        })
    },
    show (){
      if(this.popupVisible){
        this.popupVisible = false;
      }else{
        this.popupVisible = true;
      }
    },
    show2 (){
      if(this.popupVisible2){
        this.popupVisible2 = false;
      }else{
        this.popupVisible2 = true;
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
    testPaypass(value){
      var g = /^\d{6}$/;
      if(!g.test(value)){
        Toast('请填写6位数支付密码');
        return false;
      }else{
        return true;
      }
    },
    getCode1(){
      this.$http.jsonp(Lib.C.Mpath+'login/ajaxSendVerifyCode?mobile='+this.user.account+'&tempid=1').then(function(respoce){
        if(respoce.data.status == 1){
          Toast('验证码已发送');
          this.timershow1=false;
          this.timer1=setInterval(this.countDown1,1000);
        }else{
          Toast(respoce.data.status);
        }
      },function(){
          Toast('请求出错');
        })
    },
    countDown1(){
      this.time1--;
      if(this.time1==0){
          clearInterval(this.timer1);
          this.time1=60;
          this.timershow1=true;
      }
    },
    getCode2(){
      this.$http.jsonp(Lib.C.Mpath+'login/ajaxSendVerifyCode?mobile='+this.user.account+'&tempid=1').then(function(respoce){
        if(respoce.data.status == 1){
          Toast('验证码已发送');
          this.timershow2=false;
          this.timer2=setInterval(this.countDown2,1000);
        }else{
          Toast(respoce.data.status);
        }
      },function(){
          Toast('请求出错');
        })
    },
    countDown2(){
      this.time2--;
      if(this.time2==0){
          clearInterval(this.timer2);
          this.time2=60;
          this.timershow2=true;
      }
    }
  }
}
</script>

<style scoped>
.form{margin-bottom: 1rem;}
.password_xg {
    background: #fff none repeat scroll 0 0;
    margin: 20px auto;
}
.password_xg div{font-size: 0.6rem;margin: 0.2rem auto;}
.password_xg div input{width: 10rem;height: 1.5rem;border:1px solid #eee;background: #eee;padding: 0.2rem;}
.password_xg div label{width: 4rem;display:inline-block;text-align: right;}
</style>





