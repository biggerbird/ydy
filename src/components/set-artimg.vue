<template>
	<div class="uploadBox fl">
		<div class="showBox " :id="classname"></div>
		<h4>{{title}}</h4>
        <div class="btn-upload">
          	<input :class="classname" accept="image/.jpg,image/.jpeg,image/.png" :name="name" type="file">
        </div>
	</div>
</template>
<script>
import Lib from 'assets/Lib.js';
import $ from 'jquery';
Lib.Vue.use(Lib.Resource);
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
module.exports = {
	data (){
	},
	props:["name","title","classname","url",'userid'],
	ready:function(){
	    this.setsome($);
	    this.start();
	},
	methods:{
		getdata (){

	    },
	    setsome ($){
	    	var cssObj;
	    	$.fn.uploadView=function(options){var defaults={uploadBox:".uploadBox",showBox:".showBox",width:200,height:200,allowType:["gif","jpeg","jpg","bmp","png"],maxSize:1,success:$.noop};var config=$.extend(defaults,options);var showBox=config.showBox;var uploadBox=config.uploadBox;var width=config.width;var height=config.height;var allowType=config.allowType;var maxSize=config.maxSize;var success=config.success;$(this).each(function(i){$(this).change(function(e){handleFileSelect($(this),width,height,allowType,maxSize,success)})});var handleFileSelect=function(obj,_w,_h,_type,_size,_callback){if(typeof FileReader=="undefined"){return false}var thisClosest=obj.closest(uploadBox);if(typeof thisClosest.length=="undefined"){return}var files=obj[0].files;var f=files[0];if(!isAllowFile(f.name,_type)){Toast("图片类型必须是"+_type.join("，")+"中的一种");return false}var fileSize=f.size;var maxSize=_size*1024*1024;if(fileSize>maxSize){Toast("上传图片超出允许上传大小");return false}var reader=new FileReader();reader.onload=(function(theFile){return function(e){var tmpSrc=e.target.result;if(tmpSrc.lastIndexOf("data:base64")!=-1){tmpSrc=tmpSrc.replace("data:base64","data:image/jpeg;base64")}else{if(tmpSrc.lastIndexOf("data:,")!=-1){tmpSrc=tmpSrc.replace("data:,","data:image/jpeg;base64,")}}var img='<img src="'+tmpSrc+'"/>';thisClosest.find(showBox).show().html(img);if(_w&&_h){cssObj={"width":_w+"px","height":_h+"px"}}else{if(_w){cssObj={"width":_w+"px"}}else{if(_h){cssObj={"height":_h+"px"}}else{cssObj={"max-width":"360px","max-height":"200px"}}}}thisClosest.find(showBox+" img").css(cssObj);_callback()}})(f);reader.readAsDataURL(f)};var getFileExt=function(fileName){if(!fileName){return""}var _index=fileName.lastIndexOf(".");if(_index<1){return""}return fileName.substr(_index+1)};var isAllowFile=function(fileName,allowType){var fileExt=getFileExt(fileName).toLowerCase();if(!allowType){allowType=["jpg","jpeg","png","gif","bmp"]}if($.inArray(fileExt,allowType)!=-1){return true}return false}}
	    },
	    start (){
	    	var that = this;
	      	$('.'+this.classname).uploadView({
	        uploadBox: '.uploadBox',//设置上传框容器
	        showBox : '.showBox',//设置显示预览图片的容器
	        width : 'auto', //预览图片的宽度，单位px
	        height : 'auto', //预览图片的高度，单位px
	        allowType: ["gif", "jpeg", "jpg", "bmp", "png"], //允许上传图片的类型
	        maxSize :2, //允许上传图片的最大尺寸，单位M
	        success:function(e){
	          that.ajax();
	        }
	      })
	    },
	    ajax(){
	    	var formData = new FormData();
	    	var str = $('#'+this.classname).find('img').attr("src");
      		Indicator.open('上传中...');
	    	formData.append(this.name,str);
	    	formData.append("userId",this.userid);
		      $.ajax({
				    url: this.url,
				    type: 'POST',
				    cache: false,
				    data: formData,
				    processData: false,
				    contentType: false,
				    success:function(res){
				    	if(res.code == '200'){
				    		Indicator.close();
							Toast('上传成功')
				    	}else{
				    		Indicator.close();
							Toast('上传失败')
				    	}
				    }
				})
	    }
	}
}


</script>
<style scoped>

</style>
