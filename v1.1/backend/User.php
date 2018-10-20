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
				http_response_code(401);
				die(json_encode(['error' => 'Falha de autenticação', 'msg' => 'Dados incorretos']));
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
				http_response_code(409);
				die(json_encode(['error' => 'Falha de autenticação', 'msg' => 'Você será redirecionado']));
			}

		}catch(Exception $e){
			throw new Exception("Internal Server Error: ". $e->getMessage());
		}
	}

	function getRanking($KEYS){
		try{
			$query = $this->connection->prepare("SELECT u.nome, s.pontuacao FROM score as s INNER JOIN usuario as u ON u.idusuario = s.idusuario WHERE s.idgame = ? ORDER BY s.pontuacao DESC LIMIT 10");
			$query->bindParam(1, $KEYS['idgame'], PDO::PARAM_STR);
			$query->execute();
			$return = $query->fetchAll(PDO::FETCH_ASSOC);
			print_r(json_encode($return));
		}catch(Exception $e){
			throw new Exception("Internal Server Error: ". $e->getMessage());
		}
	}

	function getGames($keys, $token){
		$auth = $this->connection->prepare("SELECT idusuario FROM tokens WHERE token = ? AND expiracao >=CURRENT_TIMESTAMP");
		$auth->bindParam(1, $token, PDO::PARAM_STR);
		$auth->execute();
		$response = $auth->fetch(PDO::FETCH_ASSOC);
		if ($auth->rowCount() > 0) {
			try{
				$query = $this->connection->prepare('SELECT g.nome, g.idgame, g.valor FROM game AS g INNER JOIN usuario_game AS ug ON ug.idgame = g.idgame WHERE ug.idusuario = ?');
				$query->bindParam(1, $response['idusuario']);
				$query->execute();
				$response = $query->fetchAll(PDO::FETCH_ASSOC);
				die(json_encode($response));
			}catch(Exception $e){
				throw new Exception("Internal Server Error: ". $e->getMessage());
			}
		}
	}

	function getAllGames(){
		try{
			$query = $this->connection->prepare('SELECT g.nome, g.idgame, g.valor FROM game as g');
			$query->execute();
			$response = $query->fetchAll(PDO::FETCH_ASSOC);
			die(json_encode($response));
		}catch(Exception $e){
			throw new Exception("Internal Server Error: ". $e->getMessage());
		}
	}

	function buyGame($KEYS, $TOKEN){
		try{
			$game = $this->connection->prepare('SELECT valor FROM game WHERE idgame = ?');
			$game->bindParam(1, $KEYS['idgame']);
			$game->execute();
			$game = $game->fetch(PDO::FETCH_ASSOC);
			$saldo = $this->returnMoney($KEYS, $TOKEN);

			if ((int)$saldo['saldo'] > $game['valor']) {
				$compra = $this->connection->prepare('INSERT INTO usuario_game (idgame, idusuario) VALUES (?, ?)');
				$compra->bindParam(1, $KEYS['idgame']);
				$compra->bindParam(2, $KEYS['idusuario']);
				$compra->execute();
				$value = $game['valor'] * -1;
				$pagamento = $this->connection->prepare('INSERT INTO transacao (idusuario, valor) VALUES (?, ?)');
				$pagamento->bindParam(1, $KEYS['idusuario']);
				$pagamento->bindParam(2, $value);
				$pagamento->execute();
			}
		}catch(Exception $e){
			throw new Exception("Internal Server Error: ". $e->getMessage());
		}
	}

	function insertScore($keys){
		try{
			$query = $this->connection->prepare('INSERT INTO score (idgame, idusuario, pontuacao) VALUES (?, ?, ?)');
			$query->bindParam(1, $keys['idgame']);
			$query->bindParam(2, $keys['idusuario']);
			$query->bindParam(3, $keys['value']);
			$query->execute();
		}catch(Exception $e){
			throw new Exception("Internal Server Error: ". $e->getMessage());
		}
	}

	function manageWallet($KEYS, $token){
		if ($this->auth($token, $KEYS['idusuario'])) {
			try{
				$query = $this->connection->prepare('INSERT INTO transacao (idusuario, valor) VALUES (?, ?)');
				$query->bindParam(1, $KEYS['idusuario']);
				$query->bindParam(2, $KEYS['value']);
				$query->execute();
			}catch(Exception $e){
				die('Erro'. $e->getMessage());
			}
		}
	}

	function getMoney($KEYS, $token){
		if ($this->auth($token, $KEYS['idusuario'])) {
			try{
				$query = $this->connection->prepare('SELECT sum(valor) as saldo FROM transacao where idusuario = ?');
				$query->bindParam(1, $KEYS['idusuario']);
				$query->execute();
				die(json_encode($query->fetch(PDO::FETCH_ASSOC)));
			}catch(Exception $e){
				die('Erro'. $e->getMessage());
			}
		}
	}
	
	function returnMoney($KEYS, $token){
		if ($this->auth($token, $KEYS['idusuario'])) {
			try{
				$query = $this->connection->prepare('SELECT sum(valor) as saldo FROM transacao where idusuario = ?');
				$query->bindParam(1, $KEYS['idusuario']);
				$query->execute();
				return $query->fetch(PDO::FETCH_ASSOC);
			}catch(Exception $e){
				die('Erro'. $e->getMessage());
			}
		}
	}

	function getBadges($KEYS, $token){
		if($this->auth($token, $KEYS['idusuario'])){
			try{
				$query = $this->connection->prepare("SELECT b.idbadge, b.nome, b.descricao FROM usuario_badge AS ub INNER JOIN badge AS b ON b.idbadge = ub.idbadge WHERE idusuario = :idusuario");
				$query->bindParam('idusuario', $KEYS['idusuario'], PDO::PARAM_STR);
				$query->execute();
				$query = $query->fetchAll(PDO::FETCH_ASSOC);
				die(json_encode($query));
			}catch(Exception $e){
				die("Erro ao buscar as insígnias: " . $e->getMessage());
			}
		}else{
			http_response_code(409);
			die(json_encode(['error' => 'Falha de autenticação', 'msg' => 'Você será redirecionado']));
		}
	}

	function insertBadges($KEYS, $token){
		if($this->auth($token, $KEYS['idusuario'])){
			try{

				$query = $this->connection->prepare("SELECT * FROM usuario_badge WHERE idbadge = ? AND idusuario = ?");
				$query->bindParam(1, $KEYS['idbadge']);
				$query->bindParam(2, $KEYS['idusuario']);
				$query->execute();

				if ($query->rowCount() > 0) {
					return 0;
				}else{
					$query = $this->connection->prepare("INSERT INTO usuario_badge (idbadge, idusuario) VALUES (?, ?)");
					$query->bindParam(1, $KEYS['idbadge']);
					$query->bindParam(2, $KEYS['idusuario']);
					$query->execute();
				}

			}catch(Exception $e){
				die("Erro ao buscar as insígnias: " . $e->getMessage());
			}
		}else{
			http_response_code(409);
			die(json_encode(['error' => 'Falha de autenticação', 'msg' => 'Você será redirecionado']));
		}
	}

	function addView($KEYS, $token){
		if ($this->auth($token, $KEYS['idusuario'])) {
			try{
				$query = $this->connection->prepare("SELECT * FROM usuario_experiencia WHERE idusuario = ? AND idexperiencia = ?");
				$query->bindParam(1, $KEYS['idusuario']);
				$query->bindParam(2, $KEYS['idexperiencia']);
				$query->execute();

				if ($query->rowCount() > 0) {
					die(json_encode(['error' => 'Sucesso']));
				}else{
					$query = $this->connection->prepare('INSERT INTO usuario_experiencia (idusuario, idexperiencia) VALUES (?,?)');
					$query->bindParam(1, $KEYS['idusuario']);
					$query->bindParam(2, $KEYS['idexperiencia']);
					$query->execute();
					$this->manageWallet($KEYS, $token);					
					$this->manageBadges($KEYS, $token);					
				}
			}catch(Exception $e){
				http_response_code(400);
				die(json_encode(['error' => '400', 'msg' => $e->getMessage()]));	
			}
		}
	}

	function manageBadges($KEYS, $token){
		if ($this->auth($token, $KEYS['idusuario'])) {
			try{

				$gambi =  1;

				while($gambi <= 5){

					$query = $this->connection->prepare("SELECT * FROM usuario_experiencia AS ue INNER JOIN experiencias_disciplinas AS ed ON ue.idexperiencia = ed.idexperiencia WHERE ue.idusuario = ? AND ed.iddisciplina = ?");
					$query->bindParam(1, $KEYS['idusuario']);
					$query->bindParam(2, $gambi);
					$query->execute();
					$response = $query->fetchAll(PDO::FETCH_ASSOC);

					$i = 0;
					$idbadge = 0;

					$values = ["idusuario" => $KEYS['idusuario'], "idbadge"=> 14];
					$this->insertBadges($values, $token);

					if ($query->rowCount() > 0) {
						switch ($gambi) {
							case 1:
								$idbadge = 7;
								break;
							case 2:
								$idbadge = 4;
								break;
							case 3:
								$idbadge = 8;
								break;
							case 4:
								$idbadge = 7;
								break;
							case 5:
								$idbadge = 6;
								break;
						}
					}

					$values = ["idusuario" => $KEYS['idusuario'], "idbadge"=>$idbadge];
					$this->insertBadges($values, $token);
					$gambi++;
				}
			}catch(Exception $e){
				http_response_code(400);
				die(json_encode(['error' => '400', 'msg' => $e->getMessage()]));	
			}
		}
	}

	function getAvatar($KEYS, $token){
		if ($this->auth($token, $KEYS['idusuario'])) {
			try{
				$query = $this->connection->prepare("SELECT avatar FROM usuario WHERE idusuario = ?");
				$query->bindParam(1, $KEYS['idusuario']);
				$query->execute();
				$query = $query->fetch(PDO::FETCH_ASSOC);
				die(json_encode($query));
			}catch(Exception $e){
				http_response_code(400);
				die(json_encode(['error' => '400', 'msg' => $e->getMessage()]));
			}
		}
	}
	
	function setAvatar($KEYS, $token){
		if ($this->auth($token, $KEYS['idusuario'])) {
			try{
				$query = $this->connection->prepare("UPDATE usuario set avatar = ? WHERE idusuario = ?");
				$query->bindParam(1, $KEYS['avatar']);
				$query->bindParam(2, $KEYS['idusuario']);
				$query->execute();
				$query = $query->fetch(PDO::FETCH_ASSOC);
				die(json_encode($query));
			}catch(Exception $e){
				http_response_code(400);
				die(json_encode(['error' => '400', 'msg' => $e->getMessage()]));
			}
		}
	}
	
	function auth($token, $idUser){
		try{
			// Verifica a existência de um token em um certo usuário ainda não expirado, caso encontre ele atualiza o token, deleta os antigos e retorna true
			// Caso não encontre, delete os antigos e retorna true
			$auth = $this->connection->prepare("SELECT * FROM tokens WHERE token = :token AND idusuario = :idusuario AND expiracao >=CURRENT_TIMESTAMP");
			$auth->bindParam(':token', $token, PDO::PARAM_STR);
			$auth->bindParam(':idusuario', $idUser, PDO::PARAM_STR);
			$auth->execute();
			if($auth->rowCount() > 0){				
				$atualizaToken = $this->connection->prepare('UPDATE tokens SET expiracao = DATE_ADD(NOW(), INTERVAL 15 MINUTE) WHERE token = :token');
				$atualizaToken->bindParam(':token', $token, PDO::PARAM_STR);
				$atualizaToken->execute();


				$deletaToken = $this->connection->prepare('DELETE FROM tokens WHERE expiracao < CURRENT_TIMESTAMP');
				$deletaToken->execute();
				return true;
			}else{
				$deletaToken = $this->connection->prepare('DELETE FROM tokens WHERE expiracao < CURRENT_TIMESTAMP');
				$deletaToken->execute();
				throw new Exception("Error - Authentication error", 401);
			}
		}catch(Exception $e){
			die("Error: Internal server error cu - " . $e->getMessage());
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