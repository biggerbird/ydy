<template>
	<div class="tab">
      <ul class="tab-title">
        <li class="comment" :class={cur:commentshow} @click="cut(1)"><i class="iconfont">&#xe612;</i>评论<span>({{messages.pinglun}})</span></li>
        <li class="reword" :class={cur:rewordshow} @click="cut(2)" v-if="permit"><i class="iconfont">&#xe6fb;</i>打赏<span>({{messages.reward}})</span></li>
        <li class="zan" :class={cur:zanshow} @click="cut(3)"><i class="iconfont">&#xe650;</i>点赞<span>({{messages.givethethumbsup}})</span></li>
      </ul>
      <input type="hidden" v-model="id" :value="messages.activeId">
      <div class="tab-content">
        <ul class="commentlist" :class={cur:commentshow}>
            <li v-for="item in commenlist">
             <div class="clearfix opera">
              <a :href="'users.html?id='+item.activeuserid" class="userimg fl"><img :src="item.headurl"/></a>
              <div class="fl">
               <span><a :href="'users.html?id='+item.activeuserid" class="c33a6b8">{{item.activeNickname}}</a></span>
               <div class="time">
                {{item.activetime}}
               </div>
              </div>
              <div class="operation clearfix" v-if="item.activeuserid != user">
               <a class="fr" @click="reply(item.id)"><i class="iconfont">&#xe612;</i></a>
               <a class="fr" @click="reportShow(item.id)"><i class="iconfont">&#xe65e;</i></a>
              </div>
             </div><p class="commentext">{{{item.content}}}</p>
             <ul class="replay">
			    <li v-for="item2 in item.list">
			      <div class="clearfix opera">
			       <a :href="'users.html?id='+item2.activeuserid" class="userimg fl"><img :src="item2.headurl" /></a>
			       <div class="fl">
			        <a :href="'users.html?id='+item2.activeuserid" class="c33a6b8">{{item2.activeNickname}}</a>
			        <span>回复</span>
			        <a :href="'users.html?id='+item2.targetuserid" class="c33a6b8">{{item2.targetName}}</a>
			        <div class="time">
			         {{item2.activetime}}
			        </div>
			       </div>
			       
			     <div class="operation fr" v-if="item2.activeuserid != user">
			     	<a @click="reply(item2.id)"><i class="icon iconfont">&#xe612;</i></a>
			     </div>

			      </div><p class="commentext">{{{item2.content}}}</p>
			    </li>
		    </ul>
            </li>
        </ul>
        <ul class="rewordlist" :class={cur:rewordshow} v-if="permit">

			<template v-if="rewardlist.length">
	          <li v-for="item in rewardlist">
	            <a :href="'users.html?id='+item.activeuserid" class="userimg fl">
	              <img :src="item.headurl">
	            </a>
	            <p class="commentext fr">打赏了 <span class="ce28a89">{{item.yundou}}</span> <i class="icon iconfont c33a6b8">&#xe608;</i></p>
	            <div>
	            	<a :href="'users.html?id='+item.activeuserid" class="c33a6b8">{{item.activeNickname}}</a>
	            	<p>{{item.activetime}}</p>
	            </div>
	          </li>
			</template>

			<div class="error_page1" v-else>
		      <span class="error_img"><img :src="nothing"></span>
		      <p>暂无记录！</p>
			</div>

      		<mt-button type="primary" size="large"  v-if="!self" @click="rewardShow(id)">打赏</mt-button>
        </ul>
        <ul class="zanlist clearfix" :class={cur:zanshow}>
          <li :class={cur:flag}>
            <a class="zanbtn" @click="zan">
              <i class="icon iconfont">&#xe650;</i>
            </a>
          </li>
          <li v-for="item in zanlist">
            <a :href="'users.html?id='+item.activeuserid" class="userimg fl">
            <img :src="item.headurl" :alt="item.activeNickname">
            </a>
          </li>
        </ul>
    </div>

    <div class="opinion" v-show="commentshow">
	    <form class="layui-form">
	      <textarea class="layui-textarea" id="editor" lay-verify="content"  name="content" autocomplete="off"></textarea>
	      <mt-button type="primary" size="large" lay-submit="" lay-filter="shuoshuo">评论</mt-button>
	    </form>
	</div>


	<mt-popup :visible.sync="popupVisible">
		<div class="report">
			<mt-radio
			  title="举报原因"
			  :value.sync="reason"
			  :options="['色情低俗', '政治敏感','违法','广告', '病毒木马', '其他']">
			</mt-radio>
			<div class="page-button">
  				<mt-button type="primary" @click="report">举报</mt-button>
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
				<mt-field placeholder="请输入云豆数量" type="number" :attr={min:0.01}  :value.sync="douNum"></mt-field>
				<mt-field placeholder="请输入支付密码" type="password" :value.sync="payPass" :attr={maxlength:6}></mt-field>
				<div class="page-button">
					<mt-button type="primary" @click="rewardYD">打赏</mt-button>
				</div>
			</div>
			<div class="quan" v-show="!yundou">
				<mt-radio
				  :value.sync="quan"
				  :options="['优惠券1', '优惠券2','优惠券3']">
				</mt-radio>
				<div class="page-button">
					<mt-button type="primary" @click="rewardQ">打赏</mt-button>
				</div>
			</div>
		</div>
	</mt-popup>

	<mt-popup :visible.sync="popupVisible3">
		<div class="popupbox">
			<textarea name="letter" id="" cols="30" rows="10" placeholder="填写回复内容" v-model="commentext"></textarea>
			<div class="page-button">
				<mt-button type="primary" @click="submit2()">提交</mt-button>
			</div>
		</div>
	</mt-popup>
