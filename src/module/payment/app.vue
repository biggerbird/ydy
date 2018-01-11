<template>
  <top-back></top-back>

  <template v-if="!location">
    <div class="order">
      <section class="pro-detail">
        <h5>订单号：{{id}}</h5>
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
              <div class="Subtotal">运费：￥<span class="bigsize">{{product.transprice}}</span> 价格：￥<span class="bigsize">{{product.price}}</span></div>
          </li>
        </ul>
      </section>
        
      <section class="consignee">
        <h5>收货人信息</h5>
        <div>
          <a class="link">
            <div class="addrs">
              <div class="profile">{{addr.contactor}}</div>
              <div class="tel">{{addr.mobile}}</div>
              <div class="code">{{addr.code}}</div>
            </div>
              <div class="addr">
                <span>{{addr.address}}</span>
              </div>
          </a>
        </div>
      </section>
    </div>


    <div class="addadr">订单金额（￥）：<span class="bigsize">{{totalmoney}}</span></div>
    <div class="addadr" v-if="order.orderstatus == '创建'">
      <mt-button type="primary" @click="showdeduc">云豆支付</mt-button>
      <mt-button type="primary" @click="weipay">微信支付</mt-button>
      <mt-button type="primary" @click="alipay">支付宝支付</mt-button>
    </div>
    <div class="addadr" v-else>
      <mt-button type="primary">{{order.orderstatus}}</mt-button>
    </div>

      <mt-popup :visible.sync="popupVisible" position="center">
        <div class="popupbox">
          <p class="content">现有云豆数量：{{yundou}} 个</p>
          <mt-field label="支付云豆数量" type="text" :value.sync="totalmoney" readonly></mt-field>
          <mt-field placeholder="支付密码" type="password" :value.sync="paypwd" :attr="{minlength:6,maxlength:6}" v-if="totalmoney < yundou"></mt-field>
          <div class="page-button" v-if="totalmoney < yundou">
            <mt-button type="primary" @click="payment">立即支付</mt-button>
          </div>
          <p class="page-button red" v-else>云豆数量不足，请使用其他支付方式或<br/>
            <a href="property.html">
              <mt-button type="primary">去充值</mt-button>
            </a>
          </p>
        </div>
      </mt-popup>
  </template>

  <template v-else>
    {{{location}}}
  </template>

</template>

<script>
import Lib from 'assets/Lib.js'
import $ from 'jquery'
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
    return {id:'',product:'',addr:'',popupVisible:false,paypwd:'',yundou:'',addressId:'',totalmoney:'',order:'',location:''}
  },
  components: {
    topBack
  },
  ready(){
    this.id=Lib.C.getSearchString("id");
    this.getData();
  },
  methods: {
    getData (){
      Indicator.open();
        var path = Lib.C.Mpath+'order/info?orderId='+this.id;
        this.$http.jsonp(path).then(function(respoce){
          Indicator.close();
          this.product = respoce.data.product;
          this.addr = respoce.data.adress;
          this.yundou = respoce.data.user.avayundou;
          this.order = respoce.data.order;
          this.totalmoney = respoce.data.order.totalmoney
      },function(){
          Indicator.close();
          Toast('请求出错');
        })
    },
    payment(){
      if(this.totalmoney > this.yundou){
        Toast('云豆数量不够');
        return false;
      }
      if(!this.testPaypass(this.paypwd)){
        return false;
      }
        this.$http.jsonp(Lib.C.Mpath+'order/ajaxComparePaypwd?payPwd='+this.paypwd+'&yundou='+this.totalmoney+'&orderId='+this.id).then(function(respoce){
          if(respoce.data.status == 1){
            Toast('支付成功');
            this.popupVisible = false;
            setTimeout(function(){
              location.href="user.html"
            },1000)
          }else if(respoce.data.status == -1){
            Toast(respoce.data.message);
            setTimeout(function(){
              window.location.href="password.html";
            },1000)
          }else{
            Toast(respoce.data.message);
          }
      },function(){
          Toast('请求出错');
        })
    },
    showdeduc(){
      this.popupVisible = true;
    },
    alipay(){
      this.$http.jsonp(Lib.C.Mpath+"order/app_alipay?payType=alipay&type=goods&id="+this.id).then(function(respoce){
        this.location = respoce.data.location;
        setTimeout(function(){
          $("form").submit();
        },1000)
      },function(){
        Toast('请求出错');
      })
    },
    weipay(){
      var that = this;
      this.$http.jsonp(Lib.C.Mpath+"pay/index?payType=wx_pay&type=goods&id="+this.id).then(function(respoce){
        WeixinJSBridge.invoke('getBrandWCPayRequest',{
          "appId" : respoce.data.appId,
          "timeStamp" : respoce.data.timeStamp,
          "nonceStr" : respoce.data.nonceStr,
          "package" : respoce.data.package,
          "signType" : respoce.data.signType,
          "paySign" : respoce.data.paySign
          },function(res){
            if(res.err_msg == "get_brand_wcpay_request:ok"){
              that.surePay();
            }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
              Toast("用户取消支付!");
            }else{
              Toast("支付失败!");
            }
          }
        )
      },function(){
        Toast('请求出错');
      })
    },
    lunxun (){
      var timer,that=this;
      setInterval(function(){
        that.$http.jsonp(Lib.C.Mpath+"pay/getOrder?orderId="+that.id).then(function(respoce){
              if(respoce.data.status == 1){
                Toast("付款成功");
                setTimeout(function(){
                  window.location.href="order.html"
                },1000)
              }
          })
      },1000)
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
    surePay(){
      this.$http.jsonp(Lib.C.Mpath+"pay/return_pay?id="+this.id+'&type=goods').then(function(respoce){
        if(respoce.data.status=='1'){
          window.location.href="order.html";
        }
      })
    }
  }
}
</script>

<style scoped>
.order{
  background: #e6e6e6;line-height: 30px;
}
.order section{
  background: #fff;margin-bottom: 4px;border-bottom: 1px solid #e3e3e3;padding-left:10px;
}
.order h5{font-size: 16px;font-weight: bold;}
.order h5,.order .option li,.order .settlement li{
  border-bottom: 1px solid #ebebeb;
}
.order .consignee a {
    color: #333333;
    display: block;
    height:64px;
    line-height:30px;
    position: relative;
    z-index:100;
}
.addrs{display: flex;padding-right:30px;}
.addrs div{flex: 1}
.addrs div:last-child{text-align:right;}
.deductible{background: #33a6b8;color: #fff;padding:4px 10px;border-radius: 3px;margin-left: 10px;}

.pro-detail li{float: none;padding: 10px 10px 10px 0;line-height: 20px;}
.pro-detail li .img{height:80px;width:80px;overflow: hidden;display: block;background-position: center;background-size:contain;background-repeat: no-repeat;margin-right: 10px;}
.pro-detail li .Subtotal{text-align: right;color: #03899c;}
.settlement li{float: none;padding: 5px 12px 5px 0;position: relative;}
.settlement li span{color: #666666;}
.settlement li em{font-style: normal;float: right;color: #329dad;}

.paypage{height: 100%;width: 100%;position: fixed;top:3rem;left: 0;}
</style>