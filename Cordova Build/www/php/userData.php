<?php
session_start();
$_SESSION['matricula'] = $_POST['matricula'];

echo 'A matricula do aluno é:' .$_SESSION['matricula'];
print_r($_SESSION) ;

?>