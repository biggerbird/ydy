<template>
  <top-back></top-back>
  <div class="pros clearfix">
    <template v-for="item in inputs">
        <set-artimg :name="item.name" :classname="item.name+$index" :title="item.title" :url="url" :userid="userid" @click="addart"></set-artimg>
      </template>
  </div>
  <div>
    <mt-field  label="作品名称：" :value.sync="name" :attr={maxlength:20}>{{njame}}</mt-field>
    <mt-field  label="作品类别：" :value.sync="producttype" disabled><a class="layui-btn" @click="show1">选择</a></mt-field>
    <template v-if="agentlevel == 6">
      <mt-field  label="艺术家手机：" :value.sync="artistPhone" :attr={maxlength:11,minlength:11}><a class="layui-btn" @click="getName">验证</a></mt-field>
      <mt-field  label="艺术家：" :value.sync="artistName" disabled v-if="showname">{{njame}}</mt-field>
    </template>
    <mt-field  label="长(cm)：" :value.sync="pwidth" type="number" :attr={min:1,max:10000}></mt-field>
    <mt-field  label="宽(cm)：" :value.sync="pheight" type="number" :attr={min:1,max:10000}></mt-field>
    <mt-field  label="高(cm)：" v-if="producttype == '雕塑'" :value.sync="ptall" type="number" :attr={min:1,max:10000}></mt-field>
    <mt-field  label="创作年份：" :value.sync="createyear" disabled><a class="layui-btn" @click="show2">选择</a></mt-field>
    <mt-field  label="作品材质：" :value.sync="material" :attr={maxlength:10}></mt-field>

    <mt-cell title="出售" v-if="artlevel > 1 || agentlevel == 6"><mt-switch :value.sync="sellstatus"></mt-switch></mt-cell>

    <template class="income" v-if="sellstatus">
      <mt-field label="售价（元）" :value.sync="price" type="number" :attr={min:1,max:10000000}></mt-field>
      <mt-cell title="推广" v-if="agentlevel != 6"><mt-switch :value.sync="extension"></mt-switch></mt-cell>
      <template v-if="extension">
        <mt-field label="艺术家收益" :value.sync="price * 77 / 100" disabled></mt-field>
        <mt-field label="经纪人收益" :value.sync="price * 15 / 100" disabled></mt-field>
        <mt-field label="分享者收益" :value.sync="price * 3 / 100" disabled></mt-field>
        <mt-field label="平台收益" :value.sync="price * 5 / 100" disabled></mt-field>
      </template>
      <template v-else>
        <mt-field label="艺术家收益" :value.sync="price * 90 / 100" disabled></mt-field>
        <mt-field label="平台收益" :value.sync="price * 10 / 100" disabled></mt-field>
      </template>
      <mt-field label="运费（元）" :value.sync="transprice"  type="number" :attr={min:0,max:10000}></mt-field>
    </template>

    <mt-cell title="是否装裱"><mt-switch :value.sync="haspack"></mt-switch></mt-cell>
    
    <module-label :stokens="stokens" :tokens="tokens" @getokens="setokens"></module-label>

    <mt-field placeholder="作品介绍" type="textarea" rows="4" :value.sync="content"></mt-field>
    <div class="page-button"><mt-button type="primary" @click="submit">发布作品</mt-button></div>
  </div>

  <mt-popup :visible.sync="popupVisible1">
    <div class="popupbox">
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </div>
  </mt-popup>

  <mt-popup :visible.sync="popupVisible2">
    <div class="popupbox">
      <mt-picker :slots="slots2" @change="onValuesChange2"></mt-picker>
    </div>
  </mt-popup>
</template>

<script>

