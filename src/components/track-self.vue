<template>
	<ul class="dynamiclist clearfix">
		<li v-for="item in tracks">
		   <div class="user-head clearfix" v-if="item.activetype != '评论'">
		     <a :href="'users.html?id='+item.activeuserid" class="userimg fl"><img :src="item.headurl" /></a>
		     <p class="ellipsis">
		     	<a :href="'users.html?id='+item.activeuserid">{{item.nickname}}</a>
		     	<em class="space"></em> {{item.activetype}}
		     	<template v-if='item.activetype == "打赏"'>
		     		<em class="space"></em><span class="ce28a89">{{item.yundou}} </span>个<i class="icon iconfont c33a6b8">&#xe608;</i>
		     	</template>
		     	<template v-if='item.activetype == "赞了"'>
		     		<em class="space"></em><i class="icon iconfont c33a6b8">&#xe650;</i>
		     	</template>
		     </p>
		     <div class="time">
		      {{item.activetime}}
		     </div>
		   </div>
		   <div class="clearfix card2 line-box">
		    <div class="user-head clearfix">
			    <a :href="'users.html?id='+item.targetuserid" class="userimg fl"><img :src="item.targetHeadurl"/></a>
			    <p class="ellipsis"><a :href="'users.html?id='+item.targetuserid">{{item.targetName}}</a></p>
			    <div class="time">
			       {{item.time}}
			    </div>
		    </div>

		    <div class="user-content clearfix" v-if="item.targettype == '文章表'">
		     <a class="proimg fl" :href="'article.html?id='+item.relid" :style="'background-image: url('+item.url+');'"></a>
		     <div class="protext">
		      <h4 class="ellipsis">
		      	<button class="layui-btn layui-btn-mini">文章</button>
		      	<a :href="'article.html?id='+item.relid">{{item.title}}</a>
		      </h4>
		      <p>{{{item.shortdesc}}}</p>
		     </div>
		    </div>

		    <div class="user-content clearfix" v-if="item.targettype == '作品表'">
		     <a class="proimg fl" :href="'art.html?id='+item.relid" :style="'background-image: url('+item.url+');'"></a>
		     <div class="protext">
		      <h4><button class="layui-btn layui-btn-mini">作品</button><em class="space"></em><a :href="'art.html?id='+item.relid">{{item.title}}</a></h4>
		      <p><b>类型</b>：{{item.producttype}}<em class="space"></em><em class="space"></em><b>尺寸</b>：{{item.size}}<br></p>
		     </div>
		    </div>

		    <div class="user-content clearfix" v-if="item.targettype == '动作表'">
		     	<p>{{{item.initcontent}}} <a :href="'say.html?id='+item.id"> 详情>></a></p>
		    </div>
		   </div>

		   <ul class="commentlist" v-if="item.content">
		   <li>
		    <div class="clearfix opera">
		     <a :href="'users.html?id='+item.activeuserid" class="userimg fl"><img :src="item.headurl" /></a>
		     <div class="fl">
		      <span><a href="http://localhost:81/user_20170503145221086" class="c33a6b8">{{item.nickname}}</a></span>
		      <div class="time">
		       {{item.activetime}}
		      </div>
		     </div>

		    </div><p class="commentext">{{{item.content}}}</p>
		    <ul class="replay">
		     <li v-for="item2 in item.list">
		      <div class="clearfix opera">
		       <a :href="'users.html?id='+item2.activeuserid" class="userimg fl"><img :src="item2.headurl" /></a>
		       <div class="fl">
		        <a class="c33a6b8">{{item2.activeNickname}}</a>
		        <span>回复</span>
		        <a class="c33a6b8">{{item2.targetName}}</a>
		        <div class="time">
		         {{item2.activetime}}
		        </div>
		       </div>
		       
		     <div class="operation fr" v-if="item2.activeuserid != user">
		     	<a @click="reply(item2.id)"><i class="icon iconfont">&#xe612;</i></a>
		     </div>

		      </div><p class="commentext">{{{item2.content}}}</p></li>
		    </ul>
		    </li>
		  </ul>

			<div class="commentbox" v-if="item.activetype == '评论'">
		      <textarea class="commentext" type="text" placeholder="回复" v-model="commentext"></textarea>
		      <button class="mint-button mint-button--primary mint-button--small" @click="submit(item.id)">提交</button>
		    </div>
		</li>
	</ul>

	<mt-popup :visible.sync="popupVisible">
		<div class="letter">
			<textarea name="letter" id="" cols="30" rows="10" placeholder="填写回复内容" v-model="commentext"></textarea>
			<div class="page-button">
				<button class="mint-button mint-button--primary mint-button--small" @click="submit2()">提交</button>
			</div>
		</div>
	</mt-popup>
