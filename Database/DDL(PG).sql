CREATE DATABASE 'oob_mining' DEFAULT CHARACTER SET utf8 ;
USE 'oob_mining' ;

CREATE TABLE usuario (
    idusuario SERIAL,
    'nome' VARCHAR(120) NOT NULL,
    'email' VARCHAR(120) NOT NULL UNIQUE,
    'senha' VARCHAR(64) NOT NULL,
    'avatar' INT NOT NULL DEFAULT 12
    PRIMARY KEY ('idusuario')
);


CREATE TABLE 'experiencia' (
    'idexperiencia' SERIAL,
    'descricao' VARCHAR(255) NOT NULL,
    'title' VARCHAR(100) NOT NULL,
    'experienciascol' VARCHAR(45) NOT NULL,
    PRIMARY KEY ('idexperiencia')
);


CREATE TABLE 'disciplina' (
    'iddisciplina' SERIAL,
    'nome' VARCHAR(45) NOT NULL,
    PRIMARY KEY ('iddisciplina')
);

CREATE TABLE 'badge' (
  'idbadge' SERIAL,
  'nome' VARCHAR(45) NOT NULL,
  'descricao' VARCHAR(255) NOT NULL,
  PRIMARY KEY ('idbadge'));

CREATE TABLE 'experiencias_disciplinas' (
    'idexperiencia' INT NOT NULL,
    'iddisciplina' INT NOT NULL,
    FOREIGN KEY ('idexperiencia') REFERENCES 'experiencia' ('idexperiencia'),
    FOREIGN KEY ('iddisciplina') REFERENCES 'disciplina' ('iddisciplina')
);


CREATE TABLE 'usuario_experiencia' (
    'idusuario' INT NOT NULL,
    'idexperiencia' INT NOT NULL,
    FOREIGN KEY ('idusuario') REFERENCES 'usuario' ('idusuario'),
    FOREIGN KEY ('idexperiencia')  REFERENCES 'experiencia' ('idexperiencia')
);


CREATE TABLE 'usuario_badge' (
    'idusuario' INT NOT NULL,
    'idbadge' INT NOT NULL,
    FOREIGN KEY ('idusuario') REFERENCES 'usuario' ('idusuario'),
    FOREIGN KEY ('idbadge') REFERENCES 'badge' ('idbadge')
);

CREATE TABLE 'tokens' (
    'token' VARCHAR(64) NOT NULL,
    'idusuario' INT NOT NULL,
    'expiracao' TIMESTAMP NOT NULL,
    FOREIGN KEY ('idusuario') REFERENCES 'usuario' ('idusuario')
);

CREATE TABLE 'transacao' (
    'idusuario' INT NOT NULL,
    'valor' INT NOT NULL,
    'horario' TIMESTAMP NOT NULL,
    FOREIGN KEY ('idusuario') REFERENCES 'usuario' ('idusuario')
);

CREATE TABLE 'rate' (
    'idexperiencia' INT NOT NULL,
    'idusuario' INT NOT NULL,
    'time' TIMESTAMP NOT NULL,
    'rate' INT NOT NULL,
    FOREIGN KEY ('idusuario') REFERENCES 'usuario' ('idusuario'),
    FOREIGN KEY ('idexperiencia') REFERENCES 'experiencia' ('idexperiencia')
);

CREATE TABLE 'game' (
    'idgame' SERIAL,
    'nome' VARCHAR (200) NOT NULL,
    'valor' INT NOT NULL,
    PRIMARY KEY ('idgame')
);

CREATE TABLE 'usuario_game' (
    'idgame' INT NOT NULL,
    'idusuario' INT NOT NULL,
    FOREIGN KEY ('idusuario') REFERENCES 'usuario' ('idusuario'), 
    FOREIGN KEY ('idgame') REFERENCES 'game' ('idgame')
);

CREATE TABLE 'score' (
    'idgame' INT NOT NULL,
    'idusuario' INT NOT NULL,
    'pontuacao' INT NOT NULL,
    'horario' TIMESTAMP NOT NULL,
    FOREIGN KEY ('idusuario') REFERENCES 'usuario' ('idusuario'), 
    FOREIGN KEY ('idgame') REFERENCES 'game' ('idgame')
);

