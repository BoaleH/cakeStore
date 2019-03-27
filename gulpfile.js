

//在使用gulp插件的时候，需要自己在项目目录上创建一个gulpfile.js的文件夹，可以引入多个插件和定制多个模块

//引入插件模块,需要哪个插件则引入哪一个
let gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');	//括号内的是插件名，表示要引入这个插件模块  ，此时gulp-clean-css是压缩css的gulp插件，变量名cleanCSS是定制任务模块时要使用的

const babel = require('gulp-babel');	//括号内的是插件名，表示要引入这个插件模块  ，此时gulp-babel是ES6转换ES5的gulp插件，变量名babel是定制任务模块时要使用的

const uglify = require('gulp-uglify');	//括号内的是插件名，表示要引入这个插件模块  ，此时gulp-uglify是压缩js的gulp插件，变量名uglify是定制任务模块时要使用的

const htmlmin = require('gulp-htmlmin');//括号内的是插件名，表示要引入这个插件模块  ，此时gulp-htmlmin是压缩html的gulp插件，变量名htmlmin是定制任务模块时要使用的

const connect = require('gulp-connect');//括号内的是插件名，表示要引入这个插件模块  ，此时gulp-connect是webserver的gulp插件，变量名connect是定制任务模块时要使用的

const sass = require('gulp-sass');//括号内的是插件名，表示要引入这个插件模块  ，此时gulp-sass是sass编译的gulp插件，变量名sass是定制任务模块时要使用的


//定制任务模块，压缩css
gulp.task('minify-css', () => {		//第一个参数是自定义任务名称，第二个参数是回调函数，表示执行任务	调用该任务则git bash控制台输gulp minify-css
  	gulp.src('css/public.css')		//相对路径，指明要压缩哪一个css文件，此时指明压缩public.css,也可以*.css表明压缩所有css
    .pipe(cleanCSS())			//括号与引入插件模块变量cleanCSS同名
    .pipe(gulp.dest('dist/css'));	//相对路径，设定放置处理过后的文件目录，此例子插件是压缩css的插件，此目录就是存放压缩过后的css文件
});



//定制任务模块，ES6转ES5并压缩js
gulp.task('js', () =>{		//第一个参数是自定义任务名称，第二个参数是回调函数，表示执行任务       调用该任务则git bash控制台输gulp js
	
	gulp.src('js/js/*.js')	//相对路径，指明要压缩哪一个js文件，*代表压缩所有js  也可以写指定名称压缩指定js 
		.pipe(babel({	//将ES6转ES5		//括号与引入插件模块变量babel同名
			presets: ['env']
		}))
		.pipe(uglify())		//实现压缩	//括号与引入插件模块变量uglify同名
		.pipe(gulp.dest('dist/js'))		//相对路径，设定放置处理过后的文件目录，此例子插件是压缩js的插件，此目录就是存放压缩过后的js文件
});


//压缩html
gulp.task('html', () => {		//第一个参数是自定义任务名称，第二个参数是回调函数，表示执行任务	调用该任务则git bash控制台输gulp minify-css
  	gulp.src('./**/*.html')		//相对路径，指明要压缩哪一个html文件，此时指明压缩当前目录包括当前目录之下的所有的html,也可以写指定名称压缩指定HTML
    .pipe(htmlmin({collapseWhitespace:true,minifyJS:true,minifyCSS:true}))			//括号与引入插件模块变量htmlmin同名,
    									//html的压缩比较特殊，需要设置压缩html内部空白/js/css配置对象collapseWhitespace:true,minifyJS:true,minifyCSS:true
    .pipe(gulp.dest('dist'));	//相对路径，设定放置处理过后的文件目录，此例子插件是压缩html的插件，此目录就是存放压缩过后的html文件
    							//只写dist,其会自动根据原html文件的分布自行创建文件夹
});



