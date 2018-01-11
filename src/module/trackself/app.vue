<template>
  <div class="usertabbox"></div>
    <div class="usertab">
      <ul class="clearfix">
        <li><a href="track.html">全部动态</a></li>
        <li class="cur"><a href="trackself.html">和我相关</a></li>
      </ul>
    </div>
  <div v-infinite-scroll="loadMore()"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="50" v-if="have"><track-self :tracks="tracks" :user="user"></track-self></div>

  <div class="error_page1" v-else>
      <span class="error_img"><img :src="nothing"></span>
      <p>暂无记录！</p>
  </div>
  
  <loading :load="load"></loading>
<module-footer></module-footer>
</template>

<script>

import Lib from 'assets/Lib.js'
Lib.Vue.use(Lib.Resource);
import { Indicator } from 'mint-ui';
Lib.Vue.use(Lib.MintUI.InfiniteScroll);
import trackSelf from 'components/track-self'
import loading from 'components/loading'
import moduleFooter from 'components/module-footer'

export default {
  data() {
    return {beginNum:1,tracks:[],"total":1,"load":false,all:true,user:'',"have":true,"nothing":Lib.C.baseimg.nothing}
  },
  components: {
    trackSelf,
    loading,
    moduleFooter
  },
  ready(){
  },
  methods: {
    loadMore (){
      if(this.beginNum <= this.total){
        this.load=true;
        var path = Lib.C.Mpath+'tbuser/getActiveList?type=2&beginNum='+this.beginNum;
        Indicator.open();
        this.$http.jsonp(path).then(function(respoce){
          Indicator.close();
          this.load=false;
          this.user = respoce.data.userId;
          this.tracks=this.tracks.concat(respoce.data.activeList);
          this.total=respoce.data.total;
          if(this.tracks.length == 0){
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
    },
    tracktype(num){
      if(num == 1){
        this.all = true;
      }else{
        this.all = false
      }
    }
  }
}
</script>

<style scoped>
</style>





