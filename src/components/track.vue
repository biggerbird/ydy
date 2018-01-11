<template>
		<ul class="dynamiclist clearfix">
			<li v-for="item in tracks">
			   <div class="user-head clearfix">
				    <div class="fl">
				     	<a :href="'users.html?uid='+item.activeuserid" class="userimg"><img :src="item.headurl"/></a>
				    </div>
				     <p><a :href="'users.html?uid='+item.activeuserid" class="ellipsis">{{item.nickname}}</a></p>
				     <div class="time">
				      {{item.activetime}}
				     </div>
					
				    <div class="operation" v-if="item.activeuserid != user">
					     <a @click.stop="operation($index)"><i class="icon iconfont">&#xe6c9;</i></a>
					     <div v-show="item.view">
					     	<a class="reportbtn" @click.stop="reportShow(item.id,$index)">举报</a>
					     </div>
				    </div>
			   </div>
			   <div class="user-content clearfix">
			   	<template v-if="item.targettype == '动作表'">
				    <p>{{{item.content}}} <a :href="'say.html?id='+item.id"> 详情>></a></p>
				</template>
			   	<template v-if="item.targettype == '文章表'">
				    <a class="proimg fl" :href="'article.html?id='+item.relid" :style="'background-image: url('+item.url+');'"></a>
				    <div class="protext">
				     <h4 class="ellipsis">
				     	<button class="layui-btn layui-btn-mini">文章</button>
				     	<a :href="'article.html?id='+item.relid">{{item.title}}</a>
				     </h4>
				     <p>{{{item.shortdesc}}}</p>
				    </div>
				</template>
			   	<template v-if="item.targettype == '作品表'">
				    <a class="proimg fl" :href="'art.html?id='+item.relid" :style="'background-image: url('+item.url+');'"></a>
				    <div class="protext">
				     <h4 class="ellipsis">
				     	<button class="layui-btn layui-btn-mini">艺术品</button>
				     	<a :href="'art.html?id='+item.relid">{{item.name}}</a>
				     </h4>
				     <p><b>类型</b>：{{item.producttype}}<em class="space"></em><em class="space"></em><b>尺寸</b>：{{item.size}}<br></p>
				    </div>
				</template>
			   </div>
			   <div class="action">
			    <ul>
			     <li class="comment">
			     	<template v-if="item.targettype == '动作表'">
				     	<a :href="'say.html?active=true&id='+item.id">
					     	<i class="icon iconfont">&#xe612;</i>
							<template v-if="item.commentNum">
					     	 (<span>{{item.commentNum}}</span>)
							</template>
						</a>
					</template>
			     	<template v-if="item.targettype == '文章表'">
				     	<a :href="'article.html?active=true&id='+item.relid">
					     	<i class="icon iconfont">&#xe612;</i>
							<template v-if="item.commentNum">
					     	 (<span>{{item.commentNum}}</span>)
							</template>
						</a>
					</template>
			     	<template v-if="item.targettype == '作品表'">
				     	<a :href="'art.html?active=true&id='+item.relid">
					     	<i class="icon iconfont">&#xe612;</i>
							<template v-if="item.commentNum">
					     	 (<span>{{item.commentNum}}</span>)
							</template>
						</a>
					</template>
			      </li>
			     <li class="reword"v-if="item.activeuserid != user" @click="rewardShow(item.id)"><i class="icon iconfont">&#xe6fb;</i>
			     	<template v-if="item.rewordNum">
			     	 (<span>{{item.rewordNum}}</span>)
					</template>
			     </li>
			     <li class="reword disable" v-else @click="rewardShow(0)">
			     	<i class="icon iconfont">&#xe6fb;</i>
			     	<template v-if="item.rewordNum">
			     	 (<span>{{item.rewordNum}}</span>)
					</template>
			     </li>
			     <li class="zan" :class={cur:item.flag} @click="zan(item.id,$index,item.flag)"><i class="icon iconfont">&#xe650;</i>
					<template v-if="item.zanNum">
			     	 (<span>{{item.zanNum}}</span>)
					</template>
			     </li>
			    </ul>
			   </div>
			</li>
		</ul>
		<mt-popup :visible.sync="popupVisible">
			<div class="report">
				<mt-radio
				  title="举报原因"
				  :value.sync="reason"
				  :options="['色情低俗', '政治敏感','违法','广告', '病毒木马', '其他']">
				</mt-radio>
				<div class="page-button">
					<button class="mint-button mint-button--primary mint-button--small" @click="report"><label class="mint-button-text">发送</label></button>
				</div>
			</div>
		</mt-popup>

		<mt-popup :visible.sync="popupVisible2">
			<div class="reward">
				<!--ul class="tabcut">
					<li :class="{cur:yundou}" @click="rewardType(2)">打赏云豆</li>
					<li :class="{cur:!yundou}" @click="rewardType(1)">打赏优惠券</li>
				</ul-->
				<div class="yundou" v-show="yundou">
					<mt-field placeholder="请输入云豆数量" type="number" :value.sync="douNum" :attr={min:0.01}></mt-field>
					<mt-field placeholder="请输入支付密码" type="password" :value.sync="payPass" :attr={maxlength:6,minlength:6}></mt-field>
					<div class="page-button">
						<button class="mint-button mint-button--primary mint-button--small" @click="rewardYD"><label class="mint-button-text">打赏</label></button>
					</div>
				</div>
				<div class="quan" v-show="!yundou">
					<mt-radio
					  :value.sync="quan"
					  :options="['优惠券1', '优惠券2','优惠券3']">
					</mt-radio>
					<div class="page-button">
						<button class="mint-button mint-button--primary mint-button--small" @click="rewardQ"><label class="mint-button-text">打赏</label></button>
					</div>
				</div>
			</div>
		</mt-popup>
