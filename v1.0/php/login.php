<?php
	
	$matricula = $_POST['matricula'];
	$senha = $_POST['senha'];

	$string = "SELECT matricula, FROM aluno WHERE `matricula` = '$matricula' AND `senha` = '$senha'";

	$connect = mysqli_connect("mysql.hostinger.com.br", "u535468846_oobs", "joao21022001", 'u535468846_oobs');
	$query = mysqli_query($connect, $string);
	
	if (!$query) {
		echo 'Erro';
	}else{
		$row = mysqli_fetch_array($query, MYSQLI_ASSOC);
		return json_encode($row); 
	}

?>