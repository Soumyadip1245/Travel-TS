CREATE DATABASE  IF NOT EXISTS `travel` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `travel`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: travel
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `__efmigrationshistory`
--

DROP TABLE IF EXISTS `__efmigrationshistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ProductVersion` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__efmigrationshistory`
--

LOCK TABLES `__efmigrationshistory` WRITE;
/*!40000 ALTER TABLE `__efmigrationshistory` DISABLE KEYS */;
INSERT INTO `__efmigrationshistory` VALUES ('20240901125429_initial','8.0.8'),('20240901130231_update-Destination','8.0.8'),('20240902172246_update-booking','8.0.8'),('20240902172346_update-booking12','8.0.8'),('20240903092644_initialOp','8.0.8'),('20240903145503_added-archive','8.0.8'),('20240903152248_added-featured','8.0.8'),('20240904093603_added-UploadItinery','8.0.8'),('20240905151624_initial-create','8.0.8'),('20240906041526_update-database','8.0.8'),('20240909062230_added-Website','8.0.8'),('20240909064104_intital-changes','8.0.8'),('20240918045319_add-date','8.0.8'),('20240919070438_initial-react','8.0.8');
/*!40000 ALTER TABLE `__efmigrationshistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AccommodationDetail`
--

DROP TABLE IF EXISTS `AccommodationDetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AccommodationDetail` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `HotelName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `RoomType` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CheckInDate` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `CheckOutDate` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Priority` int NOT NULL,
  `PackageId` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_AccommodationDetail_PackageId` (`PackageId`),
  CONSTRAINT `FK_AccommodationDetail_Package_PackageId` FOREIGN KEY (`PackageId`) REFERENCES `Package` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AccommodationDetail`
--

