-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sty 06, 2025 at 03:34 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pizzeria`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `nazwa_pizzy` varchar(100) NOT NULL,
  `skladniki` text NOT NULL,
  `cena` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id`, `nazwa_pizzy`, `skladniki`, `cena`) VALUES
(1, 'Margherita', 'Ser mozzarella, Sos pomidorowy', 20.00),
(2, 'Capricciosa', 'Ser mozzarella, Sos pomidorowy, Szynka, Pieczarki', 25.00),
(3, 'Hawajska', 'Ser mozzarella, Sos pomidorowy, Szynka, Ananas', 27.00),
(4, 'Salami Special', 'Ser mozzarella, Sos pomidorowy, Salami, Oliwki', 30.00);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pizzas`
--

CREATE TABLE `pizzas` (
  `id` int(11) NOT NULL,
  `zamowienie_id` int(11) DEFAULT NULL,
  `nazwaPizzy` varchar(255) DEFAULT NULL,
  `skladnikiPizzy` text DEFAULT NULL,
  `cenaPizzy` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pizzas`
--

INSERT INTO `pizzas` (`id`, `zamowienie_id`, `nazwaPizzy`, `skladnikiPizzy`, `cenaPizzy`) VALUES
(65, 46, 'Margherita', 'Ser mozzarella, Sos pomidorowy', 20.00),
(66, 46, 'Capricciosa', 'Ser mozzarella, Sos pomidorowy, Szynka, Pieczarki', 25.00);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `skladniki`
--

CREATE TABLE `skladniki` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(100) NOT NULL,
  `cena` decimal(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `skladniki`
--

INSERT INTO `skladniki` (`id`, `nazwa`, `cena`) VALUES
(1, 'Ser mozzarella', 5.00),
(2, 'Sos pomidorowy', 2.50),
(3, 'Szynka', 6.00),
(4, 'Pieczarki', 4.00),
(5, 'Papryka', 3.00),
(6, 'Salami', 7.00),
(7, 'Ananas', 4.50),
(8, 'Oliwki', 4.00),
(9, 'Cebula', 3.50),
(10, 'Kukurydza', 3.00);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zamowienie`
--

CREATE TABLE `zamowienie` (
  `id` int(11) NOT NULL,
  `imieNazwisko` varchar(255) NOT NULL,
  `nrTele` varchar(15) NOT NULL,
  `ulica` varchar(255) NOT NULL,
  `nrDomu` varchar(10) NOT NULL,
  `nrMieszkania` varchar(10) DEFAULT NULL,
  `pietro` varchar(5) DEFAULT NULL,
  `miasto` varchar(100) NOT NULL,
  `uwagi` text DEFAULT NULL,
  `cena` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zamowienie`
--

INSERT INTO `zamowienie` (`id`, `imieNazwisko`, `nrTele`, `ulica`, `nrDomu`, `nrMieszkania`, `pietro`, `miasto`, `uwagi`, `cena`, `created_at`) VALUES
(46, 'Jakub Masalski', '98312333', 'Józefa Wybickiego', '3', '', '', 'elblag', '', 45.00, '2025-01-06 14:32:40');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `pizzas`
--
ALTER TABLE `pizzas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `zamowienie_id` (`zamowienie_id`);

--
-- Indeksy dla tabeli `skladniki`
--
ALTER TABLE `skladniki`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `zamowienie`
--
ALTER TABLE `zamowienie`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pizzas`
--
ALTER TABLE `pizzas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `skladniki`
--
ALTER TABLE `skladniki`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `zamowienie`
--
ALTER TABLE `zamowienie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pizzas`
--
ALTER TABLE `pizzas`
  ADD CONSTRAINT `pizzas_ibfk_1` FOREIGN KEY (`zamowienie_id`) REFERENCES `zamowienie` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
