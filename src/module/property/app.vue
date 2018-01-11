<template>
	<top-back></top-back>
  <!--div class="usertab">
    <ul class="clearfix">
      <li :class="{cur:activity}" @click="cut(1)">我的云豆</li>
      <li :class="{cur:!activity}" @click="cut(0)"><p @click="getCoupons">我的优惠券</p></li>
    </ul>
  </div-->
    <div class="art-flex money" v-if="activity">
      <div class="moneyhead clearfix">
        <a href="user.html" class="userimg2 fl"><img :src="user.faceurl" :alt="user.nickname"></a>
        <div class="moneytotle clearfix">
          <div class="fl">
            <i class="icon iconfont c33a6b8">&#xe608;</i>：
            <span class="bigsize">{{user.avayundou}}</span>个
            <div>(1云豆=1元)</div>
          </div>
          <div class="fl" v-if="user.freezeyundou">
            <span>押金：</span>
            <span class="bigsize">{{user.freezeyundou}}</span>元
          </div>
          <div class="fl">
            <mt-button type="primary" @click="show">充值</mt-button>
            <mt-button type="primary" @click="show2">提现</mt-button>
          </div>
        </div>
      </div>

      <mt-popup :visible.sync="popupVisible" position="center">
        <div class="popupbox">
          <mt-field label="充值金额：" placeholder="请输入充值金额(元)" type="number" :value.sync="money" :attr="{min:1}"></mt-field>
          <div class="page-button">
            <mt-button type="primary" size="small" @click="recharge">立即充值</mt-button>
          </div>
        </div>
      </mt-popup>

      <mt-popup :visible.sync="popupVisible2" position="center">
        <div class="popupbox">
          <mt-field label="支付宝账号：" readonly :value.sync="account" type="number"></mt-field>
          <mt-field placeholder="提现金额(100的整数)" type="number" :value.sync="money2" :attr="{min:100,step:100}"></mt-field>
          <mt-field placeholder="支付密码" type="password" :value.sync="paypwd" :attr="{minlength:6,maxlength:6}"></mt-field>
          <div class="page-button">
            <mt-button type="primary" size="small" @click="cash">申请提现</mt-button>
          </div>
        </div>
      </mt-popup>
      
      <mt-navbar class="page-part" :selected.sync="selected">
        <mt-tab-item id="1">收入</mt-tab-item>
        <mt-tab-item id="2">支出</mt-tab-item>
        <mt-tab-item id="3">明细</mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container :active.sync="selected">
        <mt-tab-container-item id="1">
          <table class="ui-table">
            <thead>
              <tr>
                <th>时间</th>
                <th>用户</th>
                <th>数量(个)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in income">
                <td class="time">{{item.createtime}}</td>
                <td><a :href="'users.html?id='+item.targetuserid" class="user">{{item.nickname}}</a></td>
                <td><span class="green">+{{item.money}}</span></td>
              </tr>
            </tbody>
          </table>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <table class="ui-table">
            <thead>
              <tr>
                <th>时间</th>
                <th>用户</th>
                <th>数量(个)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in expenditure">
                  <td class="time">{{item.createtime}}</td>
                  <td><a :href="'users.html?id='+item.targetuserid" class="user">{{item.nickname}}</a></td>
                  <td><span class="green">-{{item.money}}</span></td>
              </tr>
            </tbody>
          </table>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <table class="ui-table">
            <thead>
              <tr>
                <th>时间</th>
                <th>变化</th>
                <th>余额(个)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in detailed">
                <td class="time">{{item.createtime}}</td>
                <td><span class="green">{{item.money}}</span></td>
                <td>{{item.aftermoney}}</td>
              </tr>
            </tbody>
          </table>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

    <div class="art-flex" v-else>
      <ul class="vouchers clearfix" v-if="have">
          <li>
            <div class="voucher">
              <div class="clearfix">
                <div class="value fl"><span>100</span> 元</div>
                <div class="type fr">打赏券</div>
              </div>
              <div class="time">截止日期2018/08/08</div>
              <a class="close" title="删除">X</a>
            </div>
          </li>
          <li class="already">
            <div class="voucher">
              <div class="clearfix">
                <div class="value fl"><span>100</span> 元</div>
                <div class="type fr">打赏券</div>
              </div>
              <div class="time">截止日期2018/08/08</div>
              <p class="sign">已使用</p>
              <a class="close">X</a>
            </div>
          </li>
          <li class="overdue">
            <div class="voucher">
              <div class="clearfix">
                <div class="value fl"><span>100</span> 元</div>
                <div class="type fr">打赏券</div>
              </div>
              <div class="time">截止日期2018/08/08</div>
              <p class="sign">已过期</p>
              <a class="close">X</a>
            </div>
          </li>
        </ul>

        <div class="error_page1" v-else>
          <span class="error_img"><img :src="nothing"></span>
          <p>暂无记录！</p>
        </div>
    </div>
</template>

