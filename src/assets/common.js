(function(doc, win) {
    var uAgent = win.navigator.userAgent;
    var isIOS = uAgent.match(/iphone/i);
    var docEle = doc.documentElement;
    var dpr = 1;
    function resizeRoot() {
        var wWidth = (screen.width > 0) ? (window.innerWidth >= screen.width || window.innerWidth == 0) ? screen.width: window.innerWidth: window.innerWidth,
        wDpr,wFsize;
        var wHeight = (screen.height > 0) ? (window.innerHeight >= screen.height || window.innerHeight == 0) ? screen.height: window.innerHeight: window.innerHeight;
        if (window.devicePixelRatio) {
            wDpr = window.devicePixelRatio
        } else {
            wDpr = isIOS ? wWidth > 818 ? 3 : wWidth > 480 ? 2 : 1 : 1
        }
        if (isIOS) {
            wWidth = screen.width;
            wHeight = screen.height;
            document.getElementsByTagName('body')[0].style.paddingTop = 1+"rem";
        }
        if (wWidth > wHeight) {
            wWidth = wHeight
        }
        wFsize = wWidth > 768 ? 40 : 40 * (wWidth / 640);
        window.screenWidth_ = wWidth;
        docEle.dataset.dpr = wDpr;
        docEle.style.fontSize = wFsize + "px"
    }
    window.onorientationchange=orient;
    function orient(){
        var body=document.body,div = document.createElement("div"),p = document.createElement("h2");
        if(window.orientation == 0){
            if(document.getElementById("musk")){
                document.body.removeChild(document.getElementById("musk"));
            }
        }else{
            div.setAttribute("class","musk");
            div.setAttribute("id","musk");
            p.innerHTML="请竖屏浏览，获得最佳使用体验";
            div.appendChild(p);
            document.body.appendChild(div);
        }
    };
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?3d5dc21dcbee3399e3c07d9d9cdc95f1";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
    //orient();
    resizeRoot();
})(document, window);

var Rxports = {


	
}
	
module.exports = Rxports



































