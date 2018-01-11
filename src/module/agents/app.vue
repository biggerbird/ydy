<template>
  <top-back></top-back>

  <mt-navbar class="page-part" :selected.sync="selected">
    <mt-tab-item id="1">推广中</mt-tab-item>
    <mt-tab-item id="2">已售出</mt-tab-item>
  </mt-navbar>

  <!-- tab-container -->
  <mt-tab-container :active.sync="selected">
    <mt-tab-container-item id="1">
      <agent-list :have="have" :orders="agentings" ></agent-list>
      <loading :load="load"></loading>
    </mt-tab-container-item>
    <mt-tab-container-item id="2">
      <agent-list :have="have2" :orders="agenteds" ></agent-list>
      <loading :load="load2"></loading>
    </mt-tab-container-item>
  </mt-tab-container>
</template>

<script>
import Lib from 'assets/Lib.js'
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
Lib.Vue.use(Lib.Resource);
Lib.Vue.use(Lib.MintUI.InfiniteScroll);
import { Navbar, TabItem } from 'mint-ui';
Lib.Vue.component(Navbar.name, Navbar);
Lib.Vue.component(TabItem.name, TabItem);
import { TabContainer, TabContainerItem } from 'mint-ui';
Lib.Vue.component(TabContainer.name, TabContainer);
Lib.Vue.component(TabContainerItem.name, TabContainerItem);
import topBack from 'components/top-back'
import agentList from 'components/agent-list'
import loading from 'components/loading'
export default {
  data() {
    return {"have":true,"have2":true,"agentings":[],"agenteds":[],"beginNum":1,"total":1,"beginNum2":1,"total2":1,"load":false,"load2":false,selected:'1'}
  },
  components: {
    topBack,
  	agentList,
    loading
  },
  ready(){
    this.loadMore();
    this.loadMore2();
  },
  methods: {
    loadMore(){
      var path = Lib.C.Mpath+'agents/getSpreedingData?beginNum='+this.beginNum+'&pageSize='+this.total;
        this.load=true;
        Indicator.open();
        this.$http.jsonp(path).then(function(response){
          Indicator.close();
            this.load=false;
            this.agentings=this.agentings.concat(response.data);
            if(this.agentings.length == 0){
              this.have = false;
            }
        },function(){
          Indicator.close();
          Toast('请求出错');
        })
    },
    loadMore2(){
      var path = Lib.C.Mpath+'agents/getSellered?beginNum='+this.beginNum2+'&pageSize='+this.total2;
        this.load2=true;
        Indicator.open();
        this.$http.jsonp(path).then(function(response){
          Indicator.close();
          this.load2=false;
          this.agenteds=this.agenteds.concat(response.data.spreededlist);
          if(this.agenteds.length == 0){
            this.have2 = false;
          }
        },function(){
          Indicator.close();
          Toast('请求出错');
        })
    }
  }
}
</script>

<style scoped>

</style>





