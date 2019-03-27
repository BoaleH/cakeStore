//创建一个可定义商品个数的列表
define(["jquery"],function($){
    //创建构造函数，参数分别代表加载商品的个数，要将商品加载在哪个元素之内，商品是加在元素上部还是下部
    function MakeGoods(num,elebox,direction){
        // this.goodstart=goodstart;       //商品数组的起始商品下标
        this.num=num;                   //要加载商品的个数
        this.elebox=elebox;             //商品要加载在哪个元素之内
        this.direction=direction||"_top";   //如果没传方向参数，默认为_top
        this.getrap2();
    }

    //这个对象有两个参数，就是个数和插入哪个元素之前
    MakeGoods.prototype={
        constructor: MakeGoods,
        getrap2:function(){
            

            //再创建goods
            $.get("http://rap2api.taobao.org/app/mock/126860/goodslist",(res)=>{
                //设置获取商品数组中的哪一段作为商品输出渲染
                const infoArr=res.res_body.list.slice(0,this.num);
                let html="";
                
                // console.log(infoArr);
                infoArr.forEach(function(ele){
                    //a链接拼接上查询字符串，用于给detail传递id数据,以后在点击a链接点击跳转到detail之后，通过window.location的href属性就可以获取当前商品页的id，实现动态渲染
                    html+=`<a href="/Nhaolilai/html/detail.html?id=${ele.id}" id="${ele.id}">
                    <div class="shangpinImg">
                        <img src="${ele.img}" alt="">
                    </div>                
                    <div class="goodsinfo">
                        <span>经典系列${ele.price}</span>
                        <span>CLASSIC SERIES</span>
                    </div>
                </a>`;
                
                })
                // console.log(this.elebox);
                //如果方向为_top，则商品加到上部，否则商品加到下部
                if(this.direction=="_top"){
                    this.elebox.prepend(html);
                }else if(this.direction=="_bottom"){
                    this.elebox.append(html);
                }
                
            })
        }
        
    

    }
    return MakeGoods;
})

    // //创建构造函数
    // function MakeGoods(num,elebox){
    //     this.num=num;
    //     this.elebox=elebox;
    //     this.getrap2();
    // }

    // //这个对象有两个参数，就是个数和插入哪个元素内部之前
    // MakeGoods.prototype={
    //     constructor: MakeGoods,
    //     getrap2:function(){
            

    //         //再创建goods
    //         $.get("http://rap2api.taobao.org/app/mock/126860/goodslist",(res)=>{
    //             const infoArr=res.res_body.list.slice(0,this.num);
    //             let html="";
                
    //             // console.log(infoArr);
    //             infoArr.forEach(function(ele){
    //                 html+=`<a href="/Nhaolilai/html/detail.html" class="${ele.id}">
    //                 <div class="shangpinImg">
    //                     <img src="${ele.img}" alt="">
    //                 </div>                
    //                 <div class="goodsinfo">
    //                     <span>经典系列${ele.price}</span>
    //                     <span>CLASSIC SERIES</span>
    //                 </div>
    //             </a>`;
                
    //             })
    //             // console.log(this.elebox);
    //             this.elebox.prepend(html);
    //         })
    //     }
    // }
