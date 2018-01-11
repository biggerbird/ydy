<template>
  <top-back></top-back>
  
  <purikura :usercon="usercon"></purikura>

  <section class="details">
    <div class="clearfix title">
        <h4>{{{all.name}}}</h4>
    </div>
    <report :time="time" :reportid="reportid" :self="self"></report>
    <div class="clearfix">
      <div id="demo-test-gallery" class="artimgs demo-gallery clearfix">
        <a class="artimg" :href="messages.url" data-size="1600x800" :data-med="messages.url" data-med-size="1024x1024">
          <img :src="messages.url">
        </a>
        <a class="comimg" :href="item.big" data-size="1600x800" :data-med="item.big" data-med-size="1024x1024" v-for="item in images">
            <img :src="item.small" />
        </a>
      </div>
    </div>
    <div class="saybox">
      <button class="mint-button mint-button--primary mint-button--large" v-if="all.sellstatus == '非卖品'">非卖品</button>
      <button class="mint-button mint-button--primary mint-button--large" v-else>作品价格：{{all.price}}元</button>
      <b>类型</b>：{{all.producttype}}<em class="space"></em>
      <b>尺寸</b>：{{all.pwidth}}cm * {{all.pheight}}cm
      <b>年份</b>：{{all.createyear}}<em class="space"></em>
      <b>材质</b>：{{all.material}}<em class="space"></em>
      <b>装裱</b>：
        <template v-if="!product.haspack">
          是
        </template>
        <template v-else>
          否
        </template><em class="space"></em>
        <b>运费</b>：￥{{all.transprice}}
        <br/>
        <br/>
        <b>作品简介</b><br/>
      <p class="procontent">{{{all.content}}}</p>
    </div>
    </section>

  <ul class="page">
    <li v-if="prev.length"><a class="ellipsis" :href="'art.html?id='+prev[0].id">上一幅：{{{prev[0].name}}}</a></li>
    <li v-else class="prohibit"><a class="ellipsis">上一幅：无</a></li>
    <li v-if="next.length"><a class="ellipsis" :href="'art.html?id='+next[0].id">下一幅：{{{next[0].name}}}</a></li>
    <li v-else class="prohibit"><a class="ellipsis">下一幅：无</a></li>
  </ul>
  
  <module-tab :messages="messages" :user="user" :permit="permit" :self="self"></module-tab>

  
  <div class="height" v-if="!self && all.sellstatus != '非卖品'"></div>
  <footer class="footer" v-if="!self">
      <div class="buy" v-if="all.sellstatus == '出售'" @click="buy">立即购买</div>
      <div class="buy disable" v-if="all.sellstatus == '已售'">已售</div>
      <div class="buy disable" v-if="all.sellstatus == '非卖品'">非卖品</div>
      <div class="buy" v-if="all.spreedtype == '22' && tbuser.agentlevel > 0 && tbuser.agentlevel < 6" @click="extend">我要推广</div>
  </footer>

  <!-- Root element of PhotoSwipe. Must have class pswp. -->
<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="pswp__bg"></div>
    <div class="pswp__scroll-wrap">
        <div class="pswp__container">
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
        </div>
        <div class="pswp__ui pswp__ui--hidden">
            <div class="pswp__top-bar">
                <div class="pswp__counter"></div>
                <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                <button class="pswp__button pswp__button--share" title="Share"></button>
                <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                <div class="pswp__preloader">
                    <div class="pswp__preloader__icn">
                      <div class="pswp__preloader__cut">
                        <div class="pswp__preloader__donut"></div>
                      </div>
                    </div>
                </div>
            </div>
            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                <div class="pswp__share-tooltip"></div>
            </div>
            <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
            </button>
            <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
            </button>
            <div class="pswp__caption">
                <div class="pswp__caption__center"></div>
            </div>
        </div>
    </div>
</div>
</template>

<script>

