-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 07, 2020 at 11:04 PM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shopshoe`
--

-- --------------------------------------------------------

--
-- Table structure for table `adminUsers`
--
create database webcourse;
use webcourse;

drop table if exists `adminusers`;
CREATE TABLE `adminUsers` (
  `id` int(11) NOT NULL,
  `name` text CHARACTER SET utf8,
  `password` text NOT NULL,
  `email` text NOT NULL,
  `tel` char(12) CHARACTER SET utf8 DEFAULT NULL,
  `stt` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `adminUsers`
--

INSERT INTO `adminUsers` (`id`, `name`, `password`, `email`, `tel`, `stt`) VALUES
(1, 'S-Admin', '$2a$10$R/vzcsNBmxi6uM6zL8Hvj.GIXsxek3JaMmJQluND8omci5BSB6NCW', 'nodejsacc1@gmail.com', '868459091', NULL),
(4, 'Vinh', '$2a$10$Ihj2Ntwt09YNozWMgedoIuKPpkw2Vm63VjIUJDso/UEjCX2RAM4nC', 'nodejsacc2@gmail.com', '868459091', NULL),
(5, 'adminVY', '$2a$10$Mgnrmzg3Rl4EUkSdXgjkg.pNuuGJR6ETYsd/.qa9D9KFzsWY6AAJO', 'adminVY@gmail.com', '123456789', NULL),
(6, 'acc nodejs3', '$2a$10$LCYkcxHEBCVj4TgL2Xr4YO2S3DaOcMvoiYP4SYPbVTK8HynCGOE/q', 'nodejsacc3@gmail.com', '0868459091', NULL),
(7, 'acc nodejs5', '$2a$10$TwkKc4MAaqeHHobjbKHFu.XuHFw8tuM./StOIrXL6mQrccae.7L7K', 'nodejsacc5@gmail.com', '0868459091', 0),
(8, 'a1', '$2a$10$uieKi2tE1QqCscFtICgyB.AwVdYEOG2/Q0S36r4UReY7KL.qDEDkK', 'a1@a.com', '', NULL),
(9, 'acc nodejs 100000', '$2a$10$pAIpSIAElnvuBgV.dos9PuG64TeWRNFQI9uRcsDKROaFL0FRgs2iS', 'nodejsacc100000@gmail.com', '0868459091', NULL),
(10, 'acc nodejs10', '$2a$10$PlOEytWX8PMQlVk/lnjqnu/Od4hVsHnKYpFFZmOxGqEKXSPtbTztq', 'nodejsacc10@gmail.com', '0868459091', 0),
(11, 'acc nodejs100', '$2a$10$qoph/xCbldtAIBVBT/daCu.wq5Um2w3H4zCZiKwHxIz9bRnHbS9pm', 'nodejsacc100@gmail.com', '', NULL),
(12, 'acc nodejs1000', '$2a$10$kKP4XAxSwlg5aXKstm/W/eE0WLeShtZb8kb8KwaLCrnbO6dMs17r6', 'nodejsacc1000@gmail.com', '', NULL),
(13, 'acc nodejs13', '$2a$10$B1dvBQsL1kK54irsZewlT.jQRqHTTWl3DjPUxKEYEEGSxJuaJ9JPq', 'nodejsacc13@gmail.com', '0123456789', NULL),
(14, 'acc nodejs14', '$2a$10$9jX7rGy1RWGv8W.NxlhBR.wBooTi64ZCslgFsW3m.RWjQ5ZS5Nhka', 'nodejsacc14@gmail.com', '01937571236', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `binhluan`
--
drop table if exists `binhluan`;
CREATE TABLE `binhluan` (
  `makhoahoc` int(11) NOT NULL,
  `mabinhluan` int(11) NOT NULL,
  `ten` varchar(30) CHARACTER SET utf8 NOT NULL,
  `binhluan` text CHARACTER SET utf8 NOT NULL,
  `avatar` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `binhluan`
--

INSERT INTO `binhluan` (`makhoahoc`, `mabinhluan`, `ten`, `binhluan`, `avatar`) VALUES
(1, 1, 'Trấn Thành', 'Dui dữ!!!', 'upload/no-avatar.png'),
(1, 2, 'Xuân Dinh', 'Chời má ơi, Đẹppp!!!', 'upload/no-avatar.png'),
(1, 3, 'Trúc Nhân', 'Gìay gì ngon dữ', 'upload/no-avatar.png'),
(1, 4, 'Chí Dinh', 'Là lá la, con bướm xinh quá nè!', 'upload/no-avatar.png'),
(1, 5, 'Văn Mai Hương', 'Đừng ăn thịt chó nha quý dị!', 'upload/no-avatar.png'),
(1, 6, 'Trường Giang', 'Tiki!   Bấm là có!!', 'upload/no-avatar.png'),
(1, 7, 'Trúc Nhân', 'Lại là Nhân đây hihi!!', 'upload/no-avatar.png'),
(1, 8, 'Long', 'Long test', '/upload/no-avatar.png'),
(1, 9, 'Long', 'Long test được nữa nè', '/upload/no-avatar.png'),
(1, 10, 'Long ', 'Long test lần 3 nha', '/upload/no-avatar.png'),
(1, 12, 'undefined', 'Test cái tên Vỹ ', '/upload/no-avatar.png'),
(1, 13, 'undefined', 'test tên lần 3', '/upload/no-avatar.png'),
(1, 14, 'undefined', 'Hello again', '/upload/no-avatar.png'),
(1, 15, 'Vỹ', 'hope được t còn ôn toán nữa', 'upload/vy.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `giaodich`
--
drop table if exists `giaodich`;
CREATE TABLE `giaodich` (
  `magiaodich` int(11) NOT NULL,
  `makhoahoc` int(11) NOT NULL,
  `soluong` varchar(15) DEFAULT NULL,
  `mahoadon` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `giaodich`
--

INSERT INTO `giaodich` (`magiaodich`, `makhoahoc`, `soluong`, `mahoadon`) VALUES
(200, 4, '2', 1000),
(201, 10, '1', 1000),
(202, 2, '3', 1001),
(203, 4, '1', 1001),
(204, 3, '1', 1001),
(205, 3, '1', 1002),
(206, 4, '1', 1002),
(207, 2, '3', 1002),
(208, 2, '3', 1003),
(209, 3, '1', 1003),
(210, 4, '1', 1003),
(211, 4, '1', 1004),
(212, 4, '1', 1005),
(213, 8, '1', 1006),
(214, 4, '1', 1007),
(215, 12, '1', 1007),
(216, 2, '1', 1008),
(217, 3, '1', 1008),
(218, 4, '1', 1008),
(219, 1, '2', 1009),
(220, 2, '1', 1009);

-- --------------------------------------------------------

--
-- Table structure for table `hoadon`
--
drop table if exists `hoadon`;
CREATE TABLE `hoadon` (
  `mahoadon` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `thanhtien` int(64) DEFAULT NULL,
  `ngaythanhtoan` datetime DEFAULT NULL,
  `tinhtranggiao` int(1) DEFAULT '0',
  `name` varchar(32) CHARACTER SET utf8 DEFAULT NULL,
  `phonenumber` varchar(12) DEFAULT NULL,
  `address` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `email` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hoadon`
