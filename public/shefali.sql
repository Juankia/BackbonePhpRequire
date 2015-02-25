-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 02, 2013 at 07:27 PM
-- Server version: 5.5.24-log
-- PHP Version: 5.4.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `shefali`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE IF NOT EXISTS `books` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET latin1 NOT NULL,
  `author` varchar(100) CHARACTER SET latin1 NOT NULL,
  `status` varchar(15) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=30 ;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `name`, `author`, `status`) VALUES
(25, 'Business @Speed of Thoughts', 'Bill Gates', 'Unread'),
(19, 'The Alchemist', 'Pauolo Cohelo', 'Read'),
(5, 'Twelve Red Herrings ', 'Jeffry Archer2', 'Read'),
(20, 'The White Tiger ', 'Arvind Adiga', 'Read'),
(21, 'War and Peace', 'Leo Tolstoy', 'Unread'),
(22, 'The Tempest', 'William Shakespeare', 'Unread'),
(23, 'Tarzan of the Apes', 'Edgar Rice Burroughs', 'Unread'),
(26, 'The other side of Midnight', 'Sidney Sheldon', 'Read'),
(28, 'God of small things', 'Arundhati Roy', 'Read');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
