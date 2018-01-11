<template>
  <top-back></top-back>
    {{{agreetext}}}
  <div class="fixdbox"></div>
</template>

<script>
import Lib from 'assets/Lib.js'
import { Indicator } from 'mint-ui';
import topBack from 'components/top-back'
export default {
  data() {
    return {"agreetext":''}
  },
  components: {
    topBack
  },
  ready(){
  	this.getData();
  },
  methods: {
    getData(){
      Indicator.open();
      var type=Lib.C.getSearchString("type");
      var path = Lib.C.Mpath+'wap/get_info?type='+type;
      this.$http.jsonp(path).then(function(respoce){
        this.agreetext = respoce.data;
        Indicator.close();
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





