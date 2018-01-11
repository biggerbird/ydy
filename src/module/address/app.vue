<template>
	<top-back></top-back>
	<ul class="addrs" v-if="have">
		<li class="card" v-for="item in addrs">
			<div class="title">
				<span>{{item.contactor}}</span>
				<span>{{item.mobile}}</span>
				<span>{{item.code}}</span>
			</div>
			<p>{{item.address}}</p>
				<input v-if="item.isdefault" type="hidden" v-model="default" :value="item.id">
				<mt-radio
				  :value.sync="default"
				  :options="[{label:'设为默认',value:item.id}]">
				</mt-radio>
			<div class="tool clearfix">
				<i class="iconfont" @click="edit(item.id)">&#xe606;</i>
				<i class="iconfont" @click="remove(item.id,$index)">&#xe6d3;</i>
			</div>
		</li>
	</ul>

  <div class="error_page1" v-else>
      <span class="error_img"><img :src="nothing"></span>
      <p>暂无记录！</p>
  </div>

	<div class="page-button">
		<mt-button type="primary" size="large" @click="show">添加新地址</mt-button>
	</div>
	<mt-popup
  :visible.sync="popupVisible"
  position="center">
  	<div class="popupbox">
		<mt-field placeholder="姓名" :value.sync="name" :attr={maxlength:6} type="text"></mt-field>
		<mt-field placeholder="手机" :value.sync="tel" :attr={maxlength:11} type="tel"></mt-field>
		<mt-field placeholder="详细地址" :value.sync="address" :attr={maxlength:30}></mt-field>
		<mt-field placeholder="邮编" :value.sync="post" :attr={maxlength:6} type="text"></mt-field>
		<mt-cell title="设置为默认地址" v-if="addrs.length > 0"><mt-switch :value.sync="open"></mt-switch></mt-cell>
		<div class="page-button">
			<mt-button type="primary" @click="save">确认</mt-button>
		</div>
	</div>
	</mt-popup>
</template>

<script>
import Lib from 'assets/Lib.js'
Lib.Vue.use(Lib.Resource);
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
import topBack from 'components/top-back'
import { Popup } from 'mint-ui';
Lib.Vue.component(Popup.name, Popup);
import { Field } from 'mint-ui';
Lib.Vue.component(Field.name, Field);
import { Radio } from 'mint-ui';
Lib.Vue.component(Radio.name, Radio);
import { Switch } from 'mint-ui';
Lib.Vue.component(Switch.name, Switch);
import { Cell } from 'mint-ui';
Lib.Vue.component(Cell.name, Cell);
import { Button } from 'mint-ui';
Lib.Vue.component(Button.name, Button);
export default {
  data() {
    return {addrs:[],name:'',tel:'',address:'',post:'',default:'',open:false,id:'',
    "popupVisible":false,"nothing":Lib.C.baseimg.nothing,have:true
    }
  },
  components: {
  	topBack
  },
  ready(){
  	this.getdata();
  },
  methods: {
  	getdata (){
        var path = Lib.C.Mpath+'address/AddressList';
        Indicator.open();
  		this.$http.jsonp(path).then(function(respoce){
  			Indicator.close();
	        this.addrs=respoce.data.address;
	        if(this.addrs.length == 0){
	        	this.open = true;
	        }
		    if(this.addrs.length == 0){
	        	this.have=false;
	        }
	    },function(){
          Indicator.close();
          Toast('请求出错');
        })
  	},
  	remove (id,index){
  		MessageBox.confirm('确定删除此地址?').then(action => {
  			this.$http.jsonp(Lib.C.Mpath+'address/deleteAddress?id='+id).then(function(respoce){
	        	if(respoce.data.status){
	        		Toast(respoce.data.message);
	        		setTimeout(function(){
	        			window.location.reload();
	        		})
	        	}else{
	        		Toast(respoce.data.message);
	        	}
	    	})
  		});
  	},
  	save (){
  		if(this.open){
  			this.open = 'on'
  		}
  		var path;
  		if(!this.id){
  			path = Lib.C.Mpath+'address/Add?&address='+this.address;
  		}else{
  			path = Lib.C.Mpath+'address/Update?id='+this.id+'&addres='+this.address;
  		}
  		path += '&name='+this.name+'&tel='+this.tel+'&post='+this.post+'&open='+this.open;
  		if(!this.name || !this.tel || !this.address || !this.post){
  			Toast("收货人信息不完整");
  			return false;
  		}
  		this.$http.jsonp(path).then(function(respoce){
			if(respoce.data.status){
				Toast(respoce.data.message);
				setTimeout(function(){
					window.location.reload()
	            },1000)
			}else{
				Toast(respoce.data.message);
			}
		})
  	},
  	edit(id){
  		this.popupVisible = true;
  		this.id = id;
  		this.$http.jsonp(Lib.C.Mpath+'address/UpdateList?id='+id).then(function(respoce){
  			var data = respoce.data.address;
	        	this.name = data.contactor;
	        	this.tel  = data.mobile;
	        	this.address = data.address;
	        	this.post = data.code;
	        	if(data.isdefault == '1'){
	        		this.open = true;
	        	}else{
	        		this.open = false;
	        	}
	    })
  	},
  	setDefault(id){
  		this.$http.jsonp(Lib.C.Mpath+'address/Moren?id='+id).then(function(respoce){
	        if(respoce.data.status){
	        	Toast(respoce.data.message);
	        }else{
	        	Toast(respoce.data.message);
	        }
	    })
  	},
  	show(){
  		this.popupVisible = true;
  	}
  },
	watch: {
        default(curVal,oldVal){
        	if(curVal != oldVal && oldVal!=''){
        		this.setDefault(curVal);
        	}
        }
    }
}
</script>

<style scoped>
.addrs{font-size: 16px;line-height: 24px;margin-bottom: 20px;}
.addrs li{float: none;position: relative;}
.addrs .title{display: flex;}
.addrs .title span{flex: 1;height:24px;}
.addrs .title span:nth-child(2){text-align: center;}
.addrs .title span:last-child{text-align: right;}
.addrs .tool{position: absolute;top: 66px;right: 0.25rem;}
</style>