import Lib from 'assets/Lib.js'
Lib.Vue.use(Lib.Resource);
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui';
import topBack from 'components/top-back'
import setArtimg from 'components/set-artimg'
import moduleLabel from 'components/module-label'
import { Cell } from 'mint-ui';
Lib.Vue.component(Cell.name, Cell);
import { Field } from 'mint-ui';
Lib.Vue.component(Field.name, Field);
import { Radio } from 'mint-ui';
Lib.Vue.component(Radio.name, Radio);
import { Picker } from 'mint-ui';
Lib.Vue.component(Picker.name, Picker);
import { Popup } from 'mint-ui';
Lib.Vue.component(Popup.name, Popup);
import { Switch } from 'mint-ui';
Lib.Vue.component(Switch.name, Switch);
import { Button } from 'mint-ui';
Lib.Vue.component(Button.name, Button);
export default {
  data() {
    return{sellstatus:false,extension:false,artistPhone:'',artistName:'',showname:false,haspack:'未装裱',producttype:'',createyear:'2017',material:'',transprice:0,price:0,content:'',artlevel:0,agentlevel:0,pwidth:'',pheight:'',ptall:'',stokens:'',keywords:'',tokens:[],userid:'',artistPhone:'',artistName:'',
    slots: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        }
      ],slots2: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        }
      ],inputs:[
       {'name':'main','title':'艺术品主图'},
      ],
      url:'',
      random:'',
      popupVisible1:false,
      popupVisible2:false
    }
  },
  components: {
    topBack,
    setArtimg,
    moduleLabel
  },
  ready(){
    this.random=Math.random();
    this.url = Lib.C.Mpath+'tbProduct/upload?relid='+this.random;
    this.getData();
    this.yearlist();
  },
  methods: {
    getData(){
      Indicator.open();
      this.$http.jsonp(Lib.C.Mpath+'tbProduct/index').then(function(respoce){
        Indicator.close();
        for(var i = 0; i < respoce.data.typelist.length ; i++){
          this.slots[0].values.$set(i, respoce.data.typelist[i].value);
        }
        this.artlevel = respoce.data.user.artlevel;
        this.agentlevel = respoce.data.user.agentlevel;
        this.stokens = respoce.data.keywords;
        this.userid = respoce.data.userId;
      },function(){
          Indicator.close();
          Toast('请求出错');
        })
    },
    getName(){
      if(!this.testTel(this.artistPhone)){
        return false;
      }
      var path = Lib.C.Mpath+'tbProduct/ajaxQueryArt?artistPhone='+this.artistPhone;
      this.$http.jsonp(path).then(function(respoce){
        if(respoce.data.status == 200){
          Toast('验证成功');
          this.showname = true;
          this.artistName = respoce.data.data.truename;
        }else{
          Toast(respoce.data.message);
          this.showname = false;
        }
      })
    },
    yearlist(){
        var date=new Date;
        var year=date.getFullYear();
        for(var i = 0; i < 100 ; i++){
          this.slots2[0].values.$set(i, year);
          year--;
        }
    },
    setokens(data){
      this.keywords = data;
    },
    onValuesChange(picker, values) {
      this.producttype=values[0];
    },
    onValuesChange2(picker, values) {
      this.createyear=values[0];
    },
    addart(){
      var arr=[{'name':'imgdata','title':'艺术品'}]
      if(this.inputs.length < 9){
        this.inputs=this.inputs.concat(arr)
      }
    },
    show1(){
      this.popupVisible1 = !this.popupVisible1;
    },
    show2(){javascript:void(0);
      this.popupVisible2 = !this.popupVisible2;
    },
    submit(){
      if(!this.name){
        Toast('作品名不能为空');
        return false;
      }
      if(this.agentlevel == 6){
        if(!this.testTel(this.artistPhone) || !this.artistName){
          Toast('请输入并验证艺术家');
          return false;
        }
      }
      if(this.pwidth <= 0 || this.pheight <= 0 || this.ptall < 0){
        Toast('尺寸必须为正整数');
        return false;
      }
      if(!this.material){
        Toast('作品材质不能为空');
        return false;
      }
      if(this.sellstatus){
        if(this.price <= 0 || this.price%1 !=0){
          Toast('价格必须为正整数');
          return false;
        }
      }
      if(this.transprice < 0 || this.transprice%1 !=0){
        Toast('运费必须为自然数');
        return false;
      }
      if(!this.content){
        Toast('作品介绍不能为空');
        return false;
      }
      if(this.haspack){
        this.haspack = 1;
      }else{
        this.haspack = 0;
      }
      var data = 'name='+this.name;
          data +='&producttype='+this.producttype;
          if(this.agentlevel == 6){
            data +='&artistPhone='+this.artistPhone;
            data +='&artistName='+this.artistName;
          }
          data +='&pwidth='+this.pwidth;
          data +='&pheight='+this.pheight;
          if(!this.ptall){
            data +='&ptall='+this.ptall;
          }

          data +='&createyear='+this.createyear;
          data +='&material='+this.material;
          if(this.sellstatus){
            data +='&sellstatus='+'出售';
          }else{
            data +='&sellstatus='+'非卖品';
          }
          if(this.extension){
            data +='&extension='+'22';
          }else{
            data +='&extension='+'20';
          }
          data +='&price='+this.price;
          data +='&transprice='+this.transprice;
          data +='&haspack='+this.haspack;
          data +='&keywords='+this.keywords;
          data +='&content='+this.content;
          data +='&relid='+this.random;

      this.$http.jsonp(Lib.C.Mpath+'tbProduct/mobilesave?'+data).then(function(respoce){
        if(respoce.data.status == 111){
          Toast(respoce.data.message);
          setTimeout(function(){
            location.reload();
          },1000)
        }else{
          Toast(respoce.data.message);
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
    }
  }
}



</script>

<style scoped>
</style>





