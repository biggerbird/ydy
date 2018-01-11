<template>
	<section class="user">
  		<div class="user-top" :style="'background-image:url('+imgDataUrl2+')'" @click="toggleShow2">
        <a v-if="user.faceurl" @click.stop="toggleShow" class="fl"><img class="img" :src="imgDataUrl" :alt="user.nickname"></a>
  			<a v-else @click.stop="toggleShow" class="fl"><img class="img" :src="user.faceurl"></a>
  			<div class="intro">
          <div>
            <div class="name ellipsis" v-if="user.nickname">{{user.nickname}}</div>
            <div class="name ellipsis" v-else>艺朵云</div>
            <div class="identity" v-if="user.artlevel > 0">艺术家LV{{user.artlevel}}</div>
            <div class="identity" v-if="user.agentlevel > 0 && user.agentlevel < 6">经纪人LV{{user.agentlevel}}</div>
            <div class="identity" v-if="user.agentlevel == 6">机构</div>
          </div>
          <p class="motto" v-if="user.signate" @click.stop="showPopup">{{user.signate}}</p>
          <p class="motto" v-else  @click.stop="showPopup">你还没有填写个性签名哦</p>
  			</div>
        <!--div class="sign" @click="sign" @click.stop="setheadimg">
          <i class="iconfont">&#xe6cb;</i>
        </div-->
  		</div>

    <div class="card">
        <mt-cell title="个人资料" href="personal.html" is-link class="noline">
          <i class="iconfont" slot="icon">&#xe609;</i>
        </mt-cell>
    </div>

      <div class="card">
        <ul class="list clearfix">
                <li v-if="user.artlevel > 0 || user.agentlevel == 6">
                  <a :href="'arts.html?id='+userId"><i class="iconfont already">&#xe6d9;</i>
                  <p>艺术品<span>({{user.allProductNumber}})</span></p></a>
                </li>
                <li v-if="user.agentlevel > 0 && user.agentlevel < 6">
                  <a :href="'agents.html'"><i class="iconfont already">&#xe602;</i>
                  <p>推广<span>({{remain}})</span></p>
                  </a>
                </li>
                <li><a :href="'articles.html?id='+userId"><i class="iconfont wait">&#xe687;</i><p>文章<span>({{user.allArticleNumber}})</span></p></a></li>
                <li><a :href="'says.html?id='+userId"><i class="iconfont receipt">&#xe72d;</i><p>说说<span>({{user.sayNumber}})</span></p></a></li>
                <li v-if="user.artlevel > 1"><a :href="'trend.html'"><i class="iconfont coupon">&#xe68d;</i><p>推广趋势图</p></a></li>
        </ul>
      </div>

      <div class="card">
        <mt-cell title="互动">
          <i class="iconfont" slot="icon">&#xe644;</i>
        </mt-cell>
        <ul class="list list2 clearfix">
                <li><a :href="'follows.html?id='+userId"><i class="iconfont already">&#xe6ae;</i><p>关注<span>({{user.attenumber}})</span></p></a></li>
                <li><a :href="'fans.html?id='+userId"><i class="iconfont wait">&#xe619;</i><p>粉丝<span>({{user.fansnumber}})</span></p></a></li>
                <li><a href="letters.html"><i class="iconfont receipt">&#xe61a;</i><p>私信<span>({{user.letterNum}})</span></p></a></li>
                <li><a href="systems.html"><i class="iconfont coupon">&#xe657;</i><p>系统消息<span>({{user.messageNum}})</span></p></a></li>
        </ul>
      </div>

      <div class="card">
        <mt-cell title="管理">
          <i class="iconfont" slot="icon">&#xe611;</i>
        </mt-cell>
        <ul class="list list2 clearfix">
                <li><a href="prove.html"><i class="iconfont wait">&#xe634;</i><p>申请认证</p></a><span v-show="user.orderNopay">{{user.orderNopay}}</span></li>
                <li><a href="password.html"><i class="iconfont receipt">&#xe776;</i><p>修改密码</p></a><span v-show="user.orderNoships">{{user.orderNoships}}</span></li>
                <li><a href="property.html"><i class="iconfont coupon">&#xe60b;</i><p>我的资产</p></a><span v-show="user.couponInfos">{{user.couponInfos}}</span></li>
                <li><a href="address.html"><i class="iconfont favorite">&#xe625;</i><p>收货地址</p></a><span v-show="user.favoriteCount">{{user.favoriteCount}}</span></li>
        </ul>
      </div>

      <div class="card">
        <mt-cell title="订单列表" href="order.html" is-link class="noline">
          <i class="iconfont" slot="icon">&#xe601;</i>
        </mt-cell>
        <!--ul class="list clearfix">
                <li><a href="order.html"><i class="iconfont wait">&#xe62f;</i><p>买入</p></a><span v-show="user.orderNopay">{{user.orderNopay}}</span></li>
                <li><a href="order.html?type=2"><i class="iconfont receipt">&#xe632;</i><p>卖出</p></a><span v-show="user.orderNoships">{{user.orderNoships}}</span></li>
        </ul-->
      </div>

    <div class="card">
        <mt-cell title="意见反馈" href="opinion.html" is-link>
          <i class="iconfont" slot="icon">&#xe631;</i>
        </mt-cell>
        <mt-cell title="关于我们" href="about.html" is-link class="noline">
          <i class="iconfont" slot="icon">&#xe648;</i>
        </mt-cell>
    </div>
    <!--div class="page-button">
      <mt-button type="danger" @click="logout" size="large"><i class="iconfont" slot="icon">&#xe6a3;</i>退出登录</mt-button>
    </div-->
	</section>

  <mt-popup :visible.sync="popupVisible">
    <div class="popupbox">
      <textarea name="letter" cols="30" rows="3" placeholder="请填写个性签名" v-model="signate"></textarea>
      <div class="page-button">
        <mt-button type="primary" @click="setsignate">确定</mt-button>
      </div>
    </div>
  </mt-popup>

	<module-footer></module-footer>

    <my-upload field="img"
        @crop-success="cropSuccess"
        :value.sync="show"
    :width="180"
    :height="180"
    img-format="jpg" @click="choice(1)"></my-upload>

    <my-upload field="img"
        @crop-success="cropSuccess"
        :value.sync="show2"
    :width="1000"
    :height="400"
    img-format="jpg" @click="choice(2)"></my-upload>
