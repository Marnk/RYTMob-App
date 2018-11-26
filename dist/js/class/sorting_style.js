/*class页面的样式*/

//ajax加载渲染
ajax({
  url:host+'/goodsClassList',
  type:'post',
  data:{
      shop_id:getstr('shop_id')
  },
  func:function(str){
    if(str.code === 0){
      var data = str.data.class;
      console.log(data);
      var conts = '';
      for(let i =0;i<data.class.length;i++){
        var cont_n1='',cont_n2='';
        //1小分类
        for(let b=0;b<data.type[i].type1_cont.length;b++){
          cont_n1+='<li data_type="type1_cont">'+data.type[i].type1_cont[b]+'</li>';
        };
        cont_n1 = '<div class="clas_item_cont"><div class="item_cont_head">'+data.type[i].type[0]+'</div><ul class="item_cont_tag">'+cont_n1+'</ul></div>';
        //2小分类

        for(let c=0;c<data.type[i].type2_cont.length;c++){
          cont_n2+='<li data_type="type2_cont">'+data.type[i].type2_cont[c]+'</li>';
        };
        cont_n2 = '<div class="clas_item_cont"><div class="item_cont_head">'+data.type[i].type[1]+'</div><ul class="item_cont_tag">'+cont_n2+'</ul></div>';

        //汇总
        conts+='<div class="clas_item"><div class="clas_cont_head"><span class="clas_item_title">'+data.class[i]+'商品</span><span class="clas_item_right_tag" style="transform:rotate(90deg);"></span></div><div class="clas_cont">'+cont_n1+cont_n2+'</div></div>';
      };
      $('.clas_list').html(conts);//渲染
      conts = '';
    }else{

    };
    style();
  }
})
function style(){

//下拉图标转换
$(".clas_cont_head").toggle(
  function(){
    $(this).children().eq(1).css({"transform":"rotate(0deg)"});
    $(this).next(".clas_cont").css('height','0');
  },function(){
    $(this).children().eq(1).css({"transform":"rotate(90deg)"});
    $(this).next(".clas_cont").css('height','100%');
  }
);
  //标签背景转换
  var type = [];
  $(".item_cont_tag>li").click(function(){

      if(!type[0]){
        type[0] = [$(this).text(),$(this).attr('data_type')];
        $(this).css({"color":"#ffffff","background-color":"#ff643d"});
        type[1] = $($(this).parent().parent().parent().siblings().children()).eq(0).text();
      }else{
        var temp = $(this).parent().parent().siblings().children().children();
        var yo;
        for(let i=0;i<temp.length;i++){
          if(type[0][0]===$(temp[i]).text()){
            type[2]=$(this).text();
            $($(this).parent().children()).css({"color":"#787878","background-color":"#f5f5f5"});
            $(this).css({"color":"#ffffff","background-color":"#ff643d"});
            yo = 'no';
          };
        };
        for(let i=0;i<temp.length;i++){
          if(type[2]==$(temp[i]).text()){
            type[0]=[$(this).text(),$(this).attr('data_type')];
            $($(this).parent().children()).css({"color":"#787878","background-color":"#f5f5f5"});
            $(this).css({"color":"#ffffff","background-color":"#ff643d"});
            yo = 'no';
          };
        };

        if(yo!=='no'){
          type = [];
          $('.item_cont_tag>li').css({"color":"#787878","background-color":"#f5f5f5"});
          type[0] = [$(this).text(),$(this).attr('data_type')];
          $(this).css({"color":"#ffffff","background-color":"#ff643d"});
          type[1] = $($(this).parent().parent().parent().siblings().children()).eq(0).text();
          yo='';
        };

      };
      console.log(type);
  });
  //重置设置
  $(".clas_nav>span").eq(0).click(function(){
    type = [];
    $(".item_cont_tag>li").css({"background-color":"#f5f5f5","color":"#787878"});
   
  });
  $(".clas_nav>span").eq(1).click(function(){
    if(!type[2]){
      type[2]='';
    };
    var type1 = type[0][1] == 'type1_cont'? type[0][0]:type[2];
    var type2 = type[0][1] == 'type2_cont'? type[0][0]:type[2];
    var clas = type[1].substring(0,type[1].length-2);;
    window.location.href="./prod_list.html?shop_id="+getstr("shop_id")+"&type=5&class="+clas+"&type1="+type1+"&type2="+type2;
  })
};

//链接设定
$(function(){


  $('.clas_item').eq(0).attr('href','./prod_list.html?shop_id='+getstr("shop_id")+'&type=3&content='+encodeURI("全部商品"));
})