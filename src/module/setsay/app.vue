<template>
	<top-back></top-back>

  <div class="opinion">
    <form class="layui-form">
      <textarea class="layui-textarea" id="editor" lay-verify="content"  name="content" autocomplete="off"></textarea>
      <mt-button type="primary" size="large" lay-submit="" lay-filter="shuoshuo">发布</mt-button>
    </form>
  </div>
</template>

<script>
import Lib from 'assets/Lib.js';
Lib.Vue.use(Lib.Resource);
import { Toast } from 'mint-ui';
import { Button } from 'mint-ui';
Lib.Vue.component(Button.name, Button);
import topBack from 'components/top-back'
export default {
  data() {
    return {editor:{}}
  },
  components: {
  	topBack
  },
  ready(){
    this.geteditor();
  },
  methods: {
    geteditor(){
      var layui=window.layui;
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
            return "请填写说说";
            }
          }
        });
     
     form.on('submit(shuoshuo)', function(data){
       $.ajax({
         url:Lib.C.Mpath+'tbActive/ajaxSaveSay',
          type: 'post',
          dataType:'jsonp',
          data:data.field,
         success:function(data){
            if(data == true){
              layer.msg("发布成功");
              setTimeout(function(){
                location.href = 'track.html';
              },1000)
            }else{
              layer.msg(data.message);
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
</style>





