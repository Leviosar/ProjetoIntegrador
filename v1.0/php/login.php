<?php
	$log = $_GET['login'];
	$pass = $_GET['pass'];
	$password; 
	$email;
	$nome; 
	$returnArray = [];
	$user = [];
	$connect = mysqli_connect("localhost", "labmatii", "my28@if#658", 'oob');
	$stmt = mysqli_prepare($connect, "SELECT Nome_Aluno, Senha, Email FROM Alunos WHERE `Email` = ? AND `Senha` = ?");
	mysqli_stmt_bind_param($stmt, "ss", $log, $pass);
	mysqli_stmt_bind_result($stmt, $nome, $password, $email);
	if(!mysqli_stmt_execute($stmt)){
		die("Ocorreu um erro durante a execução");
	}else{
		mysqli_stmt_fetch($stmt);
		array_push($user, $nome);
		array_push($user, $email);
		array_push($user, $password);
		array_push($returnArray, $user);
		print_r(json_encode($returnArray));
	}

?>