-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hostiteľ: 127.0.0.1:3308
-- Čas generovania: Út 09.Feb 2021, 08:12
-- Verzia serveru: 8.0.21
-- Verzia PHP: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáza: `e-shop`
--

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `addresses`
--

DROP TABLE IF EXISTS `addresses`;
CREATE TABLE IF NOT EXISTS `addresses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `line1` varchar(255) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `phone` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `pincode` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_addresses_users1_idx` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Sťahujem dáta pre tabuľku `addresses`
--

INSERT INTO `addresses` (`id`, `line1`, `city`, `state`, `country`, `phone`, `pincode`, `user_id`) VALUES
(4, 'Kosice', 'Kosice', 'Kosice', 'Slovakia', '421879564', 89894, 22);

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Sťahujem dáta pre tabuľku `categories`
--

INSERT INTO `categories` (`id`, `title`) VALUES
(1, 'Shoes'),
(2, 'Electronics'),
(3, 'Computers');

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `order_created` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `total` double NOT NULL,
  `state` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_orders_users1_idx` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=142 DEFAULT CHARSET=utf8;

--
-- Sťahujem dáta pre tabuľku `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `order_created`, `username`, `total`, `state`) VALUES
(130, 34, '2021-01-26 00:00:00', 'jan', 100, 1),
(131, 34, '2021-01-26 00:00:00', 'jan', 100, 1),
(132, 34, '2021-01-26', 'jan', 100, 1),
(133, 34, '2021-01-26', 'jan', 100, 1),
(134, 34, '2021-01-26', 'jan', 100, 0),
(135, 34, '2021-01-26', 'jan', 100, 0),
(136, 34, '2021-01-26 12:43:07', 'jan', 100, 1),
(137, 22, '2021-01-27 09:23:16', 'jan', 99, 0),
(138, 22, '2021-01-27 09:37:48', 'jan', 99, 0),
(141, 22, '2021-02-09 09:04:40', 'jan', 668.55, 0);

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `orders_details`
--

DROP TABLE IF EXISTS `orders_details`;
CREATE TABLE IF NOT EXISTS `orders_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_orders_has_products_products1_idx` (`product_id`),
  KEY `fk_orders_has_products_orders1_idx` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=216 DEFAULT CHARSET=utf8;

--
-- Sťahujem dáta pre tabuľku `orders_details`
--

