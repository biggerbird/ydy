<template>
	<div class="warp" v-if="have">
    	<table class="ui-table">
            <thead>
              <tr>
                <th>艺术品</th>
                <th>点击量</th>
                <th>推广时长</th>
                <th>二维码</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in orders">
                <td class="art">
                	<a class="proimg" :href="'art.html?id='+item.productid+'&fromuserId='+item.agentuserid" :style="'background-image: url('+item.mainurl+');'"></a>
                	<h3>{{item.name}}</h3>
                </td>
                <td>{{item.click}}</td>
                <td>{{item.passDay}} / {{item.totalDay}}</td>
                <td class="art">
                	<a class="proimg" :style="'background-image: url('+item.url+');'" @click="show(item.url)"></a>
                	<h3>推广二维码</h3>
                </td>
              </tr>
            </tbody>
        </table>
	</div>
	    
    <div class="error_page1" v-else>
        <span class="error_img"><img :src="nothing"></span>
        <p>暂无记录！</p>
    </div>
    <mt-popup :visible.sync="popupVisible" position="center">
        <img :src="imgsrc">
    </mt-popup>

</template>

<script>
import Lib from 'assets/Lib.js';
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { Button } from 'mint-ui';
Lib.Vue.component(Button.name, Button);
import { Popup } from 'mint-ui';
Lib.Vue.component(Popup.name, Popup);
module.exports = {
	data (){
		return {"nothing":Lib.C.baseimg.nothing,popupVisible:false,imgsrc:''}
	},
	props:["have","orders"],
	ready:function(){
	},
	methods:{
        show (src){
            this.imgsrc = src;
            this.popupVisible = true;
        }
	}
}

</script>
<style scoped>
.proimg{width:80px;margin:0 auto;}
h3{line-height: 20px;}
</style>
