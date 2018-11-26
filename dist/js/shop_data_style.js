//ajax提交

$(function(){
    $('.nav_item').eq(0).attr("href","./index.html?shop_id="+getstr("shop_id"));//首页链接
    
})
ajax({
    url:host+'/api/shop_info',
    type:'post',
    data:{
    shop_id:getstr('shop_id')
    },
    func:function(str){

    if (str.code === 0) {
        console.log(str);
        var data = str.data;
        $('.shop_show').css({'background-image':'url('+host+data.Signage+')'})//店铺招牌
        $('.shop_img').css({'background-image':'url('+host+data.header_img+')'});//店铺头像
        $('.shop_name').text(data.shop_title);//店铺名称
        $('.shop_brow>span').text(data.look)
        $('.shop_tell').attr("href","tel:"+data.phone_number);//联系电话
        $('.shop_intr').html(data.shop_info);//店铺描述
        $('.wechat_qr>img').attr("src",host+data.QR_code);//二维码
        //地图设置
        var infoWindow;
        var map = new AMap.Map("container", {
            resizeEnable: true,
            center: [data.longitude,data.dimensionality],//经纬度 前边多，后边少
            zoom: 15
        });
        //在指定位置打开信息窗体
        function openInfo() {
        //构建信息窗体中显示的内容
        var info = [];
        info.push("<div style=\"padding:4px 0px;max-width:200px;\"><b style='margin-bottom:15px;font-size:13px;'>"+data.shop_title+"</b>");
        info.push("电话 : "+data.phone_number+"      邮编 : "+data.postcode);
        info.push("地址 :"+data.site+"</div></div>");
        infoWindow = new AMap.InfoWindow({
            content: info.join("<br/>")  //使用默认信息窗体框样式，显示信息内容
        });
        infoWindow.open(map, map.getCenter());
        };
        openInfo();
        //地图设置结束

    }else{

    }
    }
});