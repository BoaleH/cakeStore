require(["./config"],function(){
    require(["jquery","cookie","elevateZoom","swiper","headfoot","masklayer","public","fly"],function($,cookie,elevateZoom,Swiper){
        //详情页构造函数
        function Det(){
            this.Rendering();
        }
        //Del构造函数的原型对象
        Det.prototype={
            constructor: Det,    //先写结构继承，防止以后需要使用

            //根据url的查询字符串id，通过ajax获取数据渲染页面
            Rendering(){
                //获取当前url
                const url=window.location.href;
                //获取当前商品ID
                const goodID=url.split("=")[1];
                //发送postAjax请求
                $.ajax({
                    type: "get",
                    url: "http://rap2api.taobao.org/app/mock/126860/goodslist",
                    data: `id=${goodID}`,
                    dataType: "json",
                    success:  (response)=> {
                        let detailObj;
                        let  arr=response.res_body.list;
                        for (let index in arr) {
                            if(arr[index].id==goodID){
                                detailObj=arr[index];
                            }
                        }
                        console.log(detailObj);
                        // $(".gr-top").attr("src",detailObj.topImg);
                        $(".txjgr").text(detailObj.price);
                        $(".gr-top-img").attr("src",detailObj.detail.topImg)
                        $(".tx").text(detailObj.title);
                        //详情图片动态渲染
                        $(".detailImg:eq(0)").attr("src",detailObj.detail.big[0]["big-img"]);
                        $(".detailImg:eq(1)").attr("src",detailObj.detail.big[1]["big-img"]);
                        $(".detailImg:eq(2)").attr("src",detailObj.detail.big[2]["big-img"]);
                        //轮播图动态渲染
                        $("#middleImg").attr("src",detailObj.detail.middle[0]["middle-img"]);
                        $("#middleImg").attr("data-zoom-image",detailObj.detail.bigLun[0].bigLunImg);
                        $("#smallImg1").attr("data-image",detailObj.detail.middle[0]["middle-img"]);
                        $("#smallImg1").attr("data-zoom-image",detailObj.detail.bigLun[0].bigLunImg);
                        $("#smallImg2").attr("data-image",detailObj.detail.middle[1]["middle-img"]);
                        $("#smallImg2").attr("data-zoom-image",detailObj.detail.bigLun[1].bigLunImg);
                        $("#smallImg3").attr("data-image",detailObj.detail.middle[2]["middle-img"]);
                        $("#smallImg3").attr("data-zoom-image",detailObj.detail.bigLun[2].bigLunImg);
                        $("#smallImg4").attr("data-image",detailObj.detail.middle[3]["middle-img"]);
                        $("#smallImg4").attr("data-zoom-image",detailObj.detail.bigLun[3].bigLunImg);
                        $(".small1").attr("src",detailObj.detail.small[0]["small-img"]);
                        $(".small2").attr("src",detailObj.detail.small[1]["small-img"]);
                        $(".small3").attr("src",detailObj.detail.small[2]["small-img"]);
                        $(".small4").attr("src",detailObj.detail.small[3]["small-img"]);
                        this.Carousel();
                        this.AddEvent();
                    }
                });
            },
            Carousel(){
                $(".middle").elevateZoom({		

                        //下部有缩略图的放大镜
                        gallery:'small', 		//缩略图的类名，与div类名一致
                        cursor: 'pointer', 
                        galleryActiveClass: "active", 
                        // loadingIcon: "http://www.elevateweb.co.uk/spinner.gif",			//可以省略
                        imageCrossfade: true, 
                        scrollZoom : true
                          })
            },
            //绑定事件
            AddEvent(){
                $(".l1").on("click",this.specification_size.bind(this));
                $(".l2").on("click",this.specification_tableware.bind(this));
                $(".jia").on("click",this.add.bind(this));
                $(".jian").on("click",this.less.bind(this));
                $(".liang").on("blur",this.writeIn.bind(this));
                $("#addCar").on("click",this.addCart.bind(this));
            },
            //规格的选择
            specification_size(event){
                event=event||window.event;
                $(".m1").text($(event.target).text());
            },
            specification_tableware(event){
                event=event||window.event;
                $(".m2").text($(event.target).text());
            },
            //数量的加
            add(){
                let num=parseInt($(".liang").val()) ;
                num+=1;
                $(".liang").val(num);
            },
            //数量的减
            less(){
                let num=$(".liang").val();
                
                if(num<=0){
                    num==0;
                }else{
                    num-=1;
                }
                $(".liang").val(num);
            },
            writeIn(){
                // console.log(typeof($(".liang").val()))
                let  r = /^\+?[1-9][0-9]*$/;
                if(!(r.test($(".liang").val()))){
                    $(".liang").val(0);
                }
            },
            //加入购物车按钮的点击事件
            addCart(){
                this.goodsFly();
                this.shopCookie();
            },
            //购物车抛物线
            goodsFly(){
                // 添加抛物线效果,利用jQuery插件fly

                const _end = $(".sCar").offset();   //设定抛物线终点
                //每点击一次添加购物车，动态生成一个红点元素来展示抛物线效果
				const flyer = $(`<div style="width:10px; height: 10px; background-color:red; border-radius:50%;"></div>`);
				flyer.fly({
					start: {      //抛物线起始位置
						left: event.pageX - $(window).scrollLeft(),
						top: event.pageY - $(window).scrollTop()
					},
					end: {        //抛物线终点位置
						left: _end.left - $(window).scrollLeft(),
						top: _end.top - $(window).scrollTop()
					},
					onEnd: function() {
						this.destroy();     //当红点元素飞到购物车位置，删除红点元素
					}
                });
            },
            
            //存购物车cookie
            shopCookie(){
                //获取当前url
                const url=window.location.href;
                //获取当前商品ID
                const goodID=url.split("=")[1];
                
                //存cookie
                //如果没有shopcar的cookie
                if(!$.cookie("shoppingCar")){

                    //创建商品对象
                    let goods=[{
                        id:goodID,
                        img:$(".small1").attr("src"),
                        price:$(".txjgr").text(),
                        num:parseInt($(".liang").val()) ,
                        title:$(".tx").text(),
                    }];
                    goods=JSON.stringify(goods);
                    $.cookie("shoppingCar",goods,{expires: 7, path: "/"});
                    
                }else{      //如果cookie中有购物车cookie
                    let goodsArr=JSON.parse($.cookie("shoppingCar"));
                    //创建一个判断变量，看看循环后是否有同类商品，如果没有同类商品，则在数组末尾追加商品
                    let arrJudge=0;
                    //先循环数组，看看是否有同id的商品
                    goodsArr.forEach(function(ele){
                        if(ele.id==goodID){
                            ele.num+=parseInt($(".liang").val()) ;
                            arrJudge=1;
                        }
                    })
                    //如果循环后购物车cookie没发现有同类商品
                    if(arrJudge==0){
                        let newGood={
                            id:goodID,
                            img:$(".small1").attr("src"),
                            price:$(".txjgr").text(),
                            num:parseInt($(".liang").val()),
                            title:$(".tx").text(),
                        };
                        goodsArr.push(newGood);
                    }
                    //将商品信息传到cookie中
                    $.cookie("shoppingCar",JSON.stringify(goodsArr),{expires: 7, path: "/"});
                }
                // console.log($.cookie("shoppingCar"))
            }

        }
        


        new Det();  //创建详情页对象
    })
})