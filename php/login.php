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
//	$arr = array();
//	// 循环读取查询结果集（查询结果集就是表格，有行和列）中的数据，将读取到的行保存到数组中
//	while($row = mysql_fetch_assoc($result)) {  //mysql_fetch_assoc() 函数从结果集中取得一行作为关联数组。
//												//返回根据从结果集取得的行生成的关联数组，如果没有更多行，则返回 false。 
//												//mysql_fetch_assoc() 括号内的参数必需。要使用的数据指针。该数据指针是从 mysql_query() 返回的结果。							
//												//先对$row进行赋值，再判断条件真假，如果$row不为空，则为真 
//												// $row = array("id"=1, "username"=>"xiaoming", "password" => "abc", "email"=>"abc@qq.com");
//		
//		// $row 是读取到的行，将 $row 作为数组元素追加到 $arr 数组末尾,相当于js的push操作
//		$arr[] = $row;
//	}
//	echo json_encode(array("data"=>$arr));       //输出$arr数组，该数组的元素是json格式的字符串，可通过该json文本将后台的数据传送到前端
//	echo mysql_num_rows($result);
	if(mysql_num_rows($result)>=1){
		echo 1;
	}else{
		echo 2;
	}
	mysql_close();
	// 关闭连接 
?>