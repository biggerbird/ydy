<template>
	<top-back></top-back>
  <template v-if="type == '02'">
    <div class="prompt"><i class="icon iconfont red">&#xe648;</i> 您的申请未通过，请重新提交</div>
  </template>
  <template v-if="type == '01'">
    <div class="prompt"><i class="icon iconfont red">&#xe648;</i> 您的申请正在审核中，请耐心等候……</div>
  </template>
  <template v-if="type =='00' || type =='02'">
    <div class="center card" v-if="applytype == 0">
      <mt-button type="primary" size="large" @click="apply(1)">艺术家申请</mt-button><br/>
      <mt-button type="primary" size="large" @click="apply(2)">经纪人申请</mt-button><br/>
      <!--mt-button type="primary" size="large" @click="apply(3)">机构申请</mt-button-->
    </div>
      <div class="imgs clearfix" v-if="applytype != 0">
          <set-artimg :name="inputs1.name" :classname="inputs1.class" :title="inputs1.title" :url="url"  :userid="userid"></set-artimg>
          <set-artimg :name="inputs2.name" :classname="inputs2.class" :title="inputs2.title" :url="url"  :userid="userid"></set-artimg>
          <set-artimg :name="inputs3.name" :classname="inputs3.class" :title="inputs3.title" :url="url"  :userid="userid" v-if="applytype == 3"></set-artimg>
          <set-artimg :name="inputs4.name" :classname="inputs4.class" :title="inputs4.title" :url="url"  :userid="userid" v-if="applytype == 1"></set-artimg>
          <set-artimg :name="inputs5.name" :classname="inputs5.class" :title="inputs5.title" :url="url"  :userid="userid" v-if="applytype == 1"></set-artimg>
          <set-artimg :name="inputs6.name" :classname="inputs6.class" :title="inputs6.title" :url="url"  :userid="userid" v-if="applytype == 1"></set-artimg>
          <set-artimg :name="inputs7.name" :classname="inputs7.class" :title="inputs7.title" :url="url"  :userid="userid" v-if="applytype == 1"></set-artimg>
      </div>
      <mt-field placeholder="请输入真实姓名" :value.sync="truename" v-if="applytype != 0"></mt-field>
      <mt-field placeholder="请输入身份证号码" :attr="{maxlength:18}" :value.sync="fid" v-if="applytype != 0"></mt-field>
      <mt-field placeholder="机构名称" :value.sync="mechanism" v-if="applytype == 3"></mt-field>
      <mt-field placeholder="统一社会信用代码" :attr="{maxlength:18}" :value.sync="credit" v-if="applytype == 3"></mt-field>
      <mt-field placeholder="请输入毕业院校" :value.sync="college" v-if="applytype == 1"></mt-field>
      <mt-field placeholder="我的艺术之旅" type="textarea" rows="4" :value.sync="reason" v-if="applytype == 1"></mt-field>
      <mt-field placeholder="机构介绍" type="textarea" rows="4" :value.sync="introduce" v-if="applytype == 3"></mt-field>
      <div class="agree" v-if="applytype != 0">
        <mt-checklist :value.sync="agree" :options="[{label: '阅读并同意',value: 'true'}]"></mt-checklist>
        <a href="settled.html?type=2" v-if="applytype == 1">《艺术家认证协议》</a>
        <a href="settled.htmltype=3" v-if="applytype == 2">《经纪人认证协议》</a>
        <!--a href="settled.html" v-if="applytype == 3">《机构认证协议》</a-->
      </div>

      <div class="page-button" v-if="applytype != 0">
        <mt-button type="primary" size="large" @click="prove">提交</mt-button>
      </div>
  </template>

  <template v-if="type > 02">
    <div class="addadr">
      <a class="userimg2">
        <img class="faceurl" :src="user.faceurl">
      </a>
      <template v-if="'0' < user.artlevel">
        <div class="center">
          <div v-if="user.agentId">
            独家经纪人：<span class="red">{{agentName}}</span> 分成比例：<span class="red">{{user.rate}}%</span> 
            <mt-button type="primary" size="small" @click="show2">修改</mt-button>
          </div>
          <div class="prompt" v-if="user.artlevel > 1 && user.agentId">
            <i class="icon iconfont red">&#xe648;</i> 您的有效期从 {{begindate}} 至  {{endate}}
          </div>
          <mt-button type="primary" size="small">艺术家LV{{user.artlevel}}</mt-button>
          <mt-button type="primary" size="small" @click="show" v-if="user.artlevel == 1">缴费升级</mt-button>
          <mt-button type="primary" size="small" @click="show2" v-if="user.artlevel > 1 && !user.agentId">设置独家经纪人</mt-button>
          销售额：<span class="red">{{artsales}} </span>元
          <table class="ui-table">
            <colgroup>
              <col width="10">
              <col width="10">
              <col width="10">
            </colgroup>
            <thead>
              <tr><th>等级</th><th>推广位</th><th>所需销售额</th></tr>
            </thead>
            <tbody>
              <tr><th>LV2</th><th>50</th><th>0</th></tr>
              <tr><th>LV3</th><th>10</th><th>10000</th></tr>
              <tr><th>LV4</th><th>20</th><th>20000</th></tr>
              <tr><th>LV5</th><th>500</th><th>30000</th></tr>
            </tbody>
          </table>
        </div>
      </template>
      <template v-if="'0' < user.agentlevel && user.agentlevel < '6'">
        <div class="center">
          <mt-button type="primary" size="small">经纪人LV{{user.agentlevel}}</mt-button>
          销售额：<span class="red">{{totalseller}} </span>元
          <table class="ui-table">
            <colgroup>
              <col width="10">
              <col width="10">
              <col width="10">
            </colgroup>
            <thead>
              <tr><th>等级</th><th>推广位</th><th>所需销售额</th></tr>
            </thead>
            <tbody>
              <tr><th>LV1</th><th>1</th><th>0</th></tr>
              <tr><th>LV2</th><th>3</th><th>10000</th></tr>
              <tr><th>LV3</th><th>5</th><th>20000</th></tr>
              <tr><th>LV4</th><th>7</th><th>30000</th></tr>
            </tbody>
          </table>
        </div>
      </template>
      <template v-if="user.agentlevel >= '6'">
        <div class="center">
          <mt-button type="primary" size="small">机构</mt-button>
        </div>
      </template>
    </div>
  </template>

