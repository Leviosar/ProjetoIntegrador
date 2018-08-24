CREATE SCHEMA IF NOT EXISTS `oob_bd` DEFAULT CHARACTER SET utf8 ;
USE `oob_bd` ;

CREATE TABLE IF NOT EXISTS `oob_bd`.`usuario` (
    `idusuario` INT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(120) NOT NULL,
    `email` VARCHAR(120) NOT NULL,
    `senha` VARCHAR(64) NOT NULL,
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


CREATE TABLE IF NOT EXISTS `oob_bd`.`avatar` (
    `idtable1` INT NOT NULL AUTO_INCREMENT,
    `custo` INT NULL,
    PRIMARY KEY (`idtable1`)
)
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `oob_bd`.`usuario_avatar` (
    `idusuario` INT NOT NULL,
    `idtable1` INT NOT NULL,
    `atual` BOOLEAN NOT NULL,
    FOREIGN KEY (`idusuario`) REFERENCES `oob_bd`.`usuario` (`idusuario`),
    FOREIGN KEY (`idtable1`)REFERENCES `oob_bd`.`avatar` (`idtable1`)
)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `oob_bd`.`carteira` (
    `idusuario` INT NOT NULL,
    `saldo` INT NOT NULL,
    `ultimaTransacao` TIMESTAMP NOT NULL,
    FOREIGN KEY (`idusuario`) REFERENCES `oob_bd`.`usuario` (`idusuario`)
)
ENGINE = InnoDB;