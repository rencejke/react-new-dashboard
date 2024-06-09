-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 09, 2024 at 09:57 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `react_dashboard`
--

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `post_aid` int(11) NOT NULL,
  `post_title` varchar(50) NOT NULL,
  `post_image` varchar(50) NOT NULL,
  `post_tag` varchar(20) NOT NULL,
  `post_category` varchar(20) NOT NULL,
  `post_is_active` tinyint(1) NOT NULL,
  `post_article` text NOT NULL,
  `post_publish_date` varchar(20) NOT NULL,
  `post_created` varchar(20) NOT NULL,
  `post_datetime` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`post_aid`, `post_title`, `post_image`, `post_tag`, `post_category`, `post_is_active`, `post_article`, `post_publish_date`, `post_created`, `post_datetime`) VALUES
(1, 'test-title', 'decentra ss.PNG', 'test-tag', 'test-category', 1, 'test-article', '2024-06-09', '2024-06-09 07:48:13', '2024-06-09 12:20:28'),
(2, 'test-title', '_landing-page-image-chi.png', 'test-tag', 'test-category', 0, 'test-article', '2024-06-09', '2024-06-09 07:48:13', '2024-06-09 12:20:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`post_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `post_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
