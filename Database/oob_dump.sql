-- MySQL dump 10.16  Distrib 10.1.26-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: oob_bd
-- ------------------------------------------------------
-- Server version	10.1.26-MariaDB-0+deb9u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `badge`
--

DROP TABLE IF EXISTS `badge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `badge` (
  `idbadge` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  PRIMARY KEY (`idbadge`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `badge`
--

LOCK TABLES `badge` WRITE;
/*!40000 ALTER TABLE `badge` DISABLE KEYS */;
INSERT INTO `badge` VALUES (1,'Multitasking','Parece que você está tentando fazer várias coisas ao mesmo tempo'),(2,'Renascentista','Físico, químico, programador, matemático e biólogo?! O que mais você faz?'),(3,'Jack of All Trades','Tu é o bichão mesmo hein?!'),(4,'Físico louco','“A luz das estrelas fixas é da mesma natureza que a luz do Sol.” - Isaac Newton'),(5,'Quimico amador','“A melhor maneira de se ter uma boa idéia é ter varias boas idéias.” - Linus Pauling'),(6,'Dev Junior','Concedida aos usuários que dominaram ao menos uma experiência em programação'),(7,'Matemático da quarta série','Concedida aos usuários que dominaram ao menos uma experiência em matemática'),(8,'Morgan Freeman','Concedida aos usuários que dominaram ao menos uma experiência em biologia'),(9,'Físico experimental','“Posso dizer seguramente que ninguém entende a física quântica.” - Richard Feynman'),(10,'Quimico meia-boca','Concedida aos usuários que dominaram ao menos três experiências em química'),(11,'Dev front-end','Concedida aos usuários que dominaram ao menos três experiências em programação'),(12,'Matemático do ensino médio','Concedida aos usuários que dominaram ao menos três experiências em matemática'),(13,'Linnaeus Silva','Concedida aos usuários que dominaram ao menos três experiências em biologia'),(14,'Betta tester','Parabéns, você é um Betta Tester. (tipo o peixe sacou?)');
/*!40000 ALTER TABLE `badge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `disciplina`
--

DROP TABLE IF EXISTS `disciplina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `disciplina` (
  `iddisciplina` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  PRIMARY KEY (`iddisciplina`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `disciplina`
--

LOCK TABLES `disciplina` WRITE;
/*!40000 ALTER TABLE `disciplina` DISABLE KEYS */;
INSERT INTO `disciplina` VALUES (1,'Física'),(2,'Química'),(3,'Programação'),(4,'Matemática'),(5,'Biologia');
/*!40000 ALTER TABLE `disciplina` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experiencia`
--

DROP TABLE IF EXISTS `experiencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `experiencia` (
  `idexperiencia` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(255) NOT NULL,
  `title` varchar(100) NOT NULL,
  `experienciascol` varchar(45) NOT NULL,
  PRIMARY KEY (`idexperiencia`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experiencia`
--

