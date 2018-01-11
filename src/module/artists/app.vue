<template>
<div v-infinite-scroll="loadMore()"
  infinite-scroll-distance="50"><module-artists :artists="artists" :user="user"></module-artists></div>
<loading :load="load"></loading>
<module-footer></module-footer>
</template>

<script>

import Lib from 'assets/Lib.js'
Lib.Vue.use(Lib.Resource);
import { Indicator } from 'mint-ui';
Lib.Vue.use(Lib.MintUI.InfiniteScroll);
import moduleArtists from 'components/module-artists'
import loading from 'components/loading'
import moduleFooter from 'components/module-footer'

export default {
  data() {
    return {user:'',beginNum:1,artists:[],"total":1,"load":false}
  },
  components: {
    moduleArtists,
    loading,
    moduleFooter
  },
  ready(){
  },
  methods: {
    loadMore (){
        var path = Lib.C.Mpath+'userIndex/getArtList?&beginNum='+this.beginNum+'&total='+this.total;
      if(this.beginNum <= this.total){
        this.load=true;
        Indicator.open();
        this.$http.jsonp(path).then(function(respoce){
          Indicator.close();
          this.user = respoce.data.userId;
          this.load=false;
          this.artists=this.artists.concat(respoce.data.volist);
          this.total=respoce.data.total;
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





