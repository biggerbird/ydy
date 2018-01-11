<template>
	<section class="pro-detail">
		<h5>订单详情</h5>
		<ul>
			<li v-for="item in products">
				<div class="right">
					<h6 class="ellipsis">{{item.goodsName}}</h6>
					<div class="prinum">
						<span class="number">x{{item.count}}</span>
						￥{{item.price}}
					</div>
					<div class="Subtotal">小计：￥<span>{{item.price}}</span></div>
				</div>
				<a :href="'art.html?id='+item.id" :style="'background-image:url('+item.path+'/'+item.name+')'" class="img" ></a>
			</li>
		</ul>
	</section>
</template>

<script>

import Lib from 'assets/Lib.js';
Lib.Vue.use(Lib.Resource);
module.exports = {
	data (){
		return {}
	},
	ready:function(){

	},
	props:["products"],
	methods:{
	}
}

</script>
<style scoped>
.pro-detail li{border-bottom: 1px solid #ebebeb;}
.pro-detail li{float: none;padding: 0.25rem 1.2rem 0.25rem 0;}
.pro-detail li .img{height: 3.9rem;width:3.9rem;overflow: hidden;display: block;background-position: center;background-size:contain;background-repeat: no-repeat;}
.pro-detail li .right{width: 9.6rem;line-height: 1.3rem;}
.pro-detail li .number{float: right;}
.pro-detail li .Subtotal{float: right;color: #03899c;}
</style>
