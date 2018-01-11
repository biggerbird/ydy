<template>
  <top-back></top-back>
  <div class="order">

  <section class="pro-detail">
    <h5>订单详情</h5>
    <ul>
      <li class="clearfix">
        <a :href="'art.html?id='+product.id" :style="'background-image:url('+product.mainurl+')'" class="img fl" ></a>
        <div>
          <h6 class="ellipsis">{{product.name}}</h6>
          <div class="prinum">
            <b>类型</b>：{{product.producttype}}<em class="space"></em>
            <b>尺寸</b>：{{product.pwidth}}cm * {{product.pheight}}cm
            <br/>
            <b>年份</b>：{{product.createyear}}<em class="space"></em>
            <b>材质</b>：{{product.material}}<em class="space"></em>
            <b>装裱</b>：
              <template v-if="!product.haspack">
                是
              </template>
              <template v-else>
                否
              </template>
            <em class="space"></em>
          </div>
        </div>
          <div class="Subtotal">价格：￥<span class="bigsize">{{product.price}}</span></div>
      </li>
    </ul>
  </section>
    
  <section class="consignee">
    <h5>收货人信息 <a href="address.html" v-if="addr.length == 0"><mt-button type="primary" size="small">设置地址</mt-button></a></h5>

    <div class="list">
      <template v-for="item in addr">
        <a href="address.html" class="link" v-if="item.isdefault">
            <div class="addrs">
              <div class="profile">{{item.contactor}}</div>
              <div class="tel">{{item.mobile}}</div>
              <div class="code">{{item.code}}</div>
            </div>
            <div class="addr">
              <span>{{item.address}}</span>
            </div>
            <input type="hidden" v-model="addressId" :value='item.id'>
        </a>
      </template>
    </div>
    
  </section>

  <section class="settlement">
    <h5>结算信息</h5>
    <ul>
      <li>
        <span>商品金额</span>
        <em>￥{{product.price}}</em>
      </li>
      <li>
        <span>运费</span>
        <em>￥{{product.transprice}}</em>
      </li>
    </ul>
  </section>
</div>

    <div class="height22"></div>
    <footer class="footer3">
        <div class="order-btn" @click="submits">提交订单</div>
      <div class="money">支付金额：<span>￥{{payprice}}</span></div>
      <input type="hidden" v-model="payprice" :value="product.price+product.transprice">
    </footer>
</template>

<script>
import Lib from 'assets/Lib.js'
import { Toast } from 'mint-ui';
import topBack from 'components/top-back'
import { Popup } from 'mint-ui';
Lib.Vue.component(Popup.name, Popup);
import { Button } from 'mint-ui';
Lib.Vue.component(Button.name, Button);
import { Field } from 'mint-ui';
Lib.Vue.component(Field.name, Field);
import { Indicator } from 'mint-ui';
export default {
  data() {
    return {id:'',product:'',addr:[],popupVisible:false,paypwd:'',price:'',payprice:'0',addressId:''}
  },
  components: {
    topBack
  },
  ready(){
    this.id=Lib.C.getSearchString("id");
  	this.getData();
    this.getAddr();
  },
  methods: {
    getData (){
      Indicator.open();
        this.$http.jsonp(Lib.C.Mpath+'order/orderSure?productId='+this.id).then(function(respoce){
          Indicator.close();
          this.product = respoce.data.product;
          this.price = respoce.data.product.price;
          this.avayundou = respoce.data.user.avayundou;
      },function(){
          Indicator.close();
          Toast('请求出错');
        })
    },
    getAddr (){
      this.$http.jsonp(Lib.C.Mpath+'address/AddressList').then(function(respoce){
          this.addr = respoce.data.address;
      },function(){
          Indicator.close();
          Toast('请求出错');
        })
    },
    submits(){
      if(!this.addressId){
        Toast('请设置收货地址');
        return false;
      }
      this.$http.jsonp(Lib.C.Mpath+'order/ajaxsave?totalprice='+this.payprice+'&payprice='+this.payprice+'&productId='+this.id+'&addressId='+this.addressId).then(function(respoce){
          if(respoce.data.status == 1){
            Toast('订单提交成功');
            setTimeout(function(){
              location.href="payment.html?id="+respoce.data.data.id;
            },1000)
          }else{

          }
      },function(){
          Indicator.close();
          Toast('请求出错');
        })
    }
  }
}
</script>

<style scoped>
.order{
  background: #e6e6e6;line-height: 30px;
}
.order .link:after{
  content: "";display: block;height:8px;width:8px;border-right: 2px solid #909090;;border-bottom: 2px solid #909090;transform: rotate(-45deg);
position: absolute;top: 50%;right:0.5rem;margin-top: -5px;
}
.order section{
  background: #fff;margin-bottom: 4px;border-bottom: 1px solid #e3e3e3;padding-left:10px;
}
.order h5{font-size: 16px;font-weight: bold;}
.order h5,.order .option li,.order .settlement li{
  border-bottom: 1px solid #ebebeb;
}
.order .consignee .list a {
    color: #333333;
    display: block;
    height:64px;
    line-height:30px;
    position: relative;
    z-index:100;
}
/*底部开始*/
.footer3 .order-btn{
  float:right;height:50px;width: 100px;background: #329dad;text-align: center;color: #fff;line-height:50px;font-size: 16px;cursor: pointer;
}
.footer3 .money{
  padding-left:10px;line-height:50px;
}
.footer3 .money span{
  color: #329dad;
}
.addrs{display: flex;padding-right:30px;}
.addrs div{flex: 1}
.addrs div:last-child{text-align:right;}
.pro-detail li{float: none;padding: 10px 10px 10px 0;line-height: 20px;}
.pro-detail li .img{height:80px;width:80px;overflow: hidden;display: block;background-position: center;background-size:contain;background-repeat: no-repeat;margin-right: 10px;}
.pro-detail li .Subtotal{text-align: right;color: #03899c;}
.settlement li{float: none;padding: 5px 12px 5px 0;position: relative;}
.settlement li span{color: #666666;}
.settlement li em{font-style: normal;float: right;color: #329dad;}
.deductible{background: #33a6b8;color: #fff;padding:4px 10px;border-radius: 3px;margin-left: 10px;}
</style>





