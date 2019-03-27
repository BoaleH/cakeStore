require(["./config"],function(){
    require(["jquery","cookie","headfoot","masklayer","public"],function($,cookie){
        function Login(){
            this.addEvent();
        }
        Login.prototype={
            constructor: Login,    //先写结构继承，防止以后需要使用
            addEvent(){
                $("#dbtn").on("click",this.verifyPassword);
            },


        //验证密码是否正确
        verifyPassword(event){
            event=event||window.event;
            $.ajax({
                type: 'get',
                url: '/Nhaolilai/php/login.php',
                dataType: 'json',
                data: {
                    
                    "phoneNumber": $("#phoneNumber").val(),
                    "pword": $("#pword").val(),
            
                },
                success:function(result){
                    if(result==1){
                        alert("登录成功");
                        //登录成功，修改本地cookie以存储用户名
                        $.cookie("username",$("#phoneNumber").val(),{expires: 7, path: "/"});
                        window.location.href="/Nhaolilai/index.html";
                    }else{
                        alert("登录失败");
                    }
                }                
            })            
        },


        }

        

        new Login()
    })
})