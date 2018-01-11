<template>
	<mt-field placeholder="请输入可关联的标签" :attr={autocomplete:off,maxlength:6} :value.sync="token"><a class="layui-btn" @click="addTag('')">添加</a></mt-field>
    <div class="tokenbox">
      <div class="tokens" v-if="tokens.length">
        <span v-for="item in tokens"><b>{{item}}</b><a class="close" @click="removeTag($index)">X</a></span>
      </div>
      <div class="token_t">
        系统推荐标签：<span v-for="item in stokens" v-on:click="addTag(item.value)">{{item.value}}</span>
      </div>
    </div>
</template>

<script>
import Lib from 'assets/Lib.js';
import { Toast, MessageBox } from 'mint-ui';
import { Field } from 'mint-ui';
Lib.Vue.component(Field.name, Field);
module.exports = {
	data (){
		return {token:''}
	},
	props:["stokens","tokens"],
	ready:function(){
	},
	methods:{
		addTag(value){
	      var bool=false;
	      if(!value){
	        value = this.token;
	        if(!this.token){
	          Toast("标签不能为空");
	          return false;
	        }
	      }
	      for(var i=0 ; i < this.tokens.length;i++){
	        if(this.tokens[i] === value){
	          Toast("该标签已经添加");
	          bool=true;
	        }
	      }
	      if(this.tokens.length >=5){
	        Toast("最多只能添加5个标签");
	        return false;
	      }
	      if(!bool){
	        this.tokens=this.tokens.concat(value);
	        bool=false;
	        this.token = '';
	      }
	      this.setokens();
	    },
	    setokens(){
	    	var data = this.tokens.toString();
	    	this.$emit('getokens',data);
	    },
	    removeTag (index){
	        MessageBox.confirm('确定删除此标签？').then(action => {
	          this.tokens.splice(index,1);
	          Toast("删除成功");
	        	this.setokens();
	          return false;
	      });
	    }
	}
}

</script>
<style scoped>
</style>
