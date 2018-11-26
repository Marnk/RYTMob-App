//商品详情页


//ajax获取商品详情内容
ajax({
  url:host+'/goodsInfo',
  type:'post',
  data:{
      goods_id:getstr('goods_id')
  },
  func:function(str){
    if(str.code ===0){
      var data = [
                str.data.switch_img||'', 
                str.data.goods_title||'',
                str.data.goods_info||'',
                str.data.Price||'',
                str.data.price_unit||'',
                str.data.colour||'',
                str.data.Product_specification||'',
                str.data.Model||'',
                str.data.Applicable_place||'',
                str.data.Texture_of_material||'',
                str.data.hierarchical_structureclass||'',
                str.data.content||'',
                str.data.vr_URL||''
      ];
      console.log(str);
      load_prod(data);
    }else{

    }
  }
});
//ajax获取店铺信息内容
ajax({
  url:host+'/api/shop_info',
  type:'post',
  data:{
    shop_id:getstr("shop_id")
  },
  func:function(str){
    if(str.code===0){
      var data = [str.data.header_img,str.data.shop_title,str.data.look,str.data.phone_number];
      console.log(data);
      load_shop(data);
    }else{

    }
  }
})
//商品信息加载函数
function load_prod(data){
  var contstr="",cont_ul="";
  //轮播加载开始
  if(data[0]!=''){
    for(let i=0;i<data[0].length;i++){
      cont_ul +="<li></li>";
      contstr+='<a href="javascript:(0);"><span style="background-image: url('+host+data[0][i]+');"></span></a>';
    };
  }else{
    contstr = '<h3 style="line-height:200px;text-align:center">该产品没有展示图哟</h3>';
    cont_ul='';
  };
  $('.car_banner').html(contstr);
  $('.car_tag').html(cont_ul);
  contstr="",cont_ul="";
  //轮播加载结束
  car_banner_style();//轮播初始化
  //商品信息加载
  $('.prod_name').text(data[1]);//商品名称
  $('.prod_act').text(data[2]);//活动资讯
  $('.prod_pric').text("￥"+data[3]+"/"+data[4]);//单价

  //型号颜色渲染开始
  if(data[5]!=''){
    colour = data[5].split('+');
    for(let i =0;i<colour.length;i++){
      contstr += '<a href="javascript:(0);">'+colour[i]+'</a>'
    };
  }else{
    contstr = ''
  };
  $('.prod_color_list').html(contstr);
  //型号颜色渲染结束
  $('.spec_cont').eq(0).text(data[6]);//产品规格
  $('.spec_cont').eq(1).text(data[7]);//产品型号
  $('.spec_cont').eq(2).text(data[8]);//适用场所
  $('.spec_cont').eq(3).text(data[9]);//材质
  $('.spec_cont').eq(4).text(data[10]);//层次结构：
  if(data[10]!="undefined"){
    $('#prod_cont_img').attr("src",host+data[11]);//商品详情图加载
  }else{
    $('.prod_cont>ma').html('');
  };
  console.log(data[12]);
  if(data[12]!=''){
    $('.class_nav_item2>a').attr("href",data[12]);//商品VR效果图链接
  }else{
    $('.class_nav_item2>a').attr("href",'javascript:alert("该商品暂无VR效果图！┭┮﹏┭┮")');
  }
  
};
//店铺信息加载函数
function load_shop(data){
  $('.shop_img').css({"background-image":"url("+host+data[0]+")"});//商铺logo加载
  $('.shop_name').text(data[1]);//店铺名字加载
  $('.shop_brow>span').text(data[2]);//店铺浏览量加载
  $('.class_nav_item1>a').eq(1).attr('href',"tel:"+data[3]);//联系电话
  $('.class_nav_item1>a').eq(0).attr('href','../Shop_data.html?shop_id='+getstr("shop_id"));//店铺详情链接
};

mouse_r(0);//允许使用鼠标右键

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
