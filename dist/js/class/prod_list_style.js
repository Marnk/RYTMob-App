/*prod样式*/
  function prod_cont_tag(){
    $('.prod_cont_tag>span').click(function(){
      $('.prod_cont_tag>span').attr("id","");
      $(this).attr("id","prod_cont_tag_sele");
      if ($(this).index()==3) {
        $(".prod_scre_tag").css({"right":"0px"});
        $(".prod_cont").css({"display":"none"});
      };
      if ($(this).index()==2) {
      };
    });
  };
  prod_cont_tag();
  $(".prod_cont_tag>span").eq(2).toggle(
    function(){
     $("#prod_cont_tag_sele>img").css({"transform":"rotate(90deg)"});
    },function(){
     $("#prod_cont_tag_sele>img").css({"transform":"rotate(-90deg)"});
    }
  )
  // //标签背景转换
  // function tag_tog(){
  //   $(".item_cont_tag>li").toggle(
  //     function(){
  //       $(this).css({"background-color":"#ff643d","color":"#ffffff"});
  //     },function(){
  //       $(this).css({"background-color":"#f5f5f5","color":"#787878"});
  //     }
  //   );
  // };
  // tag_tog();
  // //重置设置
  // $(".clas_nav>span").eq(0).click(function(){
  //   $(".item_cont_tag>li").css({"background-color":"#f5f5f5","color":"#787878"});
  //   tag_tog();
  // });
  // $(".clas_nav>span").eq(1).click(function(){
  //   $(".prod_scre_tag").css({"right":"-100%"});
  //   $(".prod_cont").css({"display":"block"});
  // });
  // $(".prod_scre_tag>.prod_head>a").click(function(){
  //   $(".prod_scre_tag").css({"right":"-100%"});
  //   $(".prod_cont").css({"display":"block"});
  // });
  //ajax开始
  ajax({
    url:host+"/goods_List",
    type:"post",
    data:{
      shop_id:getstr("shop_id"),
      type:getstr("type"),
      content:getstr("content"),
      class:getstr("class"),
      type1:getstr("type1"),
      type2:getstr("type2")
    },
    func:function(str){
     if(str.code === 0){
       console.log(str.data)
       
      var data = str.data;
      clou(data,"prod_cont",8,'.');//商品列表渲染函数
      if (data.length===0){
        $('.prod_load').text("您要查询的内容没有哟！ (｡･ω･｡)")
      }
     }else{

     }
    }
  });
  //固定链接设置
  $(function(){
    var content = '';
    switch(decodeURI(getstr("content"))){
      case '全部商品':
        content = '全部商品';
      break;
      case '新品推荐':
        content = '新品推荐';
      break;
      case '热门产品':
        content = '热门产品';
      break;
      case '墙布':
        content = '墙布';
      break;
      case '墙纸':
        content = '墙纸';
      break;
      case '壁纸':
        content = '壁纸';
      break;
      case '辅料':
        content = '辅料';
      break;
      default:
        content = '搜索结果';    
    }
    $('#prod_title').text(content);
    $('.nav_item').eq(0).attr("href","../index.html?shop_id="+getstr("shop_id"));//首页链接
    $('.nav_item').eq(1).attr("href","../Shop_data.html?shop_id="+getstr("shop_id"));//店铺链接
  });