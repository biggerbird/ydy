<template>
	<ul class="articles clearfix">
		<li class="card" v-for="item in articles">
			<div class="titles clearfix">
				<a class="title ellipsis" v-if="item.checkstatus == '未审核'"><span class="red">[未审核] </span>{{item.title}}</a>
				<a :href="'article.html?id='+item.id" class="title ellipsis" v-else>{{item.title}}</a>
				<div class="manage" v-if="item.authorid == user">
					<a @click="delete(item.id,$index)"><i class="iconfont">&#xe6d3;</i></a>
				</div>
			</div>
			<div class="protext">
				<a class="proimg fl" :style="'background-image:url('+item.faceurl+');'" v-if="item.checkstatus == '未审核'"></a>
				<a class="proimg fl" :href="'article.html?id='+item.id" :style="'background-image:url('+item.faceurl+');'" v-else></a>
				<div class="time">{{item.createtime}}</div>
				<p>{{{item.shortdesc}}}</p>
			</div>
		</li>
	</ul>
</template>

<script>
import Lib from 'assets/Lib.js';
Lib.Vue.use(Lib.Resource);
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
module.exports = {
	data (){
		return {}
	},
	props:['articles','user'],
	ready:function(){
	},
	methods:{
		delete(id,index){
			MessageBox.confirm('删除这篇文章?').then(action => {
				this.$http.jsonp(Lib.C.Mpath+'tbArticle/ajaxdel?userid='+this.user+'&id='+id).then(function(res){
			        if(res.data.status == '200'){
			        	Toast(res.data.message);
			        	this.articles.splice(index,1);
			        }else{
			        	Toast(res.data.message);
			        }
			    })
			});
		}
	}
}

</script>
<style scoped>
li{float: none;}
.articles li{padding: 5px;line-height:30px;height:150px;}
.articles li .titles{display: flex; border-bottom: 1px solid #eee;}
.articles li .title{flex: 6;font-weight: bold;}
.articles li .manage{flex: 0.5;}
.articles .protext{display: block;padding: 5px 0;}
.articles p{margin-left:5px;overflow: hidden;height:70px;}
</style>