</template>

<script>
import Lib from 'assets/Lib.js'
import $ from 'jquery';
Lib.Vue.use(Lib.Resource);
import { Cell } from 'mint-ui';
Lib.Vue.component(Cell.name, Cell);
import { Button } from 'mint-ui';
Lib.Vue.component(Button.name, Button);
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { Popup } from 'mint-ui';
Lib.Vue.component(Popup.name, Popup);
import moduleFooter from 'components/module-footer'
import myUpload from 'vue-image-crop-upload';
export default {
  data() {
    return {userId:'',"user":{},popupVisible:false,signate:'',users:'',show:false,show2:false,imgDataUrl:'',imgDataUrl2:'',remain:''
    }
  },
  components: {
  	moduleFooter,
    myUpload
  },
  ready(){
  	this.getdata();
  },
  methods: {
    showPopup(id){
      this.popupVisible = true;
    },
    getdata (){
      Indicator.open();
      this.$http.jsonp(Lib.C.Mpath+'userIndex').then(function(respoce){
        Indicator.close();
        this.users = respoce.data;
        this.user=respoce.data.user;
        this.imgDataUrl = this.user.faceurl;
        this.imgDataUrl2 = this.user.background_img;
        this.signate = respoce.data.user.signate;
        this.userId = respoce.data.userId;
        this.remain = respoce.data.remain;
      },function(){
        Indicator.close();
        Toast('请求出错');
      })
    },
    logout (){
      MessageBox.confirm('确定要退出登录?').then(action => {
        this.$http.jsonp(Lib.C.Mpath+'login/loginout').then(function(respoce){
          if(respoce.data.status == 1){
            Toast({
              message:"退出成功",
              position: 'middle',
              duration: 1000
            });
            setTimeout(function(){
              window.location.href="login.html";
            },1000)
          }else{
            Toast({
              message:"退出失败，请重新操作",
              position: 'middle',
              duration: 1000
            });
          }
        })
      });
    },
    setsignate (){
      if(!this.signate){
        Toast('签名不能为空！');
        return false;
      }
      this.$http.jsonp(Lib.C.Mpath+'userIndex/edit?signate='+this.signate).then(function(respoce){
        if(respoce.data.flag){
          Toast("设置成功");
          this.user = respoce.data.user;
          this.popupVisible = false;
        }
      })
    },
    toggleShow() {
        this.show = !this.show;
    },
    toggleShow2() {
        this.show2 = !this.show2;
    },
    ajax(data,url){
      var that = this;
      var bool;
      if(this.show){
        bool = true;
        this.show = false;
      }else{
        bool = false;
        this.show2 = false;
      }
      Indicator.open('上传中...');
        var formData = new FormData();
        formData.append('headimg',data);
        formData.append('userId',this.userId);
          $.ajax({
            url: url,
            type: 'POST',
            cache: false,
            data: formData,
            processData: false,
            contentType: false
        }).done(function(res) {
          Indicator.close();
          Toast('上传成功');
          if(bool){
            that.imgDataUrl = data;
          }else{
            that.imgDataUrl2 = data;
          }
        }).fail(function(res){
          Indicator.close();
          Toast('上传失败')
        });
    }
  },
  events:{
    cropSuccess(imgDataUrl, field){
      var url;
      if(this.show){
        url =  Lib.C.Mpath+'personal/loadhead';
      }else{
        url =  Lib.C.Mpath+'personal/uploadbackimg';
      }
      this.ajax(imgDataUrl,url);
    }
  }
}
</script>

