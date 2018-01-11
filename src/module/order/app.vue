<template>
  <top-back :html="html"></top-back>

  <mt-navbar class="page-part" :selected.sync="selected" v-if="level">
    <mt-tab-item id="1">买入</mt-tab-item>
    <mt-tab-item id="2">卖出</mt-tab-item>
  </mt-navbar>

  <!-- tab-container -->
  <mt-tab-container :active.sync="selected">
    <mt-tab-container-item id="1">
      <order-list :have="have1" :orders="buylist" type="1" :user="user"></order-list>
    </mt-tab-container-item>
    <mt-tab-container-item id="2" v-if="level">
      <order-list :have="have2" :orders="sellerlist" type="0" :user="user"></order-list>
    </mt-tab-container-item>
  </mt-tab-container>
</template>

<script>
import Lib from 'assets/Lib.js'
Lib.Vue.use(Lib.Resource);
import { Indicator } from 'mint-ui';
Lib.Vue.use(Lib.MintUI.InfiniteScroll);
import { Navbar, TabItem } from 'mint-ui';
Lib.Vue.component(Navbar.name, Navbar);
Lib.Vue.component(TabItem.name, TabItem);
import { TabContainer, TabContainerItem } from 'mint-ui';
Lib.Vue.component(TabContainer.name, TabContainer);
Lib.Vue.component(TabContainerItem.name, TabContainerItem);
import topBack from 'components/top-back'
import orderList from 'components/order-list'
export default {
  data() {
    return {"have1":true,"have2":true,"buylist":[],"sellerlist":[],"selected":"1",user:'',level:false}
  },
  components: {
    topBack,
  	orderList
  },
  ready(){
  	this.getData()
  },
  methods: {
    getData(){
      var path = Lib.C.Mpath+'order';
        Indicator.open();
      this.$http.jsonp(path).then(function(respoce){
          Indicator.close();
        this.buylist=respoce.data.buylist;
        this.sellerlist=respoce.data.sellerlist;
        this.user = respoce.data.userId;
        if(this.buylist.length == 0){
          this.have1 = false;
        }
        if(this.sellerlist.length == 0){
          this.have2 = false;
        }
      },function(){
          Indicator.close();
          Toast('请求出错');
        })
      if(Lib.C.getCookie("artlevel") != 0){
        that.level = true;
      }
    }
  }  
}
</script>

<style scoped>

</style>





