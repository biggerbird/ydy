<template>
  <top-back></top-back>
  <div class="content">
        <div class="museum_map" id="allmap1"></div>
   <p><strong>湖南艺朵云电子商务有限公司（简称艺朵云）</strong>成立于2015年，是一家聚集中国原创“字”、“画”品类的艺术品电商平台。平台以解决艺术品与消费者之间的断层现象，建立艺术作品与更多普通大众之间的交流互动与信任关系为出发点，通过沟通分享与社交的纽带，深度连接艺术家、艺术经纪人、艺术评论家、艺术爱好者人群，使线上与线下结合实现艺术品交易互联网化。帮助艺术家拓展更多销售渠道和提高效率，帮助艺术经纪人发现艺术、分享艺术，为广大艺术品爱好者提供一个公平公正公开的艺术品交易大数据平台。</p>
        <p>来艺朵云，邂逅梦寐以求的艺术，结识品味相投的朋友；分享传播的惊喜，交流艺术的美好。</p>
        <h3><p>平台愿景：</p></h3>
        <p>让更多的人享受艺术，拥有艺术品</p>
        <h3><p>平台使命：</p></h3>
        <p>让当代艺术品市场生态化</p>
        <p class="red">★艺朵云经纪服务体系：</p>
        <p class="red">艺朵云经纪服务体系旨在提高艺术家、经纪人和平台公司三方的效率提升，并重点解决平台与经纪人、平台与艺术家的结算效率。通过经纪人精准获客及全流程线上化交易服务体系，实现共享经纪的效益最大化。</p>
        <br/>

<p><b>地址：</b>中国湖南省长沙市国家高新区麓谷基地湘邮科技园</p><br/>
<p><b>网址：</b><a href="http://www.yiduoyun.com/">www.yiduoyun.com</a></p><br/>
<p><b>QQ号：</b>2963597691</p><br/>
<p><b>微信号：</b>Yiduoyundianshang</p><br/>
<p><b>邮箱：</b><a href="mailto:2963597691@qq.com">2963597691@qq.com</a></p><br/>
<p><b>联系电话：</b><a href="tel:4000691010">400-069-1010</a></p>
  </div>
</template>

<script>
import Lib from 'assets/Lib.js'
import topBack from 'components/top-back'
export default {
  data() {
    return {}
  },
  components: {
    topBack
  },
  ready(){
    this.baidumap();
  },
  methods: {
    baidumap (){
      var map, point, marker;
        // 百度地图API功能
      map = new BMap.Map("allmap1");
      point = new BMap.Point(112.915161, 28.229899);
      map.centerAndZoom(point, 18);
      var marker = new BMap.Marker(point);  // 创建标注
      map.addOverlay(marker);               // 将标注添加到地图中
      marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
      map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
    }
  }  
}
</script>

<style scoped>
.museum_map {
    height: 300px;
    margin: 10px 0;
    width:100%;
}
.BMap_Marker img{width:25px !important;height:20px !important;}
</style>





