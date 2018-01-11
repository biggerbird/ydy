<template>
	<div class="warp" v-if="have">
		<div class="order card" v-for="item in orders">
	    	<div class="title clearfix">
	    		<span class="fl">订单号：<a :href="'payment.html?id='+item.id">{{item.id}}</a></span>
	            <div class="price ce28a89 fr"><b>¥ {{item.totalmoney}}</b></div>
	        </div>
            <div class="order_goods">
                <div class="dt fl"><a :href="'art.html?id='+item.relid" class="proimg" :style="'background-image: url('+item.mainurl+');'"></a></div>
	            <div class="dd ellipsis">
	            	<a :href="'art.html?id='+item.relid">{{item.name}}</a>
	            </div>
	            <div class="dd">
	            	<p>
		            	<b>类型</b>：{{item.producttype}}<em class="space"></em>
					    <b>尺寸</b>：{{item.pwidth}}cm * {{item.pheight}}cm
					    <b>年份</b>：{{item.createyear}}<em class="space"></em>
					    <b>材质</b>：{{item.material}}<em class="space"></em>
					    <b>装裱</b>：
				        <template v-if="!item.haspack">
				          是
				        </template>
				        <template v-else>
				          否
				        </template>
        			</p>
	            </div>
            </div>

	        <div class="orderbtn">
		        <template v-if="type == 1">
		        	<mt-button type="danger" size="small" v-if="item.orderstatus == '创建'" @click="pay(item.id)">立即支付</mt-button>
		        	<mt-button type="danger"  size="small" v-if="item.orderstatus == '创建'" @click="remove(item.id,$index)">删除</mt-button>

			        <mt-button type="primary" size="small" v-if="item.orderstatus == '已付款'">待审核</mt-button>
			        <mt-button type="danger" size="small" v-if="item.orderstatus == '已付款'" @click="refund(item.id,$index)">申请退款</mt-button>

			        <mt-button type="primary" size="small" v-if="item.orderstatus == '已审核'">待发货</mt-button>
			        <mt-button type="danger" size="small" v-if="item.orderstatus == '已审核'" @click="refund(item.id,$index)">申请退款</mt-button>

			        <mt-button type="primary" size="small" v-if="item.orderstatus == '已发货'" @click="receipt(item.id,$index)">确认收货</mt-button>
			        <mt-button type="danger" size="small" v-if="item.orderstatus == '已发货'" @click="refund2(item.id,$index)">申请退货</mt-button>

			        <mt-button type="primary" size="small" v-if="item.orderstatus == '已收货'">已收货</mt-button>
			        <mt-button type="danger" size="small" v-if="item.orderstatus == '已收货'" @click="refund2(item.id,$index)">申请退货</mt-button>

			        <mt-button type="primary" size="small" v-if="item.orderstatus == '申请退货'">退货中</mt-button>
			        <mt-button type="primary" size="small" v-if="item.orderstatus == '申请退款'">退款中</mt-button>

			        <mt-button type="primary" size="small" v-if="item.orderstatus == '已退货'">已退货</mt-button>
			        <mt-button type="primary" size="small" v-if="item.orderstatus == '已退款'">已退款</mt-button>

			        <mt-button type="primary" size="small" v-if="item.orderstatus == '完成'">交易完成</mt-button>
		        </template>
					
		        <template v-else>
			        <mt-button type="danger" size="small" v-if="item.orderstatus == '已审核'">待发货</mt-button>

			        <mt-button type="primary" size="small" v-if="item.orderstatus == '已发货'">已发货</mt-button>

			        <mt-button type="primary" size="small" v-if="item.orderstatus == '申请退款'">退款中</mt-button>

			        <mt-button type="primary" size="small" v-if="item.orderstatus == '已退款'">已退款</mt-button>

			        <mt-button type="primary" size="small" v-if="item.orderstatus == '申请退货'">退货中</mt-button>

			        <mt-button type="primary" size="small" v-if="item.orderstatus == '已退货'">已退货</mt-button>

			        <mt-button type="primary" size="small" v-if="item.orderstatus == '已收货'">已收货</mt-button>

			        <mt-button type="primary" size="small" v-if="item.orderstatus == '完成'">交易完成</mt-button>
		        </template>
	        </div>
	    </div>
	</div>
	    
    <div class="error_page1" v-else>
        <span class="error_img"><img :src="nothing"></span>
        <p>暂无记录！</p>
    </div>
</template>

<script>
import Lib from 'assets/Lib.js';
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { Button } from 'mint-ui';
Lib.Vue.component(Button.name, Button);
module.exports = {
	data (){
		return {"nothing":Lib.C.baseimg.nothing}
	},
	props:["have","orders","type","user"],
	ready:function(){
	},
	methods:{
		remove (id,index){
			MessageBox.confirm('确定删除此订单?').then(action => {
				this.$http.jsonp(Lib.C.Mpath+"order/delOrder?orderId="+id+'&userId='+this.user).then(function(respoce){
		            if(respoce.data.status == 1){
		            	Toast(respoce.data.message);
		            	this.orders.splice(index,1);
		            }
		        })
			});
		},
		receipt (id,index){
			MessageBox.confirm('是否确认收货?').then(action => {
				this.$http.jsonp(Lib.C.Mpath+"order/updatestatus?orderId="+id+'&userId='+this.user).then(function(respoce){
		            if(respoce.data.status == 1){
		            	Toast("确认收货成功");
		            	this.orders[index].orderstatus='已收货';
		            }else{
		            	Toast("确认收货失败,请重新操作");
		            }
		        })
		    });
		},
		pay(id){
			location.href = 'payment.html?id='+id;
		},
		refund(id,index){
			MessageBox.confirm('确定取消此订单并退款?').then(action => {
				this.$http.jsonp(Lib.C.Mpath+"order/roleback?orderId="+id+'&userId='+this.user).then(function(respoce){
		            if(respoce.data.status == 1){
		            	Toast("申请成功");
		            	this.orders[index].orderstatus='申请退款';
		            }
		        })
			});
		},
		refund2(id,index){
			MessageBox.confirm('确定取消此订单并退货?').then(action => {
				this.$http.jsonp(Lib.C.Mpath+"order/roleback?orderId="+id+'&userId='+this.user).then(function(respoce){
		            if(respoce.data.status == 1){
		            	Toast("申请成功");
		            	this.orders[index].orderstatus='申请退货';
		            }
		        })
			});
		}
	}
}

</script>
<style scoped>
li{float:none}
.order_goods {
	border-bottom: 1px solid #eee;
	padding:10px 0;
	overflow: hidden;
}
.order_goods .dt {
	margin-right:10px;
	width:100px;
	height:100px;
}
.order_goods .dd a {
	color: #33a6b8;
	font-weight: bold;
}
.orderbtn {
	padding:5px 0;
	text-align: right;
}
</style>
