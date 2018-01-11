<template>
</template>

<script>
import Lib from 'assets/Lib.js';
Lib.Vue.use(Lib.Resource);
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import $ from 'jQuery';
export default {
  data() {
    return {}
  },
  components: {
  },
  ready(){
    this.login();
  },
  methods: {
	login (){
    Indicator.open();
		var paras = {'url':'https://graph.qq.com/user/get_user_info'};
    var that = this;
    QC.api("get_user_info", paras)
      .success(function(s){
        Indicator.close();
        var nickname = s.data.nickname;
        var figureurl_2 = s.data.figureurl_2;
        QC.Login.getMe(function(openId, accessToken){
          $.ajax({
            type : "get",
            url : Lib.C.Mpath+'qq/qq_login_bind?nickname='+nickname+'&figureurl_2='+figureurl_2+'&qq_openid='+openId+'&from=mobile',
            dataType : "jsonp",
            success : function(data){
              if(data.user.account){
                Toast("登录成功");
                setTimeout(function(){
                  window.location.href = 'home.html'
                },1000)
              }else{
                Toast("登录成功,请绑定手机号码");
                setTimeout(function(){
                  window.location.href = 'http://localhost:8083/module/register.html'
                },1000)
              }
            },
            error:function(){
              alert('fail');
            }
          })
        })
      })
      .error(function(f){
        Indicator.close();
        alert("获取用户信息失败！");
      })
      .complete(function(c){
        Indicator.close();
      });
	}
  }  
}
</script>

<style scoped>
.page-button{padding: 0 20px;margin-top: 20px;}
.logo{margin: 0 auto;text-align: center;width:200px;padding: 20px 0;}
.logo img{width:100%;}
.list,.login{padding:0 20px;}
.list li{height:40px;line-height:40px;margin-top:10px;float: none;overflow: hidden;position: relative;}
.list li .iconfont{position: absolute;left: 8px;top:10px;}
.list li:first-child{
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
}
.list li:last-child{
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
}
input{border:none;width: 100%;height:40px;line-height:40px;padding-left:4px;display: block;padding-left: 36px;}
.login{margin-top: 10px;text-align: right;margin-bottom:10px;font-size: 16px;}
.login a{color: #fff}
.ologin{padding: 0 20px;display: flex;}
.ologin li{flex:1;border-top:1px solid #fff;padding-top:30px;position: relative;}
.ologin li a{display: block;width: 40px;height: 40px;border-radius: 50%;background: #26a2ff;color:#fff;margin:0 auto;text-align: center;line-height: 40px;}
.ologin li .iconfont{color: #fff;font-size: 24px;}
.ologin li span{position: absolute;top:30px;opacity: 0.01;}
</style>





