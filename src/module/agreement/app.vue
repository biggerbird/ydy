<template>
<div class="content">
    <div class="title center">《艺朵云注册协议》</div>
    <p>{{{agreetext}}}</p>
</div>

<div class="fixdbox"></div>
<div class="fixed center">
    <mt-button type="primary" size="normal" icon="back" @click="register">返回注册</mt-button>
    <mt-button type="primary" size="normal" @click='login'>立即登录</mt-button>
</div>
</template>

<script>
import Lib from 'assets/Lib.js'
import { Button } from 'mint-ui';
Lib.Vue.component(Button.name, Button);
Lib.Vue.use(Lib.Resource);
import { Indicator } from 'mint-ui';
export default {
  data() {
    return {"agreetext":''}
  },
  ready(){
    this.getData();
  },
  methods: {
    getData(){
        Indicator.open();
        var path = Lib.C.Mpath+'wap/get_info?type=1';
          this.$http.jsonp(path).then(function(respoce){
            Indicator.close();
            this.agreetext = respoce.data;
          },function(){
            Indicator.close();
            Toast('请求出错');
          })
    },
    login(){
        location.href='login.html'
    },
    register(){
        location.href='register.html'
    }
  
  }  
}
</script>

<style scoped>
</style>