import Lib from 'assets/Lib.js'
Lib.Vue.use(Lib.Resource);
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import topBack from 'components/top-back'
import purikura from 'components/purikura'
import report from 'components/report'
import moduleTab from 'components/module-tab'
export default {
  data() {
    return {
      usercon:'',messages:'',user:'',next:'',prev:'',all:'',images:[],self:false,tbuser:'',productId:'',permit:false,time:'',reportid:''
    }
  },
  components: {
    topBack,
    purikura,
    report,
    moduleTab
  },
  ready(){
    this.getdata();
    this.showimg()
  },
  methods: {
    getdata (){
        var artid=Lib.C.getSearchString("id");
        var path = Lib.C.Mpath+'productDetails/product?id='+artid;
        Indicator.open();
      this.$http.jsonp(path).then(function(respoce){
        Indicator.close();
        if(respoce.data.userId){
            var Status = 1;
        }
        Lib.C.back(Status);
        if(!respoce.data.user){
            Toast("该条数据已被删除，请访问其他");
            return false;
        }
        this.usercon = respoce.data.user;
        this.next = respoce.data.next;
        this.prev = respoce.data.previous;
        this.all = respoce.data.all1;
        this.messages = respoce.data;
        this.product = respoce.data.works[0];
        this.images = respoce.data.photo;
        this.user = respoce.data.userId;
        this.productId = respoce.data.all1.id;
        this.time = respoce.data.all1.createtime;
        this.reportid = respoce.data.all1.id;
        if(this.user == this.usercon.id){
          this.self=true;
        }
        this.tbuser = respoce.data.tbuser;
        if(respoce.data.user.artlevel != 1){
            this.permit = true;
        }
      },function(){
          Indicator.close();
          Toast('请求出错');
        })
    },
    buy (){
      var artid=Lib.C.getSearchString("id");
      location.href='ordersure.html?id='+artid;
    },
    extend(){
        this.$http.jsonp(Lib.C.Mpath+'agents/ajaxsave?productId='+this.productId).then(function(respoce){
            if(respoce.data.status == 1){
                Toast(respoce.data.message);
                setTimeout(function(){
                    window.location.href="agents.html";
                },1000)
            }else{
                Toast(respoce.data.message);
            }
        },function(){
          Indicator.close();
          Toast('请求出错');
        })
    },
    showimg () {

        var initPhotoSwipeFromDOM = function(gallerySelector) {

            var parseThumbnailElements = function(el) {
                var thumbElements = el.childNodes,
                        numNodes = thumbElements.length,
                        items = [],
                        el,
                        childElements,
                        thumbnailEl,
                        size,
                        item;

                for(var i = 0; i < numNodes; i++) {
                    el = thumbElements[i];

                    // include only element nodes
                    if(el.nodeType !== 1) {
                        continue;
                    }

                    childElements = el.children;

                    size = el.getAttribute('data-size').split('x');

                    // create slide object
                    item = {
                        src: el.getAttribute('href'),
                        w: parseInt(size[0], 10),
                        h: parseInt(size[1], 10),
                        author: el.getAttribute('data-author')
                    };

                    item.el = el; // save link to element for getThumbBoundsFn

                    if(childElements.length > 0) {
                        item.msrc = childElements[0].getAttribute('src'); // thumbnail url
                        if(childElements.length > 1) {
                            item.title = childElements[1].innerHTML; // caption (contents of figure)
                        }
                    }


                    var mediumSrc = el.getAttribute('data-med');
                    if(mediumSrc) {
                        size = el.getAttribute('data-med-size').split('x');
                        // "medium-sized" image
                        item.m = {
                            src: mediumSrc,
                            w: parseInt(size[0], 10),
                            h: parseInt(size[1], 10)
                        };
                    }
                    // original image
                    item.o = {
                        src: item.src,
                        w: item.w,
                        h: item.h
                    };

                    items.push(item);
                }

                return items;
            };

            // find nearest parent element
            var closest = function closest(el, fn) {
                return el && ( fn(el) ? el : closest(el.parentNode, fn) );
            };

            var onThumbnailsClick = function(e) {
                e = e || window.event;
                e.preventDefault ? e.preventDefault() : e.returnValue = false;

                var eTarget = e.target || e.srcElement;

                var clickedListItem = closest(eTarget, function(el) {
                    return el.tagName === 'A';
                });

                if(!clickedListItem) {
                    return;
                }

                var clickedGallery = clickedListItem.parentNode;

                var childNodes = clickedListItem.parentNode.childNodes,
                        numChildNodes = childNodes.length,
                        nodeIndex = 0,
                        index;

                for (var i = 0; i < numChildNodes; i++) {
                    if(childNodes[i].nodeType !== 1) {
                        continue;
                    }

                    if(childNodes[i] === clickedListItem) {
                        index = nodeIndex;
                        break;
                    }
                    nodeIndex++;
                }

                if(index >= 0) {
                    openPhotoSwipe( index, clickedGallery );
                }
                return false;
            };

            var photoswipeParseHash = function() {
                var hash = window.location.hash.substring(1),
                        params = {};

                if(hash.length < 5) { // pid=1
                    return params;
                }

                var vars = hash.split('&');
                for (var i = 0; i < vars.length; i++) {
                    if(!vars[i]) {
                        continue;
                    }
                    var pair = vars[i].split('=');
                    if(pair.length < 2) {
                        continue;
                    }
                    params[pair[0]] = pair[1];
                }

                if(params.gid) {
                    params.gid = parseInt(params.gid, 10);
                }

                return params;
            };

            var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
                var pswpElement = document.querySelectorAll('.pswp')[0],
                        gallery,
                        options,
                        items;

                items = parseThumbnailElements(galleryElement);

                // define options (if needed)
                options = {

                    galleryUID: galleryElement.getAttribute('data-pswp-uid'),

                    getThumbBoundsFn: function(index) {
                        // See Options->getThumbBoundsFn section of docs for more info
                        var thumbnail = items[index].el.children[0],
                                pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                                rect = thumbnail.getBoundingClientRect();

                        return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
                    },

                    addCaptionHTMLFn: function(item, captionEl, isFake) {
                        if(!item.title) {
                            captionEl.children[0].innerText = '';
                            return false;
                        }
                        captionEl.children[0].innerHTML = item.title +  '<br/><small>Photo: ' + item.author + '</small>';
                        return true;
                    }

                };

                // options for control bar
                options.shareEl = false;
                options.fullscreenEl = false;

                if(fromURL) {
                    if(options.galleryPIDs) {
                        // parse real index when custom PIDs are used
                        // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                        for(var j = 0; j < items.length; j++) {
                            if(items[j].pid == index) {
                                options.index = j;
                                break;
                            }
                        }
                    } else {
                        options.index = parseInt(index, 10) - 1;
                    }
                } else {
                    options.index = parseInt(index, 10);
                }

                // exit if index not found
                if( isNaN(options.index) ) {
                    return;
                }



                // Pass data to PhotoSwipe and initialize it
                gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);

                // see: http://photoswipe.com/documentation/responsive-images.html
                var realViewportWidth,
                        useLargeImages = false,
                        firstResize = true,
                        imageSrcWillChange;

                gallery.listen('beforeResize', function() {

                    var dpiRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
                    dpiRatio = Math.min(dpiRatio, 2.5);
                    realViewportWidth = gallery.viewportSize.x * dpiRatio;


                    if(realViewportWidth >= 1200 || (!gallery.likelyTouchDevice && realViewportWidth > 800) || screen.width > 1200 ) {
                        if(!useLargeImages) {
                            useLargeImages = true;
                            imageSrcWillChange = true;
                        }

                    } else {
                        if(useLargeImages) {
                            useLargeImages = false;
                            imageSrcWillChange = true;
                        }
                    }

                    if(imageSrcWillChange && !firstResize) {
                        gallery.invalidateCurrItems();
                    }

                    if(firstResize) {
                        firstResize = false;
                    }

                    imageSrcWillChange = false;

                });

                gallery.listen('gettingData', function(index, item) {
                    if( useLargeImages ) {
                        item.src = item.o.src;
                        item.w = item.o.w;
                        item.h = item.o.h;
                    } else {
                        item.src = item.m.src;
                        item.w = item.m.w;
                        item.h = item.m.h;
                    }
                });

                gallery.init();
            };

            // select all gallery elements
            var galleryElements = document.querySelectorAll( gallerySelector );
            for(var i = 0, l = galleryElements.length; i < l; i++) {
                galleryElements[i].setAttribute('data-pswp-uid', i+1);
                galleryElements[i].onclick = onThumbnailsClick;
            }

            // Parse URL and open gallery if it contains #&pid=3&gid=1
            var hashData = photoswipeParseHash();
            if(hashData.pid && hashData.gid) {
                openPhotoSwipe( hashData.pid,  galleryElements[ hashData.gid - 1 ], true, true );
            }
        };

        initPhotoSwipeFromDOM('.demo-gallery');

    }
  }
}
</script>