<style scoped>
/*用户中心*/
.message{color: #fff;font-size: 24px;}
.already{color: #51ea71;}
.wait{color: #ac5cf0;}
.receipt{color: #57afbc;}
.coupon{color: #ff8f51;}
.favorite{color: #4ba9b7;}
.service{color: #4ee186;font-size:18px;}
.user{width: 16rem;margin: 0 auto 10px;}
.user-top{height:120px;padding: 24px 0 0 20px;background:url(http://img.yiduoyun.com/banner/1494831256141.jpg)  no-repeat scroll center center / cover;color:#fff;position: relative;}
.user-top a.fl{height:70px;width: 70px;overflow: hidden;}
.user-top .img{height:70px;width: 70px;border-radius: 50%;border:2px solid #fff;display: block;}
.user-top .intro{text-shadow: 2px 2px 3px #333;font-weight: bold;padding-left: 80px;}
.user-top .intro .name{height: 24px;line-height:24px;font-size:16px;max-width: 6rem;display: inline-block;}
.user-top .intro .identity{padding: 2px 4px;background: #33a6b9;color: #fff;border-radius: 3px;margin-left: 4px;display: inline-block;overflow: hidden;}
.user-top .motto{margin-top:6px;font-weight: normal;background:rgba(0,0,0,0.2);border:none;color: #fff;padding:6px;max-height: 50px;overflow: hidden;}
.user-top .sign{position: absolute;height:28px;width:40px;right:0;top:4px;background:rgba(0,0,0,0.2);padding: 4px 6px;display:flex;text-align: center;border-top-left-radius: 16px;border-bottom-left-radius: 16px;}
.user-top .sign .iconfont{color: #fff;font-size: 16px;flex: 1;}
.user .common{display: block;height:24px;width: 100%;margin-top:16px;padding: 0 8px;color:#333333;}
.user .common i{width: 24px;float: left;line-height:24px;}
.user .common span{line-height:24px;display: inline-block;margin-left: 8px;}
.user .common em {
    display: inline-block;
    float: right;
    font-style: normal;
    line-height:24px;
}
.user .list{display: flex;}
.user .list li{flex:1;text-align: center;}
.user .list li a{display: block;color: #323232;padding:10px 0;}
.user .list li a p{margin-top: 2px;}
.user .list li img{width: 20px;margin-bottom: 4px;}
.user .list span{
	color: red;
}
span.right img{margin-top:4px;}
.mint-cell::after{border:none;}
.noline.mint-cell::before{border:none;}
.mint-button .iconfont{color: #fff;font-size: 26px;}
</style>





