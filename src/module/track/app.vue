<template>
  <div class="usertabbox"></div>
    <div class="usertab">
      <ul class="clearfix">
        <li class="cur"><a href="track.html">全部动态<!--span class="num">30</span--></a></li>
        <li><a href="trackself.html">和我相关<!--span class="num">30</span--></a></li>
      </ul>
    </div>
    <div v-infinite-scroll="loadMore()"
  infinite-scroll-distance="50" v-if="have"><track :tracks="tracks" :user="user"></track></div>

    <div class="error_page1" v-else>
      <span class="error_img"><img :src="nothing"></span>
      <p>暂无记录！去关注一些艺术家吧</p>
      <div class="page-button">
        <a href="artists.html"><mt-button type="primary">关注艺术家</mt-button></a>
      </div>
  </div>

<loading :load="load"></loading>
<module-footer></module-footer>
</template>

<script>

import Lib from 'assets/Lib.js'
Lib.Vue.use(Lib.Resource);
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
Lib.Vue.use(Lib.MintUI.InfiniteScroll);
import { Button } from 'mint-ui';
Lib.Vue.component(Button.name, Button);
import track from 'components/track'
import loading from 'components/loading'
import moduleFooter from 'components/module-footer'

export default {
  data() {
    return {beginNum:1,tracks:[],"total":1,"load":false,user:'',"have":true,"nothing":Lib.C.baseimg.nothing}
  },
  components: {
    track,
    loading,
    moduleFooter
  },
  ready(){
  },
  methods: {
    loadMore (){
      if(this.beginNum <= this.total){
        this.load=true;
        var path = Lib.C.Mpath+'tbuser/getActiveList?type=1&beginNum='+this.beginNum;
        Indicator.open();
        this.$http.jsonp(path).then(function(respoce){
          Indicator.close();
          this.load=false;
          this.user = respoce.data.userId;
          this.tracks=this.tracks.concat(respoce.data.activeList);
          this.total=respoce.data.total;
          if(this.tracks.length == 0){
            this.have = false;
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
    },
    tracktype(){
      
    }
  }
}
</script>

<style>
</style>





