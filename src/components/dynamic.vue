<template>
	<ul class="dynamiclist clearfix">
		<li class="card" v-for="item in dynamics">
			<div class="user-head clearfix">
				<a :href="'users.html?id='+item.uid" class="userimg fl">
					<img :src="item.ufaceurl" :alt="item.unickname">
				</a>
				<p class="ellipsis">
					<a :href="'users.html?id='+item.uid">{{item.unickname}}</a>
					<template v-if="item.activetype == '文章评论' || item.activetype == '作品评论' || item.activetype == '说说评论'">
						<em class="space"></em>
						评论了：{{{item.content}}}
					</template>
					<template v-if="item.activetype == '赞了'">
						<em class="space"></em>
						点了一个赞
						<i class="icon iconfont c33a6b8">&#xe650;</i>
					</template>
					<template v-if="item.activetype == '打赏'">
						<em class="space"></em>
						打赏了 <span class="ce28a89">{{item.yundou}} </span>个
						<i class="icon iconfont c33a6b8">&#xe608;</i>
					</template>
				</p>
				<div class="time">{{item.activetime}}</div>
			</div>
			<div class="user-content clearfix" v-if="item.activetype == '发布说说' || item.activetype == '发布文章' || item.activetype == '发布作品'">
				<template v-if="item.targettype == '文章表'">
					<a :href="'article.html?id='+item.id" class="proimg fl"
					:style="'background-image: url('+item.url+');'"></a>
					<div class="protext">
						<h4 class="ellipsis">
							<button class="layui-btn layui-btn-mini">文章</button>
							<a :href="'article.html?id='+item.id" class="c33a6b8">{{{item.title}}}</a>
						</h4>
						<p>{{{item.shortdesc}}}</p>
					</div>
				</template>
				<template v-if="item.targettype == '作品表'">
					<a :href="'art.html?id='+item.id" class="proimg fl" 
					:style="'background-image: url('+item.url+');'"></a>
					<div class="protext">
						<h4 class="ellipsis">
							<button class="layui-btn layui-btn-mini">艺术品</button>
							<a :href="'art.html?id='+item.id" class="c33a6b8">{{{item.title}}}</a>
						</h4>
						<p><b>类型</b>：{{item.type}}<em class="space"></em><em class="space"></em><b>尺寸</b>：{{item.size}}<br></p>
					</div>
				</template>
				<template v-if="item.targettype == '动作表'">
					<p>{{{item.shortdesc}}}<a :href="'say.html?id='+item.id"> 详情>></a></p>
				</template>
			</div>

			<div class="clearfix card2 line-box" v-else>
				<div class="user-head clearfix">
				    <a :href="'users.html?id='+item.targetuserid" class="userimg fl"><img :src="item.u2faceurl"/></a>
				    <p class="ellipsis"><a :href="'users.html?id='+item.targetuserid">{{item.u2nickname}}</a></p>
				    <div class="time">
				       {{item.time}}
				    </div>
			    </div>
			    <div class="user-content">
				    <template v-if="item.targettype == '文章表'">
						<a :href="'article.html?id='+item.id" class="proimg fl"
						:style="'background-image: url('+item.url+');'"></a>
						<div class="protext">
							<h4 class="ellipsis">
								<button class="layui-btn layui-btn-mini">文章</button>
								<a :href="'article.html?id='+item.id" class="c33a6b8">{{{item.title}}}</a>
							</h4>
							<p>{{{item.shortdesc}}}</p>
						</div>
					</template>
					<template v-if="item.targettype == '作品表'">
						<a :href="'art.html?id='+item.id" class="proimg fl" 
						:style="'background-image: url('+item.url+');'"></a>
						<div class="protext">
							<h4 class="ellipsis">
								<button class="layui-btn layui-btn-mini">艺术品</button>
								<a :href="'art.html?id='+item.id" class="c33a6b8">{{{item.title}}}</a>
							</h4>
							<p><b>类型</b>：{{item.type}}<em class="space"></em><em class="space"></em><b>尺寸</b>：{{item.size}}<br></p>
						</div>
					</template>
					<template v-if="item.targettype == '动作表'">
						<p>{{{item.shortdesc}}}<a :href="'say.html?id='+item.id"> 详情>></a></p>
					</template>
				</div>
			</div>
		</li>
	</ul>

	
</template>

<script>
import Lib from 'assets/Lib.js';
module.exports = {
	data (){
		return {}
	},
	props:['dynamics'],
	ready:function(){
	},
	methods:{
	}
}

</script>
<style scoped>
.dynamiclist>li {
	float: none;
}
.dynamiclist .fl .userimg {
	margin-right:5px;
}
.dynamiclist .user-head a {
	color: #33a6b8;
}
.dynamiclist .user-head .iconfont{
	font-size: 16px;
}
.dynamiclist .user-content {
	padding:5px 0;word-wrap:break-word;
}
.dynamiclist .user-head p img {
	margin-right:2px;
	width: 20px;
	height: 20px;
}
.dynamiclist .proimg {
	margin-right: 10px;
}
.dynamiclist .protext{
    width:100%;
    padding-left: 110px;
}
.dynamiclist .protext h4 {
	font-size:16px;
	overflow: hidden;
}

.dynamiclist .protext p {
	height:60px;
	overflow: hidden;
}
.dynamiclist .say-img {
	padding: 0.25rem 0;
}
.dynamiclist .say-img .comimg {
	width:60px;
	height: 60px;
	float: left;
	margin:5px;
}
.dynamiclist .saytext {
	padding:10px;
}
.dynamiclist .line-box {
    background: #f6f6f6 none repeat scroll 0 0;
    border: 1px solid #efefef;
    margin-top: 5px;
    overflow: hidden;
}
</style>
