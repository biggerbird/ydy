<template>
  <top-back></top-back>
  <div v-infinite-scroll="loadMore()"
  infinite-scroll-distance="50" v-if="have">
  <module-art :arts="arts" :user="user"></module-art>
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
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { InfiniteScroll } from 'mint-ui';
Lib.Vue.use(InfiniteScroll);
import topBack from 'components/top-back'
import moduleArt from 'components/module-art'
import loading from 'components/loading'
export default {
  data() {
    return {
      user:'',
      arts:[],
      load:false,
      beginNum:1,
      "total":1,"nothing":Lib.C.baseimg.nothing,have:true
    }
  },
  components: {
    topBack,
    moduleArt,
    loading
  },
  ready(){
  },
  methods: {
    loadMore (){
      var artid=Lib.C.getSearchString("id");
      var path = Lib.C.Mpath+'tbProduct/appQueryListByAutherId?authorid='+artid+'&beginNum='+this.beginNum;
      if(this.beginNum <= this.total){
        this.load=true;
        Indicator.open();
        this.$http.jsonp(path).then(function(respoce){
          Indicator.close();
          this.arts = this.arts.concat(respoce.data.productlist);
          this.total = respoce.data.total;
          this.user = respoce.data.userId;
          this.load=false;
          if(this.arts.length == 0){
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





