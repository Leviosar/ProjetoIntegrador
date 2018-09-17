<?php

header('Access-Control-Allow-Origin: *');

require_once("User.php");
require_once("Experience.php");

$usuario = new User();
$xp = new Experience();

$_param = explode("?", $_SERVER['REQUEST_URI']);
$HEADER = [];
parse_str($_param[1], $HEADER); //=_$GET

// $KEYS = [];
$KEYS = json_decode(file_get_contents("php://input"),true);
$option = $HEADER['option'];

try{
	switch ($option) {
		case 'loginUser': die($usuario->login($KEYS));
		case 'signUp': die($usuario->signUp($KEYS));
		case 'getInfo': die($usuario->getInfo($HEADER['token']));
		case 'deleteUser': die($usuario->deleteUser($KEYS));
		case 'getBadges': die($usuario->getBadges($KEYS, $HEADER['token']));
		case 'updateUser': die($usuario->updateUser($KEYS, $HEADER['token']));
		case 'insertBadge': die($usuario->insertBadges($KEYS, $HEADER['token']));
		case 'addCoin': die($usuario->manageWallet($KEYS, $HEADER['token']));
		case 'rateXp': die($xp->rate($KEYS));
		default: throw new Exception("Erro - Metodo não encontrado", 404);
	}	
} catch (Exception $e) {
	die("Erro: " . $e->getMessage());
} 