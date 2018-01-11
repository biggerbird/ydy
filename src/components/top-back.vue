<template>
	<div class="height"></div>
	<div class="backbar clearfix" id="header">
		<a @click="back" class="back"><i class="iconfont icon-back">&#xe63e;</i></a>
		<h2 class="title ellipsis" id="title">{{title}}</h2>
		<a href="home.html" class="home"><i class="iconfont icon-back">&#xe60f;</i></a>
	</div>
</template>

<script>
import Lib from 'assets/Lib.js';
Lib.Vue.use(Lib.Resource);
import { Toast } from 'mint-ui';
module.exports = {
	data (){
		return {"title":""}
	},
	props:["html"],
	ready:function(){
		this.title=document.title;
	},
	methods:{
		back (){
			if(this.html){
				window.location.href=this.html;
			}else{
				history.back();
			}
		}
	}
}

</script>
<style scoped>
.backbar{height: 50px;text-align: center;padding:10px;line-height: 30px;position: fixed;width:16rem;margin:0 auto;background: #149aae;color: #fff;z-index:800;top:0;}
h2{padding:0 40px;font-size:16px;}
.back{position:absolute;top:10px;left:10px;}
.iconfont{color: #fff;line-height: 30px;}
.home{position: absolute;top: 10px;right: 10px;}
</style>
