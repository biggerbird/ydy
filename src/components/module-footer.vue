<template>
	<div class="height"></div>
	<footer class="footer">
		<ul class="clearfix" id="footer">
			<li>
				<a href="home.html">
					<i class="iconfont">&#xe60f;</i>
					<h6>首页</h6>
				</a>
			</li>
			<li>
				<a href="artists.html">
					<i class="iconfont">&#xe6d9;</i>
					<h6>艺术家</h6>
				</a>
			</li>
			<li class="publishbox" v-if="level">
				<a v-on:click="publish" :class="{rotate135:show}"><i class="iconfont icon-viewgallery " >&#xe61c;</i></a>
				<dl :class="{show:show}">
					<dd><a href="setart.html"><i class="iconfont">&#xe62b;</i></a></dd>
					<dd><a href="setsay.html"><i class="iconfont">&#xe72d;</i></a></dd>
				</dl>
			</li>
			<li class="publishbox" v-else>
				<a href="setsay.html"><i class="iconfont icon-viewgallery ">&#xe61c;</i></a>
			</li>
			<li>
				<a href="track.html">
					<i class="iconfont">&#xe617;</i>
					<h6>动态</h6>
				</a>
			</li>
			<li>
				<a href="user.html">
					<i class="iconfont">&#xe642;</i>
					<h6>个人中心</h6>
				</a>
			</li>
		</ul>
	</footer>
</template>

<script>

import Lib from 'assets/Lib.js';
module.exports = {
	data (){
		return {"show":false,"rotate135":"rotate135","level":false}
	},
	components: {
	    
	},
	ready(){
		this.cur();
		this.artlevel();
	},
	methods:{
		cur (){
			var a=document.getElementById("footer").querySelectorAll("a");
			for(let i=0;i < a.length;i++){
				if(window.location.pathname.indexOf(a[i].getAttribute("href")) > 0){
					a[i].parentNode.className="cur";
				}
			}
		},
		artlevel(){
			var that = this;
			setTimeout(function(){
				if(Lib.C.getCookie("artlevel") != 0){
					that.level = true;
				}
			},1000)
		},
		publish (){
			if(this.show){
				this.show = false ;
			}else{
				this.show = true ;
			}
		}
	}
}

</script>
<style scoped>
/*底部开始*/
.footer ul {
	width: 100%;display: flex;height: 50px;
}
.footer li {
	text-align: center;flex:1;padding:5px 0;
}
.footer li a{display:block;}
.footer li.publishbox{position: relative;}
.footer li.publishbox>a{transition: 0.4s;width: 100%;position: absolute;height: 40px;width: 40px;bottom: 4px;left: 50%;margin-left: -20px;overflow: hidden;}
.footer li.publishbox>a .iconfont{font-size: 36px;line-height: 42px;}
.footer li.publishbox dl{position: absolute;top:200px;display:flex;left:1.6rem;transition: 0.4s;opacity: 0;transform: translate(0,-100px);}
.footer li.publishbox dl.show{opacity: 1;transform: translate(0,0);top:-60px;}
.footer li.publishbox dd{flex:1;height:50px;line-height:50px;width:50px;border-radius: 50%;background: #319cac;margin: 0 5px;position: absolute;top: 0;}
.footer li.publishbox dd a{color: #fff;}
.footer li.publishbox dd:nth-child(0){left: 0;}
.footer li.publishbox dd:nth-child(1){background: #9966ca;right: 0;}
.footer li img {
	width: 60%;
}
.footer li.publishbox .iconfont{font-size:40px;line-height:40px;}
.footer li.publishbox dd .iconfont{
	color: #fff;font-size: 20px;line-height: 50px;
}
.footer li.cur a,.footer li.cur .iconfont{
	color: #33a6b9;
}
.rotate135{transform: rotate(315deg);}
</style>
