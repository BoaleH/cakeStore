require(["./config"],function(){
    require(["jquery","cookie","headfoot","masklayer","public"],function($,cookie){
        //创建注册对象
        function Regis(){
        this.addEvent(); 
        }
        //给Regis原型赋值，便于继承 prototype是一个对象
        Regis.prototype={
            constructor: Regis,    //先写结构继承，防止以后需要使用
            //添加事件监听
            addEvent:function(){
                //点击图片验证码，生成图片
                $("#verificationCodeImg").on("click",this.getverificationCodeImg);
                //验证码输入框失去焦点，验证验证码
                $("#verificationCode").on("blur",this.promptverificationCodeImg);
                //用户名输入框失去焦点，判断用户名是否重复
                $("#phoneNumber").on("blur",this.promptUserName);
                //确认密码输入框失去焦点，验证两次输入的密码是否正确
                $("#qpword").on("blur",this.promptPassword);
                //点击提交按钮，提交表单到后台
                $("#zcbtn").on("click",this.submiRegister);
            },
            
            //验证图片的点击事件回调函数,生成图片
            getverificationCodeImg(event){          //es6对象方法的写法，相当于getverificationCodeImg:function(event){}
                event=event||window.event;
                $.ajax({
                    type: 'post',
                    url: 'http://route.showapi.com/932-2',
                    dataType: 'json',
                    data: {
                        
                        "showapi_appid": '87503', //这里需要改成自己的appid
                        "showapi_sign": '7c4c12affa48472d946abb28911e9751',  //这里需要改成自己的应用的密钥secret
                        "length":"4",
                        "specials":"false"
                
                    },
                
                    error: function(XmlHttpRequest, textStatus, errorThrown) {
                        alert("操作失败!");
                    },
                    success: function(result) {
                        $("#verificationCodeImg").attr("src",result.showapi_res_body.image);
                        //自定义图片验证码的sid属性
                        $("#verificationCodeImg").attr("sid",result.showapi_res_body.sid);
                    }
                });
            },

            //验证图片验证码
            promptverificationCodeImg(event){
                event=event||window.event;
                $.ajax({
                    type: 'post',
                    url: 'http://route.showapi.com/932-1',
                    dataType: 'json',
                    data: {
                        "showapi_appid": '87503', //这里需要改成自己的appid
                        "showapi_sign": '7c4c12affa48472d946abb28911e9751',  //这里需要改成自己的应用的密钥secret
                        "checkcode":$("#verificationCode").val(),
                        "sid":$("#verificationCodeImg").attr("sid"),
                
                    },
                
                    error: function(XmlHttpRequest, textStatus, errorThrown) {
                        alert("操作失败!");
                    },
                    success: function(result) {
                        if(result.showapi_res_body.valid){
                            $("#verificationCodePrompt").text("验证码正确");
                        }else{
                            $("#verificationCodePrompt").text("验证码错误");
                        }
                        
                        
                    }
                });
                       
            },
            
            //验证用户名是否重复
            promptUserName(event){
                event=event||window.event;
                $.ajax({
                    type:"get",
                    url:"/Nhaolilai/php/check.php",
                    dataType:"json",
                    data:{
                        "phoneNumber":$("#phoneNumber").val(),

                    },
                    error: function(XmlHttpRequest, textStatus, errorThrown) {
                        alert("操作失败!");
                    },
                    success: function(result) {
                        // console.log(result);

                        if(result.data.length==0||$("#phoneNumber").val()!=result.data[0].username){
                            //判断用户名是否重复
                            //如果不重复，判断格式
                            if(!(/^1[34578]\d{9}$/.test($("#phoneNumber").val()))){
                                $("#lengthPrompt").text("用户名格式错误");
                                $("#repeatPrompt").text("用户名不可用");
                            }else{
                                $("#repeatPrompt").text("用户名可用");
                                $("#lengthPrompt").text("用户名格式正确");
                            }
                            
                        }else{
                            $("#repeatPrompt").text("用户名重复");
                            this.judge=0
                        }
                    }
                })
            },
            //验证密码是否正确
            promptPassword(event){
                if($("#pword").val()==$("#qpword").val()){
                    $("#mimatishi").text("密码正确");
                }else{
                    $("#mimatishi").text("密码错误");
                }
            },

            //点击注册按钮，提交表单
            submiRegister(event){
                console.log($("#cbox").is(":checked"));
                if($("#cbox").is(":checked")){
                    $.ajax({
                    type:"get",
                    url:"/Nhaolilai/php/register.php",
                    dataType:"json",
                    data:{
                        "phoneNumber":$("#phoneNumber").val(),
                        "pword":$("#pword").val(),
                    },
                    success:function(result){
                        if(result==1){
                            window.location.href="/Nhaolilai/html/login.html";
                        }
                    }
                    })
                }else{
                    alert("信息输入有误");
                }
            },    


        }

        new Regis();
    })
})