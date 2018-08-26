<?php

class User{
    protected $idUser;
    protected $connection;
    
    public function __construct(){
        $this->connection = new PDO('mysql:host=localhost;dbname=oob_bd;charset=utf8','root','my28@if#658');
    }

    function login($KEYS){
		try{
			$hash = hash('sha256', $KEYS['senha']);
			$query = $this->connection->prepare('SELECT idusuario , email, senha from usuario where email = ? AND senha = ?');
			$query->bindParam(1, $KEYS['email'], PDO::PARAM_STR);
			$query->bindParam(2, $hash, PDO::PARAM_STR);
			$query->execute();

			$result = $query->fetch(PDO::FETCH_ASSOC);
			if($query->rowCount()){
				$this->idUser = $result['idusuario'];
				$token = MD5(rand(0, 1000));

				$tokenQuery = $this->connection->prepare('INSERT into tokens (token, expiracao, idusuario) values(:token, DATE_ADD(NOW(), INTERVAL 60 MINUTE),:idusuario)');

				$tokenQuery->bindParam(':token', $token, PDO::PARAM_STR);
				$tokenQuery->bindParam(':idusuario', $this->idUser, PDO::PARAM_STR);
				$tokenQuery->execute();
				$response = array(
					'token' => $token
				);
				echo json_encode($response);
			}
			else{
				throw new Exception("Não autorizado;", 401);
			}

		}catch(Exception $e){
			throw $e;
		}
	}

	function getInfo($token){
		try{
			$auth = $this->connection->prepare("SELECT idusuario FROM tokens WHERE token = ? AND expiracao >=CURRENT_TIMESTAMP");
			$auth->bindParam(1, $token, PDO::PARAM_STR);
			$auth->execute();
			$response = $auth->fetch(PDO::FETCH_ASSOC);
			if($auth->rowCount() > 0){
				$query = $this->connection->prepare("SELECT idusuario, nome, email FROM usuario WHERE idusuario = ?");
				$query->bindParam(1, $response['idusuario'], PDO::PARAM_STR);
				$query->execute();
				$return = $query->fetch(PDO::FETCH_ASSOC);
				print_r(json_encode($return));
			}else{
				throw new Exception("Erro de autenticação", 409);
			}

		}catch(Exception $e){
			throw new Exception("Internal Server Error: ". $e->getMessage());
		}
	}

	function getBadges($KEYS, $token){
		if($this->auth($token, $KEYS['idiusuario'])){
			try{
				$query = $this->connection->prepare("SELECT * FROM usuario_badge WHERE idusuario = :idusuario");
				$query->bindParam('idusuario', $KEYS['idusuario'], PDO::PARAM_STR);
				$query->execute();
				$query = $query->fetchAll(PDO::FETCH_ASSOC);
				print_r(json_encode($query));
			}catch(Exception $e){
				die("Erro ao buscar as insígnias: " . $e->getMessage());
			}
		}else{
			throw new Exception("Erro de autenticação:", 409);
		}
	}
	
	function auth($token, $idUser){
		try{
			$auth = $this->connection->prepare("SELECT * FROM tokens WHERE token = :token AND idusuario = :idusuario AND expiracao >=CURRENT_TIMESTAMP");
			$auth->bindParam(':token', $token, PDO::PARAM_STR);
			$auth->bindParam(':idusuario', $idUser, PDO::PARAM_STR);
			$auth->execute();

			if($auth->rowCount() == 1){
				return true;
			}else{
				throw new Exception("Error - Authentication error", 401);
			}

			$atualizaToken = $this->connection->prepare('UPDATE seguranca SET expiracao = DATE_ADD(NOW(), INTERVAL 5 MINUTE) WHERE token = :token');
			$atualizaToken->bindParam(':token', $token, PDO::PARAM_STR);
			$atualizaToken->execute();
		}catch(Exception $e){
			die("Error: Internal server error - " . $e->getMessage());
		}
	}
    
    function signUp($KEYS){
		try{
			$verify = $this->connection->prepare('SELECT count(idusuario) as existe FROM usuario WHERE email = :email');
			$verify->bindParam(':email', $KEYS['email'], PDO::PARAM_STR);
			$verify->execute();
			$verify = $verify->fetch(PDO::FETCH_ASSOC);
			if($verify['existe'] > 0)
				throw new Exception('Conflito - Usuário já cadastrado;', 409);
		}
		catch(Exception $e){
			throw $e;
		}
        try{
            $hash = hash('sha256', $KEYS['senha']);
            $query = $this->connection->prepare('INSERT INTO usuario (nome,email,senha) VALUES(:nome, :email, :senha)');
            $query->bindParam(':nome', $KEYS['nome'], PDO::PARAM_STR);
            $query->bindParam(':email', $KEYS['email'], PDO::PARAM_STR);
            $query->bindParam(':senha', $hash, PDO::PARAM_STR);
			$query->execute();
			
			if($query->rowCount() > 0){
				$condition = true;
				echo(json_encode($condition));
			}

        }catch(Exception $e){
            throw new Exception("Internal Server Error - Cadastro não realizado", 500);
        }
	}
	
	function deleteUser($KEYS){
		try{
			$query = $this->connection->prepare("DELETE FROM usuario WHERE idusuario = ?");
			$query->bindParam(1, $KEYS['idusuario'], PDO::PARAM_INT);
			$query->execute();

			print_r($query);
			print_r($KEYS['idusuario']);

			if($query->rowCount() > 0){
				$condition = true;
				echo(json_encode($condition));
			}else{
				// throw new Exception("Internal Server Error - Cadastro não realizado", 500);
			}
		}catch(Exception $e){
			throw new Exception("Error: " . $e->getMessage());
		}
	}

	function updateWallet($KEYS, $token){

	}

	function updateUser($KEYS){
		try{
			$query = $this->connection->prepare('UPDATE usuario SET nome = :nome, email = :email WHERE idusuario = :idusuario');
			$query->bindParam(':idusuario', $KEYS['idusuario'], PDO::PARAM_STR);
			$query->bindParam(':nome', $KEYS['nome'], PDO::PARAM_STR);
			$query->bindParam(':email', $KEYS['email'], PDO::PARAM_STR);
			$query->execute();

			if($query->rowCount() > 0){
				$condition = ['value' => true];
				echo(json_encode($condition));
			}else{
				$condition = ['value' => false];
				echo(json_encode($condition));
			}
		}catch(Exception $e){
			throw new Exception($e);
		}
	}
}