</template>

<script>
import Lib from 'assets/Lib.js';
import { Toast } from 'mint-ui';
import { Radio } from 'mint-ui';
Lib.Vue.component(Radio.name, Radio);
import { MessageBox } from 'mint-ui';
import { Popup } from 'mint-ui';
import { Field } from 'mint-ui';
Lib.Vue.component(Field.name, Field);
Lib.Vue.component(Popup.name, Popup);
module.exports = {
	data (){
		return {popupVisible:false,popupVisible2:false,yundou:true,'rewordId':'',reason:'色情低俗',reportId:'',rewardId:'',douNum:1.01,payPass:'',quan:'优惠券1'}
	},
	props:['tracks','user'],
	ready:function(){
	},
	methods:{
		reportShow(id,index){
			this.popupVisible = true;
			this.reportId = id;
			this.tracks[index].view = 0 ;
		},
		report (){
			this.$http.jsonp(Lib.C.Mpath+'productDetails/Report?id='+this.reportId+'&reason='+this.reason+'&aid='+this.user).then(function(res){
				if(res.data.status == 1){
					Toast("举报成功");
					this.popupVisible = false;
				}
	        })
		},
		operation(index){
			if(this.tracks[index].view){
				this.tracks[index].view = 0 ;
			}else{
				this.tracks[index].view = 1 ;
			}
		},
		rewardShow(id){
			if(id == 0){
				return false;
			}
			this.popupVisible2 = true;
			this.rewardId = id;
		},
		rewardYD(){
			if(!(this.testYD(this.douNum) && this.testPASS(this.payPass))){
				return false;
			}
			this.$http.jsonp(Lib.C.Mpath+'tbActive/ajaxSaveReword?id='+this.rewardId+'&userId='+this.user+'&number='+this.douNum+'&password='+this.payPass).then(function(res){
				if(res.data.status == 1){
					Toast("打赏成功");
					this.popupVisible2 = false;
				}else if(res.data.status == -2){
					Toast(res.data.message);
					setTimeout(function(){
						location.href = 'password.html';
					},1000)
				}else{
					Toast(res.data.message);
				}
	        })
		},
		rewardQ(){
			this.$http.jsonp(Lib.C.Mpath+'xq/Report?id='+this.rewardId+'&userId='+this.user+'&number='+this.douNum+'&password='+this.payPass).then(function(res){
				if(res.data.status == 1){
					Toast("打赏成功");
					setTimeout(function(){
						location.reload();
					},1000)
				}else{
					Toast(res.data.message)
				}
	        })
		},
		rewardType(num){
			if(num == 1){
				this.yundou = false;
			}else{
				this.yundou = true;
			}
		},
		zan (id,index,flag){
			if(flag){
				MessageBox.confirm('取消点赞?').then(action => {
				  this.setZan(id,index);
				});
			}else{
				this.setZan(id,index);
			}
		},
		setZan(id,index){
			this.$http.jsonp(Lib.C.Mpath+'tbActive/ajaxSaveGood?id='+id+'&userId='+this.user).then(function(res){
	          if(res.data.status == 0){
				this.tracks[index].flag = true ;
				this.tracks[index].zanNum += 1;
				Toast(res.data.message);
	          }else{
				this.tracks[index].flag = false ;
				this.tracks[index].zanNum -= 1;
				Toast(res.data.message);
	          }
	        })
		},
		testYD(value){
   	 		var g = /^\d{1,8}\.{0,1}(\d{1,2})?$/;

	   	 	if(!g.test(value) || value == 0){
		    	Toast("请输入最多为两位小数的正数");
		    	return false;
		    }else{
		    	return true;
		    }
   	 	},
   	 	testPASS(pass){
   	 		var g = /^\d{6}$/;
	   	 	if(!g.test(pass)){
		    	Toast("请输入6位数字的支付密码");
		    	return false;
		    }else{
		    	return true;
		    }
   	 	}
	}
}

</script>
<style scoped>
.dynamiclist>li {
	float: none;
	margin-bottom:10px;
	padding:10px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.dynamiclist .user-head {
	position: relative;
}
.dynamiclist .fl .userimg {
	margin-right:5px;
}
.dynamiclist .user-head a {
	color: #33a6b8;
}
.dynamiclist .user-head p{
	padding-right: 30px;
}
.dynamiclist .user-content {
	padding:10px 0;word-wrap:break-word;
}
.dynamiclist .user-content img {
	margin-right: 5px;
	width:20px;
	height:20px;
	margin-top: 4px;
}
.dynamiclist .user-head p img {
	margin-right: 5px;
	width:20px;
	height: 20px;
}
.dynamiclist .proimg {
	margin-right:10px;
	margin-bottom:10px;
}
.dynamiclist .protext h4 {
	height:40px;
}

.dynamiclist .protext p {
	height:60px;
	overflow: hidden;
}
.dynamiclist .user-head .operation {
	position: absolute;
	top: 0;
	right: 0;
	width: 30px;
	height: 24px;
	transition: 0.4s;
	text-align: center;
	color: #aaa;
}
.dynamiclist .user-head .operation .icon {
	font-size: 18px;
	line-height: 18px;
}

.dynamiclist .user-head .operation a {
	display: block;
	padding: 3px 2px;
	font-size: 12px;
}
.action ul{display: flex;background: #f4f4f4;border-top:1px solid #f1f1f1;}
.action li{flex: 1;border-left: 1px solid #fff;text-align: center;height:30px;padding:5px 0;}
.action .disable,.action .disable .iconfont{background: none;color: #ccc;}
.action li a{display: block;}
.action li:nth-child(1){border:none;}
.action li .icon{}
.action li.cur,.action li.cur .icon{color: #33a6b9}
</style>