--

INSERT INTO `hoadon` (`mahoadon`, `id`, `thanhtien`, `ngaythanhtoan`, `tinhtranggiao`, `name`, `phonenumber`, `address`, `email`) VALUES
(1000, 4, 1798000, '2020-01-06 16:18:07', 1, 'Quang', NULL, NULL, NULL),
(1001, 4, 6298000, '2020-01-06 16:46:26', 1, 'Dũng', NULL, NULL, NULL),
(1002, 4, 6298000, '2020-01-06 16:48:26', 1, 'Nguyễn Ngọc Ngạn', NULL, '1000 Quang Trung, Phường 15, Q. Gò Vấp, HCM', NULL),
(1003, 4, 6298000, '2020-01-06 16:52:41', 2, NULL, NULL, NULL, NULL),
(1004, 4, 149000, '2020-01-06 17:01:15', 0, 'Thầy Giáo Ba', '0868459091', '1000 Quang Trung, Phường 15, Q. Gò Vấp, HCM', NULL),
(1005, 4, 149000, '2020-01-06 17:01:19', 2, 'Susan', '0123456789', '1000 Quang Trung, Phường 15, Q. Gò Vấp, HCM', NULL),
(1006, 4, 149000, '2020-01-06 17:15:47', 2, 'Lewandowski', '0123451231', '1000 Quang Trung, Phường 15, Q. Gò Vấp, HCM', 'test2@gmail.com'),
(1007, 4, 1439000, '2020-01-06 17:37:46', 0, 'Cristian', '1231231822', '213 Tan Son, Phường 15, Q. Tân Bình, HCM', 'test@gmail.com'),
(1008, 4, 2298000, '2020-01-06 18:02:27', 0, 'Leonel', '0167156511', '2/32 Tan Son, Phường 15, Q. Tân Bình, HCM', 'asd@gmail.com'),
(1009, 4, 2298000, '2020-01-06 18:48:34', 0, 'Hà Đức Chinh', '0868459091', 'no', 'nodejsacc1@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `shoe`
--
drop table if exists `khoahoc`;
CREATE TABLE `khoahoc` (
  `makhoahoc` int(11) NOT NULL,
  `anh` varchar(15) DEFAULT NULL,
  `tenkhoahoc` varchar(255) DEFAULT NULL,
  `soluong` varchar(15) DEFAULT NULL,
  `mon` varchar(15) DEFAULT NULL,
  `giaovien` varchar(15) DEFAULT NULL,
  `giacu` int(11) DEFAULT NULL,
  `giamoi` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `shoe`
--

INSERT INTO `khoahoc` (`makhoahoc`, `anh`, `tenkhoahoc`, `soluong`, `mon`, `giaovien`, `giacu`, `giamoi`) VALUES
(1, 'p1.jpg', 'NIKE NEW KING', '10', 'NIKE', 'XAM', 250000, 149000),
(2, 'p2.jpg', 'ADIDAS NEW QUEEN', '12', 'ADIDAS', 'XAM', 250000, 2000000),
(3, 'p3.jpg', 'NIKE NEW LORD', '8', 'NIKE', 'DEN', 250000, 149000),
(4, 'p4.jpg', 'ADIDAS NEW CYBER', '50', 'ADIDAS', 'NAU', 250000, 149000),
(5, 'p5.jpg', 'BITIS NEW PHANTOM', '6', 'BITIS', 'XAM', 250000, 149000),
(6, 'p6.jpg', 'VANS NEW LION', '7', 'VANS', 'DO', 250000, 149000),
(7, 'p7.jpg', 'ADIDAS NEW DRAGON', '4', 'ADIDAS', 'XAM', 250000, 149000),
(8, 'p8.jpg', 'SNEAKER NEW TIGER', '3', 'SNEAKER', 'XAM', 250000, 149000),
(9, 'p9.jpg', 'AIR FORCE 1 SHADOW PALE IVORY', '5', 'NIKE', 'XAM', 1490000, 1290000),
(10, 'p10.jpg', 'AIR FORCE 1 X PARA-NOISE', '9', 'NIKE', 'DEN', 1600000, 1500000),
(11, 'p11.jpg', 'AIR FORCE 1 LX WHITE', '15', 'NIKE', 'TRANG', 1600000, 1290000),
(12, 'p12.jpg', 'AIR FORCE 1 LOW', '20', 'NIKE', 'TRANG', 1500000, 1290000),
(13, 'p13.jpg', 'AIR FORCE 1 LOW (LIMITED)', '21', 'NIKE', 'DEN', 1700000, 1590000),
(14, 'p14.jpg', 'AIR FORCE 1 (KOREA EXCLUSIVE)', '20', 'NIKE', 'DEN', 1700000, 1590000),
(15, 'p15.jpg', 'AIR FORCE 1 SHADOW PHANTOM', '6', 'NIKE', 'TRANG', 1500000, 1290000);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--
drop table if exists `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` text CHARACTER SET utf8 NOT NULL,
  `password` text NOT NULL,
  `name` text CHARACTER SET utf8,
  `tel` char(12) CHARACTER SET utf8 DEFAULT NULL,
  `stt` int(11) DEFAULT NULL,
  `avatar` text CHARACTER SET utf8
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `tel`, `stt`, `avatar`) VALUES
(1, 'nodejsacc3@gmail.com', '$2a$10$CFzE0H4WBOogvtnZnf5aQuZ7mV5Pb9oFbPOvKrN1Hjc.e4sTFI8W.', 'Thay giao 3', '1234567981', NULL, ''),
(2, 'user1@gmail.com', '$2a$10$3c9Ltd18Y3BMxmU/eSOBKO1zyEP9cWDQ0r/x2rHIphrBqTJBfB.aO', 'Đặng Vinh', '915797703', NULL, 'upload/myImage-1578322577668.jpg'),
(3, 'truongvy@gmail.com', '$2a$10$QV4zpWYhAt0yGe9CAwlSBu5bTZuN70oi6pE6goXPzXOeSisg27O32', 'vy dep chai', '012', NULL, ''),
(4, 'nodejsacc2@gmail.com', '$2a$10$vIoeK.dLxELZNTt0YDQlp.no2FArfVjqPbpeSG/PSvZ9Xxj7NN0xi', 'Chàng Trai Mua Giày', '01234565675', NULL, ''),
(5, 'truongvy99413@gmail.com', '$2a$10$ADPVKnnHkmHekbXyzZ85mehh9l2UcsqraR/v3NROFXADLPGh5Bz.u', 'Vỹ', '123456789', NULL, 'upload/vy.jpg'),
(6, 'alo@gmail.com', '$2a$10$E1.VUyzJu/UfHm/HXxjX.u0brETM1BEJORAAJkmlP2ZJ8Abdq0vcK', 'Văn Định', '0915797703', NULL, 'upload/myImage-1578325539844.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adminUsers`
--
ALTER TABLE `adminUsers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `binhluan`
--
ALTER TABLE `binhluan`
  ADD PRIMARY KEY (`mabinhluan`),
  ADD KEY `binhluan_khoahoc` (`makhoahoc`);

--
-- Indexes for table `giaodich`
--
ALTER TABLE `giaodich`
  ADD PRIMARY KEY (`magiaodich`),
  ADD KEY `giaodich_khoahoc` (`makhoahoc`),
  ADD KEY `giaodich_hoadon` (`mahoadon`);

--
-- Indexes for table `hoadon`
--
ALTER TABLE `hoadon`
  ADD PRIMARY KEY (`mahoadon`),
  ADD KEY `hoadon_user` (`id`);

--
-- Indexes for table `shoe`
--
ALTER TABLE `khoahoc`
  ADD PRIMARY KEY (`makhoahoc`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adminUsers`
--
ALTER TABLE `adminUsers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `binhluan`
--
ALTER TABLE `binhluan`
  MODIFY `mabinhluan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `giaodich`
--
ALTER TABLE `giaodich`
  MODIFY `magiaodich` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=221;

--
-- AUTO_INCREMENT for table `hoadon`
--
ALTER TABLE `hoadon`
  MODIFY `mahoadon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1010;

--
-- AUTO_INCREMENT for table `shoe`
--
ALTER TABLE `khoahoc`
  MODIFY `makhoahoc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `binhluan`
--
ALTER TABLE `binhluan`
  ADD CONSTRAINT `binhluan_makhoahoc` FOREIGN KEY (`makhoahoc`) REFERENCES `khoahoc` (`makhoahoc`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `giaodich`
--
ALTER TABLE `giaodich`
  ADD CONSTRAINT `giaodich_hoadon` FOREIGN KEY (`mahoadon`) REFERENCES `hoadon` (`mahoadon`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `giaodich_khoahoc` FOREIGN KEY (`makhoahoc`) REFERENCES `khoahoc` (`makhoahoc`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `hoadon`
--
ALTER TABLE `hoadon`
  ADD CONSTRAINT `hoadon_user` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

