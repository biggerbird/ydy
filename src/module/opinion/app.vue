<template>
  <top-back></top-back>
    <div class="page-button">
      <textarea name="opinion" v-model="opinion" autofocus placeholder="请填写您的意见"></textarea>
      <mt-button type="primary" size="large" @click="submit">提交</mt-button>
    </div>
</template>

<script>
import Lib from 'assets/Lib.js'
Lib.Vue.use(Lib.Resource);
import { Toast } from 'mint-ui';
import { Button } from 'mint-ui';
Lib.Vue.component(Button.name, Button);
import topBack from 'components/top-back'
export default {
  data() {
    return {"opinion":""}
  },
  components: {
    topBack
  },
  ready(){
  },
  methods: {
    submit (){
      if(!this.opinion){
        Toast("输入框内容为空");
        return false;
      }else{
        this.$http.jsonp(Lib.C.Mpath+'message/ajaxOpinionMessage?content='+this.opinion).then(function(respoce){
          if(respoce.data.status == 1){
            Toast("意见提交成功");
            setTimeout(function(){
              window.location.href="user.html";
            },1000)
          }else{
            Toast("意见提交失败");
          }
        })
      }
    }
  }  
}
</script>

<style scoped>
textarea {
    border: 1px solid #ccc;
    border-radius: 5px;
    color: #666;
    display: block;
    min-height:200px;
    margin: 0 auto;
    padding: 10px;
    width: 100%;
    resize: none;
    margin-bottom: 20px;
}
</style>