LOCK TABLES `experiencia` WRITE;
/*!40000 ALTER TABLE `experiencia` DISABLE KEYS */;
INSERT INTO `experiencia` VALUES (1,'3.1415926535897932384626433832795028','As Aventuras de Pi','9'),(2,'Onda onda, olha a onda. Clap clap!','Tá dando onda','8'),(3,'Meu nicho é maior que o seu','Nichos Ecológicos','10'),(4,'Eles não são tão complexos','Números Complexos','10'),(5,'Que sorteio?','Bubblesort','10'),(6,'Não é o teste de paternidade do Ratinho.','Duplicação de DNA','10'),(7,'Como ficar rico em casinos','Contando cartas','10');
/*!40000 ALTER TABLE `experiencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experiencias_disciplinas`
--

DROP TABLE IF EXISTS `experiencias_disciplinas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `experiencias_disciplinas` (
  `idexperiencia` int(11) NOT NULL,
  `iddisciplina` int(11) NOT NULL,
  KEY `idexperiencia` (`idexperiencia`),
  KEY `iddisciplina` (`iddisciplina`),
  CONSTRAINT `experiencias_disciplinas_ibfk_1` FOREIGN KEY (`idexperiencia`) REFERENCES `experiencia` (`idexperiencia`),
  CONSTRAINT `experiencias_disciplinas_ibfk_2` FOREIGN KEY (`iddisciplina`) REFERENCES `disciplina` (`iddisciplina`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experiencias_disciplinas`
--

LOCK TABLES `experiencias_disciplinas` WRITE;
/*!40000 ALTER TABLE `experiencias_disciplinas` DISABLE KEYS */;
INSERT INTO `experiencias_disciplinas` VALUES (1,4),(2,1),(3,5),(4,4),(5,3),(6,5),(7,4);
/*!40000 ALTER TABLE `experiencias_disciplinas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game` (
  `idgame` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(200) NOT NULL,
  `valor` int(11) NOT NULL,
  PRIMARY KEY (`idgame`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (1,'Snake Game',200),(2,'Blackjack',21);
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rate`
--

DROP TABLE IF EXISTS `rate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rate` (
  `idexperiencia` int(11) NOT NULL,
  `idusuario` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `rate` int(11) NOT NULL,
  KEY `idusuario` (`idusuario`),
  KEY `idexperiencia` (`idexperiencia`),
  CONSTRAINT `rate_ibfk_1` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`idusuario`),
  CONSTRAINT `rate_ibfk_2` FOREIGN KEY (`idexperiencia`) REFERENCES `experiencia` (`idexperiencia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rate`
--

LOCK TABLES `rate` WRITE;
/*!40000 ALTER TABLE `rate` DISABLE KEYS */;
INSERT INTO `rate` VALUES (3,1,'2018-09-19 01:21:19',5),(3,1,'2018-09-19 01:31:07',5),(3,1,'2018-09-19 01:31:48',5),(5,1,'2018-09-19 01:35:40',5),(1,1,'2018-09-19 01:42:42',5),(5,1,'2018-09-19 01:43:06',5),(1,1,'2018-09-19 01:51:08',5),(2,1,'2018-09-19 01:51:17',5),(5,1,'2018-09-19 01:51:21',5),(1,17,'2018-09-19 02:01:40',5),(5,1,'2018-09-19 10:29:47',5),(1,1,'2018-09-19 12:20:31',5),(3,1,'2018-09-19 12:27:19',5),(2,1,'2018-09-19 12:27:54',5),(1,1,'2018-09-19 12:39:19',5),(1,1,'2018-09-19 12:40:23',5),(1,1,'2018-09-19 12:43:17',5),(1,1,'2018-09-19 13:01:01',5),(1,1,'2018-09-19 13:15:44',5),(1,1,'2018-09-19 13:16:26',5),(3,1,'2018-09-19 13:17:11',5),(3,1,'2018-09-19 13:58:50',5),(3,1,'2018-09-19 14:38:09',5),(3,1,'2018-09-19 16:45:23',5),(2,1,'2018-09-19 16:45:31',5),(1,1,'2018-09-19 16:45:38',5),(3,1,'2018-09-19 16:45:46',5),(4,1,'2018-09-19 16:48:24',5),(1,1,'2018-09-19 16:51:36',5),(3,1,'2018-09-19 17:11:58',5),(5,1,'2018-09-19 17:49:16',5),(3,1,'2018-09-19 17:50:37',5),(1,1,'2018-09-19 18:19:48',5),(1,1,'2018-09-19 18:21:16',5),(3,1,'2018-09-19 18:22:20',5),(2,1,'2018-09-19 19:01:50',5),(1,1,'2018-09-19 19:25:18',5),(5,1,'2018-09-19 19:28:37',5),(1,1,'2018-09-19 19:35:29',5),(3,1,'2018-09-19 19:37:57',5),(1,1,'2018-09-19 21:06:02',5),(4,1,'2018-09-19 21:23:57',5),(5,1,'2018-09-19 21:30:06',3),(1,1,'2018-09-20 11:41:10',5),(3,1,'2018-09-20 11:52:53',5),(3,1,'2018-09-20 13:11:14',3),(5,1,'2018-09-20 13:13:37',1),(3,1,'2018-09-20 13:25:17',5),(6,1,'2018-09-24 02:18:14',5),(3,1,'2018-09-25 00:08:25',5),(6,1,'2018-09-26 15:48:21',5),(6,20,'2018-09-26 16:46:07',5),(1,20,'2018-09-26 16:46:43',4),(3,20,'2018-09-26 16:47:25',5),(2,19,'2018-09-27 16:46:46',5),(5,1,'2018-10-01 22:40:44',4),(1,1,'2018-10-01 22:41:12',4),(2,1,'2018-10-01 22:41:28',4),(5,22,'2018-10-03 00:44:07',4),(1,22,'2018-10-03 00:44:20',4),(6,1,'2018-10-03 17:40:41',4),(1,1,'2018-10-03 17:44:29',4),(1,24,'2018-10-03 21:47:18',5),(6,1,'2018-10-03 22:40:35',4),(6,1,'2018-10-10 11:44:15',5),(3,25,'2018-10-10 22:57:54',5),(6,19,'2018-10-14 21:29:52',5);
/*!40000 ALTER TABLE `rate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `score`
--

DROP TABLE IF EXISTS `score`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `score` (
  `idgame` int(11) NOT NULL,
  `idusuario` int(11) NOT NULL,
  `pontuacao` int(11) NOT NULL,
  `horario` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `idusuario` (`idusuario`),
  KEY `idgame` (`idgame`),
  CONSTRAINT `score_ibfk_1` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`idusuario`),
  CONSTRAINT `score_ibfk_2` FOREIGN KEY (`idgame`) REFERENCES `game` (`idgame`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `score`
--

LOCK TABLES `score` WRITE;
/*!40000 ALTER TABLE `score` DISABLE KEYS */;
INSERT INTO `score` VALUES (1,1,71,'2018-10-03 17:35:35'),(1,1,2,'2018-10-03 20:06:44'),(1,1,23,'2018-10-03 20:08:06'),(1,23,1,'2018-10-04 13:23:50'),(1,23,1,'2018-10-04 13:24:08'),(1,23,9,'2018-10-04 13:24:41'),(1,1,2,'2018-10-09 17:49:37'),(1,1,1,'2018-10-10 11:44:53');
/*!40000 ALTER TABLE `score` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tokens` (
  `token` varchar(64) NOT NULL,
  `idusuario` int(11) NOT NULL,
  `expiracao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `idusuario` (`idusuario`),
  CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
INSERT INTO `tokens` VALUES ('fa83a11a198d5a7f0bf77a1987bcd006',1,'2018-10-15 03:05:36');
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transacao`
--

DROP TABLE IF EXISTS `transacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transacao` (
  `idusuario` int(11) NOT NULL,
  `valor` int(11) NOT NULL,
  `horario` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `idusuario` (`idusuario`),
  CONSTRAINT `transacao_ibfk_1` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transacao`
--

LOCK TABLES `transacao` WRITE;
/*!40000 ALTER TABLE `transacao` DISABLE KEYS */;
INSERT INTO `transacao` VALUES (1,100,'2018-09-19 01:42:42'),(1,100,'2018-09-19 01:43:06'),(1,100,'2018-09-19 01:51:17'),(17,100,'2018-09-19 02:01:40'),(1,100,'2018-09-19 12:27:19'),(1,100,'2018-09-19 13:10:40'),(1,100,'2018-09-23 03:28:41'),(1,100,'2018-09-23 14:39:25'),(1,100,'2018-09-23 15:02:36'),(1,100,'2018-09-25 17:37:26'),(1,100,'2018-09-25 17:43:35'),(1,100,'2018-09-25 23:41:13'),(20,100,'2018-09-26 16:46:07'),(20,100,'2018-09-26 16:46:43'),(20,100,'2018-09-26 16:47:25'),(1,500,'2018-09-27 01:44:51'),(1,-400,'2018-09-27 01:46:09'),(19,100,'2018-09-27 16:46:47'),(21,100,'2018-09-28 16:36:35'),(21,100,'2018-09-28 16:37:22'),(21,100,'2018-09-28 16:38:06'),(1,-300,'2018-10-01 18:42:09'),(22,100,'2018-10-03 00:44:07'),(22,100,'2018-10-03 00:44:20'),(24,100,'2018-10-03 21:47:18'),(23,100,'2018-10-04 13:20:50'),(23,100,'2018-10-04 13:23:20'),(25,100,'2018-10-10 22:57:55'),(1,-1,'2018-10-14 18:29:13'),(1,-1,'2018-10-14 18:29:30'),(1,2,'2018-10-14 18:29:38'),(1,2,'2018-10-14 18:30:10'),(1,-1,'2018-10-14 18:31:39'),(1,-1,'2018-10-14 18:31:44'),(1,-1,'2018-10-14 18:31:46'),(1,-1,'2018-10-14 18:31:50'),(1,-1,'2018-10-14 18:31:56'),(1,-1,'2018-10-14 18:32:00'),(1,2,'2018-10-14 18:32:03'),(1,2,'2018-10-14 18:32:14'),(1,-1,'2018-10-14 18:33:14'),(1,-1,'2018-10-14 18:33:19'),(1,2,'2018-10-14 18:33:23'),(1,-21,'2018-10-14 18:46:50'),(1,-1,'2018-10-14 19:09:07'),(1,-1,'2018-10-14 19:09:28'),(1,10,'2018-10-14 21:17:13'),(1,-5,'2018-10-14 21:17:17'),(1,10,'2018-10-14 21:17:25'),(1,10,'2018-10-14 21:17:30'),(1,10,'2018-10-14 21:17:38'),(1,-5,'2018-10-14 21:17:42'),(1,10,'2018-10-14 21:17:52'),(1,10,'2018-10-14 21:17:56'),(1,2,'2018-10-14 21:20:04'),(1,-1,'2018-10-14 21:20:08'),(1,-1,'2018-10-14 21:20:16'),(1,2,'2018-10-14 21:20:23'),(1,-1,'2018-10-14 21:20:28'),(1,2,'2018-10-14 21:20:33'),(1,-20,'2018-10-14 21:20:49'),(1,-20,'2018-10-14 21:20:56'),(1,40,'2018-10-14 21:20:59'),(1,40,'2018-10-14 21:21:02'),(1,-20,'2018-10-14 21:21:08'),(1,-20,'2018-10-14 21:21:12'),(1,40,'2018-10-14 21:21:18'),(1,40,'2018-10-14 21:21:22'),(1,-20,'2018-10-14 21:21:26'),(1,40,'2018-10-14 21:21:34'),(1,-1,'2018-10-14 21:23:42'),(1,2,'2018-10-14 21:23:46'),(1,-1,'2018-10-14 21:27:27'),(1,2,'2018-10-14 21:27:29'),(1,-1,'2018-10-14 21:27:33'),(1,-1,'2018-10-14 21:27:35'),(1,2,'2018-10-14 21:27:41'),(19,100,'2018-10-14 21:29:52');
/*!40000 ALTER TABLE `transacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `idusuario` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(120) NOT NULL,
  `email` varchar(120) NOT NULL,
  `senha` varchar(64) NOT NULL,
  `avatar` int(11) NOT NULL DEFAULT '12',
  PRIMARY KEY (`idusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'João Vitor Maia','joaocampo2102@gmail.com','36555aab5a4ec85c45ad24d67b388365b6713c9a44b2d3d464b5c046a844cb1b',11),(17,'Teste','teste','15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225',12),(18,'Daniel','danielbecker.bortoluzzi@gmail.com','6fab629f08754a4889934bf6495bc9eb036da99b62dedbc0364ecc9706014e4a',12),(19,'Leticia Lidia','leticialidiavoltolini@gmail.com','7b56ad4713c155d35c1bd763a650170011b227742877f9adad875f13c2ce1ac3',9),(20,'Jojo','leviosar','0bfb1575ecbe222d7f1ee880f5cdfb3fda794e9364a044c4d73e843ccf288e13',13),(21,'Christian Barlera','christian.barlera2@gmail.com','91acbd7c06039501373277b40a534502508afb91531ac19732cb7c516d03961f',12),(22,'Dayane Maia','daycampo2@hotmail.com','15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225',6),(23,'mateus','connorkenway753@gmail.com','6238150a1175ccb6845df6a1f2394fcc1c179fc431f48edfa1b34c7b7f39e51e',12),(24,'Richard Espíndola','richardpancada09@outlook.com','f9c6a9184b02c81d0d1275d063c6983804f1e3ae85dd71146fda3367c3f059cf',12),(25,'Cezar','cezar08@unochapeco.edu.br','3d14c2d4e4ced81e459e4ace7c01466a700000fb94a3bbe944a55fb92693e879',12),(26,'João Vitor Rodrigues','a@a..com','ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',12),(27,'','jooj@a.com','61be55a8e2f6b4e172338bddf184d6dbee29c98853e0a0485ecee7f27b9af0b4',12),(28,'Teste','joaoc','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f',12),(29,'Natália','natalia.g.riss@gmail.com','700b6b3bb4b5f5e7aec39177d6ce462a27f1bfe56a2243f4162c5db53f0744f8',12);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_badge`
--

DROP TABLE IF EXISTS `usuario_badge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario_badge` (
  `idusuario` int(11) NOT NULL,
  `idbadge` int(11) NOT NULL,
  KEY `idusuario` (`idusuario`),
  KEY `idbadge` (`idbadge`),
  CONSTRAINT `usuario_badge_ibfk_1` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`idusuario`),
  CONSTRAINT `usuario_badge_ibfk_2` FOREIGN KEY (`idbadge`) REFERENCES `badge` (`idbadge`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_badge`
--

LOCK TABLES `usuario_badge` WRITE;
/*!40000 ALTER TABLE `usuario_badge` DISABLE KEYS */;
INSERT INTO `usuario_badge` VALUES (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(1,10),(1,11),(1,12),(1,13),(1,14),(17,14),(17,7),(20,14),(20,7),(20,8),(19,14),(19,7),(21,14),(21,6),(21,7),(21,8),(22,14),(22,8),(22,7),(24,14),(24,7),(23,14),(23,8),(23,7),(25,14),(25,6),(19,6);
/*!40000 ALTER TABLE `usuario_badge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_experiencia`
--

DROP TABLE IF EXISTS `usuario_experiencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario_experiencia` (
  `idusuario` int(11) NOT NULL,
  `idexperiencia` int(11) NOT NULL,
  KEY `idusuario` (`idusuario`),
  KEY `idexperiencia` (`idexperiencia`),
  CONSTRAINT `usuario_experiencia_ibfk_1` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`idusuario`),
  CONSTRAINT `usuario_experiencia_ibfk_2` FOREIGN KEY (`idexperiencia`) REFERENCES `experiencia` (`idexperiencia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_experiencia`
--

LOCK TABLES `usuario_experiencia` WRITE;
/*!40000 ALTER TABLE `usuario_experiencia` DISABLE KEYS */;
INSERT INTO `usuario_experiencia` VALUES (1,1),(1,5),(1,2),(17,1),(1,3),(1,4),(1,6),(20,6),(20,1),(20,3),(19,2),(21,3),(21,1),(21,5),(22,5),(22,1),(24,1),(23,5),(23,1),(25,3),(19,6);
/*!40000 ALTER TABLE `usuario_experiencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_game`
--

DROP TABLE IF EXISTS `usuario_game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario_game` (
  `idgame` int(11) NOT NULL,
  `idusuario` int(11) NOT NULL,
  KEY `idusuario` (`idusuario`),
  KEY `idgame` (`idgame`),
  CONSTRAINT `usuario_game_ibfk_1` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`idusuario`),
  CONSTRAINT `usuario_game_ibfk_2` FOREIGN KEY (`idgame`) REFERENCES `game` (`idgame`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_game`
--

LOCK TABLES `usuario_game` WRITE;
/*!40000 ALTER TABLE `usuario_game` DISABLE KEYS */;
INSERT INTO `usuario_game` VALUES (1,1),(2,1);
/*!40000 ALTER TABLE `usuario_game` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-15 20:48:52
