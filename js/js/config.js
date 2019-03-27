//短名称配置
require.config({
    baseUrl:"/",
    paths:{
        jquery:"/Nhaolilai/js/jquery/jquery-1.12.4.min",
        template:"/Nhaolilai/js/art-template/template-web",
        require:"/Nhaolilai/js/requirejs/require",
        detail:"/Nhaolilai/js/js/detail",
        index:"/Nhaolilai/js/js/index",
        list:"/Nhaolilai/js/js/list",
        login:"/Nhaolilai/js/js/login",
        register:"/Nhaolilai/js/js/register",
        headfoot:"/Nhaolilai/js/js/headfoot",
        masklayer:"/Nhaolilai/js/js/masklayer",
        public:"/Nhaolilai/js/js/public",
        swiper:"/Nhaolilai/swiper-4.4.6/dist/js/swiper.min",
        goods:"/Nhaolilai/js/js/goods",
        cookie:"/Nhaolilai/js/jquery-plugins/jquery.cookie",
        elevateZoom:"/Nhaolilai/js/jquery-plugins/jquery.elevateZoom-3.0.8.min",
        fly:"/Nhaolilai/js/jquery-plugins/jquery.fly.min",
        bootstrap:"/Nhaolilai/js/jquery-plugins/bootstrap.min",
    },
        	//因为elevateZoom和fly、bootstrap插件不支持AMD，但是其又依赖于jquery,所以此处要定义一个shim属性，说明elevateZoom/fly/bootstrap与jquery的依赖关系
	shim: {
		"elevateZoom": {
			deps: ["jquery"],
        },
        "fly":{
            deps: ["jquery"],
        },
        "bootstrap":{
            deps: ["jquery"],
        },
	}
})