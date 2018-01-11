<template>
  <a class="purikura clearfix" :href="'users.html?id='+usercon.id">
      <div class="userimg fl"><img :src="usercon.faceurl"></div>
      <div class="fl">{{usercon.nickname}}</div>
      <div class="layui-btn layui-btn-mini fl" v-if="usercon.artlevel > 0">艺术家LV{{usercon.artlevel}}</div>
      <div class="layui-btn layui-btn-mini fl" v-if="usercon.agentlevel > 0 && usercon.agentlevel < 6">经纪人LV{{usercon.agentlevel}}</div>
      <div class="layui-btn layui-btn-mini fl" v-if="usercon.agentlevel == 6">机构</div>
      <div class="fr"></div>
    </a>
</template>

<script>

import Lib from 'assets/Lib.js'

module.exports = {
	components:{
		
	},
  data: function () {
    return {
      
    }
  },
  props:['usercon'],
  ready:function(){
  	
  },
  methods:{
  	
  }
}
</script>


<style scoped>
.purikura {
  width: 100%;margin:4px 0; display: block;padding: 4px 0.25rem;line-height: 40px;box-shadow:0 0 10px #eee;
}
.purikura img{max-width:100%;}
.purikura .fl {
  margin-left:10px;
}
.purikura .fr {
  padding-right:32px;position: relative;font-size:12px;color: #999999;
}
.purikura .layui-btn{
  margin-top: 5px;height: 30px;line-height: 30px;
}
.purikura .fr::after {
  content: "";height: 10px;width:10px;position: absolute;top:12px;right:2px;border-top: 2px solid #9e9b98;border-right: 2px solid #9e9b98;transform: rotate(45deg);
}
</style>
