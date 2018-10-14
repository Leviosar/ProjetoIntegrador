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
		case 'getMoney': die($usuario->getMoney($KEYS, $HEADER['token']));
		case 'rateXp': die($xp->rate($KEYS));
		case 'addView': die($usuario->addView($KEYS, $HEADER['token']));
		case 'getAvatar': die($usuario->getAvatar($KEYS, $HEADER['token']));
		case 'setAvatar': die($usuario->setAvatar($KEYS, $HEADER['token']));
		case 'getGames': die($usuario->getGames($KEYS, $HEADER['token']));
		case 'getRanking': die($usuario->getRanking($KEYS));
		case 'buyGame': die($usuario->buyGame($KEYS, $HEADER['token']));
		case 'getAllGames': die($usuario->getAllGames());
		case 'insertScore': die($usuario->insertScore($KEYS, $HEADER['token']));
		default: throw new Exception("Erro - Metodo não encontrado", 404);
	}	
} catch (Exception $e) {
	die("Erro: " . $e->getMessage());
} 