CREATE SCHEMA IF NOT EXISTS `oob_bd` DEFAULT CHARACTER SET utf8 ;
USE `oob_bd` ;

CREATE TABLE IF NOT EXISTS `oob_bd`.`usuario` (
    `idusuario` INT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(120) NOT NULL,
    `email` VARCHAR(120) NOT NULL,
    `senha` VARCHAR(64) NOT NULL,
    `avatar` INT NOT NULL DEFAULT 12
    PRIMARY KEY (`idusuario`)
)
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `oob_bd`.`experiencia` (
    `idexperiencia` INT NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(255) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `experienciascol` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`idexperiencia`)
)
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `oob_bd`.`disciplina` (
    `iddisciplina` INT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`iddisciplina`)
)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `oob_bd`.`badge` (
  `idbadge` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `descricao` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idbadge`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `oob_bd`.`experiencias_disciplinas` (
    `idexperiencia` INT NOT NULL,
    `iddisciplina` INT NOT NULL,
    FOREIGN KEY (`idexperiencia`) REFERENCES `oob_bd`.`experiencia` (`idexperiencia`),
    FOREIGN KEY (`iddisciplina`) REFERENCES `oob_bd`.`disciplina` (`iddisciplina`)
)
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `oob_bd`.`usuario_experiencia` (
    `idusuario` INT NOT NULL,
    `idexperiencia` INT NOT NULL,
    FOREIGN KEY (`idusuario`) REFERENCES `oob_bd`.`usuario` (`idusuario`),
    FOREIGN KEY (`idexperiencia`)  REFERENCES `oob_bd`.`experiencia` (`idexperiencia`)
)
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `oob_bd`.`usuario_badge` (
    `idusuario` INT NOT NULL,
    `idbadge` INT NOT NULL,
    FOREIGN KEY (`idusuario`) REFERENCES `oob_bd`.`usuario` (`idusuario`),
    FOREIGN KEY (`idbadge`) REFERENCES `oob_bd`.`badge` (`idbadge`)
)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `oob_bd`.`tokens` (
    `token` VARCHAR(64) NOT NULL,
    `idusuario` INT NOT NULL,
    `expiracao` TIMESTAMP NOT NULL,
    FOREIGN KEY (`idusuario`) REFERENCES `oob_bd`.`usuario` (`idusuario`)
)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `oob_bd`.`transacao` (
    `idusuario` INT NOT NULL,
    `valor` INT NOT NULL,
    `horario` TIMESTAMP NOT NULL,
    FOREIGN KEY (`idusuario`) REFERENCES `oob_bd`.`usuario` (`idusuario`)
)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `oob_bd`.`rate` (
    `idexperiencia` INT NOT NULL,
    `idusuario` INT NOT NULL,
    `time` TIMESTAMP NOT NULL,
    `rate` INT NOT NULL,
    FOREIGN KEY (`idusuario`) REFERENCES `oob_bd`.`usuario` (`idusuario`),
    FOREIGN KEY (`idexperiencia`) REFERENCES `oob_bd`.`experiencia` (`idexperiencia`)
)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `oob_bd`.`game` (
    `idgame` INT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR (200) NOT NULL,
    `valor` INT NOT NULL,
    PRIMARY KEY (`idgame`)
)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `oob_bd`.`usuario_game` (
    `idgame` INT NOT NULL,
    `idusuario` INT NOT NULL,
    FOREIGN KEY (`idusuario`) REFERENCES `oob_bd`.`usuario` (`idusuario`), 
    FOREIGN KEY (`idgame`) REFERENCES `oob_bd`.`game` (`idgame`)
)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `oob_bd`.`score` (
    `idgame` INT NOT NULL,
    `idusuario` INT NOT NULL,
    `pontuacao` INT NOT NULL,
    `horario` TIMESTAMP NOT NULL,
    FOREIGN KEY (`idusuario`) REFERENCES `oob_bd`.`usuario` (`idusuario`), 
    FOREIGN KEY (`idgame`) REFERENCES `oob_bd`.`game` (`idgame`)
)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `permission` (
    `idpermission` INT NOT NULL PRIMARY KEY,
    `descricao` VARCHAR(255) NOT NULL
)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `oob_bd`.`usuario_permission` (
    `idpermission` INT NOT NULL,
    `idusuario` INT NOT NULL,
    `status` TINYINT(1) NOT NULL,
    FOREIGN KEY (`idusuario`) REFERENCES `oob_bd`.`usuario` (`idusuario`), 
    FOREIGN KEY (`idpermission`) REFERENCES `oob_bd`.`permission` (`idpermission`)
)
ENGINE = InnoDB;
