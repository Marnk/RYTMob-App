
//轮播banner样式
var stop,list=0,list_left,list_right;
function car_banner_style(){
  for (var i = 0; i < $('.car_banner>a').length; i++) {
    $('.car_banner>a').eq(i).css({'transition-duration':'0ms','transform':'translate3d('+-width+'px,0px,0px)'});
  };
  list_left = list == 0?$('.car_banner>a').length-1:list-1;
  list_right = list == $('.car_banner>a').length-1?0:list+1;
  $('.car_banner>a').eq(list_left).css({'transform':'translate3d('+-width+'px,0px,0px)'});
  $('.car_banner>a').eq(list).css({'transition-duration':'300ms','transform':'translate3d(0px,0px,0px)'});
  $('.car_banner>a').eq(list_right).css({'transform':'translate3d('+width+'px,0px,0px)'});
  $('.car_tag>li').css("background","#ffffff")
  $('.car_tag>li').eq(list).css("background-color","#ff734e");
};

function car_script(){
 return stop = setInterval(function(){
    $('.car_banner>a').eq(list).css({'transform':'translate3d('+-width+'px,0px,0px)'});
    $('.car_banner>a').eq(list_right).css({'transition-duration':'300ms','transform':'translate3d(0px,0px,0px)'});
    if (list>=$('.car_banner>a').length-1) {
      list = 0;
    }else{
      list++;
    };
    setTimeout(function(){
      car_banner_style()
    },100);
  },3000);
}
function car_touch_script(){
  var d_left = 0,left = 0;
  var car_banner_box = $('.car_banner')[0];
  var box_left = $('.car_banner').offset().left;
  car_banner_box.addEventListener("touchstart",function(e){
    clearInterval(stop);
    var touches = e.touches[0];
    left = touches.clientX - box_left;
    // e.preventDefault();
    $('.car_banner>a').eq(list).css({'transition-duration':'0ms'});
  },false);
  car_banner_box.addEventListener("touchmove",function(e){
    var touches = e.touches[0];
    d_left = touches.clientX - box_left - left;
    if (d_left>0&&d_left<= width) {
      var d_width = -width + d_left;
      $('.car_banner>a').eq(list_left).css({'transform':'translate3d('+d_width+'px,0px,0px)'});
      $('.car_banner>a').eq(list).css({'transform':'translate3d('+d_left+'px,0px,0px)'});
    }else if (d_left<0&&d_left>= -width){
      var d_width = width + d_left;
      $('.car_banner>a').eq(list).css({'transform':'translate3d('+d_left+'px,0px,0px)'});
      $('.car_banner>a').eq(list_right).css({'transform':'translate3d('+d_width+'px,0px,0px)'});
    };
  },false);
  car_banner_box.addEventListener("touchend",function(e){
    if(d_left>0){
      if (Math.abs(d_left) >= width/10) {
        if (list==0) {
          list = $('.car_banner>a').length-1
        }else{
          list--;
        };
        list_right = list == $('.car_banner>a').length-1?0:list+1;
        $('.car_banner>a').eq(list).css({'transition-duration':'300ms','transform':'translate3d(0px,0px,0px)'});
        $('.car_banner>a').eq(list_right).css({'transition-duration':'300ms','transform':'translate3d('+width+'px,0px,0px)'});
      }else{
        $('.car_banner>a').eq(list).css({'transition-duration':'300ms','transform':'translate3d(0px,0px,0px)'});
        $('.car_banner>a').eq(list_left).css({'transition-duration':'300ms','transform':'translate3d('+-width+'px,0px,0px)'});
      };
    }else if (d_left<0){
      if (Math.abs(d_left) >= width/10) {
        if (list>=$('.car_banner>a').length-1) {
          list = 0;
        }else{
          list++;
        };
        list_left = list == 0?$('.car_banner>a').length-1:list-1;
        $('.car_banner>a').eq(list).css({'transition-duration':'300ms','transform':'translate3d(0px,0px,0px)'});
        $('.car_banner>a').eq(list_left).css({'transition-duration':'300ms','transform':'translate3d('+-width+'px,0px,0px)'});
      }else{
        $('.car_banner>a').eq(list).css({'transition-duration':'300ms','transform':'translate3d(0px,0px,0px)'});
        $('.car_banner>a').eq(list_right).css({'transition-duration':'300ms','transform':'translate3d('+width+'px,0px,0px)'});
      };
    };
    d_left = 0;
    setTimeout(function(){
      car_banner_style();
    },100);
    car_script();
  },false);
}
car_script();
car_touch_script();
//true真 false假

