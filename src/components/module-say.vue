<template>
	<ul class="says clearfix">
		<li class="card" v-for="item in says">
			<p>{{item.activetime}}</p>
			<div class="titles">
				<a :href="'say.html?id='+item.id" class="title ellipsis">{{{item.content}}}</a>
				<div class="manage"  v-if="item.activeuserid == user">
					<a @click="delete(item.id,$index)"><i class="iconfont">&#xe6d3;</i></a>
				</div>
			</div>
		</li>
	</ul>
</template>

<script>
import Lib from 'assets/Lib.js';
Lib.Vue.use(Lib.Resource);
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
module.exports = {
	data (){
		return {}
	},
	props:['says','user'],
	ready:function(){
	},
	methods:{
		delete(id,index){
			MessageBox.confirm('删除这篇说说?').then(action => {
				this.$http.jsonp(Lib.C.Mpath+'saylist/ajaxdel?userid='+this.user+'&id='+id).then(function(res){
			        if(res.data.status == '200'){
			        	Toast(res.data.message);
			        	this.says.splice(index,1);
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
.says{}
.says li{padding:5px;}
.says li .titles{display: flex;margin-top: 10px;height: 30px;overflow: hidden;}
.says li .title{flex: 6}
.says li .manage{flex: 0.5;text-align: center;}
</style>
