<template>
  <top-back></top-back>
  <div class="main" v-infinite-scroll="loadMore()" infinite-scroll-distance="50" v-if="have">
    <ul class="artists clearfix">
      <li class="card" v-for="item in messages">
        <div class="line clearfix">
           <a :href="'users.html?id='+item.fromuserid" class="userimg fl">
            <img :src="item.fromface">
          </a>
          <a class="fl c33a6b8">{{item.fromnickname}}</a>
          <span class="fr">{{item.createtime}}</span>
        </div>
        <div class="line clearfix">
          <a :href="'letter.html?letterId='+item.fromuserid" class="title fl ellipsis" v-if="userId != item.fromuserid">{{item.content}}</a>
          <a :href="'letter.html?letterId='+item.touserid" class="title fl ellipsis" v-else>{{item.content}}</a>
          <div class="manage fr" @click="delete(item.id,$index)">
            <a><i class="iconfont">&#xe6d3;</i></a>
          </div>
        </div>
      </li>
    </ul>
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
import { MessageBox } from 'mint-ui';
import topBack from 'components/top-back'
import { InfiniteScroll } from 'mint-ui';
Lib.Vue.use(InfiniteScroll);
import loading from 'components/loading'
export default {
  data() {
    return {"messages":[],beginNum:1,total:1,"load":false,userId:'',"nothing":Lib.C.baseimg.nothing,have:true}
  },
  components: {
    topBack,
    loading
  },
  ready(){
  },
  methods: {
    loadMore (){
      var path = Lib.C.Mpath+'lettes?type=1&beginNum='+this.beginNum;
      if(this.beginNum <= this.total){
        this.load=true;
        Indicator.open();
        this.$http.jsonp(path).then(function(respoce){
          Indicator.close();
          this.messages=this.messages.concat(respoce.data.activeList);
          this.total = respoce.data.total;
          this.load=false;
          this.userId = respoce.data.id;
          if(this.messages.length == 0){
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
    delete(id,index){
      MessageBox.confirm('确定删除这条私信?').then(action => {
        this.$http.jsonp(Lib.C.Mpath+'lettes/deletesx?id='+id).then(function(respoce){
          if(respoce.data.status){
            this.messages.splice(index,1);
            Toast("删除成功");
          }
        })
      })
    }
  }  
}
</script>

<style scoped>
.artists li{padding:5px;line-height:40px;float: none;}
.artists li .title{width: 14rem;}
.userimg{margin-right:5px;}
.artists li .time{text-align: center;}
.artists li .manage{text-align: center;}
</style>





