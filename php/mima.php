<?php
	//跨域
	header("Access-Control-Allow-Origin:*");
	//防止中文乱码
	header("Content-type:text/html;charset=utf-8");
	//获取前端的数据,get请求
	$phoneNumber=$_GET["phoneNumber"];
	$pword=$_GET["pword"];
	//连接数据库
	mysql_connect("localhost:3306","root","");
	//选择数据库
	mysql_select_db("haolilai");
	//防止写入数据库的数据乱码
	mysql_set_charset("utf8");
	//定义一个变量存储SQL语句；
	//查询
	$sql="SELECT username,password FROM login where username='$phoneNumber' and password='$pword'";
		//执行SQL，
	$result = mysql_query($sql);
	// 判断执行结果
	if(mysql_num_rows($result)>=1){
		echo 1;
	}else{
		echo 2;
	}
	mysql_close();
	// 关闭连接 
?>