CREATE DATABASE  IF NOT EXISTS `pitusserie_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `pitusserie_db`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: pitusserie_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.13-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `categorie` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Tortas'),(2,'Cookies'),(3,'Cakepops'),(4,'Caja de Regalo'),(5,'Opcionales'),(6,'Cup Cakes');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_user`
--

DROP TABLE IF EXISTS `product_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_products` int(11) unsigned NOT NULL,
  `id_users` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_user`
--

LOCK TABLES `product_user` WRITE;
/*!40000 ALTER TABLE `product_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `categorie_id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` int(11) unsigned NOT NULL,
  `img` varchar(255) NOT NULL,
  `slices` int(11) unsigned DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `sub_categorie_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (21,4,'Personalizada',1250,'1598378995182.jpeg',0,'Caja Desayuno',0),(22,4,'2',1250,'1598379078488.jpeg',0,'Caja Mix 2',0),(23,4,'3',1250,'1598379156920.jpeg',0,'Caja Mix 3',0),(24,4,'Mechi A',1250,'1598379527997.jpeg',0,'Caja Mix Mechi A',0),(25,4,'Mechi B',1250,'1598379621084.jpeg',0,'Caja Mix Mechi B',0),(26,4,'Mechi C',1250,'1598379642095.jpeg',0,'Caja Mix Mechi C',0),(27,4,'1',900,'1598379692707.jpeg',0,'Caja Regalo Chica',0),(28,4,'2',1250,'1598379753814.jpeg',0,'Caja Regalo Mediana',0),(29,4,'3',1800,'1598379776908.jpeg',0,'Caja Regalo Grande',0),(30,4,'lorem ipsum',900,'1598379808184.jpeg',0,'Cajas',0),(31,3,'1',750,'1598379849408.jpeg',12,'Cake Pops 1',0),(32,3,'2',750,'1598379870479.jpeg',12,'Cake Pops 2',0),(33,2,'lorem ipsum',420,'1598379903897.jpeg',12,'Cookie Chips',1),(34,2,'Animales del Bosque',1100,'1598379973637.jpeg',12,'Cookies Animales del Bosque',2),(35,2,'Bebe',1100,'1598380004908.jpeg',12,'Cookies Bebe',2),(36,2,'Bob Esponja',1100,'1598380044595.jpeg',12,'Cookies Bob Esponja',2),(37,2,'Mohana',1100,'1598380072690.jpeg',12,'Cookies Mohana',2),(38,2,'Niños',1100,'1598380117835.jpeg',12,'Cookies Niños',2),(39,2,'Piratas',1100,'1598380177151.jpeg',12,'Cookies Piratas',2),(40,2,'lorem ipsum',60,'1598380221962.jpeg',1,'Oreos Bañadas',3),(41,6,'1',1500,'1598380296633.jpeg',12,'Cup Cakes 1',0),(42,6,'2',1500,'1598380315586.jpeg',12,'Cup Cakes 2',0),(43,1,'Con dulce de leche y chocolate',1000,'1598380383958.jpeg',0,'Brownie 15x15',4),(44,1,'Con cookies',1300,'1598380443567.jpeg',0,'Brownie 15x15 mini Combo',4),(45,1,'Con dulce de leche y chocolate',1500,'1598380484858.jpeg',0,'Brownie Entero 1',4),(46,1,'lorem ipsum',2100,'1598380604687.jpeg',10,'Torta Buttercream',5),(47,1,'J',1700,'1598380659662.jpeg',0,'Cookie Cake J',6),(48,1,'C',1700,'1598380701831.jpeg',0,'Cookie Cake C',6),(49,1,'<3',650,'1598380742852.jpeg',0,'Mini Cookie Cake Corazon',6),(50,1,'Patricio',650,'1598380784941.jpeg',0,'Mini Cookie Cake Estrella',6),(51,1,'Rellenos para elegir',2400,'1598380831416.jpeg',12,'Alice in Wonderland',7),(52,1,'Rellenos para elegir',2400,'1598380858912.jpeg',12,'Baby Tv',7),(53,1,'Rellenos para elegir',2400,'1598380908924.jpeg',12,'Descendientes',7),(54,1,'Rellenos para elegir',2400,'1598380935407.jpeg',12,'Dior',7),(55,1,'miau',2400,'1598380959754.jpeg',12,'Gato',7),(56,1,'Rellenos para elegir',2400,'1598380991114.jpeg',12,'Iron Man',7),(57,1,'Rellenos para elegir',2400,'1598381014548.jpeg',12,'Mujer Maravilla',7),(58,1,'Rellenos para elegir',2400,'1598381142718.jpeg',12,'Paw Patrol',7),(59,1,'Rellenos para elegir',2400,'1598381247750.jpeg',12,'Pirata',7),(60,1,'Rellenos para elegir',2400,'1598381270746.jpeg',12,'Unicornio',7),(61,5,'Hay para elejir',200,'1598381371688.jpeg',0,'Adorno Porcelana',0),(62,5,'lorem ipsum',600,'1598381399711.jpeg',0,'Banderin Pared',0),(63,5,'Para elegir',560,'1598381444884.jpeg',3,'Globos',0),(64,5,'lorem ipsum',320,'1598381482202.jpeg',0,'Maceta',0),(65,5,'lorem ipsum',600,'1598381522058.jpeg',0,'Piñata',0),(66,5,'A',150,'1598381549825.jpeg',0,'Pochoclera',0),(67,5,'lorem ipsum',350,'1598381587542.jpeg',0,'Tarjeta Personalizada',0),(68,5,'lorem ipsum',400,'1598381623264.jpeg',0,'Tazas',0),(69,5,'lorem ipsum',400,'1598381649579.jpeg',0,'Toppers',0);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subcategories` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `sub_categorie` varchar(255) NOT NULL,
  `categorie_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES (1,'Cookies Chips',2),(2,'Cookies Decoradas',2),(3,'Oreos Bañadas',2),(4,'Brownies',1),(5,'Buttercream',1),(6,'Cookie Cakes',1),(7,'Fondant',1);
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `dni` int(255) NOT NULL,
  `phone` int(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dni_UNIQUE` (`dni`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (15,'administrador','administrador',11111111,11111111,'administrador@administrador.com','$2b$10$TC8lxteSDX4neHhDgRJGd.gcyBgkfwa5ZM7eXezYeAqMxjT03g/4a','1598385902116.jpg',1),(16,'usuario','usuario',222222222,22222222,'usuario@usuario.com','$2b$10$5bl08bzQTaelaDzDsqmGPuKtLQ0ZqVomjXdipjLhZSqlDmgXKaBcq','1598385979278.jpg',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-25 18:00:38
