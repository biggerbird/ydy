<template>
  <top-back></top-back>
    <div v-infinite-scroll="loadMore()"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="50" v-if="have"><module-artists :artists="artists"></module-artists></div>

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
Lib.Vue.use(Lib.MintUI.InfiniteScroll);
import topBack from 'components/top-back'
import moduleArtists from 'components/module-artists'
import loading from 'components/loading'

export default {
  data() {
    return {beginNum:1,artists:[],"total":1,"load":false,"nothing":Lib.C.baseimg.nothing,have:true}
  },
  components: {
    topBack,
    moduleArtists,
    loading
  },
  ready(){
  },
  methods: {
    loadMore (){
      var userId = Lib.C.getSearchString("id");
      var path = Lib.C.Mpath+'tbFriend/queryAttentListById?userId='+userId+'&beginNum='+this.beginNum;
      if(this.beginNum <= this.total){
        this.load=true;
        Indicator.open();
        this.$http.jsonp(path).then(function(respoce){
          Indicator.close();
          this.load=false;
          this.artists=this.artists.concat(respoce.data.fansList);
          this.total=respoce.data.total;
          if(this.artists.length == 0){
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


</style>





