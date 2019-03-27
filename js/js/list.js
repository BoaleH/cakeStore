require(["./config"],function(){
    require(["jquery","goods","headfoot","masklayer","public"],function($,Goods){
        //调用goods.js的MakeGoods构造函数
        new Goods(18,$(".goods:eq(0)"));
        new Goods(18,$(".goods:eq(0)"));
        // var nowGoodsIndex=35;
        //懒加载    
        $(window).scroll(function(){
            //如果滚动条到达了页面底部
            if($(document).scrollTop()>=($(document).height()-$(window).height())){
                //继续加载商品
                //将当前加载了的商品下标增加
                // nowGoodsIndex+=18;
                // console.log(nowGoodsIndex);
                new Goods(18,$(".goods:eq(0)"),"_bottom");
            }
        })
    })
})