INSERT INTO `orders_details` (`id`, `order_id`, `product_id`, `quantity`) VALUES
(204, 130, 1, 2),
(205, 131, 1, 2),
(206, 132, 1, 2),
(207, 133, 1, 2),
(208, 134, 1, 2),
(209, 135, 1, 2),
(210, 136, 1, 2),
(211, 137, 3, 1),
(212, 138, 3, 1),
(213, 139, 55, 1),
(214, 140, 1, 1),
(215, 141, 1, 1);

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `image` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `images` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `description` text NOT NULL,
  `price` double NOT NULL,
  `quantity` int NOT NULL,
  `short_desc` varchar(255) NOT NULL,
  `cat_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_ibfk_1` (`cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;

--
-- Sťahujem dáta pre tabuľku `products`
--

INSERT INTO `products` (`id`, `title`, `image`, `images`, `description`, `price`, `quantity`, `short_desc`, `cat_id`) VALUES
(1, 'PlayStation 4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSr-iFW5W8n3_jxNKiclAP_k71Fi9PGcojsMUC-vb8zbwJthbBd', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSr-iFW5W8n3_jxNKiclAP_k71Fi9PGcojsMUC-vb8zbwJthbBd;https://static.toiimg.com/thumb/msid-56933980,width-640,resizemode-4,imgsize-85436/56933980.jpg;https://cdn.mos.cms.futurecdn.net/3328be45e8c7fe5194055b4c687fb769-1200-80.jpeg;https://img.etimg.com/thumb/width-640,height-480,imgsize-76492,resizemode-1,msid-52464286/46.jpg', 'With PS4, gaming becomes a lot more power packed. Ultra-fast processors, high-performance system, real-time game sharing, remote play and lots more makes it the ultimate companion device.', 260.58, 5, 'Gaming console', 2),
(2, 'PEGASUS 33 Running Shoes For Men', 'https://i.ebayimg.com/images/g/OesAAOSwDnpeJhWN/s-l640.jpg', 'https://i.pinimg.com/originals/43/40/8e/43408ee5a8d234752ecf80bbc3832e65.jpg;https://i.ebayimg.com/images/g/eQgAAOSw2XdePfc0/s-l640.jpg;https://i.ebayimg.com/images/g/j~gAAOSwQ6FdG9Eh/s-l640.jpg;https://i.ebayimg.com/images/g/OesAAOSwDnpeJhWN/s-l640.jpg', 'The Nike Zoom Pegasus Turbo 2 is updated with a feather-light upper, while innovative foam brings revolutionary responsiveness to your long-distance training', 59.99, 51, 'SPORTS SHOES', 1),
(3, 'MEN\'S ADIDAS RUNNING KALUS SHOES', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSrEqFHfSbs6rUzcYnN_PcnS_D2JLXusKMVFk4Y8N_tn3hJgNIf', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSrEqFHfSbs6rUzcYnN_PcnS_D2JLXusKMVFk4Y8N_tn3hJgNIf', 'A well cushioned shoe with a fresher look that will appeal to young runners. Features Mesh upper for maximum ventilation, lightstrike IMEVA midsole with visible adiprene providing protection from harmful impact forces and durable Rubber outsole for long-lasting wear', 39.9900016784668, 69, 'SPORTS SHOES', 1),
(4, 'Xbox One X Star Wars Jedi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ8ufSADR9EyusxEfgMLErqISEcKVzQyjoD81zWcdpBvuEGBnYP', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSrEqFHfSbs6rUzcYnN_PcnS_D2JLXusKMVFk4Y8N_tn3hJgNIf', 'Own the Xbox One X Star Wars Jedi: Fallen Order™ Bundle and step into the role of a Jedi Padawan who narrowly escaped the purge of Order 66. This bundle includes a full-game download of Star Wars Jedi: Fallen Order™ Deluxe Edition, a 1-month trial of Xbox Game Pass for console and Xbox Live Gold, and 1-month of EA Access.***', 250, 78, 'Gaming console', 2),
(55, 'Xiaomi Redmi Note 9 Pro 6GB/128GB', 'https://static.toiimg.com/thumb/msid-75991957,width-640,resizemode-4/75991957.jpg', 'https://static.toiimg.com/thumb/msid-75991957,width-640,resizemode-4/75991957.jpg', 'Mobil', 228, 0, 'Mobil', 2),
(56, 'ASUS ROG STRIX G15DH-CZ010T', 'https://www.pricemania.sk/assets/product/7630878/01.jpg', 'https://www.chytreelektro.cz/fotky16717/fotos/FOTOASB/SKASG15DH-CZ010T-CHE002.jpg', 'SKASG15DH-CZ010T-CHE002 - ASUS ROG STRIX G15DH-CZ010T AMD R5-3600X GTX1650-4GB 8GB 1TB+512GB WL Win 10 3Y', 963.76, 10, 'ASUS ROG STRIX', 3),
(57, 'Lenovo IdeaCentre G5 14AMR05 (90Q10033MK)', 'https://www.andreashop.sk/files/product/money/LENOVO_IDEACENTRE_G5_14AMR05_90Q10034MK_CIERNY.jpg_OID_13JJE00101.jpg', 'https://www.mall.cz/i/54441019/1000/1000;https://www.mall.cz/i/54441022/1000/1000;https://www.mall.cz/i/54441023/1000/1000', 'Gaming pc | AMD Ryzen 5 3600(3,6Ghz)| 16 GB RAM DDR4 | 512 GB SSD | NVIDIA GeForce GTX 1650 Super GDDR 6', 729, 15, 'Gaming PC', 3),
(58, 'Samsung Galaxy A51 A515F Dual SIM', 'http://www.bestmobil.sk/fotky22187/fotos/_vyrn_2538Samsung-Galaxy-A51-128GB-Dual-Sim-Metallic-Silver.jpg', 'https://im9.cz/3d/3e921dce8e27159ee4386f1b9ecdfede/preview.jpg', 'Samsung Galaxy', 251, 10, 'A51', 2),
(59, 'LYNX Challenger', 'https://www.mironet.cz/Foto/s4/90809758.jpg', 'https://www.mironet.cz/Foto/s4/90809758.jpg', 'AMD - Ryzen 5 3600 (6C/12T 3.6/4.2 GHz) / 16 DDR4 / 500 GB SSD / NVIDIA - GeForce GTX 1660 Super', 774.67, 50, 'Gaming PC', 3),
(60, 'Sony Playstation 5', 'https://im9.cz/sk/iR/importprodukt-orig/f21/f2141fdf9cf6ea87eb2c9d7f87772521--mmf400x400.jpg', 'https://im9.cz/sk/iR/importprodukt-orig/f21/f2141fdf9cf6ea87eb2c9d7f87772521--mmf400x400.jpg', 'sdadsds', 500, 50, 'sasasasasa', 2);

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` int DEFAULT '555',
  `token` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

--
-- Sťahujem dáta pre tabuľku `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `role`, `token`) VALUES
(22, 'jan', '123456', '@gmail.com', 777, '53182cb69d7a77bd'),
(34, 'dano', '123', 'a@gmail.com', 555, '');

--
-- Kľúče pre exportované tabuľky
--

--
-- Indexy pre tabuľku `products`
--
ALTER TABLE `products` ADD FULLTEXT KEY `description` (`description`);

--
-- Obmedzenie pre exportované tabuľky
--

--
-- Obmedzenie pre tabuľku `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `fk_addresses_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Obmedzenie pre tabuľku `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
