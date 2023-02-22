-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-02-2023 a las 23:26:35
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gonzalo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `countries`
--

CREATE TABLE `countries` (
  `country_id` int(11) NOT NULL,
  `descrip` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dependences`
--

CREATE TABLE `dependences` (
  `dep_id` int(11) NOT NULL,
  `descrip` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `districts`
--

CREATE TABLE `districts` (
  `district_id` int(11) NOT NULL,
  `descrip` varchar(50) NOT NULL,
  `prov_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `drivers`
--

CREATE TABLE `drivers` (
  `ID` int(11) NOT NULL,
  `doc_id` int(11) DEFAULT NULL,
  `document` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `position_id` int(11) DEFAULT NULL,
  `license` int(11) DEFAULT NULL,
  `dep_id` int(11) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `phone` bigint(20) DEFAULT NULL,
  `situation_id` int(11) DEFAULT NULL,
  `observation` varchar(100) DEFAULT NULL,
  `birth_year` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `locations`
--

CREATE TABLE `locations` (
  `location_id` int(11) NOT NULL,
  `descrip` varchar(100) NOT NULL,
  `district_id` int(11) NOT NULL,
  `cod_postal` int(11) NOT NULL,
  `prov_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `position`
--

CREATE TABLE `position` (
  `position_id` int(11) NOT NULL,
  `descrip` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `provinces`
--

CREATE TABLE `provinces` (
  `prov_id` int(11) NOT NULL,
  `country_id` int(11) NOT NULL,
  `prov_desc` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_user`
--

CREATE TABLE `rol_user` (
  `ID` int(11) NOT NULL,
  `rol` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `situations`
--

CREATE TABLE `situations` (
  `situation_id` int(11) NOT NULL,
  `descrip` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `types_docs`
--

CREATE TABLE `types_docs` (
  `doc_id` int(11) NOT NULL,
  `descrip` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`country_id`);

--
-- Indices de la tabla `dependences`
--
ALTER TABLE `dependences`
  ADD PRIMARY KEY (`dep_id`);

--
-- Indices de la tabla `districts`
--
ALTER TABLE `districts`
  ADD PRIMARY KEY (`district_id`),
  ADD KEY `prov_id` (`prov_id`);

--
-- Indices de la tabla `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `doc_id` (`doc_id`),
  ADD KEY `dep_id` (`dep_id`),
  ADD KEY `locali_id` (`location_id`) USING BTREE,
  ADD KEY `situac_id` (`situation_id`) USING BTREE,
  ADD KEY `position_id` (`position_id`);

--
-- Indices de la tabla `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`location_id`),
  ADD KEY `parti_id` (`district_id`),
  ADD KEY `prov_id` (`prov_id`);

--
-- Indices de la tabla `position`
--
ALTER TABLE `position`
  ADD PRIMARY KEY (`position_id`);

--
-- Indices de la tabla `provinces`
--
ALTER TABLE `provinces`
  ADD PRIMARY KEY (`prov_id`),
  ADD KEY `pais_id` (`country_id`);

--
-- Indices de la tabla `rol_user`
--
ALTER TABLE `rol_user`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `situations`
--
ALTER TABLE `situations`
  ADD PRIMARY KEY (`situation_id`);

--
-- Indices de la tabla `types_docs`
--
ALTER TABLE `types_docs`
  ADD PRIMARY KEY (`doc_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rol` (`rol`) USING BTREE;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `countries`
--
ALTER TABLE `countries`
  MODIFY `country_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `dependences`
--
ALTER TABLE `dependences`
  MODIFY `dep_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `districts`
--
ALTER TABLE `districts`
  MODIFY `district_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `drivers`
--
ALTER TABLE `drivers`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `locations`
--
ALTER TABLE `locations`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `position`
--
ALTER TABLE `position`
  MODIFY `position_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `provinces`
--
ALTER TABLE `provinces`
  MODIFY `prov_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rol_user`
--
ALTER TABLE `rol_user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `situations`
--
ALTER TABLE `situations`
  MODIFY `situation_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `types_docs`
--
ALTER TABLE `types_docs`
  MODIFY `doc_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `districts`
--
ALTER TABLE `districts`
  ADD CONSTRAINT `districts_ibfk_1` FOREIGN KEY (`prov_id`) REFERENCES `provinces` (`prov_id`);

--
-- Filtros para la tabla `drivers`
--
ALTER TABLE `drivers`
  ADD CONSTRAINT `drivers_ibfk_1` FOREIGN KEY (`doc_id`) REFERENCES `types_docs` (`doc_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `drivers_ibfk_2` FOREIGN KEY (`situation_id`) REFERENCES `situations` (`situation_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `drivers_ibfk_3` FOREIGN KEY (`location_id`) REFERENCES `locations` (`location_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `drivers_ibfk_4` FOREIGN KEY (`dep_id`) REFERENCES `dependences` (`dep_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `drivers_ibfk_5` FOREIGN KEY (`position_id`) REFERENCES `position` (`position_id`);

--
-- Filtros para la tabla `locations`
--
ALTER TABLE `locations`
  ADD CONSTRAINT `locations_ibfk_1` FOREIGN KEY (`district_id`) REFERENCES `districts` (`district_id`),
  ADD CONSTRAINT `locations_ibfk_2` FOREIGN KEY (`prov_id`) REFERENCES `provinces` (`prov_id`);

--
-- Filtros para la tabla `provinces`
--
ALTER TABLE `provinces`
  ADD CONSTRAINT `provinces_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `countries` (`country_id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`rol`) REFERENCES `rol_user` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