</template>

<script>
import Lib from 'assets/Lib.js';
import { Toast } from 'mint-ui';
import { Popup } from 'mint-ui';
Lib.Vue.component(Popup.name, Popup);
module.exports = {
	data (){
		return {replyId:'',commentext:'',popupVisible:false}
	},
	props:['tracks','user'],
	ready:function(){
	},
	methods:{
		reply (id){
			this.replyId = id;
			this.popupVisible = true;
		},
		submit(id){
			if(this.commentext == ""){
				Toast("回复内容不能为空");
				return false;
			}
			this.$http.jsonp(Lib.C.Mpath+'tbActive/commentsave?mainid='+id+'&content='+this.commentext+'&userId='+this.user).then(function(respoce){
				Toast("回复成功");
				this.commentext = "";
				setTimeout(function(){
					window.location.reload()
				},1000)
	        })
		},
		submit2(){
			if(this.commentext == ""){
				Toast("回复内容不能为空");
				return false;
			}
			this.$http.jsonp(Lib.C.Mpath+'tbActive/commentsave?mainid='+this.replyId+'&content='+this.commentext+'&userId='+this.user).then(function(respoce){
				Toast("回复成功");
				this.commentext = "";
				this.popupVisible = false;
				setTimeout(function(){
					window.location.reload()
				},1000)
	        })
		}
	}
}

</script>
<style scoped>
.artists{}
.dynamiclist>li {
	float: none;
	margin-top:10px;
	padding:10px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.dynamiclist .user-head {
	position: relative;
}

.dynamiclist .fl .userimg {
	margin-right:5px;
}
.dynamiclist .user-head a {
	color: #33a6b8;
}
.dynamiclist .user-content {
	padding:5px 0;
}

.dynamiclist .user-content img {
	margin-right: 5px;
	width:20px;
	height:20px;
	margin-top: 4px;
}

.dynamiclist .user-head p img {
	margin-right: 5px;
	width:20px;
	height: 20px;
}

.dynamiclist .proimg {
	margin-right: 10px;
	margin-bottom: 10px;
}
.dynamiclist .protext h4 {
	height:40px;
}

.dynamiclist .protext p {
	height:60px;
	overflow: hidden;
}

.dynamiclist .say-img {
	padding:5px 0;
}

.dynamiclist .say-img .comimg {
	width:100px;
	height: 100px;
	float: left;
	margin: 7px;
}

.dynamiclist .saytext {
	padding: 5px;
}

.dynamiclist .user-head .operation {
	position: absolute;
	top: 0;
	right: 0;
	width: 30px;
	height: 24px;
	overflow: hidden;
	transition: 0.4s;
	text-align: center;
}

.dynamiclist .user-head .operation .icon {
	font-size: 18px;
	line-height: 18px;
}

.dynamiclist .user-head .operation a {
	display: block;
	padding: 3px 2px;
	font-size: 12px;
	color: #aaa;
}

.dynamiclist .user-head .operation:hover {
	height: auto;
}

.dynamiclist .user-head .operation a:hover {
	color: #33a6b8;
}
.action{}
.action ul{display: flex;padding:4px 0;background: #f4f4f4;border-top:1px solid #f1f1f1;}
.action li{flex: 1;border-left: 1px solid #fff;text-align: center;height: 1rem;line-height: 1rem;}
.action li:nth-child(1){border:none;}
.action li .icon{font-size:16px;}
.action li.cur .icon{color: #33a6b9}
.line-box {
    background: #f6f6f6 none repeat scroll 0 0;
    border: 1px solid #efefef;
    margin-top: 5px;
    overflow: hidden;
}
.commentlist{transition:0.4s;}
.commentlist li{float: none;margin-bottom: 5px;position: relative;}
.commentlist h3,.zanlist h3,.rewardlist h3{height: 0.8rem;line-height: 0.8rem;margin-bottom: 0.25rem;}
.commentlist .commentext{padding: 5px 0;word-wrap:break-word}
.rewardlist li{float: none;margin-top: 0.25rem;height:1rem;line-height:1rem;}
.rewardlist li a,.rewardlist li span{margin-right: 0.25rem;}
.commentlist .commentext img,.rewardlist p img{width:auto;margin:0 2px;}
.commentlist .operation{padding-left:1rem;}
.commentlist .operation .fr{margin-left:0.4rem;margin-right: 0px;}
.commentlist .replay{margin-left: 1.6rem;}
.letter{width:12rem;padding: 4px;}
.letter textarea{border:none;width:100%;font-size: 0.55rem;resize:vertical;}
.letter .mint-button{margin: 0.25rem auto;}
</style>
