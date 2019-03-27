    /* 定义模块，加载头部与尾部，实现资源复用 */
    define(["jquery","cookie"], function($,cookie) {			//整个jQuery函数也是支持AMD规范的，其内部也有define函数，返回整个jQuery函数库并作为参数传到依赖js的callback上，
        //所以模块定义依赖jQuery函数库的，在define的callback内可以使用jQuery方法

    // 构造函数
    function HeaderAndFooter() {
    // 初始化
    this.init();
    }
    // 原型方法
    HeaderAndFooter.prototype = {			//便于原型链继承
    constructor: HeaderAndFooter,
    // 初始化
    init() {							//es6的对象属性/方法写法，相当于 init:function(){}
    this.loadHeader();
    this.loadFooter();
    },
    // 加载头部资源(ajax)
    loadHeader() {
    // 异步 ajax get 请求头部资源
    $.get("/Nhaolilai/html/head.html", (res) => {			//jQuery的get方法，发送一个get请求到指定url,并返回res数据，即html文本
    // 将响应回来的HTML文本渲染到 <header> 元素中
    $("header").html(res);			//jQuery的html方法，将返回的html文本加到header中
    // 添加交互功能
    this.addListener();				//调用自定义的方法添加交互效果，
            //至于为什么要把交互功能加载ajax的success处理函数中，是因为ajax是异步的，我们必须等结构加载完毕后再添加交互效果
            //很多异步的东西，最好是等异步执行结束后再执行其他交互操作，要不然可能会找不到事件源

    });
    },
    // 加载尾部资源(ajax)
    loadFooter() {
    // 通常使用 load() 方法来异步加载外部静态资源,然后用callback添加交互效果
    $("footer").load("/Nhaolilai/html/foot.html",function(){
    // 添加交互功能
    let showJudge=1;
    $(".help-center").on("click",function(){
        if(showJudge==1){
            $(".guide").show(600);
            showJudge=0;
        }else{
            $(".guide").hide(600);
            showJudge=1;
        }
    });
    });
    },
    // 注册事件监听
    addListener() {
    // 搜索框事件
    $(".search :text").on("keyup", this.suggestHandler);
    this.nowAddress();

    },
    // 搜索建议处理
    suggestHandler(event) {
    // 文本框中的输入值
    const v = $(event.target).val()
    // 跨域请求 baidu 的 jsonp 提示接口
    const url = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${v}&cb=?`;//jQuery 将自动替换 ? 为正确的函数名，以执行回调函数，所以只用写？即可
    $.getJSON(url, (res) => {		//回调函数
    console.log(res)
    // todo..........
    })
    },
    //判断是否有地址cookie，来决定now-address的值
    nowAddress(){
        if($.cookie("nowAddress")){
            $("#now-address").text($.cookie("nowAddress"));
        }
    },

    //帮助栏的显示和隐藏
    helpShow(){
        if(showJudge==1){
            $(".guide").show(2000);
            showJudge=0;
        }else{
            $(".guide").hide(2000);
            showJudge=1;
        }
        
    },


    }

    // 创建对象，并返回到用这个模块的地方去
    return new HeaderAndFooter();
    });
