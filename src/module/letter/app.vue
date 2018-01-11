<template>
  <top-back></top-back>

  <div v-infinite-scroll="loadMore()" infinite-scroll-distance="50">
    <div class="letters">
      <ul>
        <template v-for="item in activeList">
          <li class="come" v-if="item.fromuserid != userId">
            <div class="clearfix">
              <a href="'users.html?id='+item.fromuserid" class="userimg fl"><img :src="item.fromface" :alt="item.uname"></a>
              <a href="'users.html?id='+item.fromuserid" class="name">{{item.uname}}</a>
              <div class="time">{{item.createtime}}</div>
            </div>
            <div class="discuss">
              <p>{{item.content}}</p>
            </div>
          </li>

          <li class="reply" v-else>
            <div class="clearfix">
              <a :href="user.html" class="userimg fr"><img :src="item.fromface" :alt="item.uname"></a>
              <div>
                <a href="'user.html" class="name">{{item.uname}}</a>
                <div class="time">{{item.createtime}}</div>
              </div>
            </div>
            <div class="discuss">
              <p>{{item.content}}</p>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </div>

  <loading :load='load'></loading>

  <div id="mao" class="mao"></div>

  <div class="opinion">
      <textarea name="content" placeholder="请输入对话内容" v-model="letterText"></textarea>
      <mt-button type="primary" size="large" @click='letter'>发布</mt-button>
  </div>
</template>

<script>
import Lib from 'assets/Lib.js'
Lib.Vue.use(Lib.Resource);
import { Indicator } from 'mint-ui';
import { InfiniteScroll } from 'mint-ui';
Lib.Vue.use(InfiniteScroll);
import topBack from 'components/top-back'
import { Toast } from 'mint-ui';
import { Button } from 'mint-ui';
Lib.Vue.component(Button.name, Button);
import loading from 'components/loading'
export default {
  data() {
    return {userId:'',"activeList":[],beginNum:1,total:1,letterText:'',letterId:'',load:false}
  },
  components: {
    topBack,
    loading
  },
  ready(){
  },
  methods: {
    loadMore (){
      this.letterId=Lib.C.getSearchString("letterId");
      var path= Lib.C.Mpath+'lettes/letteinfo?fid='+this.letterId+'&beginNum='+this.beginNum+'&type=1';
      if(this.beginNum <= this.total){
        this.load=true;
        Indicator.open();
        this.$http.jsonp(path).then(function(respoce){
          Indicator.close();
          this.load = false;
          this.activeList.reverse();
          this.activeList=this.activeList.concat(respoce.data.activeList);
          this.activeList.reverse();
          this.userId = respoce.data.userId;
          this.total = respoce.data.total;
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
    letter(){
      if(this.letterText == ""){
        Toast('对话内容不能为空');
        return false;
      }else{
        this.$http.jsonp(Lib.C.Mpath+'message/ajaxsaveMessage?&touserid='+this.letterId+'&userid='+this.userId+'&content='+this.letterText).then(function(res){
          if(res.data.status == 1){
            Toast('发送成功');
            setTimeout(function(){
              window.location.reload();
            },1000)
          }else{
            Toast(res.data.message)
          }
        },function(){
          Toast('请求出错');
        })
      }
    }
  }  
}
</script>

<style scoped>
.letters{padding:5px;}
.letters ul{background: #eee;border-radius: 5px;margin-bottom:10px;}
.letters li{padding:5px;float: none;}
.letters li .userimg{margin-right:10px;}
.letters li a{color: #33a6b8;}
.letters li .time{margin-left:5px;color: #ccc;}
.letters .reply{text-align: right;}
.letters .reply .userimg,.letters .reply .name,.letters .reply .time{margin-right: 0;margin-left:5px;}
.letters .discuss p{padding:6px;border-radius:5px;background: #2aa145;color: #fff;display: inline-block;word-break:break-all;}
.letters .reply .discuss{margin:5px 50px 5px 0;}
.letters .come .discuss{margin:5px 0 5px 50px;}
.mao{height:120px;width: 100%;background: #fff;}
.opinion{position: fixed;bottom: 0;}
</style>





