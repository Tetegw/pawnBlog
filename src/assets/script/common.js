// 点击水波纹效果
function ripple(rippleWrap, callback) {
  var rippleWrapEle = document.querySelector('#' + rippleWrap)
  var rippleDiv = rippleWrapEle.querySelectorAll('.rippleWrap');
  for (var i = 0; i < rippleDiv.length; i++) {
    rippleDiv[i].addEventListener('click', creatRipple);
  }
  // 获取位置，创建水波标签
  function creatRipple(e, callback) {
    console.log("触发次数")
    var offsetL = this.getBoundingClientRect().left;
    var offsetT = this.getBoundingClientRect().top;
    var x = e.clientX;
    var y = e.clientY;
    var ripple = document.createElement('span');
    ripple.className = 'rippleSpan';
    var rippleW = ripple.offsetWidth;
    var rippleH = ripple.offsetHeight;
    ripple.style.position = 'absolute';
    ripple.style.left = x - offsetL - rippleW / 2 + 'px';
    ripple.style.top = y - offsetT - rippleH / 2 + 'px';
    this.removeChild(this.childNodes[0]);
    this.appendChild(ripple);
    callback && callback();
  }
};
/*//获取到页面顶部的距离，固定定位一样可以获取到
function getAbsPoint(e) {
  var x = e.offsetLeft;
  var y = e.offsetTop;
  while (e = e.offsetParent) {
    x += e.offsetLeft;
    y += e.offsetTop;
  }
  return {
    "x": x,
    "y": y
  };
}
// 获取卷起高度
function getScroll() {
  return {
    top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
    left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
  };
}
// 判断是否有固定定位
function isFixed(e) {
  while (e = e.offsetParent) {
    if (getStyle(e, 'position')=== 'fixed') {
      return true;
    }
  }
}
// 获取计算后的属性，包括css中属性
function getStyle(obj, attr) {
  if (obj.currentStyle) {
    return obj.currentStyle[attr];
  } else {
    return getComputedStyle(obj, false)[attr];
  }
}*/



// 列表渐变效果
function ListfadeOut() {
  var Ul = document.querySelector('.fadeOutList');
  var aLi = Ul.querySelectorAll('li');
  for (var i = 0; i < aLi.length; i++) {
    var oP = aLi[i].querySelectorAll('p')[0];
    oP.iAlpha = 0;
    oP.time = null;
    aLi[i].onmouseover = function () {
      var oP = this.querySelectorAll('p')[0];
      oP.time ? clearInterval(oP.time) : "";
      oP.style.opacity = 1;
      oP.style.filter = "alpha(opacity=100)";
      oP.iAlpha = 100;
      oP.parentNode.style.color = '#fff';
    }
    aLi[i].onmouseout = function () {
      var oP = this.querySelectorAll('p')[0];
      starmove(oP);
      oP.parentNode.style.color = '#383838';
    };
  }

  function starmove(obj) {
    obj.time ? clearInterval(obj.time) : "";
    obj.time = setInterval(function () {
      domove(obj);
    }, 14);
  }

  function domove(obj) {
    var iSpeed = 3;
    if (obj.iAlpha <= iSpeed) {
      clearInterval(obj.time);
      obj.iAlpha = 0;
      obj.time = null;
    } else {
      obj.iAlpha -= iSpeed;
    }
    obj.style.opacity = obj.iAlpha / 100;
    obj.style.filter = "alpha(opacity=" + obj.iAlpha + ")";
  }
};


export { ripple, ListfadeOut };
