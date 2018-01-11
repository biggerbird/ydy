<template>
  <top-back></top-back>

  <div class="main" v-infinite-scroll="loadMore()" infinite-scroll-distance="50" v-if="have">
    <ul class="artists clearfix">
      <li class="card"  v-for="item in messages">
        <div class="line clearfix">
           <a class="userimg fl">
            <img v-if="item.face" :src="item.face">
            <img v-else :src="logo">
          </a>
          <a class="fl c33a6b8">艺朵云官方账号</a>
          <span class="fr">{{item.createtime}}</span>
        </div>
        <div class="line clearfix">
          <p class="title">{{{item.content}}}</p>
        </div>
      </li>
    </ul>
  </div>

  <div class="error_page1" v-else>
      <span class="error_img"><img :src="nothing"></span>
      <p>暂无记录！</p>
  </div>

  <loading :load='load'></loading>
</template>

<script>
import Lib from 'assets/Lib.js'
Lib.Vue.use(Lib.Resource);
import { Indicator } from 'mint-ui';
import topBack from 'components/top-back'
import { InfiniteScroll } from 'mint-ui';
Lib.Vue.use(InfiniteScroll);
import loading from 'components/loading'
export default {
  data() {
    return {"messages":[],logo:Lib.C.baseimg.logo,beginNum:1,total:1,"load":false,"have":true,"nothing":Lib.C.baseimg.nothing}
  },
  components: {
    topBack
  },
  ready(){
  },
  methods: {
    loadMore (){
      if(this.beginNum <= this.total){
        this.load=true;
        Indicator.open();
        this.$http.jsonp(Lib.C.Mpath+'systems?type=1&beginNum='+this.beginNum).then(function(respoce){
          Indicator.close();
          this.messages=this.messages.concat(respoce.data.activeList);
          this.total = respoce.data.total;
          this.load=false;
          this.user = respoce.data.id;
          if(this.messages.length == 0){
            this.have=false;
          }
        },function(){
          Indicator.close();
          Toast('请求出错');
        })
        this.beginNum+=1;
      }else{
        this.loadMore=null;
        this.load=true;
        var spinner=document.getElementById('spinner');
        spinner.innerHTML="数据加载完成";
        spinner.style.width="16rem";
      }
    }
  
  }  
}
</script>

<style scoped>
.artists li{padding: 0.25rem;line-height: 1.5rem;float: none;}
.artists .line{}
.artists li .title{}
.userimg{margin-right: 0.25rem;}
.artists li .time{text-align: center;}
.artists li .manage{text-align: center;}
</style>





