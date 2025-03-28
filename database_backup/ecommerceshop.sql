-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 06, 2024 at 10:25 AM
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
-- Database: `ecommerceshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `productId`, `quantity`, `created_at`, `userId`) VALUES
(6, 20, 2, '2024-04-20 06:18:14', 2);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category_image` varchar(225) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `category_image`) VALUES
(1, 'men', 'Images/Category/men.jpg'),
(2, 'Women', 'Images/Category/girl.jpg'),
(3, 'kids', 'Images/Category/kids.jpg'),
(4, 'footware', 'Images/Category/footware.png');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `body` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `category_id` int(11) DEFAULT NULL,
  `product_image` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `body`, `created_at`, `category_id`, `product_image`, `quantity`) VALUES
(15, 'Denim Shirt', 'The latest smartphone with amazing features.', '2024-03-20 21:17:34', 1, NULL, 3),
(18, 'White Tops', 'white long tops with spreed collar', '2024-03-28 13:55:14', 2, 'Images/Category/top-one.jpg', 9),
(19, 'Strip Tops', 'strip manderine collar tops for fashionable look', '2024-04-15 15:52:09', 2, 'Images/Category/top-three.jpg', 7),
(20, 'Black Tshirt', 'black printed tshirt', '2024-04-15 15:52:16', 2, 'Images/Category/top-two.jpg', 6);

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tokens`
--

INSERT INTO `tokens` (`id`, `token`, `userId`, `createdAt`) VALUES
(2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTcxMjU5Mjc0NiwiZXhwIjoxNzEyNTk2MzQ2fQ.e01oSJuNxg-Qe_N8aHEQfa97Vk1-YqYdrLj09ll6EWE', 4, '2024-04-08 16:12:26'),
(3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTcxMjU5MzA3NiwiZXhwIjoxNzEyNTk2Njc2fQ.ykDL_ikJgkoMO80PUuPBgMy9GIYzDbpQMwB-mi7Q9I8', 4, '2024-04-08 16:17:56'),
(4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMjU5NDA2MiwiZXhwIjoxNzEyNTk3NjYyfQ.eOgx0zYO5Gs7nfa3uY92lHNlIREBOuou6WuZpilPKaI', 1, '2024-04-08 16:34:22'),
(5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMjY1MTQzMSwiZXhwIjoxNzEyNjU1MDMxfQ.TRRnJRfDr9ClirDtkaquHn-V0WIXfSNd3KUKiKmJ81I', 1, '2024-04-09 08:30:31'),
(6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMjY1MTQ5MywiZXhwIjoxNzEyNjU1MDkzfQ.xnBlt4eGw3flYlbPYbDAjFp8XzI2TsU3FIZy-pjCQ-s', 1, '2024-04-09 08:31:33'),
(7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMjY1MTU5MiwiZXhwIjoxNzEyNjU1MTkyfQ.rYUV467biVTxfsxV2YL0le5w_H1fv_0n5t2vNlBBPY8', 1, '2024-04-09 08:33:12'),
(8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMjY1MTYzMCwiZXhwIjoxNzEyNjU1MjMwfQ.9e1SE0xynAdYiMQkWKrer6yIJ2s0vgvHo6yNM--GYnM', 1, '2024-04-09 08:33:50'),
(9, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMjY1MTcwMiwiZXhwIjoxNzEyNjU1MzAyfQ.0pSAo4guwcPf8ZcSiFrxo6cF3X7zVIjy-5b0uMmRM40', 1, '2024-04-09 08:35:02'),
(10, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMjY1MTc5MywiZXhwIjoxNzEyNjU1MzkzfQ.Ug_ZQhl5bZn1yfsBSEAkB7mCmQHlnGMuxWJ2gWg9utc', 1, '2024-04-09 08:36:33'),
(11, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMjY1MTgyMCwiZXhwIjoxNzEyNjU1NDIwfQ.ay9aqlAjiexYcC6FpDT9s8qRhkwMXYd5JU8-d4OMqc8', 1, '2024-04-09 08:37:00'),
(12, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMjY1MjA0NiwiZXhwIjoxNzEyNjU1NjQ2fQ.9tBsPGlSIm2-cAraDF-k39cCT-DrTBxRx_zApDpNp-g', 1, '2024-04-09 08:40:46'),
(13, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMjY1MjA4NiwiZXhwIjoxNzEyNjU1Njg2fQ.MOgShEhRio8DpyPioo-i01_BBISV7k7_8o3z47tF0oo', 1, '2024-04-09 08:41:26'),
(14, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMjY1MjM1OSwiZXhwIjoxNzEyNjU1OTU5fQ.iuEfOqRKL5TgWIhACIJ1s1307x01zHQv4Tgj11AM-wc', 1, '2024-04-09 08:45:59'),
(15, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMjY1MjcyOCwiZXhwIjoxNzEyNjU2MzI4fQ.F_iksphwvo677t_2VIYDGQHVlE9kZI-2xsJ8iB6j-OU', 1, '2024-04-09 08:52:08'),
(16, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMjY1Mjg1MSwiZXhwIjoxNzEyNjU2NDUxfQ.vb6jn2tfRqI0fP6u5YVYiS-taxFOa9bF5u3UNkHy3bo', 1, '2024-04-09 08:54:11'),
(17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMjc0NDkyMywiZXhwIjoxNzEyNzQ4NTIzfQ.kwE4YFgfnp2ybg3oHnl6F0ETbsxWx7SypENgYBNP3ek', 1, '2024-04-10 10:28:43'),
(18, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMjc0ODAwNywiZXhwIjoxNzEyNzUxNjA3fQ.Trbo19TDZbOxEiRLXABb9sPohsufnPi5H-ULF26GAgo', 1, '2024-04-10 11:20:07'),
(19, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNDE0MDAyNywiZXhwIjoxNzE0MTQzNjI3fQ.fMmNNkH3roktdKTLh2jpu1gkVqeEu3zTF7ipMRUWHy0', 1, '2024-04-26 14:00:27'),
(20, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNDE0MDU2MiwiZXhwIjoxNzE0MTQ0MTYyfQ.sO0vv8n35lfre9-0b7VdpEnURtyPelMpj8nwi82qHjs', 1, '2024-04-26 14:09:22'),
(21, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNDU1Mjc4OCwiZXhwIjoxNzE0NTU2Mzg4fQ.WH1O0F6DRQwu8-8eS7J0w_88-_ttq5Hpt07a2ZPFNn4', 1, '2024-05-01 08:39:48');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mobile_number` varchar(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `mobile_number`, `name`, `lastname`, `email`, `address`) VALUES
(1, 'malayad', '1jethalalgada', '8327701503', 'malaya ranjan', 'dalabehera', 'dalabehera147@gmail.com', 'narsinghpur'),
(2, 'jethalalgada', 'myjio', '9078555036', 'jethalalgada', 'gada', 'jethalalgada@gmail.com', 'gokuldham socity'),
(3, 'jayaprakash', '$2b$10$6uk/tq5cyDxRNo8bNc6RxuwJ.eyGA5ovQ7lfB3OFmZ2QpknnggugS', '9078555037', 'jayaprakash', 'sahoo', 'jaya@gmail.com', 'paradip'),
(4, 'Avhi', '1jethalalgada', '9090909090', 'avhilash', 'sahoo', 'abhilash@gmail.com', 'jajpur');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_ibfk_1` (`productId`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_category_id` (`category_id`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `posts` (`id`);

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