//复制image/video/libs/php等资源，如果是复制操作，不需要进行插件模块的引入，gulp自带有复制这个功能
gulp.task('images',()=>{	//第一个参数是自定义任务名称，第二个参数是回调函数，表示执行任务	调用该任务则git bash控制台输gulp images
	gulp.src('img/*.*')		//相对路径，把img文件夹下的所有文件都进行复制
		.pipe(gulp.dest('dist/img'));	//相对路径，将复制的文件复制到dist/img目录下
})

gulp.task('video',()=>{	//第一个参数是自定义任务名称，第二个参数是回调函数，表示执行任务	调用该任务则git bash控制台输gulp video
	gulp.src('video/*.*')		//相对路径，把video文件夹下的所有文件都进行复制
		.pipe(gulp.dest('dist/video'));	//相对路径，将复制的文件复制到dist/video目录下
})

gulp.task('php',()=>{	//第一个参数是自定义任务名称，第二个参数是回调函数，表示执行任务	调用该任务则git bash控制台输gulp php
	gulp.src('php/*.*')		//相对路径，把mock文件夹下的所有文件都进行复制
		.pipe(gulp.dest('dist/php'));	//相对路径，将复制的文件复制到dist/php目录下
})


//启动webserver，这个功能甚至都不需要安装服务器，直接自己装了一个服务器插件来模拟服务器
gulp.task('connect', function() {	//第一个参数是自定义任务名称，第二个参数是回调函数，表示执行任务	调用该任务则git bash控制台输gulp connect
  connect.server({
  	root:'dist',	//相对路径，指明dist目录为webserver服务器的根
  	port:3000,		//访问端口
  	livereload:true,//自动刷新
  });
});


//启动sass,这个功能可以对sass文件转为css文件
gulp.task('sass',()=>{	//第一个参数是自定义任务名称，第二个参数是回调函数，表示执行任务	调用该任务则git bash控制台输gulp sass
	gulp.src('css/**/*.scss')	//相对路径     //这个写法是把css目录包括css子目录的所有scss文件都做编译操作转为css文件
		.pipe(sass({outputStyle:'expanded'}))			//实现sass编译	//括号与引入插件模块变量sass同名	//outputStyle指定输出风格为什么编译风格
		.pipe(gulp.dest('dist/css'))	//相对路径		//将编译完成的css文件存到dist/css目录下
})

//监视任务，这个任务不需要安装插件和引入插件，属于gulp自带。watch作用:当某些文件发生改变（修改）时，会自动执行指定任务，调用该任务则git bash控制台输gulp watch
//比如监视css下包括css子目录的所有scss文件，当scss文件出现修改，自动执行sass任务
gulp.task('watch',()=>{		//任务名watch是指定的，不能自定义修改
	gulp.watch('css/**/*.scss',['sass'])	//当css目录下包括css的子目录，出现scss文件修改时，自动执行sass任务	
})



//任务的依赖   
//每次执行一个任务就需要输入一次gulp命令是非常麻烦的，我们可以对任务进行依赖，设定一个任务依赖其他任务，只用执行这个任务，其他被依赖的任务也会跟着执行
//如之前的复制image/video/libs/mock等资源，我们定制一个copy任务，让copy任务依赖images/video/php任务，之后只用执行copy，其他任务也会跟着执行
gulp.task('copy',['images','video','php'],()=>{});		//这样就完成了依赖，只用在git bash控制台输入gulp copy，就会一起执行被依赖的任务images/video/php
														//如果依赖任务还需要执行什么，在回调函数内操作即可

//定制默认任务
//为什么需要定制默认任务：因为每执行一次任务就要写一行gulp代码非常麻烦，
//我们可以定制一个默认任务，把默认任务设置依赖其他的任务，之后只用执行这个默认任务，其他被依赖的任务也会跟着执行
gulp.task('default',['js','html','copy'],()=>{});	//默认任务的任务名只能是default
//这样就完成了依赖，只用在git bash控制台输入gulp  （默认任务是什么都不加的），就会一起执行被依赖的任务'js','html','copy'
//如果依赖任务还需要执行什么，在回调函数内操作即可


