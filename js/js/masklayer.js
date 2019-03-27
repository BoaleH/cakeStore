define(["jquery","cookie"],function($,cookie){
    function Mask(){
        this.addEvent();        //调用事件监听        
    }
    Mask.prototype={
        //事件监听
        addEvent(){
            this.insertMaskLayer();
        },

        //插入遮罩层
        insertMaskLayer(){
            $.ajax({
                type: "get",
                url: "/Nhaolilai/html/mask-layer.html",
                data: "",
                dataType: "html",
                success: function (response) {
                    //将遮罩层加载到DOM树
                    $("body").prepend(response);
                    //判断是否有地址cookie，决定遮罩层是否显现
                    if($.cookie("nowAddress")){
                        $(".mask-layer").css("display","none");
                    }else{
                        $(".mask-layer").css("display","block");
                    }
                    //给每一个城市绑定点击事件
                    $(".changeCity").on("click",function(event){
                        $("#chushiCity").text($(event.target).text());
                        $(".newProvince").css("display","none");
                    })
                    //鼠标放到城市按钮，出现城市列表
                    $("#chushiCity").on("mouseenter",function(){
                        $(".newProvince").css("display","block");
                        
                    })
                    //鼠标离开城市列表，城市列表消失
                    $(".newProvince").on("mouseleave",function(){
                        $(".newProvince").css("display","none");
                    })
                    //点击确定进入按钮，遮罩层消失，cookie改变，当前地点改变
                    $(".address-sel-btn").on("click",function(){
                        $(".mask-layer").css("display","none");
                        $.cookie("nowAddress",$("#chushiCity").text(),{expires: 7, path: "/"});
                        $("#now-address").text($("#chushiCity").text());
                    })
                    //点击now-address，遮罩层出现
                    $("#now-address").on("click",function(){
                        $(".mask-layer").css("display","block");
                    })
                }
            });
        },




    }
    new Mask();
});