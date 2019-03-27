require(["./config"],function(){
    require(["jquery","cookie","template","headfoot","masklayer","public","bootstrap"],function($,cookie,template){
        //购物车页面构造函数
        function Cart(){
            this.promptInfo();
             
        }

        //Cart构造函数的原型对象
        Cart.prototype={
            constructor: Cart,    //先写结构继承，防止以后需要使用

            //如果没有购物车cookie或购物车cookie为空，则隐藏表格，显示提示，如果有购物车cookie，则显示表格，隐藏提示
            promptInfo(){
                if((!($.cookie("shoppingCar")))||$.cookie("shoppingCar")=="[]"){
                    $(".empty").removeClass("hidden");
                    $(".not-empty").addClass("hidden");
                }else{
                    $(".empty").addClass("hidden");
                    $(".not-empty").removeClass("hidden");
                    this.showCarTable();
                }
            },
            
            //渲染购物车表格
            showCarTable(){
                //先获取购物车数组
                let goodsArr=JSON.parse($.cookie("shoppingCar"));
                console.log(goodsArr);
                let data={      //data必须是一个对象，goodArr必须是一个数组，才能传数据到html页面的template模板上
                    goodsArr:goodsArr,
                }
				// 如果有购物车数据
                let html = template("cart-template", data);     //id必须与html页面的template模板的id相对应
                $("tbody.cart-body").html(html);
                this.addEventListen();               
            },

            //绑定事件
            addEventListen(){
                $(".del").on("click",this.delGood.bind(this));
                $(".add").on("click",this.addGoods.bind(this));
                $(".minus").on("click",this.lessGoods.bind(this));
                $(".amount").on("blur",this.numBar.bind(this));
                $(":checkbox").on("click",this.check_Box.bind(this));
            },

            //删除按钮的点击事件
            delGood(event){
                //获取删除按钮所在的行,并删除此行
                event=event||window.event;
                //修改cookie
                //先获取id
                let delID= ($(event.target).parent().parent()).attr("data-id");
                //获取cookie,并删除这个id的cookie
                let goodsArr=JSON.parse($.cookie("shoppingCar"));
                goodsArr.forEach(function(ele,index){
                    if(ele.id==delID){
                        goodsArr.splice(index,1);
                    }

                }) 
                //将新商品信息传到cookie中
                $.cookie("shoppingCar",JSON.stringify(goodsArr),{expires: 7, path: "/"});
                //删除当前tr                
                ($(event.target).parent().parent()).remove();
                //打印现cookie
                // console.log($.cookie("shoppingCar"))
                //如果商品全部删完，则商品表格消失，购物提示出现
                if((!($.cookie("shoppingCar")))||$.cookie("shoppingCar")=="[]"){
                    $(".empty").removeClass("hidden");
                    $(".not-empty").addClass("hidden");
                }

            },

            //增加按钮
            addGoods(event){
                event=event||window.event;
                //修改数量显示
                let count=parseInt($(event.target).siblings(".amount").val())+1;
                ($(event.target).siblings(".amount")).val(count);
                //改变商品数量，修改cookie
                this.updateCookie(count);
               
            },

            //减少按钮
            lessGoods(event){
                event=event||window.event;
                //修改数量显示
                let count=parseInt($(event.target).siblings(".amount").val())-1;
                if(count<=1){
                    count=1;
                }
                ($(event.target).siblings(".amount")).val(count);
                //改变商品数量，修改cookie
                this.updateCookie(count);
               
            },           
            
            //数量输入框失去焦点
            numBar(event){
                event=event||window.event;
                //判断输入的是否为数字或是否大于1，如果不符合条件，则设置输入框值为1 
                let  r = /^\+?[1-9][0-9]*$/;
                if(!(r.test($(event.target).val()))||parseInt($(event.target).val())<=1){
                    $(event.target).val(1);
                }
                let count=$(event.target).val();
                //改变商品数量，修改cookie
                this.updateCookie(count);
            },


            //改变商品数量，修改cookie
            updateCookie(count){
                //修改小计
                let sub=$(event.target).parent().parent().siblings(".sub");
                sub.text((count*parseInt(sub.siblings(".goodPrice").text())).toFixed(2))
                //修改cookie
                let nowID=($(event.target).parent().parent().parent()).attr("data-id");
                //获取cookie,并修改这个id的cookie
                let goodsArr=JSON.parse($.cookie("shoppingCar"));
                let eleindex;
                goodsArr.forEach(function(ele,index){
                    if(ele.id==nowID){
                        eleindex=index;
                    }

                })
                goodsArr[eleindex].num=count;
                //将新商品信息传到cookie中
                $.cookie("shoppingCar",JSON.stringify(goodsArr),{expires: 7, path: "/"}); 
            },


            //复选框的全选和多选
            check_Box(event){
                event=event||window.event;
                //如果点击的是全选按钮
                if($(event.target).attr("class")=="chk_all"){
                    if(!$(event.target).attr("checked")){
                        //如果之前没有勾起全选按钮，则勾上全选，并且其他的复选框也被选中
                        $("input[type='checkbox']").attr("checked",true); 
                        console.log(1)
                    }else{
                        //如果之前勾起了全选，则取消全选选项框的checked属性
                        $("input[type='checkbox']").removeAttr("checked");
                        console.log(2)
                    }
                        //如果点击的是商品选项框
                }else if($(event.target).attr("class")=="chk_prod"){
                    //如果点击之前商品选项框是在选中界面，则点击时，删除checked属性并取消全选按钮的checked
                    if($(event.target).attr("checked")){
                        $(event.target).removeAttr("checked");
                        if($(".chk_all").attr("checked")){
                            $(".chk_all").removeAttr("checked");
                        }
                    }else{//如果点击之前商品选项框是在未选中界面，则点击时，增加checked属性，并且如果点击该商品，所有的商品都被选择了，那就增加全选选项框的checked
                        $(event.target).attr("checked","true"); 
                        if($("input[type='checkbox']:checked").length==$("input[class='chk_prod']").length){
                            $(".chk_all").attr("checked","true");
                        }
                    }
                }
            },













        }

        new Cart();     //创建购物车页对象

    })
})