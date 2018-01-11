<template>
	<top-back></top-back>
  <div class="goodsbox">
    <mt-field label="昵称" placeholder="请输入昵称" :attr={maxlength:10} :value.sync="nickname"></mt-field>
    <mt-field label="真实姓名" v-if="user.truename" :attr={maxlength:10} :value.sync="truename" disabled></mt-field>
    <mt-field label="账号类型" v-if="user.artlevel == 0 && user.agentlevel == 0" value="普通用户" type="text" disabled>
      <a class="layui-btn" href="prove.html">申请认证</a></mt-field>
    </mt-field>
    <mt-field label="账号类型" v-if="user.artlevel > 0" value="艺术家" type="text" disabled></mt-field>
    <template v-if="user.agentlevel > 0 && user.agentlevel < 6">
      <mt-field label="账号类型" value="经纪人" type="text" disabled></mt-field>
      <mt-field label="推广位" :value.sync="extennum" type="text" disabled></mt-field>
      <mt-field label="推广时长" :value.sync="extentime" type="text" disabled></mt-field>
    </template>
    <mt-field label="账号类型" v-if="user.agentlevel == 6" value="机构" type="text" disabled></mt-field>
    <mt-field label="性别" type="text" :value.sync="sexs[sex].label" disabled>
      <a class="layui-btn" @click="show">选择</a>
    </mt-field>

    <mt-field label="生日" placeholder="请输入生日" type="date" :value.sync="birthday"></mt-field>
    <mt-field label="毕业院校" v-if="user.college" :value.sync="college"  type="text"></mt-field>
    <mt-field label="邮箱" placeholder="请输入邮箱" type="email" :value.sync="email"></mt-field>

    <mt-field label="自我简介" placeholder="自我简介" type="textarea" rows="4" :value.sync="sentence"></mt-field>
    
   <module-label :stokens="stokens" :tokens="tokens" @getokens="setokens"></module-label>

    <div class="page-button">
      <mt-button type="primary" @click="submit">保存设置</mt-button>
    </div>

    <mt-popup :visible.sync="popupVisible" popup-transition="popup-fade">
      <div class="popupbox">
        <mt-radio
          :value.sync="sex"
          :options="sexs">
        </mt-radio>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import Lib from 'assets/Lib.js'
Lib.Vue.use(Lib.Resource);
import { Indicator } from 'mint-ui';
import { Field } from 'mint-ui';
Lib.Vue.component(Field.name, Field);
import { Radio } from 'mint-ui';
Lib.Vue.component(Radio.name, Radio);
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { Button } from 'mint-ui'
Lib.Vue.component(Button.name, Button)
import { Popup } from 'mint-ui';
Lib.Vue.component(Popup.name, Popup);
import topBack from 'components/top-back'
import moduleLabel from 'components/module-label'
export default {
  data() {
    return {account:'',nickname:'',truename:'',extennum:'',extentime:'',birthday:'',sex:'2',college:'',email:'',sentence:'',stokens:'',keywords:'',tokens:[],user:{},users:{},popupVisible:false,sexs:[{label: '男',value: '0'},{label: '女',value: '1'},{label: '保密',value: '2'}]
    }
  },
  components: {
  	topBack,
    moduleLabel
  },
  ready(){
  	this.getData();
  },
  methods: {
  	getData (){
      var path = Lib.C.Mpath+'personal';
        Indicator.open();
      this.$http.jsonp(path).then(function(respoce){
          Indicator.close();
        this.users = respoce.data;
        this.user = respoce.data.user;
        if(this.user.agentlevel >0 &&  this.user.agentlevel < 6){
          this.extennum = respoce.data.config.param2;
          this.extentime = respoce.data.config.param3;
        }
        var USER = respoce.data.user;
        this.account = USER.account;
        this.nickname = USER.nickname;
        this.truename = USER.truename;
        this.birthday = USER.birthday;
        this.sex = USER.sex;
        this.college = USER.college;
        this.email = USER.email;
        this.sentence = USER.sentence;
        this.stokens = respoce.data.diclist;
        if(respoce.data.user.favorite){
          this.keywords = respoce.data.user.favorite;
        }
        if(this.keywords){
          this.tokens = this.keywords.split(',');
        }
      },function(){
          Indicator.close();
          Toast('请求出错');
        })
    },
    setokens(data){
      this.keywords = data;
    },
    submit(){
      if(!this.testName(this.nickname) || !this.testEmail(this.email)){
        return false;
      }
      var data = 'account='+this.account;
          data += '&birthday='+this.birthday;
          data += '&email='+this.email;
          data += '&nickname='+this.nickname;
          data += '&sentence='+this.sentence;
          data += '&sex='+this.sex;
          data += '&keywords='+this.keywords;
      this.$http.jsonp(Lib.C.Mpath+'personal/ajaxPersonalSave?'+data).then(function(respoce){
        if(respoce.data){
          Toast("资料设置成功");
          setTimeout(function(){
            location.href="user.html";
          },1000)
        }
      },function(){
          Toast('请求出错');
        })
    },
    show(){
      this.popupVisible = !this.popupVisible;
    },
    testName(name){
      var g = /[\u4E00-\u9FA5A-Za-z0-9_*]{1,12}$/;
      if(!g.test(name) || name == ''){
        Toast("请输入正确的昵称");
        return false;
      }else{
        return true;
      }
    },
    testEmail(email){
      var g = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      if(!g.test(email) || email == ''){
        Toast("请输入正确的邮箱");
        return false;
      }else{
        return true;
      }
    },
    testPaypass(pass){
      var g = /^\d{6}$/;
      if(!g.test(pass)){
        Toast("支付密码必须为6位数字");
        return false;
      }else{
        return true;
      }
    }
  }
}
</script>

<style scoped>
</style>





