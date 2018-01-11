<template>
	<section class="artists">
		<div class="clearfix">
			<div class="usercard" v-for="item in artists" :style="'background-image:url('+item.background_img+');'">
				<div class="useri">
					<a :href="'users.html?id='+item.id" class="userimg2 fl"><img :src="item.faceurl">
					<em class="authen">
					</em></a>
				</div>
				<div class="name">
					<h2>{{item.nickname}}
						<span v-if="item.artlevel > 0">艺术家LV{{item.artlevel}}</span>
						<span v-if="item.agentlevel == 6">机构</span>
						<span v-if="item.agentlevel > 0 && item.agentlevel < 6">经纪人LV{{item.agentlevel}}</span>
					</h2>
				</div>
				<ul class="record clearfix">
					<li><a :href="'arts.html?id='+item.id" class="rosolic">作品<p>({{item.productNumber}})</p></a></li>
					<li><a :href="'articles.html?id='+item.id" class="rosolic">文章<p>({{item.articleNumber}})</p></a></li>
					<li><a :href="'says.html?id='+item.id" class="rosolic">说说<p>({{item.sayNumber}})</p></a></li>
				</ul>
				<div class="level">
					<div class="left">
						<h4>粉丝</h4>
						<div>{{item.fansnumber}}</div>
					</div>
					<div class="right">
						<h4>访问量</h4>
						<div>{{item.view}}</div>
					</div>
				</div>
				<ul class="daytask">
					<template v-if="item.id != user">
						<li v-if="item.flag == true"><a @click="follow(item.id,$index)">取消关注</a></li>
						<li v-else><a @click="follow(item.id,$index)">关注</a></li>
						<li :class={}><a @click="showLetter(item.id)">私信</a></li>
					</template>
					<template v-else>
						<li><a class="disable">关注</a></li>
						<li><a class="disable">私信</a></li>
					</template>
				</ul>
			</div>
		</div>
	</section>
	<mt-popup :visible.sync="popupVisible">
		<div class="letter">
			<textarea name="letter" cols="30" rows="10" placeholder="填写私信内容" v-model="letterText"></textarea>
			<div class="page-button">
				<button class="mint-button mint-button--primary mint-button--normal" @click="letter">发送</button>
			</div>
		</div>
	</mt-popup>

</template>

<script>
import Lib from 'assets/Lib.js';
import { Popup } from 'mint-ui';
Lib.Vue.component(Popup.name, Popup);
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
module.exports = {
	data (){
		return {popupVisible:false,letterId:'',letterText:''}
	},
	props:["artists","user"],
	ready:function(){
	},
	methods:{
		showLetter(id){
			this.popupVisible = true;
			this.letterId = id ;
		},
		letter(){
			if(this.letterText == ""){
				Toast('私信内容不能为空');
				return false;
			}else{
				this.$http.jsonp(Lib.C.Mpath+'message/ajaxsaveMessage?&touserid='+this.letterId+'&content='+this.letterText).then(function(res){
		          if(res.data.status == 1){
		          	Toast(res.data.message);
		          	this.popupVisible = false;
		          }else{
		          	Toast(res.data.message)
		          }
		        })
		    }
		},
		follow(id,index){
          	if(this.artists[index].flag){
          		MessageBox.confirm('是否取消关注?').then(action => {
				  this.setfollow(id,index)
				});
          	}else{
          		this.setfollow(id,index);
          	}
		},
		setfollow(id,index){
			this.$http.jsonp(Lib.C.Mpath+'productDetails/guanzhu?&id='+id).then(function(res){
	          if(res.data.status == 1){
	          	Toast(res.data.message);
	          	this.artists[index].flag = true;
	          }else if(res.data.status == -1){
	          	Toast(res.data.message);
	          	this.artists[index].flag = false;
	          }else{
	          	Toast(res.data.message);
	          }
	        })
		}
	}
}

</script>
<style scoped>
/*艺术家页面*/
.artists{padding:10px;}
.usercard{width:49%;padding-top:4rem;position: relative;background:#fff url(http://img.yiduoyun.com/banner/1494831256141.jpg) no-repeat center top;
background-size: 100% 3rem;box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);padding-bottom:8px;margin-bottom: 10px;}
.usercard:nth-child(odd){float: left;}
.usercard:nth-child(even){float: right;}
.usercard .useri{position: absolute;top:1.8rem;left: 50%;margin-left: -1rem;}
.usercard .useri .authen{position: absolute;right: -40px;bottom:0;display: block;color:#ffb843;font-weight:bold;}
.usercard .name{height:40px;overflow: hidden;}
.usercard .record,.usercard .level{margin-bottom: 10px;}
.usercard .name h2{font-size:16px;color: #33a6b8;text-align:center;line-height:20px;}
.usercard .name h2 span{background:#33a6b9;color: #fff;padding: 2px 4px;border-radius: 3px;font-size: 11px;}
.usercard .record{padding-top: 5px;display:flex;}
.usercard .record li{margin-right: 0.25rem;float:right;flex:1;text-align:center;font-weight:bold;height: 40px;}
.usercard .level .left,.usercard .level .right{display: inline-block;width: 48%;text-align: center;}
.usercard .level .right{border-left: 1px solid #ccc;}
.usercard .daytask li{display: inline-block;width:48%;float: none;position: relative;}
.usercard .daytask li .cancel{position: absolute;top:-38px;z-index: 1000;display: none;border-bottom: 2px solid #fff;background: #ccc;}
.usercard .daytask li:hover .cancel{display: block;}
.usercard .daytask a{display: block;width:80%;margin:0 auto;height:24px;line-height:24px;background: #33a6b8;color: #fff;text-align: center;border-radius: 3px;font-size: 11px;}
.usercard .daytask a.disable{background: #999;color: #fff;cursor: no-drop;}
.usercard .daytask a:hover{background: #2a99ab;}
.usercard .daytask a.disable:hover{background: #999;}
.usercard .daytask .cancel:hover{background: #bbb;}
</style>
