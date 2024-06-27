-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 27, 2024 at 07:41 PM
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
(4, '1', '70', '2'),
(5, '2', '1', '2'),
(6, '3', '0', '0'),
(7, '4', '0', '0'),
(8, '5', '3', '0');

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

--
-- Dumping data for table `tb_rentals`
--

INSERT INTO `tb_rentals` (`id`, `name`, `destination`, `passport`, `boarding_passport`, `modem`, `plan`, `total_price`, `status`, `startAt`, `finishAt`) VALUES
('10e52cf1-82e2-4a0d-bc17-f055a88cc986', 'Wu Xing jin', 'Raja ampat', 'passport-1719108884712.jpg - passport-1719108884716.png', 'boardingpass-1719108884721.jpg', 'N101', 'P04', 'IDR 750,000', 'Finished', '2024-06-23 11:14:44', '2024-06-30 11:14:44'),
('3553dc8a-871d-4f0c-ba80-80f49bb8a689', 'Gideon Marchell', 'Sorong', 'passport-1719322320661.PNG - passport-1719322320666.png', '-', 'N101', 'P01', 'IDR 695,000', 'In Progress', '2024-06-25 22:32:00', '2024-06-28 22:32:00'),
('4fd88dc7-ebd2-481f-8ab4-5052464cc61a', 'Juan Perez', 'Sorong', 'passport-1719108857465.jpg - passport-1719108857465.png', '-', 'N202', 'P08', 'IDR 1,175,000', 'Finished', '2024-06-23 11:14:17', '2024-07-23 11:14:17'),
('518e4485-6427-4251-91a0-4506693f4611', 'Hong Ju', 'Raja ampat', 'passport-1719108930815.PNG - passport-1719108930824.png', '-', 'N101', 'P01', 'IDR 695,000', 'Finished', '2024-06-23 11:15:30', '2024-06-26 11:15:30'),
('5e62d215-b58c-4ad3-b075-b359819b8ea8', 'Zheng Chan', 'Raja ampat', 'passport-1719323016860.png - passport-1719323016873.PNG', '-', 'N101', 'P01', 'IDR 695,000', 'In Progress', '2024-06-25 22:43:36', '2024-06-28 22:43:36'),
('6aa191da-fab1-4944-afe5-c74722c5e07c', 'Robert Junior', 'Sorong', 'passport-1719322398238.png - passport-1719322398256.jpg', '-', 'N101', 'P01', 'IDR 695,000', 'In Progress', '2024-06-25 22:33:18', '2024-06-28 22:33:18'),
('7c76de90-330c-46a1-851d-df2ee9eb12d5', 'Damian', 'Tambrauw', 'passport-1719322950067.PNG - passport-1719322950072.png', '-', 'N101', 'P01', 'IDR 695,000', 'In Progress', '2024-06-25 22:42:30', '2024-06-28 22:42:30'),
('9d73b09e-3f3e-4053-bef0-6ac4a1e2a96a', 'Damian', 'Maybrat', 'passport-1719321840965.jpeg - passport-1719321840966.png', '-', 'N101', 'P01', 'IDR 695,000', 'In Progress', '2024-06-25 22:24:00', '2024-06-28 22:24:00'),
('a30ccdb2-7017-47f9-baeb-612b76931476', 'Jeff', 'Sorong', 'passport-1719322169707.PNG - passport-1719322169710.png', 'boardingpass-1719322169725.png', 'N101', 'P04', 'IDR 750,000', 'In Progress', '2024-06-25 22:29:29', '2024-07-02 22:29:29'),
('bedf54df-dbef-492b-8000-16c103440ec2', 'Gideon Marchell', 'Raja ampat', 'passport-1719108678668.png - passport-1719108678676.png', '-', 'N101', 'P01', 'IDR 695,000', 'Finished', '2024-06-23 11:11:18', '2024-06-26 11:11:18'),
('d1a9677b-c456-46e4-840a-bfb168f2ea1b', 'Di Lorenzo', 'Maybrat', 'passport-1719312287972.jpg - passport-1719312287973.jpg', '-', 'N101', 'P01', 'IDR 695,000', 'In Progress', '2024-06-25 19:44:48', '2024-06-28 19:44:48'),
('dd5d6a15-dec5-4555-b569-d602ce16907a', 'Robert Junior', 'Sorong', 'passport-1719322429786.jpg - passport-1719322429787.png', '-', 'N101', 'P01', 'IDR 695,000', 'In Progress', '2024-06-25 22:33:49', '2024-06-28 22:33:49');

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

