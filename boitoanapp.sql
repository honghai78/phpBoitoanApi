-- phpMyAdmin SQL Dump
-- version 4.4.15.7
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 19, 2017 at 08:43 AM
-- Server version: 5.6.37
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `boitoanapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `AppVersion`
--

CREATE TABLE IF NOT EXISTS `AppVersion` (
  `stt` tinyint(4) NOT NULL,
  `app_name` text COLLATE utf8_vietnamese_ci NOT NULL,
  `app_version` text COLLATE utf8_vietnamese_ci NOT NULL,
  `mo_ta` text COLLATE utf8_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Dumping data for table `AppVersion`
--

INSERT INTO `AppVersion` (`stt`, `app_name`, `app_version`, `mo_ta`) VALUES
(1, 'Ứng dụng test', '0.0.1', '- tạo mới ứng dụng'),
(2, 'Ứng dụng kiểm tra app', '0.0.2', '- Kiểm tra api\r\n- Kết nối appversion');

-- --------------------------------------------------------

--
-- Stand-in structure for view `app_version`
--
CREATE TABLE IF NOT EXISTS `app_version` (
`stt` tinyint(4)
,`app_name` text
,`app_version` text
,`mo_ta` text
);

-- --------------------------------------------------------

--
-- Structure for view `app_version`
--
DROP TABLE IF EXISTS `app_version`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `app_version` AS select `appversion`.`stt` AS `stt`,`appversion`.`app_name` AS `app_name`,`appversion`.`app_version` AS `app_version`,`appversion`.`mo_ta` AS `mo_ta` from `appversion`;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
