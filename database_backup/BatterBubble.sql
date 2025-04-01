-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 01, 2025 at 10:24 AM
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
-- Database: `BatterBubble`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(36) NOT NULL DEFAULT uuid(),
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `rating` decimal(3,2) DEFAULT 0.00,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password_hash`, `profile_image`, `bio`, `rating`, `created_at`, `updated_at`) VALUES
('0ff35206-0e4a-11f0-891c-dca90475bcba', 'john_do', 'johndoe@exampl.com', '$2b$10$ZAfHQavSfGxtnT7mOFyP/OM65bn1JnEutiPZMfRe4mns95jw1oIwe', 'https://example.com/john.jpg', 'Full-stack develope', 9.00, '2025-03-31 16:06:10', '2025-03-31 16:06:10'),
('3d4eab36-0bc7-11f0-b4d1-dca90475bcba', 'john_doe', 'johndoe@example.com', '$2b$10$JXrTcJzM3fUNnYuAmd7II.olmi1.8.dWy3j1IG.vgNnhwpruEZVb2', 'https://example.com/john.jpg', 'Full-stack developer', 5.00, '2025-03-28 11:24:40', '2025-03-28 11:24:40'),
('7e843010-0e4e-11f0-891c-dca90475bcba', 'malaya', 'malaya@exampl.com', 'password134', 'https://example.com/john.jpg', 'Full-stack develope', 4.00, '2025-03-31 16:37:54', '2025-03-31 16:37:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_username` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
