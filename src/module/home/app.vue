<template>
<module-banner :banner="banner"></module-banner>
<section class="artists"
  v-infinite-scroll="loadMore()"
  infinite-scroll-distance="50">
  <dynamic :dynamics="dynamics"></dynamic>
  <loading :load="load"></loading>
</section>

<module-footer></module-footer>
</template>

<script>

import Lib from 'assets/Lib.js'
Lib.Vue.use(Lib.Resource);
Lib.Vue.use(Lib.MintUI.InfiniteScroll);
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { InfiniteScroll } from 'mint-ui';
Lib.Vue.use(InfiniteScroll);
import moduleHead from 'components/module-head'
import moduleBanner from 'components/module-banner'
import dynamic from 'components/dynamic'
import loading from 'components/loading'
import moduleFooter from 'components/module-footer'

export default {
  data() {
    return {"banner":{},"dynamics":[],"beginNum":1,"total":1,"load":false}
  },
  components: {
    moduleBanner,
    dynamic,
    loading,
    moduleFooter
  },
  ready(){
    //this.version();
  	this.getdata();
  },
  methods: {
    version () {
      var that=this;
      if(vers != ""){
          that.$http.jsonp(Lib.C.Mpath + "home/getversion").then(function (response) {
            if(vers < response.data.versionCode){
              MessageBox.confirm(response.data.msg + "，立刻下载?", "发现新版本" + response.data.versionName).then(function () {
                  window.open(response.data.app, "_system", "location=yes");
              })
            }
          })
      }
    }, 
    getdata (){
        var path = Lib.C.Mpath+'home?from=mobile';
        Indicator.open();
        this.$http.jsonp(path).then(function(response){
          Indicator.close();
          this.banner = response.data.banner;
          if(response.data.errorinfo == "未传用户id"){
            //Toast("请登录");
            setTimeout(function(){
              //location.href = 'login.html';
            },1000)
          }
          if(response.data.user.artlevel > 1 || response.data.user.agentlevel == 6){
            document.cookie="artlevel = 1";
          }else{
            document.cookie="artlevel = 0";
          }
        },function(){
          Indicator.close();
          Toast('请求出错');
        })
    },
    loadMore (){
      var path=Lib.C.Mpath+'home/getActiveList?type=1&beginNum='+this.beginNum;
      if(this.beginNum <= this.total){
        this.load=true;
        Indicator.open();
        this.$http.jsonp(path).then(function(response){
          Indicator.close();
            this.load=false;
            this.dynamics=this.dynamics.concat(response.data.activeList);
            this.total=response.data.total;
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