<style scoped>
.artimg{width:15.5rem;margin:0 auto;display: block;margin-bottom: 10px;text-align: center;}
.artimgs{padding: 0.25rem;}
.prinum{padding: 10px;}
.comimg {
    display: block;
    height: 3.6rem;
    margin-right:0.25rem;
    width: 3.6rem;
    margin-bottom: 0.25rem;
    background: #eee none repeat scroll 0 0;
    overflow: hidden;
    position: relative;
    float: left;
}
.comimg img {
    left: 50%;
    max-height:3.6rem;
    max-width:100%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    transform-origin: 0 0 0;
    transition-duration: 0.5s;
}
.icon-dui{color: #33a6b8;margin-right: 4px;}
.details .title{
line-height: 30px;padding:0 10px;
}
.details h4{font-size:16px;font-weight: bold;color: #171717;text-align: center;}
.details .content{
  line-height: 20px;
}
.details dt{
  color: #010101;margin-bottom:10px;
}
.details dd{
  width: 30%;margin: 0 1.66%;float: left;
}
.details dd a{
  display: block;width: 100%;height: 4.25rem;overflow: hidden;position: relative;background-repeat: no-repeat;background-size:contain;background-position:center;
}
.details dd a img{
  position: absolute;top: 50%;transform: translateY(-50%);
}
.details dd h6{
  padding:4px;font-size: 12px;
}
.footer{display: flex;text-align: center;height:50px;line-height:50px;margin:0 auto;width:16rem;overflow: hidden;}
.footer .buy{
  flex: 2;border-right: 1px solid #33a6b8;background: #33a6b8;color: #fff;font-size:20px;cursor: pointer;font-weight: bold;
}
.footer .buy:nth-child(2){border-left:1px solid #fff;}
.footer .disable{background: #999;cursor: no-drop;}
.procontent{text-indent: 2em}
.disable{background: none;}
.disable a{color: #ccc;cursor: not-allowed;}
</style>





