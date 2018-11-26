/**
 * *******class_js
 */
ajax({
    url : host+'/goodsClassList',
    type : 'post',
    data : {
        shop_id : getstr('shop_id'),
    },
    func:(str)=>{
        if(str.code === 0 && str.data){
            let data = str.data,cont,type_cont = [];
            for (let i = 0; i < data.class.class.length; i++) {
                if(data.class.class[i] == getstr("class_name")){
                    cont  = data.class.type[i];
                    for (let a = 0; a < cont.type1_cont.length; a++) {
                        type_cont[a] = [cont.type1_cont[a],cont.type1_img[a]]
                    }
                }
            }
            cont = '';
            for (let a = 0; a < type_cont.length; a++) {
                cont += '<div class="prod_item"><a href="./prod_list.html?shop_id='+getstr("shop_id")+'&type=5&class='+getstr("class_name")+'&type1='+type_cont[a][0]+'&type2=" class="prod_item_cont"><div style="background-image: url('+host+type_cont[a][1]+')" class="prod_item_img"></div><span class="prod_item_title">'+type_cont[a][0]+'系列</span></a></div>'             
            }
            $('.class_cont').html(cont);
        }

        console.log(str);
    }
})


$(function(){
    $('.prod_head>div').text(getstr("class_name")+ '分类')
    $('.nav_item').eq(0).attr("href","../index.html?shop_id="+getstr("shop_id"));//首页链接
    $('.nav_item').eq(1).attr("href","../Shop_data.html?shop_id="+getstr("shop_id"));//店铺链接
})