//首页样式控制

//ajax获取内容

ajax({
  url:host+'/home',
  type:'post',
  data:{
      shop_id:getstr('shop_id')
  },
  func:function(str){
    if(str.code === 0 && str.data){
      //返回数据读取开始
      let car = [];
      for (let i = 0; i < str.data.shop_info.slideshow.length;i ++){
        car[i] = [str.data.shop_info.slideshow[i],str.data.shop_info.slideshow_url[i]|| "javascript:(0);" ]
      }
      var data = [
        car || null,
        str.data.hot_news || null,
        [
          host+str.data.shop_info.header_img,
          str.data.shop_info.shop_title,
          str.data.shop_info.look,
          str.data.shop_info.phone_number
        ] || null,
        str.data.new_goods || null,
        str.data.hot_goods || null,
        str.data.goods_list || null
      ];
      console.log(str);
      load(data);
    //返回数据处理完毕
    }else{

    }
  }
});

//内容加载
function load(data){
  //轮播位渲染开始:data[0]
  console.log(data);
  var conts = '',conts_ul='';
  if(data[0]){
    for(let i = 0;i<data[0].length;i++){
      conts_ul +='<li></li>';
      conts+='<a href="'+ data[0][i][1] +'"><img src="'+host+data[0][i][0]+'"/></a>';
    };
    $('.car_banner').html(conts);
    $('.car_tag').html(conts_ul);
    car_banner_style();//轮播初始化
    conts = '',conts_ul='';
  };
  
  //新闻轮播开始:data[1]
  if(data[1]){
  for(let i = 0;i<data[1].length;i++){
    conts += '<li class="info_item"><span>'+data[1][i].title+'</span><a href="./news.html?shop_id='+getstr('shop_id')+'&news_id='+data[1][i].id+'">查看详情 ></a></li>';
  };
  $('.info_cont').html(conts);
  conts = '';
  }
  //店铺简介开始:data[2]
  $('.shop_img').css({"background-image":"url("+data[2][0]+")"});//店铺头像
  $('.shop_name').text(data[2][1]);//店铺名称
  $('.shop_brow>span').text(data[2][2]);//店铺浏览量
  $('.tell_cont>div').text(data[2][3]);//店主电话显示
  $('.tell_cont>a').attr('href','tel:'+data[2][3]);//店主电话链接
  
  //新品推荐开始：data[3]
  if(data[3]){clou(data[3],"new_prod",4,'./class')};//新品推荐列表渲染函数

  //热门推荐开始：data[4]
  if(data[4]){clou(data[4],"sell_prod",4,'./class')};//热门商品列表渲染函数

  //全部产品开始：data[5]
  if(data[5]){clou(data[5],"all_prod",6,'./class')};//商品列表渲染函数
}
//固定链接设定
$(function(){
  //搜索链接
  $('#seek_aff').click(function(){
    let cont = $('#seek_inpu input').val();
    if(!cont){
      window.location.href="./class/prod_list.html?shop_id="+getstr("shop_id")+"&type=3&content="+encodeURI("全部商品");
    }else{
      window.location.href="./class/prod_list.html?shop_id="+getstr("shop_id")+"&type=6&content="+cont;
    }
  });
  
  $('#top_class').attr("href","./class/sorting.html?shop_id="+getstr("shop_id"));//分类链接
  //分类菜单链接开始
  $('.clas_entr_item').eq(0).attr("href","./class/class.html?shop_id="+getstr("shop_id")+"&class_name=墙布");
  $('.clas_entr_item').eq(1).attr("href","./class/class.html?shop_id="+getstr("shop_id")+"&class_name=墙纸");
  $('.clas_entr_item').eq(2).attr("href","./class/class.html?shop_id="+getstr("shop_id")+"&class_name=壁画");
  $('.clas_entr_item').eq(3).attr("href","./class/class.html?shop_id="+getstr("shop_id")+"&class_name=辅料");
  //新品更多链接
  $('.new_prod .prod_url').attr("href","./class/prod_list.html?shop_id="+getstr("shop_id")+"&type=1&content="+encodeURI("新品推荐"));
  //热销给更多链接
  $('.sell_prod .prod_url').attr("href","./class/prod_list.html?shop_id="+getstr("shop_id")+"&type=2&content="+encodeURI("热门产品"));
  //全部产品更多链接 
  $('.all_prod .prod_url').attr("href","./class/prod_list.html?shop_id="+getstr("shop_id")+"&type=3&content="+encodeURI("全部商品"));
  //店铺链接
  $('.nav_item').eq(1).attr("href","./Shop_data.html?shop_id="+getstr("shop_id"));
})




mouse_r(1);//允许使用鼠标右键
//info轮播
function info_car(){
  var info_list=1;
  setInterval(function(){
    if (info_list >= $('.info_item').length) {
      info_list=0;
    };
    $('.info_cont').css("margin-top",info_list*-30+"px")
    info_list++;
  },5000);
};
info_car();

//搜索页弹出
$("#top_seek").click(function(){
  $(".shop_seek").css("right","0px");
  $("body").css("overflow","hidden");
});
//搜索页收回
$("#seek_call").click(function(){
  $(".shop_seek").css("right","calc(-100%)");
  $("body").css("overflow","scroll");
  $('#seek_inpu input').val('');
});
//电话拨打弹出
$(".shop_tell").click(function(){
  $(".shop_tell_cont").css("display","block");
  $("body").css("overflow","hidden");
});
//电话拨打收回
$("#tell_cont>span").click(function(){
  $(".shop_tell_cont").css("display","none");
  $("body").css("overflow","scroll");
});


var width = $('.carousel').width();
$(window).resize(function(){
  width = $('.carousel').width();
  car_banner_style();
});//屏幕变动监控

window.onblur = function(e) {
  clearInterval(stop);
};//窗口失去焦点

window.onfocus = function() {
  car_script();
};//窗口获的焦点
