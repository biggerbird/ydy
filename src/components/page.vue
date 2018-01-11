<template>
  <ul class="page">
    <li v-if="prev.length"><a class="ellipsis" :href="'art.html?id='+prev[0].id">上一幅：{{{prev[0].name}}}</a></li>
    <li v-else class="prohibit"><a class="ellipsis">上一幅：无</a></li>
    <li v-if="next.length"><a class="ellipsis" :href="'art.html?id='+next[0].id">下一幅：{{{next[0].name}}}</a></li>
    <li v-else class="prohibit"><a class="ellipsis">下一幅：无</a></li>
  </ul>
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
  props:['prev','next'],
  ready:function(){
  	
  },
  methods:{
  	
  }
}
</script>


<style scoped>
.page{width: 100%;display: flex;margin:5px 0;border-top:1px solid #ccc;border-bottom:1px solid #ccc;}
.page li{flex: 1;padding:10px 5px;height: 40px;line-height:20px;}
.page li a{color: #33a6b9;width:7.5rem;display:inline-block;}
.page .prohibit a{color: #ccc;cursor: not-allowed;}
</style>
