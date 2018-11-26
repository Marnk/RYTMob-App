
var host = "http://47.100.124.89";//主机地址设置
///公共ajax插件
function ajax(astr){
  var xml= window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  astr.data = JSON.stringify(astr.data).replace( /\{/g,"");
  astr.data = astr.data.replace( /\}/g,"");
  if (astr.data !== "") {
    astr.data = astr.data.replace( /\:/g,"=");
    astr.data = astr.data.replace( /\,/g,"&");
    astr.data = astr.data.replace( /\"/g,"");
  };
  if (astr.type == "get") {
    if (astr.data !== "") {
      astr.url = astr.url + "?" + astr.data;
    };
    xml.open("GET",astr.url,true);
    xml.send();
  }else if(astr.type == "post"){
    xml.open('post',astr.url);
    xml.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xml.send(astr.data);
  };
  xml.onreadystatechange=function(){
    if (xml.readyState==4 && xml.status==200){
      astr.func.call(this,JSON.parse(xml.responseText));
    };
  }
};

//--------使用说明：
//-----ajax({
//        url :"",   //请求链接
//        type:"",   //请求方式(get\post)
//        data:{
//
//               发送内容：以对象方式
//        },
//        func:function(str){
//                  //接收内容(str)
//        }
//     };)

//url地址get值获取
function getstr(name){
  var t = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var n = window.location.search.substr(1).match(t);
  return n != null ? decodeURI(n[2]) : 0;
}

//产品列表渲染调用函数
function clou(data,class_id,n,uhost) {
  if(n <= 4){
    let datastr=[];
    if(data.length>4){
      for(let i = 0;i<4;i++){
        datastr[i] = data[i];
      };
    }else{
      for(let i = 0;i<data.length;i++){
        datastr[i] = data[i];
        datastr[i].price_unit = data[i].price_unit || '㎡';
      };
    };
    temp(datastr,class_id);
  }else{
    let datastr = [];
    if(data.length>n){
      for(let i =0;i<n;i++){
        datastr[i] = data[i];
        datastr[i].price_unit = data[i].price_unit || '㎡';
        data[i].price_unit = datastr[i].price_unit;
      };
      //下拉到底部弹出更多
      var totalHeight = 0,x = n,y=2; 
      function ata(){ //loa动态加载数据
        totalHeight =  parseFloat( $(window).height() ) +  parseFloat( $(window).scrollTop() ); //浏览器的高度加上滚动条的高度
        if ( $(document).height() <= totalHeight ) { //当文档的高度小于或者等于总的高度时，开始动态加载数据
          if(class_id=='prod_cont'){
            var conts= $(".prod_cont").html();//获取渲染的html
          }else{
            var conts= $(".all_prod>.prod_cont").html();//获取渲染的html
          };
          if(n <= parseInt(data.length/y)){
            
            x+=n;
            for (let i = (x-n);i<x;i++){
              conts += '<div class="prod_item"><a href="'+uhost+'/prod_item.html?shop_id='+getstr("shop_id")+'&goods_id='+data[i].id+'" class="prod_item_cont"><div style="background-image: url('+host+data[i].main_img+')" class="prod_item_img"></div><span class="prod_item_title">'+data[i].goods_title+'</span><span class="prod_item_price">￥'+data[i].Price+'/'+data[i].price_unit+'<span class="prod_item_brow">'+data[i].click+'人浏览</span><span class="prod_item_tag"></span></span></a></div>';
            };
             //判断渲染标签
            if(class_id == "prod_cont"){
              $(".prod_cont").html(conts);
            }else{
              $("."+class_id+">.prod_cont").html(conts);
            }
            y+=1;
          }else if(x<data.length){
            x += data.length%n;
            for (let i = (x-(data.length%n));i<x;i++){
              data[i].price_unit = data[i].price_unit || '㎡'
              conts += '<div class="prod_item"><a href="'+uhost+'/prod_item.html?shop_id='+getstr("shop_id")+'&goods_id='+data[i].id+'" class="prod_item_cont"><div style="background-image: url('+host+data[i].main_img+')" class="prod_item_img"></div><span class="prod_item_title">'+data[i].goods_title+'</span><span class="prod_item_price">￥'+data[i].Price+'/'+data[i].price_unit+'<span class="prod_item_brow">'+data[i].click+'人浏览</span><span class="prod_item_tag"></span></span></a></div>';
            };
            //判断渲染标签
            if(class_id == "prod_cont"){
              $(".prod_cont").html(conts);//商品列表渲染
            }else{
              $("."+class_id+">.prod_cont").html(conts);//首页商品列表渲染
            };

          }else{
            $('.prod_load').text('都加载完了 ヾ(๑╹◡╹)ﾉ"ヾ(๑╹◡╹)ﾉ"ヾ(๑╹◡╹)ﾉ')
          };
        };
      };
      $(window).scroll(function(){
        ata();
      });
      //下拉弹出更多结束
    }else{
      for(let i =0;i<data.length;i++){
        datastr[i] = data[i];
        datastr[i].price_unit = data[i].price_unit || '㎡';
      };
    }
    temp(datastr,class_id);
  };
  function temp(datastr,class_id){
    var conts = '';
    for (let i = 0;i<datastr.length;i++){
      conts += '<div class="prod_item"><a href="'+uhost+'/prod_item.html?shop_id='+getstr("shop_id")+'&goods_id='+datastr[i].id+'" class="prod_item_cont"><div style="background-image: url('+host+datastr[i].main_img+')" class="prod_item_img"></div><span class="prod_item_title">'+datastr[i].goods_title+'</span><span class="prod_item_price">￥'+datastr[i].Price+'/'+data[i].price_unit+'<span class="prod_item_brow">'+data[i].click+'人浏览</span><span class="prod_item_tag"></span></span></a></div>';
    };
    //判断渲染标签
    if(class_id == "prod_cont"){
      $(".prod_cont").html(conts);
    }else{
      $("."+class_id+">.prod_cont").html(conts);
    };
  };
};


