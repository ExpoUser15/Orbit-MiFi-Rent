-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 30, 2024 at 03:29 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_mifi`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_contacts`
--

CREATE TABLE `tb_contacts` (
  `contact_id` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `createdAt` varchar(255) NOT NULL,
  `updatedAt` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_locations`
--

CREATE TABLE `tb_locations` (
  `location_id` int(5) NOT NULL,
  `location` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_locations`
--

INSERT INTO `tb_locations` (`location_id`, `location`) VALUES
(1, 'Sorong'),
(2, 'Raja Ampat'),
(3, 'Tambrauw'),
(4, 'Teminabuan'),
(5, 'Maybrat');

-- --------------------------------------------------------

--
-- Table structure for table `tb_plan`
--

CREATE TABLE `tb_plan` (
  `plan_id` varchar(30) NOT NULL,
  `plan` varchar(30) NOT NULL,
  `price` varchar(50) NOT NULL,
  `time` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_plan`
--

INSERT INTO `tb_plan` (`plan_id`, `plan`, `price`, `time`) VALUES
('P01', 'Orbit MiFi 2GB (3 Days)', 'IDR 20,000', '3 days'),
('P02', 'Orbit MiFi 6GB (3 Days)', 'IDR 40,000', '3 days'),
('P03', 'Orbit MiFi 2.5GB (7 Days)', 'IDR 35,000', '7 days'),
('P04', 'Orbit MiFi 12GB (7 Days)', 'IDR 75,000', '7 days'),
('P05', 'Orbit MiFi 18GB (30 Days)', 'IDR 115,000', '30 days'),
('P06', 'Orbit MiFi 50GB (30 Days)', 'IDR 240,000', '30 days'),
('P07', 'Orbit MiFi 85GB (30 Days)', 'IDR 360,000', '30 days'),
('P08', 'Orbit MiFi 120GB (30 Days)', 'IDR 475,000', '30 days');

-- --------------------------------------------------------

--
-- Table structure for table `tb_ready_stoks`
--

CREATE TABLE `tb_ready_stoks` (
  `id` int(10) NOT NULL,
  `location` varchar(5) NOT NULL,
  `n1` varchar(5) NOT NULL,
  `n2` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_ready_stoks`
--

INSERT INTO `tb_ready_stoks` (`id`, `location`, `n1`, `n2`) VALUES
(4, '1', '0', '0'),
(5, '2', '0', '0'),
(6, '3', '0', '0'),
(7, '4', '0', '0'),
(8, '5', '0', '0');

-- --------------------------------------------------------

--
-- Table structure for table `tb_rentals`
--

CREATE TABLE `tb_rentals` (
  `id` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `passport` varchar(100) NOT NULL,
  `boarding_passport` varchar(100) DEFAULT NULL,
  `modem` varchar(4) NOT NULL,
  `plan` varchar(3) NOT NULL,
  `total_price` varchar(20) NOT NULL,
  `status` enum('Rented','Finished','Abort','In Progress') NOT NULL,
  `startAt` varchar(20) NOT NULL,
  `finishAt` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_stoks`
--

CREATE TABLE `tb_stoks` (
  `modem_id` varchar(255) NOT NULL,
  `jenis_modem` varchar(2) NOT NULL,
  `price` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_stoks`
--

INSERT INTO `tb_stoks` (`modem_id`, `jenis_modem`, `price`) VALUES
('N101', 'N1', 'IDR 675,000'),
('N202', 'N2', 'IDR 700,000');

-- --------------------------------------------------------

--
-- Table structure for table `tb_testimonials`
--

CREATE TABLE `tb_testimonials` (
  `testimonial_id` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `testimonial` varchar(255) NOT NULL,
  `text` text NOT NULL,
  `createdAt` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_users`
--

CREATE TABLE `tb_users` (
  `id` int(10) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_level` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_users`
--

INSERT INTO `tb_users` (`id`, `username`, `password`, `user_level`) VALUES
(12, 'admin', '$2b$10$kgA9OjbrxqoXONnQguqjFO86Mhj4rS0qM.snGr99GgPhvzr5Otm.C', 'SUPERUSER');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_contacts`
--
ALTER TABLE `tb_contacts`
  ADD PRIMARY KEY (`contact_id`);

--
-- Indexes for table `tb_locations`
--
ALTER TABLE `tb_locations`
  ADD PRIMARY KEY (`location_id`);

--
-- Indexes for table `tb_plan`
--
ALTER TABLE `tb_plan`
  ADD PRIMARY KEY (`plan_id`);

--
-- Indexes for table `tb_ready_stoks`
--
ALTER TABLE `tb_ready_stoks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_rentals`
--
ALTER TABLE `tb_rentals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_stoks`
--
ALTER TABLE `tb_stoks`
  ADD PRIMARY KEY (`modem_id`);

--
-- Indexes for table `tb_testimonials`
--
ALTER TABLE `tb_testimonials`
  ADD PRIMARY KEY (`testimonial_id`);

--
-- Indexes for table `tb_users`
--
ALTER TABLE `tb_users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_locations`
--
ALTER TABLE `tb_locations`
  MODIFY `location_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tb_ready_stoks`
--
ALTER TABLE `tb_ready_stoks`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tb_users`
--
ALTER TABLE `tb_users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