<script>
import Lib from 'assets/Lib.js'
Lib.Vue.use(Lib.Resource);
import { Indicator } from 'mint-ui';
import topBack from 'components/top-back'
import { Toast } from 'mint-ui';
import { Field } from 'mint-ui';
Lib.Vue.component(Field.name, Field);
import { Popup } from 'mint-ui';
Lib.Vue.component(Popup.name, Popup);
import { Navbar, TabItem } from 'mint-ui';
Lib.Vue.component(Navbar.name, Navbar);
Lib.Vue.component(TabItem.name, TabItem);
import { Cell } from 'mint-ui';
Lib.Vue.component(Cell.name, Cell);
import { Button } from 'mint-ui';
Lib.Vue.component(Button.name, Button);
import { TabContainer, TabContainerItem } from 'mint-ui';
Lib.Vue.component(TabContainer.name, TabContainer);
Lib.Vue.component(TabContainerItem.name, TabContainerItem);
export default {
  data() {
    return {"popupVisible":false,"popupVisible2":false,"selected":"1","activity":true,user:'',
    income:[],expenditure:[],detailed:[],money:'',account:'',paypwd:'',money2:'100',"have":true,coupons:'',id:''
    }
  },
  components: {
  	topBack
  },
  ready(){
  	this.getData()
  },
  methods: {
  	getData (){
        Indicator.open();
      this.$http.jsonp(Lib.C.Mpath+'personalDetails/index').then(function(respoce){
          Indicator.close();
        this.income = respoce.data.income;
        this.expenditure = respoce.data.expenditure;
        this.detailed = respoce.data.detailed;
        this.user = respoce.data.information;
        this.account = this.user.account;
      },function(){
          Indicator.close();
          Toast('请求出错');
        })
    },
    getCoupons(){
      this.$http.jsonp(Lib.C.Mpath+'frontPay/toPay?money='+this.money).then(function(respoce){
        this.coupons=respoce.data.message;
      },function(){
          Toast('请求出错');
        })
    },
    recharge (){
      if(this.money <=0){
        Toast("充值金额必须大于0");
        return false;
      }
      this.$http.jsonp(Lib.C.Mpath+'frontPay/toPay?money='+this.money).then(function(respoce){
        if(respoce.data.id){
          this.id = respoce.data.id;
          this.weipay();
        }else{
          Toast('请求出错');
        }
      },function(){
          Toast('请求出错');
        })
    },
    weipay(){
      var that = this;
      this.$http.jsonp(Lib.C.Mpath+"pay/index?payType=wx_pay&type=charge&id="+this.id).then(function(respoce){
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
    surePay(){
      this.$http.jsonp(Lib.C.Mpath+"pay/return_pay?id="+this.id+'&type=charge').then(function(respoce){
        if(respoce.data.status=='1'){
          window.location.reload();
        }
      })
    },
    cash (){
      if(this.money2 <= 0  || this.money2%100 != 0){
        Toast("提现金额必须是100的整数倍");
        return false;
      }
      if(!this.testPaypass(this.paypwd)){
        return false;
      }
      this.$http.jsonp(Lib.C.Mpath+'cash?money='+this.money2+'&account='+this.account+'&paypwd='+this.paypwd).then(function(respoce){
        if(respoce.data.status == 200){
          Toast(respoce.data.message);
          setTimeout(function(){
            window.location.reload();
          },2000)
        }else{
          Toast(respoce.data.message);
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
    cut (num){
      if(num){
        this.activity = true ;
      }else{
        this.activity = false ;
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
.art-flex{margin:20px auto;}

.moneyhead .userimg2{}
.moneyhead .moneytotle{padding-left:2rem;line-height:30px;}
.moneyhead .moneytotle .explain{float: right;color: #ccc;}
.moneyhead .moneytotle .fl{width: 50%;}
.paybox{text-align:center;display:flex;display:none;width:8rem;}
.paybox .box{flex:1}
.paybox{width:auto;}

.vouchers li{padding:0.5rem;width: 50%;}
.voucher{width:100%;height:3rem;position: relative;background:#00a40d;color:#fff;border-radius: 5px;margin: 0 auto;padding: 5px;}
.already .voucher{background: #999;}
.overdue .voucher{background: #ccc;}
.voucher .value span{font-size:1.6rem;text-shadow: 0 0 3px #999;line-height:1.6rem;}
.voucher .type{width:0.5rem;}
.voucher .time{font-size:0.45rem;line-height:0.5rem;}
.voucher .close{position: absolute;top:-0.25rem;right:-0.25rem;display: block;width:0.75rem;height:0.75rem;background:rgba(0,0,0,0.3);color: #fff;text-align: center;
  line-height:0.75rem;border-radius: 50%;display: none;}
.voucher:hover .close{display: block;}
.voucher .sign{position: absolute;top:0.5rem;left:2rem;width:3.5rem;height:2rem;text-align: center;line-height:1.8rem;border:4px solid #a8241d;color: #fcc2c6;
  background:rgba(245,10,26,0.5);text-shadow: 0 0 3px #6c0008;transform: rotate(-45deg);font-size:0.8rem;}
</style>