LOCK TABLES `AccommodationDetail` WRITE;
/*!40000 ALTER TABLE `AccommodationDetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `AccommodationDetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Bookings`
--

DROP TABLE IF EXISTS `Bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Bookings` (
  `BookingId` int NOT NULL AUTO_INCREMENT,
  `PackageId` int NOT NULL,
  `UserId` int NOT NULL,
  `BookingDate` datetime(6) NOT NULL,
  `StartDate` datetime(6) NOT NULL,
  `EndDate` datetime(6) NOT NULL,
  `NumberOfAdults` int NOT NULL,
  `NumberOfChildren` int NOT NULL,
  `TotalPrice` decimal(65,30) NOT NULL,
  `SupplierPaymentAmount` decimal(65,30) NOT NULL,
  `SpecialRequests` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `PaymentId` int DEFAULT NULL,
  `Status` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ConfirmationNumber` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `IsCustomerDetailsVisible` tinyint(1) NOT NULL,
  `SupplierId` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`BookingId`),
  KEY `IX_Bookings_PackageId` (`PackageId`),
  KEY `IX_Bookings_PaymentId` (`PaymentId`),
  KEY `IX_Bookings_UserId` (`UserId`),
  KEY `IX_Bookings_SupplierId` (`SupplierId`),
  CONSTRAINT `FK_Bookings_Package_PackageId` FOREIGN KEY (`PackageId`) REFERENCES `Package` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_Bookings_Payment_PaymentId` FOREIGN KEY (`PaymentId`) REFERENCES `Payment` (`Id`),
  CONSTRAINT `FK_Bookings_User_SupplierId` FOREIGN KEY (`SupplierId`) REFERENCES `User` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_Bookings_User_UserId` FOREIGN KEY (`UserId`) REFERENCES `User` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Bookings`
--

LOCK TABLES `Bookings` WRITE;
/*!40000 ALTER TABLE `Bookings` DISABLE KEYS */;
INSERT INTO `Bookings` VALUES (1,1,3,'2024-09-21 18:48:25.133289','2024-09-24 00:00:00.000000','2024-09-27 00:00:00.000000',1,1,495600.000000000000000000000000000000,420000.000000000000000000000000000000,'Make arrangement top-notch and top-tier',NULL,'Approved',NULL,0,2),(2,1,3,'2024-09-21 18:51:03.073134','2024-09-24 00:00:00.000000','2024-10-15 00:00:00.000000',1,1,3469200.000000000000000000000000000000,2940000.000000000000000000000000000000,'',NULL,'Rejected',NULL,0,2),(3,1,3,'2024-09-22 07:59:27.427217','2024-09-24 00:00:00.000000','2024-09-28 00:00:00.000000',1,1,660800.000000000000000000000000000000,560000.000000000000000000000000000000,'Make arrangement special and top notch',NULL,'Approved',NULL,0,2),(4,12,3,'2024-09-22 08:12:00.410827','2024-09-24 00:00:00.000000','2024-09-28 00:00:00.000000',1,1,94400.000000000000000000000000000000,80000.000000000000000000000000000000,'',1,'Confirmed',NULL,0,2);
/*!40000 ALTER TABLE `Bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Destination`
--

DROP TABLE IF EXISTS `Destination`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Destination` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Country` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Destination`
--

LOCK TABLES `Destination` WRITE;
/*!40000 ALTER TABLE `Destination` DISABLE KEYS */;
INSERT INTO `Destination` VALUES (1,'Paris','France','A popular travel Destination in Europe, known for the Eiffel Tower.','2024-09-19 13:17:17.695035'),(2,'Tokyo','Japan','A bustling metropolis and cultural hub in Japan.','2024-09-19 13:17:17.695204'),(3,'Rio de Janeiro','Brazil','Famous for its Carnival festival and Christ the Redeemer statue.','2024-09-19 13:17:17.695204'),(4,'Sydney','Australia','Known for the Sydney Opera House and Harbour Bridge.','2024-09-19 13:17:17.695205'),(5,'Rome','Italy','Home to ancient ruins, including the Colosseum and the Vatican.','2024-09-19 13:17:17.695205'),(6,'Toronto','Canada','A major Canadian city known for the CN Tower and multiculturalism.','2024-09-19 13:17:17.695206'),(7,'New Delhi','India','India\'s capital, known for its rich history and landmarks like the Red Fort.','2024-09-19 13:17:17.695208'),(8,'New York City','United States','Known for Times Square, Central Park, and the Statue of Liberty.','2024-09-19 13:17:17.695208'),(9,'Cairo','Egypt','Home to the Pyramids of Giza and ancient Egyptian civilization.','2024-09-19 13:17:17.695208'),(10,'Cape Town','South Africa','Famous for Table Mountain and its beautiful coastal scenery.','2024-09-19 13:17:17.695209'),(11,'Dubai','United Arab Emirates','Known for its modern architecture, shopping, and desert safaris.','2024-09-19 13:17:17.695209'),(12,'Bangkok','Thailand','Thailand\'s capital, famous for its vibrant street life and temples.','2024-09-19 13:17:17.695209'),(13,'Istanbul','Turkey','A city that bridges Europe and Asia, rich in history and culture.','2024-09-19 13:17:17.695209'),(14,'Singapore','Singapore','A global financial hub known for its cleanliness and modern architecture.','2024-09-19 13:17:17.695209'),(15,'Hong Kong','China','Known for its skyline and deep natural harbor.','2024-09-19 13:17:17.695209'),(16,'Barcelona','Spain','Famous for its art and architecture, especially the works of Gaudí.','2024-09-19 13:17:17.695209'),(17,'Berlin','Germany','Germany\'s capital, known for its historical sites like the Berlin Wall.','2024-09-19 13:17:17.695209'),(18,'Moscow','Russia','Russia\'s capital, known for the Kremlin and Red Square.','2024-09-19 13:17:17.695209'),(19,'Athens','Greece','Known for its ancient landmarks like the Parthenon.','2024-09-19 13:17:17.695209'),(20,'Seoul','South Korea','A vibrant city known for its pop culture and technology.','2024-09-19 13:17:17.695209'),(21,'Mexico City','Mexico','The capital of Mexico, known for its rich history and culture.','2024-09-19 13:17:17.695209'),(22,'Buenos Aires','Argentina','Famous for its European-style architecture and tango dance.','2024-09-19 13:17:17.695210'),(23,'Lisbon','Portugal','Known for its hilly, coastal landscape and historic sites.','2024-09-19 13:17:17.695210'),(24,'Amsterdam','Netherlands','Known for its canals, museums, and liberal culture.','2024-09-19 13:17:17.695210'),(25,'Vienna','Austria','Famous for its classical music heritage and historic architecture.','2024-09-19 13:17:17.695210'),(26,'Zurich','Switzerland','A global banking hub known for its beautiful lakes and mountains.','2024-09-19 13:17:17.695210'),(27,'Stockholm','Sweden','Sweden\'s capital, known for its archipelago and vibrant culture.','2024-09-19 13:17:17.695210'),(28,'Copenhagen','Denmark','Known for its design, architecture, and the Little Mermaid statue.','2024-09-19 13:17:17.695210'),(29,'Helsinki','Finland','Finland\'s capital, known for its modern architecture and design.','2024-09-19 13:17:17.695210'),(30,'Oslo','Norway','Norway\'s capital, known for its green spaces and museums.','2024-09-19 13:17:17.695210'),(31,'Reykjavik','Iceland','Iceland\'s capital, known for its proximity to natural wonders.','2024-09-19 13:17:17.695210'),(32,'Dubai','United Arab Emirates','Known for its luxury shopping, ultramodern architecture, and lively nightlife.','2024-09-19 13:17:17.695210'),(33,'Kuala Lumpur','Malaysia','Known for its iconic Petronas Twin Towers and diverse culture.','2024-09-19 13:17:17.695210'),(34,'Beijing','China','China\'s capital, known for its historical sites like the Great Wall and Forbidden City.','2024-09-19 13:17:17.695210'),(35,'Shanghai','China','China\'s largest city, known for its modern skyline and historic landmarks.','2024-09-19 13:17:17.695211'),(36,'Rio de Janeiro','Brazil','Known for its beaches, Carnaval festival, and Christ the Redeemer statue.','2024-09-19 13:17:17.695211'),(37,'Los Angeles','United States','Known for Hollywood and the entertainment industry.','2024-09-19 13:17:17.695211'),(38,'San Francisco','United States','Known for the Golden Gate Bridge and its tech industry.','2024-09-19 13:17:17.695211'),(39,'Chicago','United States','Known for its architecture and vibrant arts scene.','2024-09-19 13:17:17.695211'),(40,'Miami','United States','Known for its beaches, nightlife, and cultural diversity.','2024-09-19 13:17:17.695211');
/*!40000 ALTER TABLE `Destination` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FlightDetail`
--

DROP TABLE IF EXISTS `FlightDetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FlightDetail` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `FlightName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `FlightNumber` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `DepartureDate` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `ArrivalDate` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Priority` int NOT NULL,
  `PackageId` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_FlightDetail_PackageId` (`PackageId`),
  CONSTRAINT `FK_FlightDetail_Package_PackageId` FOREIGN KEY (`PackageId`) REFERENCES `Package` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FlightDetail`
--

LOCK TABLES `FlightDetail` WRITE;
/*!40000 ALTER TABLE `FlightDetail` DISABLE KEYS */;
INSERT INTO `FlightDetail` VALUES (1,'Boeing','Ae421',NULL,NULL,1,1),(2,'Emirates','Ae712',NULL,NULL,2,1);
/*!40000 ALTER TABLE `FlightDetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LuxuryFacility`
--

DROP TABLE IF EXISTS `LuxuryFacility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LuxuryFacility` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `FacilityName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Priority` int NOT NULL,
  `PackageId` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_LuxuryFacility_PackageId` (`PackageId`),
  CONSTRAINT `FK_LuxuryFacility_Package_PackageId` FOREIGN KEY (`PackageId`) REFERENCES `Package` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LuxuryFacility`
--

LOCK TABLES `LuxuryFacility` WRITE;
/*!40000 ALTER TABLE `LuxuryFacility` DISABLE KEYS */;
/*!40000 ALTER TABLE `LuxuryFacility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Package`
--

DROP TABLE IF EXISTS `Package`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Package` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Price` decimal(65,30) NOT NULL,
  `AvailableCount` int NOT NULL,
  `SupplierId` int DEFAULT NULL,
  `DestinationId` int NOT NULL,
  `IsPublic` tinyint(1) NOT NULL,
  `IsArchived` tinyint(1) NOT NULL,
  `IsVerified` tinyint(1) NOT NULL,
  `FlightBooking` tinyint(1) NOT NULL,
  `Accommodation` tinyint(1) NOT NULL,
  `Sightseeing` tinyint(1) NOT NULL,
  `LuxuryFacilities` tinyint(1) NOT NULL,
  `ImagePath` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `PdfPath` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `PercentageIncome` decimal(65,30) NOT NULL,
  `IsFeatured` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`),
  KEY `IX_Package_DestinationId` (`DestinationId`),
  KEY `IX_Package_SupplierId` (`SupplierId`),
  CONSTRAINT `FK_Package_Destination_DestinationId` FOREIGN KEY (`DestinationId`) REFERENCES `Destination` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_Package_User_SupplierId` FOREIGN KEY (`SupplierId`) REFERENCES `User` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Package`
--

LOCK TABLES `Package` WRITE;
/*!40000 ALTER TABLE `Package` DISABLE KEYS */;
INSERT INTO `Package` VALUES (1,'Dubai Extravaganza','Experience the epitome of luxury and adventure with our exclusive Dubai Extravaganza Package. This all-inclusive Package is designed to immerse you in the splendor and excitement of one of the world\'s most vibrant cities. From towering skyscrapers and golden deserts to luxurious shopping and exquisite dining, this Package offers the ultimate Dubai experience.',70000.000000000000000000000000000000,12,2,11,1,0,1,1,0,1,0,'/uploads/images/OxO89IdU14eS.jpg','/uploads/pdfs/Wy6xb0B7iTlj.pdf',8.000000000000000000000000000000,1),(2,'Paris Adventure','Explore the charm of Paris, from the iconic Eiffel Tower to the Louvre Museum. Enjoy a blend of romance and history in this beautiful city.',51500.000000000000000000000000000000,0,2,1,1,0,1,0,0,0,0,'/uploads/images/02271a6a-ed07-4c88-a2fa-2acd1de5fff1.jpg','/uploads/pdfs/f1248635-cb5c-49e4-93ae-1269335bd9cd.pdf',8.000000000000000000000000000000,0),(3,'Tokyo City Escape','Dive into the vibrant culture of Tokyo. Experience the blend of modernity and tradition, from bustling streets to serene temples.',51500.000000000000000000000000000000,15,2,2,0,0,0,0,0,0,0,'/uploads/images/15a3cf22-81d8-4599-8e25-91a19edad515.jpg','/uploads/pdfs/d672a94e-af14-4bec-b86e-ecc54ecdcac1.pdf',8.000000000000000000000000000000,0),(4,'Rio Carnival Extravaganza','Enjoy the excitement of Rio de Janeiro\'s Carnival. Marvel at the festive parades and the stunning Christ the Redeemer statue.',51800.000000000000000000000000000000,10,2,3,0,0,0,0,0,0,0,'/uploads/images/704dd43a-7ce1-4ec4-a370-55fdb50343b3.jpg','/uploads/pdfs/5a5b8879-f919-48b5-afa4-d33b04edc3a4.pdf',8.000000000000000000000000000000,0),(5,'Sydney Iconic Tour','Discover Sydney\'s landmarks, including the Sydney Opera House and Harbour Bridge. A perfect blend of culture and scenic beauty.',51400.000000000000000000000000000000,18,2,4,0,0,0,0,0,0,0,'/uploads/images/f2faf269-4a47-47aa-9e9f-b008a55c238a.jpg','/uploads/pdfs/3d9dfbaf-1888-48fb-9d87-e57da8eb674a.pdf',8.000000000000000000000000000000,0),(6,'Rome Historical Journey','Step back in time with a journey through Rome. Visit the Colosseum and Vatican City, and enjoy the rich historical ambiance.',51600.000000000000000000000000000000,12,2,5,0,0,0,0,0,0,0,'/uploads/images/5062bfa2-7e5d-47c4-863a-415faa36a92e.jpg','/uploads/pdfs/3985668e-acd4-4793-8545-be8e8eabf606.pdf',8.000000000000000000000000000000,0),(7,'Toronto Urban Exploration','Explore Toronto\'s vibrant city life. Experience the CN Tower and the city\'s multicultural environment.',51300.000000000000000000000000000000,25,2,6,0,0,0,0,0,0,0,'/uploads/images/f933cf3a-c866-4819-8e9d-39fe744ad16c.jpg','/uploads/pdfs/e3109b78-88d5-4986-a0ed-98304cdc9703.pdf',8.000000000000000000000000000000,0),(8,'New Delhi Heritage Tour','Discover the historical richness of New Delhi. Visit landmarks like the Red Fort and immerse yourself in India\'s rich heritage.',51100.000000000000000000000000000000,30,2,7,0,0,0,0,0,0,0,'/uploads/images/5b04b600-4970-4616-9d3b-9b95412ed402.jpg','/uploads/pdfs/df0f5a75-10a7-4d5e-9a7f-978d9cf49661.pdf',8.000000000000000000000000000000,0),(9,'New York City Highlights','Experience the excitement of New York City. Visit Times Square, Central Park, and the Statue of Liberty in this vibrant metropolis.',51900.000000000000000000000000000000,22,2,8,0,0,0,0,0,0,0,'/uploads/images/7cc91fa3-4bcd-46c3-92e8-698d1e4ea53f.jpg','/uploads/pdfs/cc9eefea-6cdc-4da9-be0f-ea14cbdceec3.pdf',8.000000000000000000000000000000,0),(10,'Cairo Ancient Wonders','Explore Cairo and its ancient wonders, including the Pyramids of Giza and the Sphinx. Immerse yourself in Egypt\'s rich history.',52000.000000000000000000000000000000,8,2,9,0,0,0,0,0,0,0,'/uploads/images/d2c0070b-6d1f-4f27-84d1-baa0b4637b26.jpg','/uploads/pdfs/29cb81b9-9762-4356-9800-10146446eeb7.pdf',8.000000000000000000000000000000,0),(11,'Cape Town Scenic Adventure','Discover the natural beauty of Cape Town. Visit Table Mountain and enjoy the stunning coastal views.',51400.000000000000000000000000000000,14,2,10,0,0,0,0,0,0,0,'/uploads/images/0d3502a3-7026-460a-9a2f-169b85c604dc.jpg','/uploads/pdfs/1a784875-24b2-4665-b83b-68d6b39d5841.pdf',8.000000000000000000000000000000,0),(12,'Testing Package','Test',10000.000000000000000000000000000000,3,2,1,1,0,1,0,0,0,0,'/uploads/images/VxxH7JAwZxbB.jpg','/uploads/pdfs/y6vlECYVcZ2g.pdf',12.000000000000000000000000000000,0);
/*!40000 ALTER TABLE `Package` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PackageImage`
--

DROP TABLE IF EXISTS `PackageImage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PackageImage` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `PackageId` int NOT NULL,
  `ImagePath` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_PackageImage_PackageId` (`PackageId`),
  CONSTRAINT `FK_PackageImage_Package_PackageId` FOREIGN KEY (`PackageId`) REFERENCES `Package` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PackageImage`
--

LOCK TABLES `PackageImage` WRITE;
/*!40000 ALTER TABLE `PackageImage` DISABLE KEYS */;
INSERT INTO `PackageImage` VALUES (1,1,'/uploads/images/B9Tirt7pG8VK.jpg'),(2,1,'/uploads/images/H2OhW8QUpYxw.jpg');
/*!40000 ALTER TABLE `PackageImage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Payment`
--

DROP TABLE IF EXISTS `Payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Payment` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `BookingId` int NOT NULL,
  `PaymentMethod` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Amount` decimal(65,30) NOT NULL,
  `TransactionId` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `PaymentStatus` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `PackageId` int DEFAULT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Payment_BookingId` (`BookingId`),
  KEY `IX_Payment_PackageId` (`PackageId`),
  KEY `IX_Payment_UserId` (`UserId`),
  CONSTRAINT `FK_Payment_Bookings_BookingId` FOREIGN KEY (`BookingId`) REFERENCES `Bookings` (`BookingId`) ON DELETE CASCADE,
  CONSTRAINT `FK_Payment_Package_PackageId` FOREIGN KEY (`PackageId`) REFERENCES `Package` (`Id`),
  CONSTRAINT `FK_Payment_User_UserId` FOREIGN KEY (`UserId`) REFERENCES `User` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payment`
--

LOCK TABLES `Payment` WRITE;
/*!40000 ALTER TABLE `Payment` DISABLE KEYS */;
INSERT INTO `Payment` VALUES (1,4,'Razorpay',94400.000000000000000000000000000000,'pay_P03dhX3WW8HcNe','Paid',NULL,NULL);
/*!40000 ALTER TABLE `Payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Role`
--

DROP TABLE IF EXISTS `Role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Role` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Role`
--

LOCK TABLES `Role` WRITE;
/*!40000 ALTER TABLE `Role` DISABLE KEYS */;
INSERT INTO `Role` VALUES (1,'Admin'),(2,'Supplier'),(3,'User');
/*!40000 ALTER TABLE `Role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SightseeingDetail`
--

DROP TABLE IF EXISTS `SightseeingDetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SightseeingDetail` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `TourName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `TourDescription` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Priority` int NOT NULL,
  `PackageId` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_SightseeingDetail_PackageId` (`PackageId`),
  CONSTRAINT `FK_SightseeingDetail_Package_PackageId` FOREIGN KEY (`PackageId`) REFERENCES `Package` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SightseeingDetail`
--

LOCK TABLES `SightseeingDetail` WRITE;
/*!40000 ALTER TABLE `SightseeingDetail` DISABLE KEYS */;
INSERT INTO `SightseeingDetail` VALUES (1,'Mall','Time will be given for shopping',1,1),(2,'Desert Offroading','Offroad with luxury vehicles',2,1);
/*!40000 ALTER TABLE `SightseeingDetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TravelerInfos`
--

DROP TABLE IF EXISTS `TravelerInfos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TravelerInfos` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `BookingId` int DEFAULT NULL,
  `FullName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `DateOfBirth` datetime(6) NOT NULL,
  `PassportNumber` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_TravelerInfos_BookingId` (`BookingId`),
  CONSTRAINT `FK_TravelerInfos_Bookings_BookingId` FOREIGN KEY (`BookingId`) REFERENCES `Bookings` (`BookingId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TravelerInfos`
--

LOCK TABLES `TravelerInfos` WRITE;
/*!40000 ALTER TABLE `TravelerInfos` DISABLE KEYS */;
INSERT INTO `TravelerInfos` VALUES (1,1,'AdultTraveler1','1945-09-05 00:00:00.000000','PASSPORT1'),(2,1,'ChildTraveler1','2024-09-02 00:00:00.000000','PASSPORT2'),(3,2,'Child','2024-09-04 00:00:00.000000','QWASER'),(4,2,'Adult','1982-09-08 00:00:00.000000','ASZXWER'),(5,3,'Adult','1950-09-07 00:00:00.000000','ASZXWER'),(6,3,'Child','2024-09-02 00:00:00.000000','QWASER'),(7,4,'Adult','1945-09-05 00:00:00.000000','P1'),(8,4,'Child','2024-09-04 00:00:00.000000','P2');
/*!40000 ALTER TABLE `TravelerInfos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UploadItinery`
--

DROP TABLE IF EXISTS `UploadItinery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UploadItinery` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `BookingId` int NOT NULL,
  `Path` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `FlightBooking` tinyint(1) NOT NULL,
  `Accommodation` tinyint(1) NOT NULL,
  `Sightseeing` tinyint(1) NOT NULL,
  `LuxuryFacilities` tinyint(1) NOT NULL,
  `FileName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_UploadItinery_BookingId` (`BookingId`),
  CONSTRAINT `FK_UploadItinery_Bookings_BookingId` FOREIGN KEY (`BookingId`) REFERENCES `Bookings` (`BookingId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UploadItinery`
--

LOCK TABLES `UploadItinery` WRITE;
/*!40000 ALTER TABLE `UploadItinery` DISABLE KEYS */;
INSERT INTO `UploadItinery` VALUES (1,2,'/uploads/itinery/X8SSxH2yNPf4.pdf',1,0,0,0,'Name'),(2,4,'/uploads/itinery/MvsWKVa0kFmN.pdf',1,0,0,0,'Dubai To Amsterdam'),(3,4,'/uploads/itinery/Lw11HgaTLe7O.pdf',0,1,0,0,'Taj Hotel');
/*!40000 ALTER TABLE `UploadItinery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `PasswordHash` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `RoleId` int NOT NULL,
  `BusinessName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `ContactPerson` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Phone` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `AccountId` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `IsLocked` tinyint(1) NOT NULL,
  `AutoRegistrationCompleted` tinyint(1) NOT NULL,
  `IsAgreement` tinyint(1) NOT NULL,
  `RegistrationDate` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_User_RoleId` (`RoleId`),
  CONSTRAINT `FK_User_Role_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `Role` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'admin','admin@gmail.com','$2a$11$/0iGmmKDF5rlS16rsXviQ.ySjD2A34dkH9KUlrgcf7wzUSCP6CkTK',1,NULL,NULL,NULL,NULL,0,0,0,'2024-09-19 12:50:16.604892'),(2,'supplier','mivif14026@degcos.com','$2a$11$AB/IQnCAi9jqIntsHmoHFeznqR9jfGZOdIczEDv1NBz5wAM8EEcse',2,'Supplier Tour & Packages','Rahul','1212121212','acc_MffeG2DuXI0Qaj',0,0,1,'2024-09-19 13:14:30.358031'),(3,'User','korola5257@marchub.com','$2a$11$N6Vo7l1Ps9.LNDDb6mA2l./ZXrLH7ROvHIYXKp.GnxiXaak8cP7ou',3,NULL,NULL,NULL,NULL,0,0,0,'2024-09-20 17:18:26.402016');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserPackageInteraction`
--

DROP TABLE IF EXISTS `UserPackageInteraction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserPackageInteraction` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `UserId` int NOT NULL,
  `DestinationId` int NOT NULL,
  `InteractionCount` int NOT NULL,
  `UpdatedAt` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_UserPackageInteraction_DestinationId` (`DestinationId`),
  KEY `IX_UserPackageInteraction_UserId` (`UserId`),
  CONSTRAINT `FK_UserPackageInteraction_Destination_DestinationId` FOREIGN KEY (`DestinationId`) REFERENCES `Destination` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_UserPackageInteraction_User_UserId` FOREIGN KEY (`UserId`) REFERENCES `User` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserPackageInteraction`
--

LOCK TABLES `UserPackageInteraction` WRITE;
/*!40000 ALTER TABLE `UserPackageInteraction` DISABLE KEYS */;
INSERT INTO `UserPackageInteraction` VALUES (1,3,11,40,'2024-09-22 07:58:33.813194'),(2,3,1,3,'2024-09-22 08:11:18.686234');
/*!40000 ALTER TABLE `UserPackageInteraction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Watchlist`
--

DROP TABLE IF EXISTS `Watchlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Watchlist` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `UserId` int NOT NULL,
  `PackageId` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Watchlist_PackageId` (`PackageId`),
  KEY `IX_Watchlist_UserId` (`UserId`),
  CONSTRAINT `FK_Watchlist_Package_PackageId` FOREIGN KEY (`PackageId`) REFERENCES `Package` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_Watchlist_User_UserId` FOREIGN KEY (`UserId`) REFERENCES `User` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Watchlist`
--

LOCK TABLES `Watchlist` WRITE;
/*!40000 ALTER TABLE `Watchlist` DISABLE KEYS */;
INSERT INTO `Watchlist` VALUES (7,3,2),(8,3,1);
/*!40000 ALTER TABLE `Watchlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Website`
--

DROP TABLE IF EXISTS `Website`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Website` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Theme` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `CustomDomain` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `IsOpen` tinyint(1) NOT NULL,
  `SupplierId` int NOT NULL,
  `ValidTill` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `IX_Website_SupplierId` (`SupplierId`),
  CONSTRAINT `FK_Website_User_SupplierId` FOREIGN KEY (`SupplierId`) REFERENCES `User` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Website`
--

LOCK TABLES `Website` WRITE;
/*!40000 ALTER TABLE `Website` DISABLE KEYS */;
/*!40000 ALTER TABLE `Website` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'travel'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-22 12:27:59
