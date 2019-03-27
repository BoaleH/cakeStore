define(["jquery","cookie"],function($,cookie){
    function Pub(){
        this.addEvent();
    }

    //创建构造函数Pub的原型，以实现继承
    Pub.prototype={
        constructor: Pub,    //先写结构继承，防止以后需要使用

        //事件监听
        addEvent(){         //ES6的对象方法写法，相当于addEvent:function(){}
            
            //DOM结构加载完毕的时候，改变用户名状态
            $(document).ready(this.getUnameCookie);
            $("#logout").on("click",this.logoutEvent);
        },

        //获取用户名cookie,改变注册登录用户名注销状态
        getUnameCookie(event){
            event=event||window.event;
            if($.cookie("username")){
                //如果用户名cookie存在，注册/登录按钮消失，用户名和注销按钮显现
                $("#loginLink").css("display","none");
                $("#registerLink").css("display","none");
                $("#loginName").css("display","block");
                $("#logout").css("display","block");
                $("#loginName").text($.cookie("username"));
            }else{
                //如果用户名cookie不存在，注册/登录按钮显现，用户名和注销按钮消失
                $("#loginLink").css("display","block");
                $("#registerLink").css("display","block");
                $("#loginName").css("display","none");
                $("#logout").css("display","none");
            }
        },

        //点击注销按钮，删除用户名cookie
        logoutEvent(){
            event=event||window.event;
            $.cookie("username","",{expires: -1, path: "/"});
            $("#logout").css("display","none");
        },

        



    }


    new Pub();
})