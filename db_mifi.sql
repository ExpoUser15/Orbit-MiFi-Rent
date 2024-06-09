-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 09, 2024 at 05:40 PM
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
  `phone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_contacts`
--

INSERT INTO `tb_contacts` (`contact_id`, `name`, `email`, `message`, `phone`) VALUES
('2de779b5-69e8-41f3-9bad-423081d7e01b', 'Jeff', 'jeff@gmail.com', 'Blblblblblblalalalbalbalablablabal', '082239276945'),
('9826f009-b5c2-4ef0-b1fb-78f5eb28282c', 'Gideon Marchell', 'marchellmanobi@gmail.com', 'test contact', '082239276945'),
('e942d6bb-4a6f-4b03-8d5b-384f7a9db890', 'Gideon Marchell', 'marchellmanobi@gmail.com', 'Test', '082239276945');

-- --------------------------------------------------------

--
-- Table structure for table `tb_locations`
--

CREATE TABLE `tb_locations` (
  `location_id` varchar(5) NOT NULL,
  `location` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_locations`
--

INSERT INTO `tb_locations` (`location_id`, `location`) VALUES
('L01', 'Sorong'),
('L02', 'Raja Ampat'),
('L03', 'Tambrauw'),
('L04', 'Teminabuan'),
('L05', 'Maybrat');

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
-- Table structure for table `tb_rentals`
--

CREATE TABLE `tb_rentals` (
  `id` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `passport` varchar(100) NOT NULL,
  `boarding_passport` varchar(100) DEFAULT NULL,
  `modem` varchar(4) NOT NULL,
  `plan` varchar(3) NOT NULL,
  `total_price` varchar(20) NOT NULL,
  `status` enum('Rented','Finished','Abort','In Progress') NOT NULL,
  `startAt` varchar(20) NOT NULL,
  `finishAt` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_rentals`
--

INSERT INTO `tb_rentals` (`id`, `name`, `destination`, `email`, `passport`, `boarding_passport`, `modem`, `plan`, `total_price`, `status`, `startAt`, `finishAt`) VALUES
('fc46007c-aed0-476d-8694-ef30146315a7', 'Gideon Marchell', 'Sorong', 'marchellmanobi@gmail.com', 'passport-1717922544360.PNG - 2passport-1717922544361.jpg', 'boardingpass-1717922544366.png', 'N101', 'P01', 'IDR 695,000', 'In Progress', '2024-06-09', '2024-06-12');

-- --------------------------------------------------------

--
-- Table structure for table `tb_stoks`
--

CREATE TABLE `tb_stoks` (
  `modem_id` varchar(255) NOT NULL,
  `jenis_modem` varchar(2) NOT NULL,
  `jumlah` int(10) NOT NULL,
  `price` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_stoks`
--

INSERT INTO `tb_stoks` (`modem_id`, `jenis_modem`, `jumlah`, `price`) VALUES
('N101', 'N1', 10, 'IDR 675,000'),
('N202', 'N2', 5, 'IDR 700,000');

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

--
-- Dumping data for table `tb_testimonials`
--

INSERT INTO `tb_testimonials` (`testimonial_id`, `name`, `testimonial`, `text`, `createdAt`) VALUES
('adsfafa', 'Clarissa', 'photo3.jpg', 'playsinline adalah atribut pada elemen <video> dalam HTML. Atribut ini digunakan untuk mengontrol perilaku pemutaran video di halaman web, khususnya pada perangkat seluler. Ketika playsinline ditambahkan ke elemen <video>, itu menunjukkan bahwa video tersebut harus dimainkan dalam konteks pemutaran di dalam elemen HTML itu sendiri, bukan dalam pemutar video penuh layar yang terpisah.', '2024-06-01'),
('ffafsfasf', 'Doni', 'photo.jpg', 'Test aj', '2024-01-03'),
('fsdcs', 'Jennifer', 'photo.jpg', 'Transmisi multi arah mengacu pada kemampuan sistem untuk mentransmisikan data atau informasi ke beberapa penerima atau dari beberapa pengirim secara bersamaan. Ini memungkinkan pertukaran informasi antara beberapa titik atau perangkat dalam jaringan yang saling terhubung. Sistem transmisi multi arah sering digunakan dalam komunikasi nirkabel, jaringan komputer, dan aplikasi lain di mana adanya pertukaran data yang saling terkait antara berbagai entitas.', '2024-04-02'),
('kslksdads', 'Gideon', 'photo2.jpg', 'Untuk mengonversi nilai ke tipe data number di JavaScript, terdapat beberapa metode yang bisa digunakan tergantung pada jenis nilai yang ingin dikonversi dan situasi spesifiknya. ', '2024-05-21');

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
(1, 'Gideon', '123', 'PENYEDIA'),
(2, 'Donn', '111', 'FASILITATOR');

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
-- AUTO_INCREMENT for table `tb_users`
--
ALTER TABLE `tb_users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
