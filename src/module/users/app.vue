<template>
  <top-back></top-back>
  <section class="user">
    <div class="user-top" :style="'background-image:url('+user.background_img+')'">
      <a  class="fl" v-if="user.name"><img class="img" :src="user.path+'/'+user.name" :alt="user.trueName || '艺朵云'"></a>
      <a  class="fl" v-else><img class="img" :src="user.faceurl"></a>
      <div class="intro">
        <div>
          <div class="name ellipsis" v-if="user.nickname">{{user.nickname}}</div>
          <div class="name ellipsis" v-else>艺朵云</div>
          <div class="identity" v-if="user.artlevel > 0">艺术家LV{{user.artlevel}}</div>
          <div class="identity" v-if="user.agentlevel > 0 && user.agentlevel < 6">经纪人LV{{user.agentlevel}}</div>
          <div class="identity" v-if="user.agentlevel == 6">机构</div>
        </div>
        <p class="motto" v-if="user.signate">{{user.signate}}</p>
        <p class="motto" v-else>对方还没有填写个性签名哦</p>
      </div>
    </div>


    <div class="card">
        <a class="mint-cell noline" :href="'personals.html?id='+user.id">
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <i class="iconfont" slot="icon">&#xe609;</i>
              <span class="mint-cell-text">他人资料</span>
            </div>
          </div>
          <i class="mint-cell-allow-right"></i>
        </a>

    </div>

      <div class="card">
        <ul class="list clearfix">
                <li v-if="user.artlevel > 0 || user.agentlevel == 6">
                  <a :href="'arts.html?id='+user.id"><i class="iconfont already">&#xe6d9;</i>
                  <p>艺术品<span>({{user.productNumber}})</span></p></a>
                </li>
                <li v-if="user.agentlevel > 0 && user.agentlevel < 6">
                  <a :href="'agents.html'"><i class="iconfont already">&#xe602;</i>
                  <p>推广<span>({{user.allArticleNumber}})</span></p>
                  </a>
                </li>
                <li><a :href="'articles.html?id='+user.id"><i class="iconfont wait">&#xe687;</i><p>文章<span>({{user.articleNumber}})</span></p></a></li>
                <li><a :href="'says.html?id='+user.id"><i class="iconfont receipt">&#xe72d;</i><p>说说<span>({{user.sayNumber}})</span></p></a></li>
        </ul>
      </div>

      <div class="card">
        <ul class="list list2 clearfix">
                <li class="nopint"><a><i class="iconfont already">&#xe6ae;</i><p>关注 <span>({{user.attenumber}})</span></p></a></li>
                <li class="nopint"><a><i class="iconfont wait">&#xe619;</i><p>粉丝 <span>({{user.fansnumber}})</span></p></a></li>
        </ul>
      </div>
  </section>

  <div class="fixdbox"></div>
  <div class="fixed center">
      <mt-button type="primary" size="normal" @click="follow" v-if="user.flag"> 取消关注 </mt-button>
      <mt-button type="primary" size="normal" @click="setfollow" v-else> 关注 </mt-button>
      <mt-button type="primary" size="normal" @click='showLetter'> 私信 </mt-button>
  </div>


  <mt-popup :visible.sync="popupVisible">
    <div class="popupbox">
      <textarea name="letter" cols="30" rows="10" placeholder="填写私信内容" v-model="letterText"></textarea>
      <div class="page-button">
        <button class="mint-button mint-button--primary mint-button--normal" @click="letter">发送</button>
      </div>
    </div>
  </mt-popup>
</template>

<script>
import Lib from 'assets/Lib.js'
Lib.Vue.use(Lib.Resource);
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { Cell } from 'mint-ui';
Lib.Vue.component(Cell.name, Cell);
import { Button } from 'mint-ui';
Lib.Vue.component(Button.name, Button);
import { Popup } from 'mint-ui';
Lib.Vue.component(Popup.name, Popup);
import topBack from 'components/top-back'
export default {
  data() {
    return {otherId:'',userId:'',"user":{},users:{},popupVisible:false,letterText:''}
  },
  components: {
    topBack
  },
  ready(){
    this.getData()
  },
  methods: {
    getData (){
      this.otherId=Lib.C.getSearchString("id");
      var path = Lib.C.Mpath+'tbuser/otherIndex?otherId='+this.otherId;
      Indicator.open();
      this.$http.jsonp(path).then(function(respoce){
        Indicator.close();
        this.users = respoce.data;
        this.user = respoce.data.vo;
        this.userId = respoce.data.userId;
        if(this.otherId == this.userId){
          location.href = 'user.html';
        }
      },function(){
          Indicator.close();
          Toast('请求出错');
        })
    },
    showLetter(){
      this.popupVisible = true;
    },
    letter(){
      if(this.letterText == ""){
        Toast('私信内容不能为空');
        return false;
      }else{
        this.$http.jsonp(Lib.C.Mpath+'message/ajaxsaveMessage?&touserid='+this.otherId+'&content='+this.letterText).then(function(res){
          if(res.data.status == 1){
            Toast(res.data.message);
            this.popupVisible = false;
          }else{
            Toast(res.data.message)
          }
        },function(){
          Toast('请求出错');
        })
        }
    },
    follow(){
      if(this.user.flag){
        MessageBox.confirm('是否取消关注?').then(action => {
          this.setfollow()
        });
      }else{
        this.setfollow();
      }
    },
    setfollow(){
      this.$http.jsonp(Lib.C.Mpath+'productDetails/guanzhu?&id='+this.otherId).then(function(res){
          if(res.data.status == 1){
            this.user.flag = true;
            Toast(res.data.message);
          }else if(res.data.status == -1){
            this.user.flag = false;
            Toast(res.data.message);
          }else{
            Toast(res.data.message);
          }
        },function(){
          Toast('请求出错');
        })
    }
  }  
}
</script>

<style scoped>
/*用户中心*/
.already{color: #51ea71;}
.wait{color: #ac5cf0;}
.receipt{color: #57afbc;}
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

.user .common{display: block;height: 1.2rem;width: 100%;margin-top: 0.8rem;padding: 0 0.4rem;font-size: 0.7rem;color:#333333;}
.user .common i{width: 1.2rem;float: left;line-height: 1.2rem;}
.user .common span{line-height: 1.2rem;display: inline-block;margin-left: 0.4rem;}
.user .common em {
    display: inline-block;
    float: right;
    font-style: normal;
    line-height: 1.2rem;
}
.user .list{display: flex;}
.user .list li{flex:1;text-align: center;}
.user .list li a{display: block;color: #323232;padding:10px 0;}
.user .list li a p{margin-top: 2px;}
.user .list li img{width: 20px;margin-bottom: 4px;}
.user .list span{
  color: red
}
span.right img{margin-top: 0.3rem;}
.mint-cell::after{border:none;}
.noline.mint-cell::before{border:none;}
.nopint{background: #149aae;color: #fff;}
.nopint p{color: #fff;}
.nopint .iconfont{color: #fff;}
.list .nopint span{color: #fff}
</style>





