<template>
	<div class="height1"></div>
	<header id="header" class="header">
			<div class="logo">
				<a href="index.html"><img alt="艺朵云" :src="logo"></a>
			</div>
			<div class="search">
				<!--div class="search-text" @click="Jump">请输入搜索内容</div-->
				<h2>艺朵云首页</h2>
			</div>
			<div class="menu">
				<a href="login.html"><i class="iconfont icon-category">&#xe642;</i></a>
			</div>
	</header>
</template>

<script>

import Lib from 'assets/Lib.js'

module.exports = {
  data:function(){
  	return {
  		logo:Lib.C.baseimg.logo
  	}
  },
  methods:{
  	Jump (){
			window.location.href = "search.html";
		}
  }
}
</script>


<style scoped>
a{display: block;}
.height2{height:50px;}
.header {
	height: 50px;position: fixed;overflow: hidden;background: #fff;z-index: 1000;top:0;display: flex;width: 16rem;
}
.icon-category{font-size:22px;line-height: 30px;}
.header .logo img{width:32px;}
.header .logo{
	flex:2;padding:5px;text-align: center;
}
.header .menu{
	flex:1;padding:5px;text-align: center;
}
.header h2{text-align: center;font-size: 16px;color: #33a6b9;line-height: 30px;}
.header .search {
	height:40px;flex:13;padding:5px;position: relative;
}

.header .search-text {
	height:30px;padding-left: 4px;color: #999;border-radius:3px;background: #eee;border: 1px solid #ddd;line-height:30px;font-size:12px;
}

.header .search-btn {
	position: absolute;top:5px;right:20px;width:10px;height:10px;
}
</style>