</template>

<script>
import Lib from 'assets/Lib.js';
Lib.Vue.use(Lib.Resource);
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
import { Popup } from 'mint-ui';
import { Field } from 'mint-ui';
Lib.Vue.component(Field.name, Field);
Lib.Vue.component(Popup.name, Popup);
import { Radio } from 'mint-ui';
Lib.Vue.component(Radio.name, Radio);
import { Button } from 'mint-ui';
Lib.Vue.component(Button.name, Button);
module.exports = {
	data (){
		return {
	      commentshow:true,
	      rewordshow:false,
	      zanshow:false,
	      commentext:'',
	      commenlist:'',
	      rewardlist:'',
	      zanlist:'',
	      flag:'false',
	      id:'',
	      popupVisible:false,popupVisible2:false,popupVisible3:false,yundou:true,reason:'色情低俗',reportId:'',rewardId:'',douNum:1,payPass:'',quan:'优惠券1',editor:{},"nothing":Lib.C.baseimg.nothing
  		}
	},
	props:['messages','user','permit','self'],
	ready:function(){
		this.settimer();
		this.geteditor();
	},
	methods:{
		settimer(){
			var that = this;
			var timer=setInterval(function(){
				if(that.id){
					that.getPL();
					clearInterval(timer);
				}
			},300)
		},
		getPL (){
	      this.$http.jsonp(Lib.C.Mpath+'tbActive/ajaxCommentList?id='+this.id).then(function(respoce){
	        this.commenlist = respoce.data.activeList;
	      })
	    },
		getDS (){
	      this.$http.jsonp(Lib.C.Mpath+'tbActive/ajaxRewordList?id='+this.id).then(function(respoce){
	        this.rewardlist = respoce.data.rewardlist;
	      })
	    },
		getZAN (){
	      this.$http.jsonp(Lib.C.Mpath+'tbActive/ajaxZanList?id='+this.id).then(function(respoce){
	        this.zanlist = respoce.data.zanlist;
	        this.flag = respoce.data.flag;
	      })
	    },
	    cut (num){
	        this.commentshow = false;
	        this.rewordshow = false;
	        this.zanshow = false;
	      if(num == 1){
	      	this.commentshow = true;
	      	this.getPL();
	      }else if(num == 2){
	        this.rewordshow = true;
	        this.getDS();
	      }else{
	        this.zanshow = true;
	        this.getZAN();
	      }
	    },
	    reportShow(id){
			this.popupVisible = true;
			this.reportId = id;
		},
		report (index){
			this.$http.jsonp(Lib.C.Mpath+'productDetails/Report?id='+this.reportId+'&reason='+this.reason).then(function(res){
				if(res.data.status == 1){
					Toast("举报成功");
					this.popupVisible = false;
				}
	        })
		},
		rewardShow(id){
			if(id == 0){
				Toast("不能打赏自己噢");
				return false;
			}
			this.popupVisible2 = true;
			this.opera = false;
			this.rewardId = id;
		},
		reply (id){
			this.replyId = id;
			this.popupVisible3 = true;
		},
		submit2(){
			if(this.commentext == ""){
				Toast("回复内容不能为空");
				return false;
			}
			this.$http.jsonp(Lib.C.Mpath+'tbActive/commentsave?mainid='+this.replyId+'&content='+this.commentext).then(function(respoce){
				Toast("回复成功");
				this.commentext = "";
				this.popupVisible3 = false;
				this.getPL();
	        })
		},
		rewardYD(){
			if(!(this.testYD(this.douNum) && this.testPASS(this.payPass))){
				return false;
			}
			this.$http.jsonp(Lib.C.Mpath+'tbActive/ajaxSaveReword?id='+this.rewardId+'&number='+this.douNum+'&password='+this.payPass).then(function(res){
				if(res.data.status == 1){
					Toast("打赏成功");
					this.popupVisible2 = false;
					this.messages.reward += 1;
					this.getDS();
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
			this.$http.jsonp(Lib.C.Mpath+'xq/Report?id='+this.rewardId+'&number='+this.douNum+'&password='+this.payPass).then(function(res){
				if(res.data.status == 1){
					Toast("打赏成功")
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
		zan (){
			if(this.flag){
				MessageBox.confirm('取消点赞?').then(action => {
				  this.setZan();
				});
			}else{
				this.setZan();
			}
		},
		setZan(){
			this.$http.jsonp(Lib.C.Mpath+'tbActive/ajaxSaveGood?id='+this.id).then(function(res){
	          if(res.data.status == 0){
				Toast(res.data.message);
				this.getZAN();
				this.messages.givethethumbsup += 1
	          }else{
				Toast(res.data.message);
				this.getZAN();
				this.messages.givethethumbsup -= 1
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
   	 	},
   	 	geteditor(){
	      var layui=window.layui;
	      var that = this;
	      layui.use(['form','layedit'], function(){
	      var form = layui.form(),layedit = layui.layedit;
	      
	      var editIndex = layedit.build('editor',{
	          tool: ['face'],
	          height:100
	        });
	      //自定义验证规则
	        form.verify({
	          content: function(value){
	            layedit.sync(editIndex);
	            if(layedit.getContent(editIndex) == "" || layedit.getContent(editIndex) == "<br>"){
	            return "请填写评论";
	            }
	          }
	        });
	     
	     form.on('submit(shuoshuo)', function(data){
	       $.ajax({
	         url:Lib.C.Mpath+'tbActive/commentsave?mainid='+that.id,
	          type: 'post',
	          dataType:'jsonp',
	          data:data.field,
	         success:function(data){
	            if(data.status == 1){
	            	Toast("评论成功");
	            	setTimeout(function(){
	            		location.reload()
	            	},1000)
	            }else{
	              	Toast('评论失败');
	            }
	          }
	       })
	       return false;
	      })
	      });
	    }
	}
}

</script>
<style scoped>
.tab{margin-top: 10px;}
.tab-title{display: flex;}
.tab-title li{flex: 1;height:40px;line-height: 40px;text-align: center;background: #eee;}
.tab-title li .iconfont{color: #666;}
.tab-title li.cur{background: #33a6b8;color: #fff;}
.tab-title li.cur .iconfont{color: #fff;margin-right: 4px;}
.tab-content{padding:10px;}
.tab-content .commentlist li{float: none;}
.tab-content>ul{display: none;}
.tab-content ul.cur{display: block;}
.commentlist li{float: none;margin:10px 0;position: relative;}
.commentlist h3,.zanlist h3,.rewordlist h3{height:16px;line-height:16px;margin-bottom:5px;}
.commentlist li a,.commentlist li span{margin-right:5px;line-height:20px;}
.commentlist .commentext{margin:4px 0;padding: 5px 0;}
.rewordlist li{float: none;margin-bottom:10px;height:40px;}
.rewordlist li a,.rewordlist li span{margin-right:5px;}
.commentlist .commentext img,.rewordlist p img{width:auto;margin:0 2px;}
.commentlist .operation{padding-left:40px;}
.commentlist .operation .fr{margin-right:8px;margin-top: 5px;}
.commentlist .replay{margin-left:20px;}
.zanlist{padding-top:5px;text-align: center;}
.zanlist li{margin-right:10px;line-height:40px;margin-bottom:5px;height:40px;width: 40px;text-align: center;display: inline-block;float: none;overflow: hidden;}
.zanlist li.cur .icon,.zanlist li .icon:hover{color:#26a2ff;}
.zanlist li .iconfont{font-size: 30px;line-height: 40px;}
.opinion{padding: 10px}
.opinion .mint-button {
    margin-top: 20px;
}
</style>
