require(["./config"],function(){
    require(["jquery","swiper","goods","headfoot","masklayer","public"],function($,Swiper,Goods){
        var mySwiper = new Swiper ('.swiper-container', {
            //  direction: 'vertical', // 垂直切换选项
                loop: true, // 循环模式选项
                
                // 如果需要分页器
                pagination: {
                  el: '.swiper-pagination',
                  clickable :true,
                },
                
                // 如果需要前进后退按钮
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                },
                
                autoplay: {
                delay: 2000,
                stopOnLastSlide: false,
                disableOnInteraction: false,
                },
                
                effect: 'fade',
              }) 


        //调用goods.js的MakeGoods构造函数             
        new Goods(3,$(".goods:eq(0)"));
        new Goods(3,$(".goods:eq(1)"));

    })
})