<mt-popup :visible.sync="popupVisible" position="center">
  <div class="popupbox">
    <mt-radio title="保证金|可退" :value.sync="ensure" disabled :options="['2000￥']"></mt-radio>
    <mt-radio title="升级年费" :value.sync="level" :options="options"></mt-radio>
    <mt-field label="总金额" disabled :value="level" type="number"></mt-field>
    <mt-field label="支付密码" type="password" :value.sync="paypwd" :attr="{minlength:6,maxlength:6}"></mt-field>
    <div class="page-button" v-if="user.avayundou >= level">
      <mt-button type="primary"  @click="upgrade">云豆支付</mt-button>
    </div>
    <div class="prompt" v-else><i class="icon iconfont red">&#xe648;</i> 您没有足够的云豆
    <a href="property.html" class="mint-button mint-button--primary">立即充值</a></div>
  </div>
</mt-popup>

<mt-popup :visible.sync="popupVisible2" position="center">
  <div class="popupbox">
    <mt-field label="经纪人手机" :value.sync="agentphone" type="text"></mt-field>
    <mt-field label="分成比例(%)" type="number" :value.sync="rate" :attr="{min:1,max:99}"></mt-field>
    <div class="page-button">
      <mt-button type="primary"  @click="setagent">设置</mt-button>
    </div>
  </div>
</mt-popup>
</template>

