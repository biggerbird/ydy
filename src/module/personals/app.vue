<template>
	<top-back></top-back>
  <div class="goodsbox">
    <mt-field label="昵称" :value.sync="user.nickname"  type="text" disabled></mt-field>
    <mt-field label="真实姓名" :value.sync="user.truename" disabled v-if="user.truename"></mt-field>
    <mt-field label="账号类型" v-if="user.artlevel > 0" value="艺术家" type="text" disabled></mt-field>
    <template v-if="user.agentlevel > 0 && user.agentlevel < 6">
     <mt-field label="账号类型" value="经纪人" type="text" disabled></mt-field>
      <mt-field label="推广位" value="5" type="text" disabled></mt-field>
      <mt-field label="推广时长" value="5" type="text" disabled></mt-field>
    </template>
    <mt-field label="账号类型" v-if="user.agentlevel == 6" value="机构" type="text" disabled></mt-field>
    <mt-field label="性别" :value.sync="sexs[user.sex].label"  type="text" disabled></mt-field>
    <mt-field label="生日" :value.sync="user.birthday"  type="text" disabled></mt-field>
    <mt-field label="毕业院校" :value.sync="user.college"  type="text" disabled v-if="user.college"></mt-field>
    <mt-field label="简介" :value.sync="user.sentence" type="textarea" rows="4" disabled></mt-field>
    <div class="tokenbox">
      <div class="tokens">
        <span v-for="item in tokens"><b>{{item}}</b></span>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from 'assets/Lib.js'
Lib.Vue.use(Lib.Resource);
import { Indicator } from 'mint-ui';
import { Field } from 'mint-ui';
Lib.Vue.component(Field.name, Field);
import { Radio } from 'mint-ui';
Lib.Vue.component(Radio.name, Radio);
import topBack from 'components/top-back'
import moduleLabel from 'components/module-label'
export default {
  data() {
    return {
      user:'',tokens:'',
      sexs:[
        {
          label: '男',
          value: '0'
        },
        {
          label: '女',
          value: '1'
        },
        {
          label: '保密',
          value: '2'
        }
      ]
    }
  },
  components: {
  	topBack
  },
  ready(){
  	this.getData()
  },
  methods: {
  	getData (){
      var otherId=Lib.C.getSearchString("id");
      var path = Lib.C.Mpath+'tbuser/ajaxFindById?otherId='+otherId;
        Indicator.open();
      this.$http.jsonp(path).then(function(res){
          Indicator.close();
        this.user = res.data.user;
        this.tokens = res.data.user.favorite.split(',')
      },function(){
          Indicator.close();
          Toast('请求出错');
        })
    }
  }
}
</script>

<style scoped>

</style>





