-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 07, 2024 at 12:23 AM
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
('1c5e9b8d-e1c5-4283-8855-32fddff95b74', 'Gideon Marchelino Manobi', 'Raja ampat', 'passport-1717686080953.png - 2passport-1717686080955.png', '-', 'N101', 'P01', 'IDR 695,000', 'In Progress', '2024-06-07', '2024-06-10'),
('1ff88c8c-c9d5-422b-ac66-104ef4b8aa20', 'Gideon Marchelino Manobi', 'Raja ampat', 'passport-1717645046729.png - 2passport-1717645046731.png', '-', 'N101', 'P01', 'IDR 695,000', 'In Progress', '2024-06-06', '2024-06-09'),
('21f7d6dc-f3a4-433e-bc86-2956ee9bff3e', 'Gideon Marchell', 'Raja ampat', 'passport-1717642144328.png - 2passport-1717642144333.png', '-', 'N101', 'P01', 'IDR 695,000', 'In Progress', '2024-06-06', '2024-06-09'),
('25c33878-d09c-4627-b9a4-a0d73e9f5e04', 'assad', 'Manokwari', 'passport-1717642236053.png - 2passport-1717642236060.png', '-', 'N101', 'P01', 'IDR 695,000', 'In Progress', '2024-06-06', '2024-06-09'),
('28f0b25f-7e68-45f9-a3fe-1e29c306cb1c', 'Gideon', 'Raja ampat', 'passport-1717330208164.jpg - 2passport-1717330208169.png', 'boardingpass-1717330208182.png', 'N101', 'P08', 'IDR 1,150,000', 'In Progress', '2024-06-02', '2024-07-02'),
('2a6ca73d-71cb-4407-96be-9569b99c30ea', 'Gideon Marchelino Manobi', 'Sorong', 'passport-1717638750645.jpg - 2passport-1717638750648.png', '-', 'N101', 'P01', 'IDR 695,000', 'In Progress', '2024-06-06', '2024-06-09'),
('31c29144-d72d-47cd-a872-c9d582b25c31', 'Gideon Marchelino Manobi', 'Raja ampat', 'passport-1717680466402.png - 2passport-1717680466404.png', '-', 'N101', 'P07', 'IDR 1,035,000', 'In Progress', '2024-06-06', '2024-07-06'),
('48eca1b8-d252-4e66-b194-6716559ca68a', 'Gideon Marchelino Manobi', 'Raja ampat', 'passport-1717685326865.png - 2passport-1717685326867.png', '-', 'N101', 'P01', 'IDR 695,000', 'In Progress', '2024-06-06', '2024-06-09'),
('491a50b0-605a-47d9-8aef-e812399dfc2b', 'assad', 'Manokwari', 'passport-1717642333004.png - 2passport-1717642333005.png', '-', 'N101', 'P01', 'IDR 695,000', 'In Progress', '2024-06-06', '2024-06-09'),
('4da839d8-7dd5-45d9-8bf5-156deba28d71', 'Gideon Marchelino Manobi', 'Raja ampat', 'passport-1717685418065.png - 2passport-1717685418073.png', '-', 'N101', 'P01', 'IDR 695,000', 'In Progress', '2024-06-06', '2024-06-09'),
('6241615f-0681-4ea8-90da-1d8f208480cb', 'Gideon Marchelino Manobi', 'Raja ampat', 'passport-1717686143054.jpg - 2passport-1717686143058.png', '-', 'N101', 'P01', 'IDR 695,000', 'In Progress', '2024-06-07', '2024-06-10'),
('65009378-2c93-4ca7-86da-520e8d41fe85', 'Gideon Marchelino Manobi', 'Raja ampat', 'passport-1717684769897.png - 2passport-1717684769903.jpg', '-', 'N101', 'P01', 'IDR 695,000', 'In Progress', '2024-06-06', '2024-06-09'),
('6a81c99b-3697-4a90-ba7d-acc91ddc27df', '\'saran\',\'kritik\',\'lainnya\'', 'Raja ampat', 'passport-1717641275256.jpg - 2passport-1717641275268.png', '-', 'N101', 'P05', 'IDR 790,000', 'In Progress', '2024-06-06', '2024-07-06'),
('941af057-668f-4ea0-849f-1b77f4ecebb1', 'Gideon Marchelino Manobi', 'Raja ampat', 'passport-1717684502228.png - 2passport-1717684502232.jpg', '-', 'N101', 'P01', 'IDR 695,000', 'In Progress', '2024-06-06', '2024-06-09'),
('95955b8c-2bb2-47e5-b4fd-6b7d0ec4f1a8', 'marchelino', 'Bintuni', 'passport-1717330235669.png - 2passport-1717330235672.jpg', 'boardingpass-1717330235678.png', 'N101', 'P04', 'IDR 750,000', 'In Progress', '2024-06-02', '2024-06-09'),
('9964c909-2522-4d91-8859-c20f235d5308', 'Gideon Marchelino Manobi', 'Raja ampat', 'passport-1717686175779.jpg - 2passport-1717686175781.png', '-', 'N101', 'P01', 'IDR 695,000', 'In Progress', '2024-06-07', '2024-06-10'),
('9cbf188f-5f08-45f5-bfdc-90b6bb0cf8cf', 'Gideon Marchelino Manobi', 'Raja ampat', 'passport-1717684110040.png - 2passport-1717684110045.png', '-', 'N202', 'P01', 'IDR 720,000', 'In Progress', '2024-06-06', '2024-06-09'),
('afe2c972-8b86-44c2-a92f-83e90eb2ce3c', 'marchelino', 'Bintuni', 'passport-1717638474113.jpg - 2passport-1717638474183.PNG', 'boardingpass-1717638474206.jpg', 'N101', 'P01', 'IDR 695,000', 'In Progress', '2024-06-06', '2024-06-09'),
('b1e42174-cfed-48d2-8f87-7414a632081d', 'Gideon Marchelino Manobi', 'Raja ampat', 'passport-1717684455237.png - 2passport-1717684455242.png', '-', 'N101', 'P01', 'IDR 695,000', 'In Progress', '2024-06-06', '2024-06-09'),
('c1241252-e559-40f5-bfa0-647e9c1b854e', 'Gideon Marchelino Manobi', 'Raja ampat', 'passport-1717684686881.png - 2passport-1717684686890.png', '-', 'N101', 'P01', 'IDR 695,000', 'In Progress', '2024-06-06', '2024-06-09'),
('d4e27bde-0378-4e4b-9779-4fe49c8f4db4', 'Gideon Marchelino Manobi', 'Raja ampat', 'passport-1717684968682.png - 2passport-1717684968687.png', '-', 'N101', 'P01', 'IDR 695,000', 'In Progress', '2024-06-06', '2024-06-09'),
('eedfe41f-6831-479c-948c-54c7bbde0686', 'Gideon Marchelino Manobi', 'Raja ampat', 'passport-1717645006558.png - 2passport-1717645006565.png', '-', 'N101', 'P01', 'IDR 695,000', 'In Progress', '2024-06-06', '2024-06-09'),
('fede31be-3644-40c0-b098-83b91393f66a', 'JEff', 'Raja ampat', 'passport-1717640193514.png - 2passport-1717640193526.jpg', '-', 'N202', 'P06', 'IDR 940,000', 'In Progress', '2024-06-06', '2024-07-06');

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
('N101', 'N1', 7, 'IDR 675,000'),
('N202', 'N2', 12, 'IDR 700,000');

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
