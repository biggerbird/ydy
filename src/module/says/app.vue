<template>
  <top-back></top-back>
  <div v-infinite-scroll="loadMore()"
  infinite-scroll-distance="50" v-if="have">
  <module-say :says="says" :user="user"></module-say>
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
import { InfiniteScroll } from 'mint-ui';
Lib.Vue.use(InfiniteScroll);
import topBack from 'components/top-back'
import moduleSay from 'components/module-say'
import loading from 'components/loading'
export default {
  data() {
    return {
      user:'',
      says:[],
      load:false,
      beginNum:1,
      "total":1,"nothing":Lib.C.baseimg.nothing,have:true
    }
  },
  components: {
    topBack,
    moduleSay,
    loading
  },
  ready(){
  },
  methods: {
    loadMore (){
      var authorid=Lib.C.getSearchString("id");
      var path = Lib.C.Mpath+'saylist/getActiveList?authorid='+authorid+'&beginNum='+this.beginNum;
      if(this.beginNum <= this.total){
        this.load=true;
        Indicator.open();
        this.$http.jsonp(path).then(function(respoce){
          Indicator.close();
          this.says = this.says.concat(respoce.data.activeList);
          this.total = respoce.data.total;
          this.user = respoce.data.userId;
          if(this.says.length == 0){
            this.have=false;
          }
          this.load=false;
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





