-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: my_db
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `email_templates`
--

DROP TABLE IF EXISTS `email_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_templates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `templateName` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `text` text,
  `htmlContent` text NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_templates`
--

LOCK TABLES `email_templates` WRITE;
/*!40000 ALTER TABLE `email_templates` DISABLE KEYS */;
INSERT INTO `email_templates` VALUES (1,'Registro de Usuario','¡Bienvenido a nuestro Centro de Fisioterapia!','¡Bienvenido a nuestro Centro de Fisioterapia!','<h1>¡Hola {{name}}! Bienvenido a <strong>CREFI</strong></h1><p>Nos alegra mucho que te hayas registrado en nuestro Centro de Fisioterapia. Estamos comprometidos con tu bienestar y salud.</p><p>Si tienes alguna consulta o necesitas ayuda, no dudes en <a href=\"mailto:crefi@giomr.site\" rel=\"noopener noreferrer\" target=\"_blank\">contactarnos</a>. Estamos aquí para apoyarte.</p><p>¡Bienvenido a nuestra familia!</p><p>Atentamente,</p><p>El equipo de tu Centro de Fisioterapia</p>','2025-01-27 10:42:56.451265'),(2,'Cita Programada','Tu turno ha sido programado exitosamente','Hola {{name}},\n      \n      Tu turno ha sido programado exitosamente en el Centro de Fisioterapia:\n      \n      🗓 Fecha y hora: {{formattedDate}}\n      👩‍⚕️ Profesional: {{professionalName}}\n      📝 Motivo: {{description}}\n      📄 Estado: {{status}}\n      \n      Si tienes preguntas o necesitas reprogramar, por favor contáctanos.\n      \n      Gracias por confiar en nosotros.\n      \n      Centro de Fisioterapia [Nombre del Centro]\n      Teléfono: [Número de teléfono]\n      Correo: [Correo electrónico]','<p>Hola {{name}},</p><p>Tu turno ha sido programado exitosamente en el Centro de Fisioterapia:</p><ul><li>🗓 <strong>Fecha y hora:</strong> {{formattedDate}}</li><li>👩‍⚕️ <strong>Profesional:</strong> {{professionalName}}</li><li>📝 <strong>Motivo:</strong> {{description}}</li><li>📄 <strong>Estado:</strong> {{status}}</li></ul><p>Si tienes preguntas o necesitas reprogramar, por favor contáctanos.</p><p>Gracias por confiar en nosotros.</p><p><strong>Centro de Fisioterapia CREFI</strong></p><p>Correo: crefi@giomr.site</p>','2025-01-27 10:42:56.469754');
/*!40000 ALTER TABLE `email_templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `municipality`
--

DROP TABLE IF EXISTS `municipality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `municipality` (
  `id` int NOT NULL AUTO_INCREMENT,
  `department` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `municipality`
--

LOCK TABLES `municipality` WRITE;
/*!40000 ALTER TABLE `municipality` DISABLE KEYS */;
INSERT INTO `municipality` VALUES (1,'Amazonas','Leticia'),(2,'Amazonas','Puerto Nariño'),(3,'Antioquia','Abejorral'),(4,'Antioquia','Abriaquí');
/*!40000 ALTER TABLE `municipality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket` (
  `id` int NOT NULL AUTO_INCREMENT,
  `transport_contract` varchar(50) NOT NULL,
  `order_number` varchar(50) NOT NULL,
  `main_diagnosis` varchar(255) NOT NULL,
  `client` varchar(255) NOT NULL,
  `patient_name` varchar(255) NOT NULL,
  `id_card` varchar(50) NOT NULL,
  `user_phone` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `origin` varchar(255) NOT NULL,
  `destination` varchar(255) NOT NULL,
  `itinerary` varchar(255) NOT NULL,
  `quantity` int NOT NULL,
  `travel_date` date DEFAULT NULL,
  `value` decimal(10,2) NOT NULL,
  `net_value` decimal(10,2) NOT NULL,
  `check` varchar(255) NOT NULL,
  `remarks` text,
  `status` enum('pendiente','aprobado','cancelado') NOT NULL DEFAULT 'pendiente',
  `image` varchar(255) DEFAULT NULL,
  `transportId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_fd2e7d8942ed861256659e9183` (`transport_contract`),
  UNIQUE KEY `IDX_59e7d78f044f0b28b239ab17ba` (`order_number`),
  KEY `FK_8ccf2f56e848d86501fb95db4e2` (`transportId`),
  CONSTRAINT `FK_8ccf2f56e848d86501fb95db4e2` FOREIGN KEY (`transportId`) REFERENCES `transport` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transport`
--

DROP TABLE IF EXISTS `transport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transport` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `whatsapp` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `website` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT 'https://bit.ly/fgpImg2',
  `registration_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_a6cd6cc9f9fc8e2ba148a2e5f7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transport`
--

LOCK TABLES `transport` WRITE;
/*!40000 ALTER TABLE `transport` DISABLE KEYS */;
INSERT INTO `transport` VALUES (1,'Copetran','copetran','987987987','contact@copetran.com','https://copetran.com','https://bit.ly/fgpImg2','2025-01-11 19:00:00'),(2,'Cootransunidos','cootransunidos','987987988','contact@cootransunidos.com','https://cootransunidos.com','https://bit.ly/fgpImg2','2025-01-11 19:00:00'),(3,'Cotaxi','cotaxi','987987989','contact@cotaxi.com','https://cotaxi.com','https://bit.ly/fgpImg2','2025-01-11 19:00:00'),(4,'Cootransmagdalena','cootransmagdalena','987987990','contact@cootransmagdalena.com','https://cootransmagdalena.com','https://bit.ly/fgpImg2','2025-01-11 19:00:00'),(5,'Transsander','transsander','987987991','contact@transsander.com','https://transsander.com','https://bit.ly/fgpImg2','2025-01-11 19:00:00'),(6,'Concorde','concorde','987987992','contact@concorde.com','https://concorde.com','https://bit.ly/fgpImg2','2025-01-11 19:00:00'),(7,'Transricaurte','transricaurte','987987993','contact@transricaurte.com','https://transricaurte.com','https://bit.ly/fgpImg2','2025-01-11 19:00:00'),(8,'Catatumbo','catatumbo','987987994','contact@catatumbo.com','https://catatumbo.com','https://bit.ly/fgpImg2','2025-01-11 19:00:00'),(9,'Cotrans','cotrans','987987995','contact@cotrans.com','https://cotrans.com','https://bit.ly/fgpImg2','2025-01-11 19:00:00'),(10,'Sotracor','sotracor','987987996','contact@sotracor.com','https://sotracor.com','https://bit.ly/fgpImg2','2025-01-11 19:00:00'),(11,'Traescor','traescor','987987997','contact@traescor.com','https://traescor.com','https://bit.ly/fgpImg2','2025-01-11 19:00:00'),(12,'Ballegom','ballegom','987987998','contact@ballegom.com','https://ballegom.com','https://bit.ly/fgpImg2','2025-01-11 19:00:00'),(13,'Cotransar','cotransar','987987999','contact@cotransar.com','https://cotransar.com','https://bit.ly/fgpImg2','2025-01-11 19:00:00'),(14,'Cootransmor','cootransmor','987988000','contact@cootransmor.com','https://cootransmor.com','https://bit.ly/fgpImg2','2025-01-11 19:00:00'),(15,'Sotramagdalena','sotramagdalena','987988001','contact@sotramagdalena.com','https://sotramagdalena.com','https://bit.ly/fgpImg2','2025-01-11 19:00:00'),(16,'Cotrasangil','cotrasangil','987988002','contact@cotrasangil.com','https://cotrasangil.com','https://bit.ly/fgpImg2','2025-01-11 19:00:00'),(17,'Cotrasaravita','cotrasaravita','987988003','contact@cotrasaravita.com','https://cotrasaravita.com','https://bit.ly/fgpImg2','2025-01-11 19:00:00'),(18,'Cotranstame','cotranstame','987988004','contact@cotranstame.com','https://cotranstame.com','https://bit.ly/fgpImg2','2025-01-11 19:00:00'),(19,'Cotranal','cotranal','987988005','contact@cotranal.com','https://cotranal.com','https://bit.ly/fgpImg2','2025-01-11 19:00:00'),(20,'Motilones','motilones','987988006','contact@motilones.com','https://motilones.com','https://bit.ly/fgpImg2','2025-01-11 19:00:00'),(21,'Cooptmotilon','cooptmotilon','987988007','contact@cooptmotilon.com','https://cooptmotilon.com','https://bit.ly/fgpImg2','2025-01-11 19:00:00');
/*!40000 ALTER TABLE `transport` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `whatsapp` varchar(255) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT 'https://bit.ly/fgpImg1',
  `role` enum('user','professional','admin') NOT NULL DEFAULT 'user',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `transportId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_96adb33e8ee29591eb2864916f2` (`transportId`),
  CONSTRAINT `FK_96adb33e8ee29591eb2864916f2` FOREIGN KEY (`transportId`) REFERENCES `transport` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'User','Admin','admin123@gmail.com','999888777','username1','$2b$10$duZXL6rT3yDSDM7iKRzRCO21R60Ig1ILzzHeVR1TFluKbCd/1w0k2','https://bit.ly/fgpImg1','admin','2025-01-27 10:42:56.772760',1),(2,'Juan','Lopez','user123@gmail.com','+51222333444','user_lionel','$2b$10$duZXL6rT3yDSDM7iKRzRCO21R60Ig1ILzzHeVR1TFluKbCd/1w0k2','https://bit.ly/fgpImg1','user','2025-01-27 10:42:56.781932',2),(3,'Maria','Gomez','cotaxi10@cotaxi.com','+51244566789','maria_g','$2b$10$duZXL6rT3yDSDM7iKRzRCO21R60Ig1ILzzHeVR1TFluKbCd/1w0k2','https://bit.ly/fgpImg1','user','2025-01-27 10:42:56.789112',3),(4,'Carlos','Martinez','copetran3@copetran.com','+51233445566','carlosm','$2b$10$duZXL6rT3yDSDM7iKRzRCO21R60Ig1ILzzHeVR1TFluKbCd/1w0k2','https://bit.ly/fgpImg1','user','2025-01-27 10:42:56.798169',1),(5,'Ana','Perez','cootransunidos7@cootransunidos.com','+51222334455','ana_perez','$2b$10$duZXL6rT3yDSDM7iKRzRCO21R60Ig1ILzzHeVR1TFluKbCd/1w0k2','https://bit.ly/fgpImg1','user','2025-01-27 10:42:56.806185',2),(6,'Luis','Ramirez','cotaxi6@cotaxi.com','+51233446677','luis_r','$2b$10$duZXL6rT3yDSDM7iKRzRCO21R60Ig1ILzzHeVR1TFluKbCd/1w0k2','https://bit.ly/fgpImg1','admin','2025-01-27 10:42:56.815220',3),(7,'Sofia','Lopez','copetran4@copetran.com','+51255667788','sofia_lopez','$2b$10$duZXL6rT3yDSDM7iKRzRCO21R60Ig1ILzzHeVR1TFluKbCd/1w0k2','https://bit.ly/fgpImg1','user','2025-01-27 10:42:56.822909',1),(8,'Pedro','Garcia','cootransunidos3@cootransunidos.com','+51266778899','pedro_g','$2b$10$duZXL6rT3yDSDM7iKRzRCO21R60Ig1ILzzHeVR1TFluKbCd/1w0k2','https://bit.ly/fgpImg1','user','2025-01-27 10:42:56.832391',2),(9,'Laura','Fernandez','cotaxi2@cotaxi.com','+51277889900','laura_fernandez','$2b$10$duZXL6rT3yDSDM7iKRzRCO21R60Ig1ILzzHeVR1TFluKbCd/1w0k2','https://bit.ly/fgpImg1','user','2025-01-27 10:42:56.841895',3),(10,'Frank','GP','fgp555@gmail.com','+51288990011','frankgp','$2b$10$duZXL6rT3yDSDM7iKRzRCO21R60Ig1ILzzHeVR1TFluKbCd/1w0k2','https://bit.ly/fgpImg1','admin','2025-01-27 10:42:56.849970',1);
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

-- Dump completed on 2025-01-27 10:43:59
