<?php
	
	$log = $_GET['log'];
	$pass = $_GET['pass'];

	autenticatePass($log, $pass)

	function autenticatePass($login, $senha){
		$pass, $email, $nome; 
		$returnArray = [];
		$user = [];
		$string = "SELECT Nome_Aluno, Senha, Email FROM Alunos WHERE `Email` = ? AND `Senha` = ?";
		$connect = mysqli_connect("localhost", "oob", "joao21022001", 'root');
		$stmt = mysqli_prepare($connect, $string);
	
		mysqli_stmt_bind_params($stmt, "ss", $login, $senha);
		mysqli_stmt_bind_results($stmt, $nome, $pass, $email);

		if(!mysqli_stmt_execute($stmt)){
			
			die("Ocorreu um erro durante a execução");
		
		}else{
			
			mysqli_stmt_fetch($sth);

			array_push($returnArray, "true");
			array_push($user, $nome);
			array_push($user, $nome);
			array_push($user, $nome);
		}
	}

	function loginData($login, $senha){
		$string = "SELECT Nome_Aluno, Email, Senha FROM aluno WHERE `email` = ?";
		$connect = mysqli_connect("localhost", "oob", "joao21022001", 'root');
		$stmt = mysqli_prepare($connect, $string);
	
		mysqli_stmt_bind_params($stmt, "s", $login);
		mysqli_stmt_bind_results($stmt, $resultPass);
	}

?>