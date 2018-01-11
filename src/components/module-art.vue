<template>
	<ul class="artlist clearfix">
		<li v-for="item in arts">
			<a v-if="item.checkstatus == '未审核'" class="img"><img :src="item.mainurl" :alt="item.name"></a>
			<a :href="'art.html?id='+item.id" class="img" v-else><img :src="item.mainurl" :alt="item.name"></a>
			<div class="topic clearfix">
				<h3 class="ellipsis"><span v-if="item.checkstatus == '未审核'" class="red">[未审核]</span>{{item.name}}</h3>
				<div class="fl">分类：<a>{{item.producttype}}</a></div>
				<div class="fr" v-if="item.authorid == user">
					<div class="manage">
						<a v-if="item.sellstatus == '出售' && item.checkstatus == '已审核'" @click="editprice(item.id,item.price)"><i class="iconfont">&#xe606;</i></a>
						<a @click="delete(item.id,$index)"><i class="iconfont">&#xe6d3;</i></a>
					</div>
				</div>
			</div>
		</li>
	</ul>

	<mt-popup :visible.sync="popupVisible">
		<div class="letter">
			<mt-field label="原价格" :value.sync="oprice" disabled></mt-field>
			<mt-field placeholder="请输入修改价格" :value.sync="price" type="number"></mt-field>
			<div class="page-button">
				<button class="mint-button mint-button--primary mint-button--small" @click="changeprice">发送</button>
			</div>
		</div>
	</mt-popup>
</template>

<script>
import Lib from 'assets/Lib.js';
Lib.Vue.use(Lib.Resource);
import { Popup } from 'mint-ui';
Lib.Vue.component(Popup.name, Popup);
import { Toast } from 'mint-ui';
import { Field } from 'mint-ui';
Lib.Vue.component(Field.name, Field);
import { MessageBox } from 'mint-ui';
module.exports = {
	data (){
		return {popupVisible:false,productId:'',price:'',oprice:0}
	},
	props:['arts','user'],
	ready:function(){
	},
	methods:{
		delete(id,index){
			MessageBox.confirm('删除这幅作品？').then(action => {
				this.$http.jsonp(Lib.C.Mpath+'tbProduct/ajaxdel?userid='+this.user+'&id='+id).then(function(res){
			        if(res.data.status == '200'){
			        	this.arts.splice(index, 1);
			        	Toast(res.data.message);
			        }else{
			        	Toast(res.data.message);
			        }
			    })
			})
		},
		editprice(productId,price){
			this.popupVisible = true;
			this.productId = productId;
			this.oprice = price;
		},
		changeprice(){
			if(this.price <= 0 || this.price%1 !=0){
	        	Toast('价格必须为正整数');
		        return false;
		    }
			this.$http.jsonp(Lib.C.Mpath+'tbProduct/modify?userId='+this.user+'&productId='+this.productId+'&price='+this.price).then(function(res){
		        if(res.data.status == '1'){
		        	Toast(res.data.message);
		        	setTimeout(function(){
						window.location.reload();
					},1000)
		        }else{
		        	Toast(res.data.message);
		        }
		    })
		}
	}
}

</script>
<style scoped>
.artlist{margin: 0.5rem 0;}
.artlist li{margin:0.24rem;padding:0.25rem;box-shadow: 0 0 0.75rem rgba(0,0,0,0.1);position: relative;width:7.5rem;}
.artlist li .img{height:7rem;width:7rem;overflow: hidden;text-align: center;display: block;position: relative;background: #eee;}
.artlist li .img img{
	left: 50%;
    height:7rem;
    width:7rem;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    transform-origin: 0 0 0;
    transition-duration: 0.5s;
}
.artlist .topic{height:24px;line-height:24px;}
.artlist .topic a{color: #33a6b8;}
</style>
