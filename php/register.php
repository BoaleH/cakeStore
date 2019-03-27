<?php
	//跨域
	header("Access-Control-Allow-Origin:*");
	//防止中文乱码
	header("Content-type:text/html;charset=utf-8");
	$phoneNumber=$_GET["phoneNumber"];
	$pword=$_GET["pword"];
	//连接数据库
	mysql_connect("localhost:3306","root","");
	//选择数据库
	mysql_select_db("haolilai");
		//防止写入数据库的数据乱码
	mysql_set_charset("utf8");
	//定义一个变量存储SQL语句；
	//插入
	$insql="INSERT INTO LOGIN(username,password) values ('$phoneNumber','$pword')";
	//执行SQL，
	$result=mysql_query($insql);
	if($result){
		echo 1;   //如果注册成功，则跳转到登录页面
		
	}else{    //已在数据库中设置username只能是唯一值，所以如果$result为false，则说明是有重复的用户名
		echo 2;
	}
	
	//关闭连接
	mysql_close();
?>