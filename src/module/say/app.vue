<template>
  <top-back></top-back>
  
  <purikura :usercon="usercon"></purikura>

  <section class="details">
    <report :time="time" :reportid="reportid" :self="self"></report>
    <div class="saybox  clearfix">
      {{{all.content}}}
    </div>
    </section>

    <ul class="page">
      <li v-if="prev.length"><a class="ellipsis" :href="'say.html?id='+prev[0].id">上一条：{{{prev[0].content}}}</a></li>
      <li v-else class="prohibit"><a class="ellipsis">上一条：无</a></li>
      <li v-if="next.length"><a class="ellipsis" :href="'say.html?id='+next[0].id">下一条：{{{next[0].content}}}</a></li>
      <li v-else class="prohibit"><a class="ellipsis">下一条：无</a></li>
    </ul>
  
    <module-tab :messages="messages" :user="user" :permit="permit" :self="self"></module-tab>
</template>

<script>

import Lib from 'assets/Lib.js'
Lib.Vue.use(Lib.Resource);import { Header } from 'mint-ui';
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
Lib.Vue.component(Header.name, Header);
import topBack from 'components/top-back'
import purikura from 'components/purikura'
import report from 'components/report'
import page from 'components/page'
import moduleTab from 'components/module-tab'
export default {
  data() {
    return {
      usercon:'',messages:'',user:'',next:'',prev:'',all:'',permit:true,time:'',reportid:'',self:false
    }
  },
  components: {
    topBack,
    purikura,
    report,
    page,
    moduleTab
  },
  ready(){
    this.getdata();
  },
  methods: {
    getdata (){
      var artid=Lib.C.getSearchString("id");
      var path = Lib.C.Mpath+'productDetails?id='+artid;
      Indicator.open();
      this.$http.jsonp(path).then(function(respoce){
        Indicator.close();
        if(!respoce.data.user){
            Toast("该条数据已被删除，请访问其他");
            return false;
        }
        this.usercon = respoce.data.user;
        this.next = respoce.data.next;
        this.prev = respoce.data.previous;
        this.all = respoce.data.all1;
        this.messages = respoce.data;
        this.user =  respoce.data.userId;
        this.time = respoce.data.all1.activetime;
        this.reportid = respoce.data.activeId;
        if(this.user == this.usercon.id){
          this.self=true;
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
.details .title{
line-height: 30px;padding:0 10px;
}
.details h4{font-size:16px;font-weight: bold;color: #171717;text-align: center;}
.details .content{
  line-height: 20px;
}
.details dt{
  color: #010101;margin-bottom:10px;
}
.details dd{
  width: 30%;margin: 0 1.66%;float: left;
}
.details dd a{
  display: block;width: 100%;height: 4.25rem;overflow: hidden;position: relative;background-repeat: no-repeat;background-size:contain;background-position:center;
}
.details dd a img{
  position: absolute;top: 50%;transform: translateY(-50%);
}
.details dd h6{
  padding:4px;font-size: 12px;
}
</style>





