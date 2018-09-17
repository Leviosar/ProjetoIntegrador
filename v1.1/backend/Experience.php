<?php

class Experience{

    public function __construct(){
        $this->connection = new PDO('mysql:host=localhost;dbname=oob_bd;charset=utf8','root','my28@if#658');
    }
     
    public function rate($KEYS){
        $query = $this->connection->prepare("INSERT INTO rate (idusuario, idexperiencia, rate) values (? , ?, ?)");
        $query->bindParam(1, $KEYS['idusuario']);
        $query->bindParam(2, $KEYS['idexperiencia']);
        $query->bindParam(3, $KEYS['value']);
        $query->execute();
    }
}