<template>
	<mt-swipe :auto="4000">
	  <mt-swipe-item v-for="item in banner">
		  <template v-if="item.mobileurl">
		  	<a  :href="item.mobileurl"><img :src="item.imgurl"></a>
		  </template>
		  <template v-else>
		  	<a><img :src="item.imgurl"></a>
		  </template>
	  </mt-swipe-item>
	</mt-swipe>
</template>

<script>

import Lib from 'assets/Lib.js';
Lib.Vue.use(Lib.MintUI);

import { Swipe, SwipeItem } from 'mint-ui';
Lib.Vue.component(Swipe.name, Swipe);
Lib.Vue.component(SwipeItem.name, SwipeItem);
module.exports = {
	data (){
		return {}
	},
	props:["banner"],
	methods:{
	}
}

</script>
<style scoped>
.swipe{height: 6rem;}
.swipe img{width: 16rem;height: 6rem;}
.swipe-indicators .swipe-indicator{opacity: 0.6;}
.swipe-indicator{background: #000;}
.swipe-indicator.active{background: #33a6b9;}
</style>
