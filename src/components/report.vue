<template>
    <div class="reportbor">
        <a class="reportbtn fr" title="举报" @click="show" v-if="!self">
          <i class="icon iconfont">&#xe65e;</i>
        </a>
        <div class="time">{{time}}</div>
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
		return {popupVisible:false,reason:'色情低俗'}
	},
	props:["time","reportid","self"],
	ready:function(){
	},
	methods:{
        show (){
            this.popupVisible = true;
        },
        report (index){
            this.$http.jsonp(Lib.C.Mpath+'productDetails/Report?id='+this.reportid+'&reason='+this.reason).then(function(res){
                if(res.data.status == 1){
                    Toast("举报成功");
                    this.popupVisible = false;
                }
            })
        }
	}
}

</script>
<style scoped>
.reportbor{height: 40px;padding: 10px;}

</style>
