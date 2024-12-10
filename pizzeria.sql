-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2024 at 07:07 PM
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
  `imieNazwisko` varchar(255) DEFAULT NULL,
  `nrTele` varchar(15) DEFAULT NULL,
  `ulica` varchar(255) DEFAULT NULL,
  `nrDomu` varchar(10) DEFAULT NULL,
  `nrMieszkania` varchar(10) DEFAULT NULL,
  `pietro` varchar(5) DEFAULT NULL,
  `miasto` varchar(100) DEFAULT NULL,
  `uwagi` text DEFAULT NULL,
  `cena` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zamowienie`
--

INSERT INTO `zamowienie` (`id`, `imieNazwisko`, `nrTele`, `ulica`, `nrDomu`, `nrMieszkania`, `pietro`, `miasto`, `uwagi`, `cena`) VALUES
(29, 'Jakub Masalski', '123123123', 'Józefa Wybickiego', '14', '29', '9', 'elblag', 'Duzo sera', 45.00),
(30, 'Jakub BBB', '123123123', 'Romana', '14', '16', '44', 'era', '47oki', 45.00);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `skladniki`
--
ALTER TABLE `skladniki`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `zamowienie`
--
ALTER TABLE `zamowienie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