--
-- Dumping data for table `tb_testimonials`
--

INSERT INTO `tb_testimonials` (`testimonial_id`, `name`, `testimonial`, `text`, `createdAt`) VALUES
('15faab46-18cb-418b-aa56-a485f4b30803', 'Hong Ju', 'testimonial-1719243236513.jpg', 'Tailwind CSS works by scanning all of your HTML files, JavaScript components, and any other templates for class names, generating the corresponding styles and then writing them to a static CSS file', '2024-06-25 00:33:56'),
('21a64876-dc4c-465f-b156-ebf0aaf0a2a7', 'Donn', 'testimonial-1719248260612.jpg', 'The simplest and fastest way to get up and running with Tailwind CSS from scratch is with the Tailwind CLI tool.', '2024-06-25 01:57:40'),
('53356d87-2c76-4a3a-8314-4f2d41f1e857', 'Jena', 'testimonial-1719242421520.PNG', 'You’ve got to get up every morning with determination if you’re going to go to bed with satisfaction.', '2024-06-25 00:20:21'),
('58cbd300-f1c9-491d-9847-1c1b03ea1f88', 'Ronn', 'testimonial-1719312214014.jpg', 'A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.', '2024-06-25 19:43:34'),
('63e8ac83-9733-43d2-b952-ae27792add2f', 'Ahmed Ali', 'testimonial-1719242951607.png', 'Sometimes, simply reading through a list of motivational wordsand contemplating what they mean to you, is a great way to feed your mind with positive motivation. So here is a list of more than 200 (I keep adding to it!) single motivational words that have been compiled to inspire and motivate you', '2024-06-25 00:29:11'),
('922524d0-7829-47ec-bef5-ea83970786ee', 'Perez', 'testimonial-1719242492933.PNG', 'Perfection has to do with the end product, but excellence has to do with the process.', '2024-06-25 00:21:32'),
('ae39690f-9dc5-475d-9292-abca60e65f88', 'Clarissa', 'testimonial-1719242694538.jpeg', 'Dengan menggunakan UUID sebagai primary key, Anda mendapatkan beberapa keuntungan seperti meningkatkan keamanan, karena UUID sulit ditebak, dan membantu dalam sistem terdistribusi di mana pengidentifikasi unik global diperlukan.', '2024-06-25 00:24:54'),
('c7290ff0-8771-41cb-9d61-093cf0ef3214', 'Wu Xing jin', 'testimonial-1719243003608.PNG', 'The issue you are encountering is likely due to the fact that the event listeners for the .lihat-passport buttons are being added before the elements are actually inserted into the DOM. When the inProgressSearch event handler runs and inserts the new HTML, the previous event listeners do not apply to the newly created elements.', '2024-06-25 00:30:03'),
('eaf9768b-39c5-433a-9268-2f5e7c5a8741', 'Lopez Pereira', 'testimonial-1719242762434.jpg', 'Dengan menggunakan UUID sebagai primary key, Anda mendapatkan beberapa keuntungan seperti meningkatkan keamanan, karena UUID sulit ditebak, dan membantu dalam sistem terdistribusi di mana pengidentifikasi unik global diperlukan.', '2024-06-25 00:26:02'),
('f2ed75a6-a04a-4426-9f6b-e00fa73bd4dd', 'JEff', 'testimonial-1719242278708.jpg', 'UUID: Fungsi UUID() di MySQL menghasilkan UUID versi 1 (UUID1), yang didasarkan pada waktu dan alamat MAC komputer. Untuk mendapatkan UUID versi 4 (UUID4) yang dihasilkan secara acak, Anda perlu menggunakan logika di tingkat aplikasi (seperti di Sequelize).', '2024-06-25 00:17:58');

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
(12, 'admin', '$2b$10$kgA9OjbrxqoXONnQguqjFO86Mhj4rS0qM.snGr99GgPhvzr5Otm.C', 'SUPERUSER'),
(13, 'Romy', '$2b$10$MDqgCVMXE7OSffiIx42nmOMVogOvEEj79FEMXQivpqDYXefLEpOGS', 'PENYEDIA'),
(14, 'Doni', '$2b$10$xaI9IbGLm5dvZMYHFsqw5.LEYoZ02TNeBbkTXIznCXcwLpBdp1Hzi', 'FASILITATOR');

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
