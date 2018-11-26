/**
 * 新闻页面js
 */
ajax({
    url : host+'/api/news',
    type : 'get',
    data : {
        shop_id : getstr('shop_id'),
        news_id : getstr('news_id')
    },
    func:(str)=>{
        $('.news_cont').html(str.data.content)
        console.log(str);
    }
})
$(function(){
    $('.nav_item').eq(0).attr("href","./index.html?shop_id="+getstr("shop_id"));//首页链接
    $('.nav_item').eq(1).attr("href","./Shop_data.html?shop_id="+getstr("shop_id"));//店铺链接
})