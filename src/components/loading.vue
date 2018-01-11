<template>
	<div class="spinner" v-show="load" id="spinner">
	  <div class="rect1"></div>
	  <div class="rect2"></div>
	  <div class="rect3"></div>
	  <div class="rect4"></div>
	  <div class="rect5"></div>
	</div>
</template>

<script>
module.exports = {
	props:["load"]
}

</script>
<style scoped>
.spinner {
  margin:4px auto;
  width:40px;
  height:30px;
  line-height:30px;
  text-align: center;
}
.spinner > div {
  background-color: #33a6b8;
  height: 100%;
  width: 4px;
  display: inline-block;
  -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
  animation: stretchdelay 1.2s infinite ease-in-out;
}
.spinner .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
.spinner .rect3 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
.spinner .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
.spinner .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
</style>