<script>
import Lib from 'assets/Lib.js'
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { Popup } from 'mint-ui';
Lib.Vue.component(Popup.name, Popup);
import topBack from 'components/top-back'
import setArtimg from 'components/set-artimg'
import { Button } from 'mint-ui';
Lib.Vue.component(Button.name, Button);
import { Field } from 'mint-ui';
Lib.Vue.component(Field.name, Field);
import { Checklist } from 'mint-ui';
Lib.Vue.component(Checklist.name, Checklist);
import { Radio } from 'mint-ui';
Lib.Vue.component(Radio.name, Radio);
export default {
  data() {
    return {inputs1:{'name':'zid','class':'zid','title':'身份证正面'},
    inputs2:{'name':'fid','class':'fid','title':'身份证反面'},
    inputs3:{'name':'business','class':'business','title':'机构营业执照'},
    inputs4:{'name':'artist1','class':'artist1','title':'艺术品'},
    inputs5:{'name':'artist2','class':'artist2','title':'艺术品'},
    inputs6:{'name':'artist3','class':'artist3','title':'艺术品'},
    inputs7:{'name':'artist4','class':'artist4','title':'艺术品'},
    userid:'',
    user:'',
    truename:'',
    college:'',
    phone:'',
    fid:'',
    reason:'',
    mechanism:'',
    credit:'',
    introduce:'',
    agree:["true"],
    status:'',
    url:'',
    type:'00',
    applytype:0,
    popupVisible:false,
    popupVisible2:false,
    ensure:'2000￥',
    level:'2300',
    options:[
      {
        label: '认证级(300￥)',
        value: '2300',
      },
      {
        label: '铜级(800￥)',
        value: '2800'
      },
      {
        label: '银级(1500￥)',
        value: '3500'
      },
      {
        label: '金级(2800￥)',
        value: '4800'
      }
    ],
    paypwd:'',
    agentphone:'',
    ratio:'1',
    agentName:'',
    endate:'',
    begindate:'',
    artsales:'0',
    agentsales:'0'
  }
  },
  components: {
  	topBack,
    setArtimg
  },
  ready(){
    this.getData();
    this.url = Lib.C.Mpath+'prove/upload';
  },
  methods: {
    getData(){
        Indicator.open();
      this.$http.jsonp(Lib.C.Mpath+'prove').then(function(respoce){
          Indicator.close();
        this.userid = respoce.data.user.id;
        this.user = respoce.data.user;
        this.type = respoce.data.type;
        this.status = respoce.data.apply.status;
        this.agentName = respoce.data.agentName;
        this.endate = respoce.data.endate;
        this.begindate = respoce.data.begindate;
        this.agentsales = respoce.data.totalseller;
      },function(){
          Indicator.close();
          Toast('请求出错');
        })
    },
    apply(num){
      this.applytype = num;
    },
  	prove (){
      if(!this.testChinese() || !this.testFid()){
        return false;
      }
      if(this.applytype == 1){
        if(this.college == ''){
          Toast('请填写你的毕业院校');
          return false;
        }
        if(this.reason == ''){
          Toast('请填写你的艺术之旅');
          return false;
        }
      }
      if(this.applytype == 3){
        if(this.mechanism == ''){
          Toast('请填写机构名称');
          return false;
        }
        if(this.credit == ''){
          Toast('请填写统一社会信用代码');
          return false;
        }
        if(this.introduce == ''){
          Toast('请填写机构介绍');
          return false;
        }
      }
      if(this.agree != 'true'){
        Toast('请阅读并同意入驻协议');
        return false;
      }
      var url,all = 'truename='+this.truename+'&fid='+this.fid;
      if(this.applytype == 1){
        url = 'prove/ajaxsave?'+all+'&college='+this.college+'&reason='+this.reason+'&agree='+this.agree;
      }
      if(this.applytype == 2){
        url = 'prove/ajaxPersonalSave?'+all+'&agree='+this.agree;
      }
      if(this.applytype == 3){
        url = 'prove/ajaxMechanismSave?'+all+'&mechanism='+this.mechanism+'&credit='+this.credit+'&introduce='+this.introduce+'&agree='+this.agree;
      }

      this.$http.jsonp(Lib.C.Mpath+url).then(function(respoce){
        if(respoce.data.status == 1){
          Toast("提交成功，请等待审核");
          setTimeout(function(){
            location.reload();
          },2000)
        }else{
          Toast("提交失败，请稍后再试");
        }
      },function(){
          Toast('请求出错');
        })
    },
    show(){
      this.popupVisible = true;
    },
    show2(){
      this.popupVisible2 = true;
    },
    upgrade(){
      if(!this.testPaypass(this.paypwd)){
        return false;
      }
      this.$http.jsonp(Lib.C.Mpath+'prove/ajaxSaveMoney?level='+this.level+'&paypwd='+this.paypwd).then(function(respoce){
        if(respoce.data.status == 200){
          Toast(respoce.data.message);
          setTimeout(function(){
            location.reload();
          },2000)
        }else{
          Toast(respoce.data.message);
        }
      },function(){
          Toast('请求出错');
        })
    },
    setagent(){
      if(!this.agentphone){
        Toast("请填写独家经纪人手机号码");
        return flase;
      }
      if(!this.rate || this.rate > 99.9 || this.rate < 0){
        Toast("请填写正确的分成比例");
        return flase;
      }
      this.$http.jsonp(Lib.C.Mpath+'prove/getPersonAgent?agentphone='+this.agentphone+'&rate='+this.rate).then(function(respoce){
        if(respoce.data.status == 1){
          Toast(respoce.data.message);
          setTimeout(function(){
            location.reload();
          },2000)
        }else{
          Toast(respoce.data.message);
        }
      },function(){
          Toast('请求出错');
        })
    },
    testChinese(){
      var g = /^[\u4e00-\u9fa5]+$/;
      if(!g.test(this.truename) || this.truename == ''){
        Toast("请输入真实姓名");
        return false;
      }else{
        return true;
      }
    },
    testFid(){
      var g = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;
      if(!g.test(this.fid) || this.fid == ''){
        Toast("请输入正确的身份证号码");
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
    }
  }
}
</script>
<style scoped>
.agree{height: 56px;overflow: hidden;position: relative;}
.agree a{position: absolute;left:130px;top: 22px;font-size: 16px;color: #149aae;}
.prompt{line-height: 36px;padding:20px 10px;text-align: center;}
.userimg2{display: inline-block;}
</style>





