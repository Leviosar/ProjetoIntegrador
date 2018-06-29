<?php

    $log = $_GET['login'];
    $pass = $_GET['pass'];
    $nome = $_GET['nome'];

    $link = mysqli_connect('localhost', 'labmatii', 'my28@if#658', 'oob');

    $stmt = mysqli_prepare($link, "INSERT INTO Alunos (Nome_Aluno, Email, Senha, Nível, Xp) VALUES (?, ?, ?, '1', '0')");

    mysqli_stmt_bind_param($stmt, "sss", $nome, $log, $pass);

    if(!mysqli_stmt_execute($stmt)){
        die("false");
    }else{
        echo "true";
    }