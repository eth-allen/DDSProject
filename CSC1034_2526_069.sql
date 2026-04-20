-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 20, 2026 at 11:47 AM
-- Server version: 10.11.14-MariaDB-0+deb12u2-log
-- PHP Version: 8.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `CSC1034_2526_069`
--

-- --------------------------------------------------------

--
-- Table structure for table `Evidence`
--

CREATE TABLE `Evidence` (
  `EvidenceID` int(11) NOT NULL,
  `Filename` varchar(50) NOT NULL,
  `EvidenceType` enum('Photographic','Audio','Video','Sighting') NOT NULL,
  `Description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Evidence`
--

INSERT INTO `Evidence` (`EvidenceID`, `Filename`, `EvidenceType`, `Description`) VALUES
(1, 'poach_video_mountain_gorilla_2647.mp4', 'Video', 'Trail camera footage showing suspected poacher approaching Mountain Gorilla habitat in Uganda.'),
(2, 'spot_audio_asian_elephant_8793.wav', 'Audio', 'Audio recording of Asian Elephant vocalisation captured at survey site in Indonesia.'),
(3, 'spot_great_white_shark_australia_1969.jpg', 'Photographic', 'Clear photograph of Great White Shark (Carcharodon carcharias) observed in the wild in Australia.'),
(4, 'sighting_clouded_leopard_3868.txt', 'Sighting', 'Verified visual sighting of Clouded Leopard by trained field observer in India; individual appears healthy.'),
(5, 'sighting_brown_bear_7504.txt', 'Sighting', 'Verified visual sighting of Brown Bear by trained field observer in Canada; individual appears healthy.'),
(6, 'sighting_grey_wolf_1151.txt', 'Sighting', 'Verified visual sighting of Grey Wolf by trained field observer in Russia; individual appears healthy.'),
(7, 'spot_african_wild_dog_zimbabwe_9901.jpg', 'Photographic', 'Clear photograph of African Wild Dog (Lycaon pictus) observed in the wild in Zimbabwe.'),
(8, 'sighting_hawksbill_sea_turtle_8668.txt', 'Sighting', 'Verified visual sighting of Hawksbill Sea Turtle by trained field observer in Seychelles; individual appears healthy.'),
(9, 'spot_bengal_tiger_nepal_8518.jpg', 'Photographic', 'Clear photograph of Bengal Tiger (Panthera tigris) observed in the wild in Nepal.'),
(10, 'poach_video_brown_bear_4164.mp4', 'Video', 'Trail camera footage showing suspected poacher approaching Brown Bear habitat in United States.'),
(11, 'spot_sperm_whale_australia_7567.jpg', 'Photographic', 'Clear photograph of Sperm Whale (Physeter macrocephalus) observed in the wild in Australia.'),
(12, 'spot_mountain_gorilla_rwanda_5064.jpg', 'Photographic', 'Clear photograph of Mountain Gorilla (Gorilla beringei beringei) observed in the wild in Rwanda.'),
(13, 'spot_video_clouded_leopard_6400.mp4', 'Video', 'Video footage of Clouded Leopard exhibiting natural foraging behaviour in China.'),
(14, 'spot_reindeer_russia_6890.jpg', 'Photographic', 'Clear photograph of Reindeer (Rangifer tarandus) observed in the wild in Russia.'),
(15, 'spot_great_white_shark_new_zealand_7642.jpg', 'Photographic', 'Clear photograph of Great White Shark (Carcharodon carcharias) observed in the wild in New Zealand.'),
(16, 'sighting_sperm_whale_5833.txt', 'Sighting', 'Verified visual sighting of Sperm Whale by trained field observer in Norway; individual appears healthy.'),
(17, 'poach_audio_great_white_shark_8454.wav', 'Audio', 'Audio recording of gunshot-like sounds near known Great White Shark territory in Australia.'),
(18, 'sighting_humpback_whale_9806.txt', 'Sighting', 'Verified visual sighting of Humpback Whale by trained field observer in Australia; individual appears healthy.'),
(19, 'sighting_argali_2341.txt', 'Sighting', 'Verified visual sighting of Argali by trained field observer in China; individual appears healthy.'),
(20, 'spot_bengal_tiger_bangladesh_2838.jpg', 'Photographic', 'Clear photograph of Bengal Tiger (Panthera tigris) observed in the wild in Bangladesh.'),
(21, 'spot_video_golden_eagle_3455.mp4', 'Video', 'Video footage of Golden Eagle exhibiting natural foraging behaviour in Norway.'),
(22, 'spot_argali_kazakhstan_4365.jpg', 'Photographic', 'Clear photograph of Argali (Ovis ammon) observed in the wild in Kazakhstan.'),
(23, 'poach_audio_mountain_hawk-eagle_1911.wav', 'Audio', 'Audio recording of gunshot-like sounds near known Mountain Hawk-Eagle territory in India.'),
(24, 'spot_video_northern_white_rhinoceros_8575.mp4', 'Video', 'Video footage of Northern White Rhinoceros exhibiting natural foraging behaviour in Kenya.'),
(25, 'spot_video_hyacinth_macaw_2196.mp4', 'Video', 'Video footage of Hyacinth Macaw exhibiting natural foraging behaviour in Paraguay.'),
(26, 'spot_audio_whale_shark_1987.wav', 'Audio', 'Audio recording of Whale Shark vocalisation captured at survey site in Indonesia.'),
(27, 'poach_sun_bear_malaysia_3218.jpg', 'Photographic', 'Photograph of poaching activity involving Sun Bear in Malaysia; snare visible near carcass.'),
(28, 'spot_audio_komodo_dragon_7184.wav', 'Audio', 'Audio recording of Komodo Dragon vocalisation captured at survey site in Indonesia.'),
(29, 'sighting_grey_wolf_3178.txt', 'Sighting', 'Verified visual sighting of Grey Wolf by trained field observer in Norway; individual appears healthy.'),
(30, 'poach_leatherback_sea_turtle_indonesia_3086.jpg', 'Photographic', 'Photograph of poaching activity involving Leatherback Sea Turtle in Indonesia; snare visible near carcass.'),
(31, 'spot_audio_african_lion_9920.wav', 'Audio', 'Audio recording of African Lion vocalisation captured at survey site in Tanzania.'),
(32, 'spot_south_american_tapir_brazil_6671.jpg', 'Photographic', 'Clear photograph of South American Tapir (Tapirus terrestris) observed in the wild in Brazil.'),
(33, 'poach_great_white_shark_united_states_7868.jpg', 'Photographic', 'Photograph of poaching activity involving Great White Shark in United States; snare visible near carcass.'),
(34, 'spot_golden_eagle_russia_2102.jpg', 'Photographic', 'Clear photograph of Golden Eagle (Aquila chrysaetos) observed in the wild in Russia.'),
(35, 'spot_hawksbill_sea_turtle_philippines_1724.jpg', 'Photographic', 'Clear photograph of Hawksbill Sea Turtle (Eretmochelys imbricata) observed in the wild in Philippines.'),
(36, 'poach_video_common_hippopotamus_1924.mp4', 'Video', 'Trail camera footage showing suspected poacher approaching Common Hippopotamus habitat in Kenya.'),
(37, 'poach_fishing_cat_india_6253.jpg', 'Photographic', 'Photograph of poaching activity involving Fishing Cat in India; snare visible near carcass.'),
(38, 'spot_audio_common_bottlenose_dolphin_7775.wav', 'Audio', 'Audio recording of Common Bottlenose Dolphin vocalisation captured at survey site in Australia.'),
(39, 'poach_sighting_galápagos_tortoise_3869.txt', 'Sighting', 'Field ranger sighting report of suspected poaching equipment near Galápagos Tortoise corridor in Ecuador.'),
(40, 'sighting_common_bottlenose_dolphin_7244.txt', 'Sighting', 'Verified visual sighting of Common Bottlenose Dolphin by trained field observer in South Africa; individual appears healthy.'),
(41, 'spot_south_american_tapir_bolivia_7167.jpg', 'Photographic', 'Clear photograph of South American Tapir (Tapirus terrestris) observed in the wild in Bolivia.'),
(42, 'poach_west_indian_manatee_trinidad_and_tobago_3365', 'Photographic', 'Photograph of poaching activity involving West Indian Manatee in Trinidad and Tobago; snare visible near carcass.'),
(43, 'spot_video_polar_bear_3196.mp4', 'Video', 'Video footage of Polar Bear exhibiting natural foraging behaviour in Norway.'),
(44, 'poach_video_bengal_tiger_8369.mp4', 'Video', 'Trail camera footage showing suspected poacher approaching Bengal Tiger habitat in Nepal.'),
(45, 'spot_west_indian_manatee_mexico_7179.jpg', 'Photographic', 'Clear photograph of West Indian Manatee (Trichechus manatus) observed in the wild in Mexico.'),
(46, 'poach_reindeer_russia_4555.jpg', 'Photographic', 'Photograph of poaching activity involving Reindeer in Russia; snare visible near carcass.'),
(47, 'spot_bengal_tiger_nepal_1251.jpg', 'Photographic', 'Clear photograph of Bengal Tiger (Panthera tigris) observed in the wild in Nepal.'),
(48, 'spot_video_west_indian_manatee_8846.mp4', 'Video', 'Video footage of West Indian Manatee exhibiting natural foraging behaviour in Belize.'),
(49, 'spot_jaguar_mexico_4921.jpg', 'Photographic', 'Clear photograph of Jaguar (Panthera onca) observed in the wild in Mexico.'),
(50, 'spot_audio_brown_bear_6886.wav', 'Audio', 'Audio recording of Brown Bear vocalisation captured at survey site in Poland.'),
(51, 'spot_audio_sumatran_orangutan_8692.wav', 'Audio', 'Audio recording of Sumatran Orangutan vocalisation captured at survey site in Indonesia.'),
(52, 'spot_bengal_tiger_nepal_4625.jpg', 'Photographic', 'Clear photograph of Bengal Tiger (Panthera tigris) observed in the wild in Nepal.'),
(53, 'poach_video_black_rhinoceros_7841.mp4', 'Video', 'Trail camera footage showing suspected poacher approaching Black Rhinoceros habitat in Namibia.'),
(54, 'poach_whale_shark_australia_5026.jpg', 'Photographic', 'Photograph of poaching activity involving Whale Shark in Australia; snare visible near carcass.'),
(55, 'spot_african_wild_dog_zimbabwe_9005.jpg', 'Photographic', 'Clear photograph of African Wild Dog (Lycaon pictus) observed in the wild in Zimbabwe.'),
(56, 'poach_mountain_hawk-eagle_japan_9954.jpg', 'Photographic', 'Photograph of poaching activity involving Mountain Hawk-Eagle in Japan; snare visible near carcass.'),
(57, 'sighting_grey_wolf_1962.txt', 'Sighting', 'Verified visual sighting of Grey Wolf by trained field observer in Russia; individual appears healthy.'),
(58, 'sighting_leatherback_sea_turtle_1794.txt', 'Sighting', 'Verified visual sighting of Leatherback Sea Turtle by trained field observer in Australia; individual appears healthy.'),
(59, 'poach_hawksbill_sea_turtle_seychelles_3474.jpg', 'Photographic', 'Photograph of poaching activity involving Hawksbill Sea Turtle in Seychelles; snare visible near carcass.'),
(60, 'spot_west_indian_manatee_mexico_8916.jpg', 'Photographic', 'Clear photograph of West Indian Manatee (Trichechus manatus) observed in the wild in Mexico.'),
(61, 'poach_audio_african_lion_1274.wav', 'Audio', 'Audio recording of gunshot-like sounds near known African Lion territory in Tanzania.'),
(62, 'spot_african_wild_dog_zambia_8054.jpg', 'Photographic', 'Clear photograph of African Wild Dog (Lycaon pictus) observed in the wild in Zambia.'),
(63, 'spot_asian_elephant_thailand_4144.jpg', 'Photographic', 'Clear photograph of Asian Elephant (Elephas maximus) observed in the wild in Thailand.'),
(64, 'poach_south_american_tapir_ecuador_7502.jpg', 'Photographic', 'Photograph of poaching activity involving South American Tapir in Ecuador; snare visible near carcass.'),
(65, 'spot_video_red_panda_4700.mp4', 'Video', 'Video footage of Red Panda exhibiting natural foraging behaviour in Nepal.'),
(66, 'spot_video_asian_elephant_2531.mp4', 'Video', 'Video footage of Asian Elephant exhibiting natural foraging behaviour in Sri Lanka.'),
(67, 'spot_whale_shark_indonesia_1154.jpg', 'Photographic', 'Clear photograph of Whale Shark (Rhincodon typus) observed in the wild in Indonesia.'),
(68, 'spot_video_leatherback_sea_turtle_6427.mp4', 'Video', 'Video footage of Leatherback Sea Turtle exhibiting natural foraging behaviour in Trinidad and Tobago.'),
(69, 'spot_grey_wolf_norway_8790.jpg', 'Photographic', 'Clear photograph of Grey Wolf (Canis lupus) observed in the wild in Norway.'),
(70, 'sighting_bengal_tiger_1539.txt', 'Sighting', 'Verified visual sighting of Bengal Tiger by trained field observer in Bangladesh; individual appears healthy.'),
(71, 'poach_video_humpback_whale_7525.mp4', 'Video', 'Trail camera footage showing suspected poacher approaching Humpback Whale habitat in Australia.'),
(72, 'poach_video_sumatran_orangutan_7375.mp4', 'Video', 'Trail camera footage showing suspected poacher approaching Sumatran Orangutan habitat in Indonesia.'),
(73, 'spot_video_plains_zebra_2284.mp4', 'Video', 'Video footage of Plains Zebra exhibiting natural foraging behaviour in Kenya.'),
(74, 'poach_clouded_leopard_china_2245.jpg', 'Photographic', 'Photograph of poaching activity involving Clouded Leopard in China; snare visible near carcass.'),
(75, 'spot_west_indian_manatee_trinidad_and_tobago_5478.', 'Photographic', 'Clear photograph of West Indian Manatee (Trichechus manatus) observed in the wild in Trinidad and Tobago.'),
(76, 'poach_sighting_sperm_whale_8075.txt', 'Sighting', 'Field ranger sighting report of suspected poaching equipment near Sperm Whale corridor in Indonesia.'),
(77, 'spot_nile_crocodile_uganda_5839.jpg', 'Photographic', 'Clear photograph of Nile Crocodile (Crocodylus niloticus) observed in the wild in Uganda.'),
(78, 'poach_hyacinth_macaw_brazil_3527.jpg', 'Photographic', 'Photograph of poaching activity involving Hyacinth Macaw in Brazil; snare visible near carcass.'),
(79, 'spot_komodo_dragon_indonesia_6050.jpg', 'Photographic', 'Clear photograph of Komodo Dragon (Varanus komodoensis) observed in the wild in Indonesia.'),
(80, 'spot_humpback_whale_australia_4070.jpg', 'Photographic', 'Clear photograph of Humpback Whale (Megaptera novaeangliae) observed in the wild in Australia.'),
(81, 'spot_audio_sperm_whale_1430.wav', 'Audio', 'Audio recording of Sperm Whale vocalisation captured at survey site in Indonesia.'),
(82, 'spot_video_humpback_whale_6315.mp4', 'Video', 'Video footage of Humpback Whale exhibiting natural foraging behaviour in Australia.'),
(83, 'poach_video_polar_bear_4977.mp4', 'Video', 'Trail camera footage showing suspected poacher approaching Polar Bear habitat in Canada.'),
(84, 'poach_common_hippopotamus_democratic_republic_of_c', 'Photographic', 'Photograph of poaching activity involving Common Hippopotamus in Democratic Republic of Congo; snare visible near carcass.'),
(85, 'spot_jaguar_colombia_5521.jpg', 'Photographic', 'Clear photograph of Jaguar (Panthera onca) observed in the wild in Colombia.'),
(86, 'spot_whale_shark_mexico_5040.jpg', 'Photographic', 'Clear photograph of Whale Shark (Rhincodon typus) observed in the wild in Mexico.'),
(87, 'spot_fishing_cat_indonesia_5991.jpg', 'Photographic', 'Clear photograph of Fishing Cat (Prionailurus viverrinus) observed in the wild in Indonesia.'),
(88, 'spot_whale_shark_belize_6399.jpg', 'Photographic', 'Clear photograph of Whale Shark (Rhincodon typus) observed in the wild in Belize.'),
(89, 'sighting_african_wild_dog_3230.txt', 'Sighting', 'Verified visual sighting of African Wild Dog by trained field observer in Botswana; individual appears healthy.'),
(90, 'spot_audio_african_wild_dog_3910.wav', 'Audio', 'Audio recording of African Wild Dog vocalisation captured at survey site in Botswana.'),
(91, 'poach_audio_west_indian_manatee_4971.wav', 'Audio', 'Audio recording of gunshot-like sounds near known West Indian Manatee territory in Trinidad and Tobago.'),
(92, 'poach_whale_shark_belize_4273.jpg', 'Photographic', 'Photograph of poaching activity involving Whale Shark in Belize; snare visible near carcass.'),
(93, 'poach_golden_eagle_china_8563.jpg', 'Photographic', 'Photograph of poaching activity involving Golden Eagle in China; snare visible near carcass.'),
(94, 'sighting_reindeer_7703.txt', 'Sighting', 'Verified visual sighting of Reindeer by trained field observer in Norway; individual appears healthy.'),
(95, 'spot_mountain_hawk-eagle_japan_3525.jpg', 'Photographic', 'Clear photograph of Mountain Hawk-Eagle (Spizaetus nipalensis) observed in the wild in Japan.'),
(96, 'sighting_golden_eagle_8851.txt', 'Sighting', 'Verified visual sighting of Golden Eagle by trained field observer in Russia; individual appears healthy.'),
(97, 'spot_audio_arctic_fox_6890.wav', 'Audio', 'Audio recording of Arctic Fox vocalisation captured at survey site in Norway.'),
(98, 'poach_video_hawksbill_sea_turtle_6816.mp4', 'Video', 'Trail camera footage showing suspected poacher approaching Hawksbill Sea Turtle habitat in Australia.'),
(99, 'spot_video_mountain_hawk-eagle_7547.mp4', 'Video', 'Video footage of Mountain Hawk-Eagle exhibiting natural foraging behaviour in Japan.'),
(100, 'poach_red_panda_india_9366.jpg', 'Photographic', 'Photograph of poaching activity involving Red Panda in India; snare visible near carcass.'),
(101, 'spot_bald_eagle_united_states_7129.jpg', 'Photographic', 'Clear photograph of Bald Eagle (Haliaeetus leucocephalus) observed in the wild in United States.'),
(102, 'spot_video_cheetah_3469.mp4', 'Video', 'Video footage of Cheetah exhibiting natural foraging behaviour in Namibia.'),
(103, 'spot_audio_african_lion_2406.wav', 'Audio', 'Audio recording of African Lion vocalisation captured at survey site in South Africa.'),
(104, 'spot_audio_northern_white_rhinoceros_4389.wav', 'Audio', 'Audio recording of Northern White Rhinoceros vocalisation captured at survey site in Kenya.'),
(105, 'spot_audio_mountain_hawk-eagle_8412.wav', 'Audio', 'Audio recording of Mountain Hawk-Eagle vocalisation captured at survey site in Sri Lanka.'),
(106, 'spot_hawksbill_sea_turtle_australia_6620.jpg', 'Photographic', 'Clear photograph of Hawksbill Sea Turtle (Eretmochelys imbricata) observed in the wild in Australia.'),
(107, 'spot_audio_bornean_orangutan_3623.wav', 'Audio', 'Audio recording of Bornean Orangutan vocalisation captured at survey site in Malaysia.'),
(108, 'spot_african_wild_dog_zimbabwe_7636.jpg', 'Photographic', 'Clear photograph of African Wild Dog (Lycaon pictus) observed in the wild in Zimbabwe.'),
(109, 'spot_jaguar_bolivia_4232.jpg', 'Photographic', 'Clear photograph of Jaguar (Panthera onca) observed in the wild in Bolivia.'),
(110, 'spot_video_leopard_4371.mp4', 'Video', 'Video footage of Leopard exhibiting natural foraging behaviour in Kenya.'),
(111, 'spot_video_golden_eagle_9796.mp4', 'Video', 'Video footage of Golden Eagle exhibiting natural foraging behaviour in Russia.'),
(112, 'spot_clouded_leopard_china_9019.jpg', 'Photographic', 'Clear photograph of Clouded Leopard (Neofelis nebulosa) observed in the wild in China.'),
(113, 'spot_hawksbill_sea_turtle_seychelles_2871.jpg', 'Photographic', 'Clear photograph of Hawksbill Sea Turtle (Eretmochelys imbricata) observed in the wild in Seychelles.'),
(114, 'spot_northern_white_rhinoceros_democratic_republic', 'Photographic', 'Clear photograph of Northern White Rhinoceros (Ceratotherium simum cottoni) observed in the wild in Democratic Republic of Congo.'),
(115, 'poach_golden_eagle_united_states_4908.jpg', 'Photographic', 'Photograph of poaching activity involving Golden Eagle in United States; snare visible near carcass.'),
(116, 'poach_audio_black_rhinoceros_7852.wav', 'Audio', 'Audio recording of gunshot-like sounds near known Black Rhinoceros territory in Kenya.'),
(117, 'spot_brown_bear_norway_9804.jpg', 'Photographic', 'Clear photograph of Brown Bear (Ursus arctos) observed in the wild in Norway.'),
(118, 'spot_bengal_tiger_bhutan_8389.jpg', 'Photographic', 'Clear photograph of Bengal Tiger (Panthera tigris) observed in the wild in Bhutan.'),
(119, 'spot_audio_african_lion_4196.wav', 'Audio', 'Audio recording of African Lion vocalisation captured at survey site in South Africa.'),
(120, 'spot_audio_nile_crocodile_9056.wav', 'Audio', 'Audio recording of Nile Crocodile vocalisation captured at survey site in Kenya.'),
(121, 'spot_sulawesi_babirusa_indonesia_1505.jpg', 'Photographic', 'Clear photograph of Sulawesi Babirusa (Babyrousa celebensis) observed in the wild in Indonesia.'),
(122, 'poach_audio_sperm_whale_3755.wav', 'Audio', 'Audio recording of gunshot-like sounds near known Sperm Whale territory in New Zealand.'),
(123, 'spot_audio_african_wild_dog_2854.wav', 'Audio', 'Audio recording of African Wild Dog vocalisation captured at survey site in Zimbabwe.'),
(124, 'poach_sighting_polar_bear_7010.txt', 'Sighting', 'Field ranger sighting report of suspected poaching equipment near Polar Bear corridor in Russia.'),
(125, 'spot_audio_asian_elephant_7965.wav', 'Audio', 'Audio recording of Asian Elephant vocalisation captured at survey site in Indonesia.'),
(126, 'spot_sulawesi_babirusa_indonesia_1528.jpg', 'Photographic', 'Clear photograph of Sulawesi Babirusa (Babyrousa celebensis) observed in the wild in Indonesia.'),
(127, 'spot_audio_fishing_cat_2923.wav', 'Audio', 'Audio recording of Fishing Cat vocalisation captured at survey site in India.'),
(128, 'spot_video_cheetah_8015.mp4', 'Video', 'Video footage of Cheetah exhibiting natural foraging behaviour in Tanzania.'),
(129, 'poach_sighting_african_wild_dog_1972.txt', 'Sighting', 'Field ranger sighting report of suspected poaching equipment near African Wild Dog corridor in Zimbabwe.'),
(130, 'spot_audio_plains_zebra_6302.wav', 'Audio', 'Audio recording of Plains Zebra vocalisation captured at survey site in Kenya.'),
(131, 'sighting_clouded_leopard_2560.txt', 'Sighting', 'Verified visual sighting of Clouded Leopard by trained field observer in China; individual appears healthy.'),
(132, 'sighting_nile_crocodile_3078.txt', 'Sighting', 'Verified visual sighting of Nile Crocodile by trained field observer in Zimbabwe; individual appears healthy.'),
(133, 'poach_sighting_cheetah_7434.txt', 'Sighting', 'Field ranger sighting report of suspected poaching equipment near Cheetah corridor in Tanzania.'),
(134, 'spot_video_african_bush_elephant_7146.mp4', 'Video', 'Video footage of African Bush Elephant exhibiting natural foraging behaviour in South Africa.'),
(135, 'spot_audio_grey_wolf_5558.wav', 'Audio', 'Audio recording of Grey Wolf vocalisation captured at survey site in United States.'),
(136, 'spot_video_arctic_fox_2526.mp4', 'Video', 'Video footage of Arctic Fox exhibiting natural foraging behaviour in United States.'),
(137, 'spot_sun_bear_india_8039.jpg', 'Photographic', 'Clear photograph of Sun Bear (Helarctos malayanus) observed in the wild in India.'),
(138, 'poach_reindeer_norway_3139.jpg', 'Photographic', 'Photograph of poaching activity involving Reindeer in Norway; snare visible near carcass.'),
(139, 'sighting_golden_eagle_1793.txt', 'Sighting', 'Verified visual sighting of Golden Eagle by trained field observer in Russia; individual appears healthy.'),
(140, 'spot_hyacinth_macaw_paraguay_3588.jpg', 'Photographic', 'Clear photograph of Hyacinth Macaw (Anodorhynchus hyacinthinus) observed in the wild in Paraguay.'),
(141, 'poach_jaguar_brazil_3161.jpg', 'Photographic', 'Photograph of poaching activity involving Jaguar in Brazil; snare visible near carcass.'),
(142, 'spot_argali_mongolia_6905.jpg', 'Photographic', 'Clear photograph of Argali (Ovis ammon) observed in the wild in Mongolia.'),
(143, 'spot_polar_bear_russia_7493.jpg', 'Photographic', 'Clear photograph of Polar Bear (Ursus maritimus) observed in the wild in Russia.'),
(144, 'spot_video_jaguar_1017.mp4', 'Video', 'Video footage of Jaguar exhibiting natural foraging behaviour in Peru.'),
(145, 'poach_cheetah_zimbabwe_8291.jpg', 'Photographic', 'Photograph of poaching activity involving Cheetah in Zimbabwe; snare visible near carcass.'),
(146, 'sighting_polar_bear_7919.txt', 'Sighting', 'Verified visual sighting of Polar Bear by trained field observer in Norway; individual appears healthy.'),
(147, 'poach_sun_bear_malaysia_2678.jpg', 'Photographic', 'Photograph of poaching activity involving Sun Bear in Malaysia; snare visible near carcass.'),
(148, 'spot_west_indian_manatee_trinidad_and_tobago_3181.', 'Photographic', 'Clear photograph of West Indian Manatee (Trichechus manatus) observed in the wild in Trinidad and Tobago.'),
(149, 'spot_video_african_lion_3688.mp4', 'Video', 'Video footage of African Lion exhibiting natural foraging behaviour in Zimbabwe.'),
(150, 'spot_video_plains_zebra_7745.mp4', 'Video', 'Video footage of Plains Zebra exhibiting natural foraging behaviour in South Africa.'),
(151, 'sighting_bengal_tiger_3293.txt', 'Sighting', 'Verified visual sighting of Bengal Tiger by trained field observer in Bangladesh; individual appears healthy.'),
(152, 'spot_mountain_hawk-eagle_sri_lanka_3290.jpg', 'Photographic', 'Clear photograph of Mountain Hawk-Eagle (Spizaetus nipalensis) observed in the wild in Sri Lanka.'),
(153, 'spot_video_great_white_shark_5668.mp4', 'Video', 'Video footage of Great White Shark exhibiting natural foraging behaviour in United States.'),
(154, 'poach_audio_cheetah_7418.wav', 'Audio', 'Audio recording of gunshot-like sounds near known Cheetah territory in Kenya.'),
(155, 'spot_audio_argali_2847.wav', 'Audio', 'Audio recording of Argali vocalisation captured at survey site in Kazakhstan.'),
(156, 'spot_audio_blue_whale_1197.wav', 'Audio', 'Audio recording of Blue Whale vocalisation captured at survey site in Australia.'),
(157, 'poach_audio_west_indian_manatee_9951.wav', 'Audio', 'Audio recording of gunshot-like sounds near known West Indian Manatee territory in Trinidad and Tobago.'),
(158, 'spot_red_panda_china_2106.jpg', 'Photographic', 'Clear photograph of Red Panda (Ailurus fulgens) observed in the wild in China.'),
(159, 'poach_sighting_african_wild_dog_7520.txt', 'Sighting', 'Field ranger sighting report of suspected poaching equipment near African Wild Dog corridor in Tanzania.'),
(160, 'spot_video_african_wild_dog_7939.mp4', 'Video', 'Video footage of African Wild Dog exhibiting natural foraging behaviour in Zambia.'),
(161, 'spot_video_hawksbill_sea_turtle_5546.mp4', 'Video', 'Video footage of Hawksbill Sea Turtle exhibiting natural foraging behaviour in Australia.'),
(162, 'poach_sighting_south_american_tapir_3545.txt', 'Sighting', 'Field ranger sighting report of suspected poaching equipment near South American Tapir corridor in Peru.'),
(163, 'spot_video_south_american_tapir_2083.mp4', 'Video', 'Video footage of South American Tapir exhibiting natural foraging behaviour in Peru.'),
(164, 'spot_rodrigues_flying_fox_mauritius_2412.jpg', 'Photographic', 'Clear photograph of Rodrigues Flying Fox (Pteropus rodricensis) observed in the wild in Mauritius.'),
(165, 'spot_leatherback_sea_turtle_trinidad_and_tobago_38', 'Photographic', 'Clear photograph of Leatherback Sea Turtle (Dermochelys coriacea) observed in the wild in Trinidad and Tobago.'),
(166, 'spot_african_lion_south_africa_6680.jpg', 'Photographic', 'Clear photograph of African Lion (Panthera leo) observed in the wild in South Africa.'),
(167, 'poach_video_mountain_gorilla_5403.mp4', 'Video', 'Trail camera footage showing suspected poacher approaching Mountain Gorilla habitat in Rwanda.'),
(168, 'spot_mountain_gorilla_uganda_2046.jpg', 'Photographic', 'Clear photograph of Mountain Gorilla (Gorilla beringei beringei) observed in the wild in Uganda.'),
(169, 'spot_grey_wolf_norway_9185.jpg', 'Photographic', 'Clear photograph of Grey Wolf (Canis lupus) observed in the wild in Norway.'),
(170, 'spot_video_brown_bear_2889.mp4', 'Video', 'Video footage of Brown Bear exhibiting natural foraging behaviour in Norway.'),
(171, 'poach_hawksbill_sea_turtle_seychelles_8729.jpg', 'Photographic', 'Photograph of poaching activity involving Hawksbill Sea Turtle in Seychelles; snare visible near carcass.'),
(172, 'sighting_arctic_fox_1579.txt', 'Sighting', 'Verified visual sighting of Arctic Fox by trained field observer in Norway; individual appears healthy.'),
(173, 'spot_south_american_tapir_colombia_5067.jpg', 'Photographic', 'Clear photograph of South American Tapir (Tapirus terrestris) observed in the wild in Colombia.'),
(174, 'spot_video_plains_zebra_2956.mp4', 'Video', 'Video footage of Plains Zebra exhibiting natural foraging behaviour in Zimbabwe.'),
(175, 'spot_common_hippopotamus_democratic_republic_of_co', 'Photographic', 'Clear photograph of Common Hippopotamus (Hippopotamus amphibius) observed in the wild in Democratic Republic of Congo.'),
(176, 'poach_sighting_common_hippopotamus_6090.txt', 'Sighting', 'Field ranger sighting report of suspected poaching equipment near Common Hippopotamus corridor in Uganda.'),
(177, 'spot_black_rhinoceros_south_africa_5777.jpg', 'Photographic', 'Clear photograph of Black Rhinoceros (Diceros bicornis) observed in the wild in South Africa.'),
(178, 'spot_audio_northern_white_rhinoceros_9083.wav', 'Audio', 'Audio recording of Northern White Rhinoceros vocalisation captured at survey site in Democratic Republic of Congo.'),
(179, 'spot_mountain_hawk-eagle_thailand_7718.jpg', 'Photographic', 'Clear photograph of Mountain Hawk-Eagle (Spizaetus nipalensis) observed in the wild in Thailand.'),
(180, 'sighting_cheetah_1157.txt', 'Sighting', 'Verified visual sighting of Cheetah by trained field observer in Tanzania; individual appears healthy.'),
(181, 'sighting_great_white_shark_6038.txt', 'Sighting', 'Verified visual sighting of Great White Shark by trained field observer in New Zealand; individual appears healthy.'),
(182, 'spot_audio_humpback_whale_1981.wav', 'Audio', 'Audio recording of Humpback Whale vocalisation captured at survey site in Brazil.'),
(183, 'poach_sighting_whale_shark_9515.txt', 'Sighting', 'Field ranger sighting report of suspected poaching equipment near Whale Shark corridor in Belize.'),
(184, 'spot_video_african_wild_dog_9280.mp4', 'Video', 'Video footage of African Wild Dog exhibiting natural foraging behaviour in Botswana.'),
(185, 'poach_hawksbill_sea_turtle_seychelles_3141.jpg', 'Photographic', 'Photograph of poaching activity involving Hawksbill Sea Turtle in Seychelles; snare visible near carcass.'),
(186, 'poach_sighting_african_wild_dog_7438.txt', 'Sighting', 'Field ranger sighting report of suspected poaching equipment near African Wild Dog corridor in Botswana.'),
(187, 'spot_fishing_cat_thailand_4321.jpg', 'Photographic', 'Clear photograph of Fishing Cat (Prionailurus viverrinus) observed in the wild in Thailand.'),
(188, 'poach_hyacinth_macaw_bolivia_8635.jpg', 'Photographic', 'Photograph of poaching activity involving Hyacinth Macaw in Bolivia; snare visible near carcass.'),
(189, 'poach_sighting_cheetah_4401.txt', 'Sighting', 'Field ranger sighting report of suspected poaching equipment near Cheetah corridor in Namibia.'),
(190, 'spot_fishing_cat_sri_lanka_5984.jpg', 'Photographic', 'Clear photograph of Fishing Cat (Prionailurus viverrinus) observed in the wild in Sri Lanka.'),
(191, 'poach_leatherback_sea_turtle_australia_5066.jpg', 'Photographic', 'Photograph of poaching activity involving Leatherback Sea Turtle in Australia; snare visible near carcass.'),
(192, 'spot_argali_mongolia_3848.jpg', 'Photographic', 'Clear photograph of Argali (Ovis ammon) observed in the wild in Mongolia.'),
(193, 'spot_video_whale_shark_5093.mp4', 'Video', 'Video footage of Whale Shark exhibiting natural foraging behaviour in Mexico.'),
(194, 'poach_jaguar_brazil_2010.jpg', 'Photographic', 'Photograph of poaching activity involving Jaguar in Brazil; snare visible near carcass.'),
(195, 'poach_mountain_gorilla_democratic_republic_of_cong', 'Photographic', 'Photograph of poaching activity involving Mountain Gorilla in Democratic Republic of Congo; snare visible near carcass.'),
(196, 'spot_common_bottlenose_dolphin_australia_2056.jpg', 'Photographic', 'Clear photograph of Common Bottlenose Dolphin (Tursiops truncatus) observed in the wild in Australia.'),
(197, 'sighting_common_hippopotamus_6432.txt', 'Sighting', 'Verified visual sighting of Common Hippopotamus by trained field observer in Kenya; individual appears healthy.'),
(198, 'spot_west_indian_manatee_mexico_8096.jpg', 'Photographic', 'Clear photograph of West Indian Manatee (Trichechus manatus) observed in the wild in Mexico.'),
(199, 'poach_jaguar_brazil_4517.jpg', 'Photographic', 'Photograph of poaching activity involving Jaguar in Brazil; snare visible near carcass.'),
(200, 'poach_sperm_whale_new_zealand_5026.jpg', 'Photographic', 'Photograph of poaching activity involving Sperm Whale in New Zealand; snare visible near carcass.'),
(201, 'C:fakepathScreenshot 2025-09-04 234359.png', 'Photographic', 'testDescription'),
(202, 'C:fakepathScreenshot 2025-09-04 234359.png', 'Photographic', 'test evidence description'),
(203, 'C:fakepathScreenshot 2025-09-04 234359.png', 'Photographic', 'evidence test description'),
(204, 'C:fakepathScreenshot 2025-09-04 234359.png', 'Photographic', 'test description 123'),
(205, 'C:fakepathScreenshot 2025-09-04 234359.png', 'Photographic', 'testing 213'),
(206, 'C:fakepathScreenshot 2025-09-04 234359.png', 'Photographic', 'testing 214'),
(207, 'C:fakepathimage.png', 'Photographic', 'test description'),
(208, 'C:fakepathScreenshot 2025-09-04 234359.png', 'Photographic', 'test'),
(209, 'C:fakepathScreenshot 2025-09-04 234359.png', 'Photographic', 'test');

-- --------------------------------------------------------

--
-- Stand-in structure for view `GlobalThreatAudit`
-- (See below for the actual view)
--
CREATE TABLE `GlobalThreatAudit` (
`Country` varchar(50)
,`ReportType` enum('Poaching','Animal Spotting')
,`EvidenceType` enum('Photographic','Audio','Video','Sighting')
,`Evidence_Note` varchar(255)
,`ReportDate` date
);

-- --------------------------------------------------------

--
-- Table structure for table `Location`
--

CREATE TABLE `Location` (
  `LocationID` int(11) NOT NULL,
  `Country` varchar(50) NOT NULL,
  `Latitude` decimal(9,6) NOT NULL,
  `Longitude` decimal(9,6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Location`
--

INSERT INTO `Location` (`LocationID`, `Country`, `Latitude`, `Longitude`) VALUES
(1, 'Zimbabwe', -22.229927, 27.372732),
(2, 'Indonesia', 1.593658, 126.128176),
(3, 'Mongolia', 42.512858, 101.343690),
(4, 'Kenya', -2.666667, 37.942842),
(5, 'Kenya', -2.850810, 39.099076),
(6, 'Russia', 50.171933, 120.010873),
(7, 'Sri Lanka', 5.925345, 81.472802),
(8, 'Uganda', 0.439428, 30.439589),
(9, 'Bangladesh', 22.685908, 88.435905),
(10, 'South Africa', -24.036822, 26.401107),
(11, 'Sri Lanka', 8.745954, 80.879702),
(12, 'Belize', 16.884189, -88.427143),
(13, 'Nepal', 28.874079, 87.079826),
(14, 'New Zealand', -38.211023, 166.954475),
(15, 'Indonesia', -6.051466, 98.670431),
(16, 'Indonesia', -9.272876, 107.786786),
(17, 'Zimbabwe', -19.919141, 28.124430),
(18, 'Indonesia', -6.434679, 138.086111),
(19, 'Zimbabwe', -18.257909, 26.551995),
(20, 'Democratic Republic of Congo', -10.328033, 19.447599),
(21, 'Trinidad and Tobago', 10.796000, -61.120270),
(22, 'Namibia', -18.785777, 22.253599),
(23, 'Indonesia', -10.451086, 109.510840),
(24, 'Australia', -36.658664, 151.299261),
(25, 'Mauritius', -20.311193, 57.627719),
(26, 'United States', 67.392282, -120.798355),
(27, 'Australia', -35.485955, 135.923136),
(28, 'Australia', -24.367121, 149.482262),
(29, 'United States', 34.786144, -67.145254),
(30, 'Malaysia', -3.509087, 101.004634),
(31, 'South Africa', -26.831435, 29.490102),
(32, 'Norway', 58.744918, 14.651073),
(33, 'Trinidad and Tobago', 10.640760, -60.540490),
(34, 'Seychelles', -9.729966, 53.479290),
(35, 'Namibia', -22.456356, 15.328823),
(36, 'Zimbabwe', -21.641445, 28.634645),
(37, 'China', 51.869702, 127.189785),
(38, 'Australia', -27.130717, 120.499671),
(39, 'Peru', -2.382458, -77.539596),
(40, 'Zimbabwe', -18.259003, 26.407430),
(41, 'Mexico', 24.316698, -93.429755),
(42, 'Russia', 41.223276, 74.836192),
(43, 'Kenya', 3.940617, 40.929775),
(44, 'Nepal', 27.630057, 80.569194),
(45, 'Japan', 44.359413, 125.555257),
(46, 'Ecuador', -4.450119, -76.564568),
(47, 'Mexico', 16.836725, -102.651416),
(48, 'Russia', 51.987805, 168.262590),
(49, 'Norway', 60.716916, 18.845276),
(50, 'Democratic Republic of Congo', -9.618360, 18.153781),
(51, 'Trinidad and Tobago', 10.809829, -61.286660),
(52, 'Russia', 46.124871, 57.888426),
(53, 'Canada', 65.997150, -120.657858),
(54, 'Indonesia', -9.786018, 124.030736),
(55, 'Indonesia', 4.482682, 134.543228),
(56, 'Tanzania', -9.129550, 36.725653),
(57, 'Indonesia', -8.737467, 138.033655),
(58, 'New Zealand', -41.202544, 175.893895),
(59, 'Sri Lanka', 6.642599, 79.913248),
(60, 'Norway', 63.533596, 16.922856),
(61, 'Democratic Republic of Congo', -0.740747, 30.997556),
(62, 'South Africa', -29.686710, 22.064563),
(63, 'Seychelles', -8.283196, 48.121110),
(64, 'Norway', 63.511026, 11.909301),
(65, 'Australia', -13.224562, 131.158169),
(66, 'Seychelles', -6.443016, 46.710942),
(67, 'Trinidad and Tobago', 11.070439, -60.543405),
(68, 'Bolivia', -11.697216, -67.587636),
(69, 'Ecuador', -3.510643, -78.614070),
(70, 'Tanzania', -7.607090, 40.236928),
(71, 'Australia', -17.804077, 131.636837),
(72, 'Norway', 70.632325, 30.978244),
(73, 'New Zealand', -38.032533, 168.273042),
(74, 'Brazil', 4.079665, -51.254051),
(75, 'Russia', 71.642605, 29.340963),
(76, 'Poland', 51.916532, 22.627199),
(77, 'India', 34.425342, 70.539255),
(78, 'India', 24.403962, 87.916207),
(79, 'Indonesia', -8.949939, 135.953216),
(80, 'Australia', -24.040320, 138.261075),
(81, 'Norway', 65.662841, 18.406020),
(82, 'Paraguay', -25.904649, -56.655608),
(83, 'Indonesia', -4.232062, 125.897750),
(84, 'Brazil', -21.369089, -44.502098),
(85, 'Tanzania', -6.750516, 40.382844),
(86, 'Trinidad and Tobago', 10.002565, -61.601584),
(87, 'Australia', -12.895766, 148.798826),
(88, 'Japan', 31.944832, 127.790152),
(89, 'Bhutan', 27.825664, 90.818537),
(90, 'Trinidad and Tobago', 10.815567, -61.889048),
(91, 'Nepal', 27.597515, 85.473449),
(92, 'Paraguay', -26.485384, -61.641942),
(93, 'South Africa', -27.774060, 20.966511),
(94, 'Botswana', -20.369729, 21.893455),
(95, 'Zimbabwe', -20.604909, 29.059402),
(96, 'Peru', -2.831692, -80.137039),
(97, 'Norway', 61.579847, 4.594315),
(98, 'Thailand', 15.092989, 99.548033),
(99, 'Colombia', 5.509575, -72.866519),
(100, 'Kenya', -4.000232, 40.964851),
(101, 'Peru', -8.361139, -70.784103),
(102, 'New Zealand', -45.389590, 167.942091),
(103, 'Brazil', 1.360278, -42.771618),
(104, 'Seychelles', -4.316560, 48.321773),
(105, 'Australia', -40.218090, 144.738685),
(106, 'Japan', 32.737114, 142.140507),
(107, 'India', 33.578740, 93.446486),
(108, 'Belize', 18.008006, -87.966017),
(109, 'Kenya', 2.150050, 36.557484),
(110, 'Bolivia', -12.310496, -59.144825),
(111, 'Sri Lanka', 6.940542, 81.432224),
(112, 'South Africa', -23.723482, 30.580929),
(113, 'Indonesia', 2.963631, 116.173949),
(114, 'Brazil', -2.681526, -65.001016),
(115, 'Kenya', -2.903893, 36.526096),
(116, 'Seychelles', -3.901976, 49.019162),
(117, 'Zimbabwe', -19.682187, 32.951083),
(118, 'Russia', 79.426952, 39.254235),
(119, 'Belize', 16.364276, -87.852452),
(120, 'Australia', -40.033556, 130.812919),
(121, 'Democratic Republic of Congo', -7.502866, 23.778589),
(122, 'Malaysia', 0.022345, 111.170490),
(123, 'Australia', -20.280964, 113.368159),
(124, 'Bolivia', -15.792434, -60.894897),
(125, 'Colombia', 7.603062, -73.539252),
(126, 'Tanzania', -4.526233, 32.965220),
(127, 'Brazil', -0.627404, -45.757608),
(128, 'Brazil', -21.637898, -57.931837),
(129, 'United States', 38.366229, -153.822135),
(130, 'Norway', 70.406837, 22.516657),
(131, 'Kazakhstan', 49.709621, 61.435145),
(132, 'Russia', 41.216522, 68.490097),
(133, 'Norway', 65.613798, 21.915170),
(134, 'China', 33.808241, 86.599896),
(135, 'China', 50.011683, 122.296318),
(136, 'India', 10.423398, 83.251199),
(137, 'Zimbabwe', -20.120720, 31.665545),
(138, 'Mexico', 26.744881, -110.270924),
(139, 'Indonesia', -10.582326, 106.262757),
(140, 'China', 48.195741, 77.964370),
(141, 'Norway', 66.275880, 9.671977),
(142, 'Uganda', 1.317950, 30.917516),
(143, 'Zambia', -17.945661, 30.786284),
(144, 'Thailand', 7.188151, 100.886199),
(145, 'India', 34.348270, 83.324366),
(146, 'Tanzania', -9.008659, 38.716533),
(147, 'China', 46.490006, 114.422515),
(148, 'Trinidad and Tobago', 10.733633, -60.569945),
(149, 'Mongolia', 48.032849, 110.888694),
(150, 'Malaysia', 5.366830, 110.619141),
(151, 'Kazakhstan', 51.606101, 67.862954),
(152, 'Australia', -35.465813, 138.997756),
(153, 'Mexico', 23.987657, -98.046848),
(154, 'Australia', -41.050798, 124.814844),
(155, 'Australia', -33.081555, 135.068135),
(156, 'South Africa', -31.862979, 27.880777),
(157, 'Rwanda', -2.684388, 29.655959),
(158, 'Russia', 58.122011, 54.844580),
(159, 'Norway', 69.934352, 20.036512),
(160, 'Uganda', 3.383373, 33.734211),
(161, 'United States', 24.776526, -131.464823),
(162, 'Mexico', 30.032753, -88.115718),
(163, 'Norway', 67.841958, 19.027119),
(164, 'Botswana', -24.893098, 22.040621),
(165, 'Norway', 58.286030, 13.441046),
(166, 'Namibia', -24.048200, 13.944608),
(167, 'China', 22.705261, 111.644352),
(168, 'Kenya', -1.035612, 38.415136),
(169, 'Kenya', 1.277572, 34.985596),
(170, 'China', 19.975048, 96.739067),
(171, 'Indonesia', -5.410937, 130.016567),
(172, 'United States', 59.769261, -83.640341),
(173, 'Australia', -40.905285, 114.081146),
(174, 'Russia', 81.896249, 79.233243),
(175, 'Zimbabwe', -17.087615, 30.348862),
(176, 'Mexico', 31.782934, -111.039435),
(177, 'Kenya', -3.282844, 34.909768),
(178, 'Zambia', -12.473098, 24.550185),
(179, 'Uganda', 2.871319, 30.506061),
(180, 'Botswana', -20.093877, 21.065156),
(181, 'Nepal', 30.258883, 80.975600),
(182, 'Kenya', -1.798798, 39.318778),
(183, 'Bangladesh', 23.040261, 91.360569),
(184, 'Tanzania', -4.241364, 36.262391),
(185, 'South Africa', -24.989493, 30.444809),
(186, 'Botswana', -25.798399, 29.149752),
(187, 'Thailand', 10.773336, 100.912700),
(188, 'United States', 48.229561, -132.513375),
(189, 'Philippines', 18.168460, 118.192065),
(190, 'Bangladesh', 24.449952, 91.894924),
(191, 'Rwanda', -2.016123, 30.340970),
(192, 'Belize', 16.602214, -88.068521),
(193, 'Russia', 60.878348, 93.821894),
(194, 'Democratic Republic of Congo', -8.354164, 28.467721),
(195, 'Nepal', 26.746652, 87.241213),
(196, 'Indonesia', -3.053485, 123.075258),
(197, 'United States', 25.846030, -81.745098),
(198, 'India', 13.912084, 91.496705),
(199, 'Canada', 78.057215, -79.015356),
(200, 'Australia', -43.266028, 151.506922),
(201, 'Germany', 50.000000, 10.000000),
(202, 'South Africa', -50.000000, 10.000000),
(203, 'Kazakhstan', 50.000000, -29.000000),
(204, 'Indonesia', 134.000000, -43.000000),
(205, 'Uganda', -26.000000, 16.000000),
(206, 'Colombia', 12.000000, 12.000000),
(207, 'China', 50.000000, 40.000000),
(208, 'Democratic Republic of Congo', -50.000000, 10.000000),
(209, 'China', 50.000000, 50.000000);

-- --------------------------------------------------------

--
-- Table structure for table `Logger`
--

CREATE TABLE `Logger` (
  `LoggerID` int(11) NOT NULL,
  `Username` varchar(50) DEFAULT NULL,
  `Forename` varchar(50) NOT NULL,
  `Surname` varchar(50) NOT NULL,
  `Email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Logger`
--

INSERT INTO `Logger` (`LoggerID`, `Username`, `Forename`, `Surname`, `Email`) VALUES
(1, 'jwilson', 'James', 'Wilson', 'james.wilson@wildwatch.org'),
(2, 'schen', 'Sophie', 'Chen', 'sophie.chen@ecotrack.net'),
(3, 'mngozi', 'Mandla', 'Ngozi', 'm.ngozi@savanna-survey.org'),
(4, 'lreyes', 'Lucia', 'Reyes', 'lreyes@biodiversity.mx'),
(5, 'tkamau', 'Tariq', 'Kamau', 't.kamau@kenyawild.ke'),
(6, 'abaker', 'Amelia', 'Baker', 'a.baker@coralwatch.au'),
(7, 'dpatel', 'Dev', 'Patel', 'd.patel@tigertrust.in'),
(8, 'fjensen', 'Freya', 'Jensen', 'f.jensen@arcticwatch.no'),
(9, 'cmartinez', 'Carlos', 'Martinez', 'c.martinez@amazon-bio.br'),
(10, 'nwang', 'Nina', 'Wang', 'n.wang@pandastudy.cn'),
(11, 'okalu', 'Obioma', 'Kalu', 'o.kalu@deltaeco.ng'),
(12, 'pmcallister', 'Peter', 'McAllister', 'p.mcallister@highland-bio.uk'),
(13, 'rfernandez', 'Rosa', 'Fernandez', 'r.fernandez@galapagos-trust.ec'),
(14, 'skowalski', 'Stefan', 'Kowalski', 's.kowalski@bisonwatch.pl'),
(15, 'tivers', 'Tara', 'Ivers', 't.ivers@wetlandwatch.ie'),
(16, 'umcclure', 'Uma', 'McClure', 'u.mcclure@greatplains.us'),
(17, 'vtremblay', 'Vivienne', 'Tremblay', 'v.tremblay@borealbio.ca'),
(18, 'wmöller', 'Werner', 'Möller', 'w.moller@rhineland-eco.de'),
(19, 'xabu', 'Xolani', 'Abu', 'x.abu@krugerfield.za'),
(20, 'yadams', 'Yusra', 'Adams', 'y.adams@sealwatch.nz'),
(21, 'Grenien', 'Charles', 'Kirk', 'CharlieKirk@gmail.com'),
(24, 'admin', 'Joe', 'Fleegle', 'furryrightsactivist42@gmail.com'),
(26, 'admin2', 'Joe', 'Fleegle', 'josephpinetree1@gmail.com'),
(27, 'Eallen', 'Ethan', 'Alen', 'eallen@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `Report`
--

CREATE TABLE `Report` (
  `ReportID` int(11) NOT NULL,
  `LoggerID` int(11) NOT NULL,
  `LocationID` int(11) NOT NULL,
  `EvidenceID` int(11) NOT NULL,
  `ReportDate` date NOT NULL,
  `SpeciesID` int(11) NOT NULL,
  `AnimalID` int(11) DEFAULT NULL,
  `ReportType` enum('Poaching','Animal Spotting') NOT NULL,
  `ReportDescription` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Report`
--

INSERT INTO `Report` (`ReportID`, `LoggerID`, `LocationID`, `EvidenceID`, `ReportDate`, `SpeciesID`, `AnimalID`, `ReportType`, `ReportDescription`) VALUES
(1, 9, 179, 1, '2021-09-14', 4, NULL, 'Poaching', 'Suspected poachers observed near Mountain Gorilla territory in Uganda; authorities notified.'),
(2, 16, 55, 2, '2019-10-09', 7, NULL, 'Animal Spotting', 'Rare sighting of Asian Elephant confirmed in Indonesia; GPS coordinates logged for tracking database.'),
(3, 15, 152, 3, '2021-03-22', 28, NULL, 'Animal Spotting', 'Healthy Great White Shark (Carcharodon carcharias) spotted during routine survey in Australia.'),
(4, 1, 107, 4, '2018-06-02', 41, NULL, 'Animal Spotting', 'Rare sighting of Clouded Leopard confirmed in India; GPS coordinates logged for tracking database.'),
(5, 4, 199, 5, '2018-05-29', 20, NULL, 'Animal Spotting', 'Rare sighting of Brown Bear confirmed in Canada; GPS coordinates logged for tracking database.'),
(6, 18, 6, 6, '2021-03-31', 19, NULL, 'Animal Spotting', 'Field team documented Grey Wolf activity in Russia as part of ongoing population survey.'),
(7, 3, 1, 7, '2021-10-04', 18, NULL, 'Animal Spotting', 'African Wild Dog spotted with offspring in Zimbabwe; positive indicator for local population recovery.'),
(8, 18, 66, 8, '2019-07-04', 12, NULL, 'Animal Spotting', 'Field team documented Hawksbill Sea Turtle activity in Seychelles as part of ongoing population survey.'),
(9, 19, 195, 9, '2021-09-16', 1, NULL, 'Animal Spotting', 'Field team documented Bengal Tiger activity in Nepal as part of ongoing population survey.'),
(10, 17, 29, 10, '2021-10-12', 20, NULL, 'Poaching', 'Suspected poachers observed near Brown Bear territory in United States; authorities notified.'),
(11, 5, 24, 11, '2023-10-12', 31, NULL, 'Animal Spotting', 'Healthy Sperm Whale (Physeter macrocephalus) spotted during routine survey in Australia.'),
(12, 1, 191, 12, '2023-05-10', 4, NULL, 'Animal Spotting', 'Healthy Mountain Gorilla (Gorilla beringei beringei) spotted during routine survey in Rwanda.'),
(13, 13, 134, 13, '2023-01-04', 41, NULL, 'Animal Spotting', 'Field team documented Clouded Leopard activity in China as part of ongoing population survey.'),
(14, 7, 158, 14, '2018-02-16', 38, NULL, 'Animal Spotting', 'Individual Reindeer observed in natural habitat in Russia; behaviour recorded.'),
(15, 2, 58, 15, '2023-03-22', 28, NULL, 'Animal Spotting', 'Great White Shark spotted with offspring in New Zealand; positive indicator for local population recovery.'),
(16, 2, 64, 16, '2025-03-01', 31, NULL, 'Animal Spotting', 'Field team documented Sperm Whale activity in Norway as part of ongoing population survey.'),
(17, 20, 38, 17, '2019-07-02', 28, NULL, 'Poaching', 'Patrol encountered individuals in possession of Great White Shark parts in Australia; arrested by rangers.'),
(18, 18, 105, 18, '2024-02-28', 30, NULL, 'Animal Spotting', 'Individual Humpback Whale observed in natural habitat in Australia; behaviour recorded.'),
(19, 8, 167, 19, '2024-09-06', 39, NULL, 'Animal Spotting', 'Argali spotted with offspring in China; positive indicator for local population recovery.'),
(20, 11, 9, 20, '2022-01-21', 1, NULL, 'Animal Spotting', 'Healthy Bengal Tiger (Panthera tigris) spotted during routine survey in Bangladesh.'),
(21, 20, 60, 21, '2020-04-08', 49, NULL, 'Animal Spotting', 'Individual Golden Eagle observed in natural habitat in Norway; behaviour recorded.'),
(22, 19, 151, 22, '2022-12-15', 39, NULL, 'Animal Spotting', 'Argali spotted with offspring in Kazakhstan; positive indicator for local population recovery.'),
(23, 6, 198, 23, '2023-09-22', 47, NULL, 'Poaching', 'Carcass of Mountain Hawk-Eagle found in India with signs consistent with poaching; samples collected.'),
(24, 10, 43, 24, '2023-02-15', 6, NULL, 'Animal Spotting', 'Field team documented Northern White Rhinoceros activity in Kenya as part of ongoing population survey.'),
(25, 13, 92, 25, '2018-01-13', 46, NULL, 'Animal Spotting', 'Healthy Hyacinth Macaw (Anodorhynchus hyacinthinus) spotted during routine survey in Paraguay.'),
(26, 19, 2, 26, '2018-09-19', 27, NULL, 'Animal Spotting', 'Healthy Whale Shark (Rhincodon typus) spotted during routine survey in Indonesia.'),
(27, 14, 150, 27, '2022-08-02', 43, NULL, 'Poaching', 'Carcass of Sun Bear found in Malaysia with signs consistent with poaching; samples collected.'),
(28, 2, 196, 28, '2022-04-16', 26, NULL, 'Animal Spotting', 'Rare sighting of Komodo Dragon confirmed in Indonesia; GPS coordinates logged for tracking database.'),
(29, 1, 165, 29, '2025-06-03', 19, NULL, 'Animal Spotting', 'Field team documented Grey Wolf activity in Norway as part of ongoing population survey.'),
(30, 4, 113, 30, '2024-01-10', 11, NULL, 'Poaching', 'Suspected poachers observed near Leatherback Sea Turtle territory in Indonesia; authorities notified.'),
(31, 1, 70, 31, '2021-05-07', 2, NULL, 'Animal Spotting', 'Rare sighting of African Lion confirmed in Tanzania; GPS coordinates logged for tracking database.'),
(32, 18, 128, 32, '2020-07-29', 34, NULL, 'Animal Spotting', 'Individual South American Tapir observed in natural habitat in Brazil; behaviour recorded.'),
(33, 7, 26, 33, '2019-04-08', 28, NULL, 'Poaching', 'Patrol encountered individuals in possession of Great White Shark parts in United States; arrested by rangers.'),
(34, 5, 118, 34, '2018-03-06', 49, NULL, 'Animal Spotting', 'Healthy Golden Eagle (Aquila chrysaetos) spotted during routine survey in Russia.'),
(35, 20, 189, 35, '2018-07-19', 12, NULL, 'Animal Spotting', 'Rare sighting of Hawksbill Sea Turtle confirmed in Philippines; GPS coordinates logged for tracking database.'),
(36, 2, 115, 36, '2020-06-08', 24, NULL, 'Poaching', 'Suspected poachers observed near Common Hippopotamus territory in Kenya; authorities notified.'),
(37, 17, 78, 37, '2024-06-17', 42, NULL, 'Poaching', 'Suspected poachers observed near Fishing Cat territory in India; authorities notified.'),
(38, 19, 71, 38, '2025-05-28', 29, NULL, 'Animal Spotting', 'Field team documented Common Bottlenose Dolphin activity in Australia as part of ongoing population survey.'),
(39, 12, 69, 39, '2024-08-20', 10, NULL, 'Poaching', 'Carcass of Galápagos Tortoise found in Ecuador with signs consistent with poaching; samples collected.'),
(40, 4, 185, 40, '2021-11-11', 29, NULL, 'Animal Spotting', 'Common Bottlenose Dolphin spotted with offspring in South Africa; positive indicator for local population recovery.'),
(41, 16, 110, 41, '2022-07-31', 34, NULL, 'Animal Spotting', 'Individual South American Tapir observed in natural habitat in Bolivia; behaviour recorded.'),
(42, 11, 21, 42, '2020-07-12', 15, NULL, 'Poaching', 'Carcass of West Indian Manatee found in Trinidad and Tobago with signs consistent with poaching; samples collected.'),
(43, 14, 159, 43, '2022-09-03', 16, NULL, 'Animal Spotting', 'Rare sighting of Polar Bear confirmed in Norway; GPS coordinates logged for tracking database.'),
(44, 2, 181, 44, '2021-09-14', 1, NULL, 'Poaching', 'Snare traps discovered close to known Bengal Tiger habitat in Nepal; traps removed and photographed.'),
(45, 1, 162, 45, '2020-02-20', 15, NULL, 'Animal Spotting', 'West Indian Manatee spotted with offspring in Mexico; positive indicator for local population recovery.'),
(46, 11, 48, 46, '2018-10-26', 38, NULL, 'Poaching', 'Carcass of Reindeer found in Russia with signs consistent with poaching; samples collected.'),
(47, 19, 91, 47, '2021-09-25', 1, NULL, 'Animal Spotting', 'Individual Bengal Tiger observed in natural habitat in Nepal; behaviour recorded.'),
(48, 19, 119, 48, '2019-04-26', 15, NULL, 'Animal Spotting', 'Individual West Indian Manatee observed in natural habitat in Belize; behaviour recorded.'),
(49, 4, 176, 49, '2020-04-17', 33, NULL, 'Animal Spotting', 'Jaguar spotted with offspring in Mexico; positive indicator for local population recovery.'),
(50, 4, 76, 50, '2022-04-09', 20, NULL, 'Animal Spotting', 'Field team documented Brown Bear activity in Poland as part of ongoing population survey.'),
(51, 12, 16, 51, '2023-07-30', 14, NULL, 'Animal Spotting', 'Field team documented Sumatran Orangutan activity in Indonesia as part of ongoing population survey.'),
(52, 1, 13, 52, '2022-08-23', 1, NULL, 'Animal Spotting', 'Individual Bengal Tiger observed in natural habitat in Nepal; behaviour recorded.'),
(53, 9, 166, 53, '2024-07-20', 5, NULL, 'Poaching', 'Snare traps discovered close to known Black Rhinoceros habitat in Namibia; traps removed and photographed.'),
(54, 8, 123, 54, '2020-07-31', 27, NULL, 'Poaching', 'Carcass of Whale Shark found in Australia with signs consistent with poaching; samples collected.'),
(55, 1, 17, 55, '2021-10-14', 18, NULL, 'Animal Spotting', 'Rare sighting of African Wild Dog confirmed in Zimbabwe; GPS coordinates logged for tracking database.'),
(56, 20, 45, 56, '2021-12-13', 47, NULL, 'Poaching', 'Carcass of Mountain Hawk-Eagle found in Japan with signs consistent with poaching; samples collected.'),
(57, 19, 52, 57, '2024-01-30', 19, NULL, 'Animal Spotting', 'Grey Wolf spotted with offspring in Russia; positive indicator for local population recovery.'),
(58, 11, 200, 58, '2018-11-01', 11, NULL, 'Animal Spotting', 'Healthy Leatherback Sea Turtle (Dermochelys coriacea) spotted during routine survey in Australia.'),
(59, 11, 63, 59, '2025-01-27', 12, NULL, 'Poaching', 'Evidence of illegal poaching of Hawksbill Sea Turtle detected in Seychelles; incident logged by field team.'),
(60, 8, 47, 60, '2022-03-09', 15, NULL, 'Animal Spotting', 'Rare sighting of West Indian Manatee confirmed in Mexico; GPS coordinates logged for tracking database.'),
(61, 16, 56, 61, '2024-03-09', 2, NULL, 'Poaching', 'Patrol encountered individuals in possession of African Lion parts in Tanzania; arrested by rangers.'),
(62, 11, 178, 62, '2021-03-20', 18, NULL, 'Animal Spotting', 'Individual African Wild Dog observed in natural habitat in Zambia; behaviour recorded.'),
(63, 1, 98, 63, '2023-11-18', 7, NULL, 'Animal Spotting', 'Asian Elephant spotted with offspring in Thailand; positive indicator for local population recovery.'),
(64, 6, 46, 64, '2021-12-22', 34, NULL, 'Poaching', 'Evidence of illegal poaching of South American Tapir detected in Ecuador; incident logged by field team.'),
(65, 10, 44, 65, '2023-02-24', 44, NULL, 'Animal Spotting', 'Field team documented Red Panda activity in Nepal as part of ongoing population survey.'),
(66, 16, 59, 66, '2025-04-15', 7, NULL, 'Animal Spotting', 'Rare sighting of Asian Elephant confirmed in Sri Lanka; GPS coordinates logged for tracking database.'),
(67, 19, 23, 67, '2023-05-04', 27, NULL, 'Animal Spotting', 'Individual Whale Shark observed in natural habitat in Indonesia; behaviour recorded.'),
(68, 6, 148, 68, '2022-11-13', 11, NULL, 'Animal Spotting', 'Leatherback Sea Turtle spotted with offspring in Trinidad and Tobago; positive indicator for local population recovery.'),
(69, 10, 97, 69, '2018-06-24', 19, NULL, 'Animal Spotting', 'Field team documented Grey Wolf activity in Norway as part of ongoing population survey.'),
(70, 3, 190, 70, '2021-02-22', 1, NULL, 'Animal Spotting', 'Individual Bengal Tiger observed in natural habitat in Bangladesh; behaviour recorded.'),
(71, 7, 154, 71, '2020-04-28', 30, NULL, 'Poaching', 'Evidence of illegal poaching of Humpback Whale detected in Australia; incident logged by field team.'),
(72, 20, 139, 72, '2020-09-11', 14, NULL, 'Poaching', 'Patrol encountered individuals in possession of Sumatran Orangutan parts in Indonesia; arrested by rangers.'),
(73, 16, 169, 73, '2019-07-28', 22, NULL, 'Animal Spotting', 'Plains Zebra spotted with offspring in Kenya; positive indicator for local population recovery.'),
(74, 5, 140, 74, '2022-11-26', 41, NULL, 'Poaching', 'Snare traps discovered close to known Clouded Leopard habitat in China; traps removed and photographed.'),
(75, 8, 67, 75, '2021-08-29', 15, NULL, 'Animal Spotting', 'Rare sighting of West Indian Manatee confirmed in Trinidad and Tobago; GPS coordinates logged for tracking database.'),
(76, 2, 18, 76, '2024-03-15', 31, NULL, 'Poaching', 'Suspected poachers observed near Sperm Whale territory in Indonesia; authorities notified.'),
(77, 15, 8, 77, '2022-04-06', 25, NULL, 'Animal Spotting', 'Individual Nile Crocodile observed in natural habitat in Uganda; behaviour recorded.'),
(78, 19, 114, 78, '2021-01-02', 46, NULL, 'Poaching', 'Carcass of Hyacinth Macaw found in Brazil with signs consistent with poaching; samples collected.'),
(79, 11, 79, 79, '2019-01-10', 26, NULL, 'Animal Spotting', 'Rare sighting of Komodo Dragon confirmed in Indonesia; GPS coordinates logged for tracking database.'),
(80, 14, 65, 80, '2019-02-23', 30, NULL, 'Animal Spotting', 'Rare sighting of Humpback Whale confirmed in Australia; GPS coordinates logged for tracking database.'),
(81, 1, 83, 81, '2023-09-30', 31, NULL, 'Animal Spotting', 'Healthy Sperm Whale (Physeter macrocephalus) spotted during routine survey in Indonesia.'),
(82, 1, 27, 82, '2024-09-11', 30, NULL, 'Animal Spotting', 'Rare sighting of Humpback Whale confirmed in Australia; GPS coordinates logged for tracking database.'),
(83, 7, 53, 83, '2022-05-08', 16, NULL, 'Poaching', 'Patrol encountered individuals in possession of Polar Bear parts in Canada; arrested by rangers.'),
(84, 4, 20, 84, '2022-04-09', 24, NULL, 'Poaching', 'Snare traps discovered close to known Common Hippopotamus habitat in Democratic Republic of Congo; traps removed and photographed.'),
(85, 8, 125, 85, '2018-09-17', 33, NULL, 'Animal Spotting', 'Rare sighting of Jaguar confirmed in Colombia; GPS coordinates logged for tracking database.'),
(86, 15, 41, 86, '2018-11-12', 27, NULL, 'Animal Spotting', 'Rare sighting of Whale Shark confirmed in Mexico; GPS coordinates logged for tracking database.'),
(87, 8, 57, 87, '2023-02-19', 42, NULL, 'Animal Spotting', 'Healthy Fishing Cat (Prionailurus viverrinus) spotted during routine survey in Indonesia.'),
(88, 9, 192, 88, '2024-12-15', 27, NULL, 'Animal Spotting', 'Rare sighting of Whale Shark confirmed in Belize; GPS coordinates logged for tracking database.'),
(89, 14, 164, 89, '2025-04-20', 18, NULL, 'Animal Spotting', 'Field team documented African Wild Dog activity in Botswana as part of ongoing population survey.'),
(90, 18, 180, 90, '2020-04-02', 18, NULL, 'Animal Spotting', 'Rare sighting of African Wild Dog confirmed in Botswana; GPS coordinates logged for tracking database.'),
(91, 7, 90, 91, '2025-02-05', 15, NULL, 'Poaching', 'Snare traps discovered close to known West Indian Manatee habitat in Trinidad and Tobago; traps removed and photographed.'),
(92, 18, 108, 92, '2022-05-29', 27, NULL, 'Poaching', 'Patrol encountered individuals in possession of Whale Shark parts in Belize; arrested by rangers.'),
(93, 8, 135, 93, '2024-03-03', 49, NULL, 'Poaching', 'Suspected poachers observed near Golden Eagle territory in China; authorities notified.'),
(94, 15, 32, 94, '2018-10-11', 38, NULL, 'Animal Spotting', 'Rare sighting of Reindeer confirmed in Norway; GPS coordinates logged for tracking database.'),
(95, 1, 88, 95, '2020-09-18', 47, NULL, 'Animal Spotting', 'Rare sighting of Mountain Hawk-Eagle confirmed in Japan; GPS coordinates logged for tracking database.'),
(96, 7, 174, 96, '2023-01-14', 49, NULL, 'Animal Spotting', 'Golden Eagle spotted with offspring in Russia; positive indicator for local population recovery.'),
(97, 8, 49, 97, '2022-09-10', 37, NULL, 'Animal Spotting', 'Arctic Fox spotted with offspring in Norway; positive indicator for local population recovery.'),
(98, 19, 80, 98, '2020-10-13', 12, NULL, 'Poaching', 'Suspected poachers observed near Hawksbill Sea Turtle territory in Australia; authorities notified.'),
(99, 20, 106, 99, '2025-03-27', 47, NULL, 'Animal Spotting', 'Field team documented Mountain Hawk-Eagle activity in Japan as part of ongoing population survey.'),
(100, 13, 145, 100, '2019-02-08', 44, NULL, 'Poaching', 'Patrol encountered individuals in possession of Red Panda parts in India; arrested by rangers.'),
(101, 16, 188, 101, '2024-06-14', 48, NULL, 'Animal Spotting', 'Rare sighting of Bald Eagle confirmed in United States; GPS coordinates logged for tracking database.'),
(102, 7, 22, 102, '2024-08-07', 17, NULL, 'Animal Spotting', 'Field team documented Cheetah activity in Namibia as part of ongoing population survey.'),
(103, 14, 62, 103, '2021-04-25', 2, NULL, 'Animal Spotting', 'Healthy African Lion (Panthera leo) spotted during routine survey in South Africa.'),
(104, 2, 109, 104, '2021-11-06', 6, NULL, 'Animal Spotting', 'Northern White Rhinoceros spotted with offspring in Kenya; positive indicator for local population recovery.'),
(105, 14, 7, 105, '2019-02-04', 47, NULL, 'Animal Spotting', 'Field team documented Mountain Hawk-Eagle activity in Sri Lanka as part of ongoing population survey.'),
(106, 1, 120, 106, '2019-04-17', 12, NULL, 'Animal Spotting', 'Healthy Hawksbill Sea Turtle (Eretmochelys imbricata) spotted during routine survey in Australia.'),
(107, 3, 30, 107, '2020-09-26', 13, NULL, 'Animal Spotting', 'Field team documented Bornean Orangutan activity in Malaysia as part of ongoing population survey.'),
(108, 13, 175, 108, '2023-03-08', 18, NULL, 'Animal Spotting', 'Individual African Wild Dog observed in natural habitat in Zimbabwe; behaviour recorded.'),
(109, 17, 124, 109, '2022-11-06', 33, NULL, 'Animal Spotting', 'Rare sighting of Jaguar confirmed in Bolivia; GPS coordinates logged for tracking database.'),
(110, 2, 100, 110, '2018-01-19', 40, NULL, 'Animal Spotting', 'Field team documented Leopard activity in Kenya as part of ongoing population survey.'),
(111, 9, 193, 111, '2018-09-14', 49, NULL, 'Animal Spotting', 'Individual Golden Eagle observed in natural habitat in Russia; behaviour recorded.'),
(112, 4, 170, 112, '2023-02-18', 41, NULL, 'Animal Spotting', 'Clouded Leopard spotted with offspring in China; positive indicator for local population recovery.'),
(113, 2, 34, 113, '2024-11-08', 12, NULL, 'Animal Spotting', 'Field team documented Hawksbill Sea Turtle activity in Seychelles as part of ongoing population survey.'),
(114, 2, 61, 114, '2024-12-03', 6, NULL, 'Animal Spotting', 'Northern White Rhinoceros spotted with offspring in Democratic Republic of Congo; positive indicator for local population recovery.'),
(115, 3, 197, 115, '2019-07-03', 49, NULL, 'Poaching', 'Snare traps discovered close to known Golden Eagle habitat in United States; traps removed and photographed.'),
(116, 2, 4, 116, '2019-08-03', 5, NULL, 'Poaching', 'Patrol encountered individuals in possession of Black Rhinoceros parts in Kenya; arrested by rangers.'),
(117, 19, 81, 117, '2022-09-29', 20, NULL, 'Animal Spotting', 'Individual Brown Bear observed in natural habitat in Norway; behaviour recorded.'),
(118, 2, 89, 118, '2019-07-29', 1, NULL, 'Animal Spotting', 'Bengal Tiger spotted with offspring in Bhutan; positive indicator for local population recovery.'),
(119, 11, 112, 119, '2018-02-09', 2, NULL, 'Animal Spotting', 'Rare sighting of African Lion confirmed in South Africa; GPS coordinates logged for tracking database.'),
(120, 1, 177, 120, '2023-07-21', 25, NULL, 'Animal Spotting', 'Rare sighting of Nile Crocodile confirmed in Kenya; GPS coordinates logged for tracking database.'),
(121, 11, 171, 121, '2023-06-25', 45, NULL, 'Animal Spotting', 'Individual Sulawesi Babirusa observed in natural habitat in Indonesia; behaviour recorded.'),
(122, 12, 102, 122, '2020-07-09', 31, NULL, 'Poaching', 'Carcass of Sperm Whale found in New Zealand with signs consistent with poaching; samples collected.'),
(123, 7, 40, 123, '2023-07-22', 18, NULL, 'Animal Spotting', 'African Wild Dog spotted with offspring in Zimbabwe; positive indicator for local population recovery.'),
(124, 5, 75, 124, '2024-02-03', 16, NULL, 'Poaching', 'Patrol encountered individuals in possession of Polar Bear parts in Russia; arrested by rangers.'),
(125, 15, 54, 125, '2022-12-13', 7, NULL, 'Animal Spotting', 'Healthy Asian Elephant (Elephas maximus) spotted during routine survey in Indonesia.'),
(126, 13, 15, 126, '2020-10-10', 45, NULL, 'Animal Spotting', 'Rare sighting of Sulawesi Babirusa confirmed in Indonesia; GPS coordinates logged for tracking database.'),
(127, 10, 136, 127, '2018-12-23', 42, NULL, 'Animal Spotting', 'Individual Fishing Cat observed in natural habitat in India; behaviour recorded.'),
(128, 4, 85, 128, '2024-08-05', 17, NULL, 'Animal Spotting', 'Individual Cheetah observed in natural habitat in Tanzania; behaviour recorded.'),
(129, 18, 95, 129, '2020-04-26', 18, NULL, 'Poaching', 'Patrol encountered individuals in possession of African Wild Dog parts in Zimbabwe; arrested by rangers.'),
(130, 18, 5, 130, '2024-09-10', 22, NULL, 'Animal Spotting', 'Field team documented Plains Zebra activity in Kenya as part of ongoing population survey.'),
(131, 15, 147, 131, '2023-10-09', 41, NULL, 'Animal Spotting', 'Individual Clouded Leopard observed in natural habitat in China; behaviour recorded.'),
(132, 18, 137, 132, '2018-08-31', 25, NULL, 'Animal Spotting', 'Individual Nile Crocodile observed in natural habitat in Zimbabwe; behaviour recorded.'),
(133, 14, 126, 133, '2021-08-12', 17, NULL, 'Poaching', 'Carcass of Cheetah found in Tanzania with signs consistent with poaching; samples collected.'),
(134, 18, 156, 134, '2021-01-05', 8, NULL, 'Animal Spotting', 'Rare sighting of African Bush Elephant confirmed in South Africa; GPS coordinates logged for tracking database.'),
(135, 3, 172, 135, '2019-01-17', 19, NULL, 'Animal Spotting', 'Field team documented Grey Wolf activity in United States as part of ongoing population survey.'),
(136, 18, 161, 136, '2021-09-02', 37, NULL, 'Animal Spotting', 'Rare sighting of Arctic Fox confirmed in United States; GPS coordinates logged for tracking database.'),
(137, 11, 77, 137, '2023-12-30', 43, NULL, 'Animal Spotting', 'Individual Sun Bear observed in natural habitat in India; behaviour recorded.'),
(138, 11, 163, 138, '2021-03-07', 38, NULL, 'Poaching', 'Patrol encountered individuals in possession of Reindeer parts in Norway; arrested by rangers.'),
(139, 14, 42, 139, '2021-11-08', 49, NULL, 'Animal Spotting', 'Healthy Golden Eagle (Aquila chrysaetos) spotted during routine survey in Russia.'),
(140, 13, 82, 140, '2023-02-26', 46, NULL, 'Animal Spotting', 'Rare sighting of Hyacinth Macaw confirmed in Paraguay; GPS coordinates logged for tracking database.'),
(141, 20, 84, 141, '2022-10-19', 33, NULL, 'Poaching', 'Snare traps discovered close to known Jaguar habitat in Brazil; traps removed and photographed.'),
(142, 8, 149, 142, '2021-01-27', 39, NULL, 'Animal Spotting', 'Field team documented Argali activity in Mongolia as part of ongoing population survey.'),
(143, 20, 132, 143, '2025-04-11', 16, NULL, 'Animal Spotting', 'Field team documented Polar Bear activity in Russia as part of ongoing population survey.'),
(144, 18, 39, 144, '2019-01-09', 33, NULL, 'Animal Spotting', 'Individual Jaguar observed in natural habitat in Peru; behaviour recorded.'),
(145, 3, 117, 145, '2024-08-28', 17, NULL, 'Poaching', 'Evidence of illegal poaching of Cheetah detected in Zimbabwe; incident logged by field team.'),
(146, 16, 133, 146, '2019-05-09', 16, NULL, 'Animal Spotting', 'Individual Polar Bear observed in natural habitat in Norway; behaviour recorded.'),
(147, 13, 122, 147, '2022-04-19', 43, NULL, 'Poaching', 'Evidence of illegal poaching of Sun Bear detected in Malaysia; incident logged by field team.'),
(148, 10, 86, 148, '2021-05-10', 15, NULL, 'Animal Spotting', 'Individual West Indian Manatee observed in natural habitat in Trinidad and Tobago; behaviour recorded.'),
(149, 15, 36, 149, '2018-02-04', 2, NULL, 'Animal Spotting', 'Rare sighting of African Lion confirmed in Zimbabwe; GPS coordinates logged for tracking database.'),
(150, 15, 10, 150, '2025-01-16', 22, NULL, 'Animal Spotting', 'Plains Zebra spotted with offspring in South Africa; positive indicator for local population recovery.'),
(151, 17, 183, 151, '2018-12-22', 1, NULL, 'Animal Spotting', 'Healthy Bengal Tiger (Panthera tigris) spotted during routine survey in Bangladesh.'),
(152, 20, 11, 152, '2022-10-25', 47, NULL, 'Animal Spotting', 'Individual Mountain Hawk-Eagle observed in natural habitat in Sri Lanka; behaviour recorded.'),
(153, 14, 129, 153, '2020-10-13', 28, NULL, 'Animal Spotting', 'Healthy Great White Shark (Carcharodon carcharias) spotted during routine survey in United States.'),
(154, 6, 182, 154, '2024-10-21', 17, NULL, 'Poaching', 'Snare traps discovered close to known Cheetah habitat in Kenya; traps removed and photographed.'),
(155, 3, 131, 155, '2020-09-07', 39, NULL, 'Animal Spotting', 'Individual Argali observed in natural habitat in Kazakhstan; behaviour recorded.'),
(156, 19, 155, 156, '2018-10-18', 32, NULL, 'Animal Spotting', 'Field team documented Blue Whale activity in Australia as part of ongoing population survey.'),
(157, 18, 51, 157, '2024-05-17', 15, NULL, 'Poaching', 'Suspected poachers observed near West Indian Manatee territory in Trinidad and Tobago; authorities notified.'),
(158, 6, 37, 158, '2018-10-26', 44, NULL, 'Animal Spotting', 'Healthy Red Panda (Ailurus fulgens) spotted during routine survey in China.'),
(159, 14, 184, 159, '2018-09-05', 18, NULL, 'Poaching', 'Patrol encountered individuals in possession of African Wild Dog parts in Tanzania; arrested by rangers.'),
(160, 9, 143, 160, '2023-08-15', 18, NULL, 'Animal Spotting', 'Rare sighting of African Wild Dog confirmed in Zambia; GPS coordinates logged for tracking database.'),
(161, 18, 87, 161, '2024-01-12', 12, NULL, 'Animal Spotting', 'Healthy Hawksbill Sea Turtle (Eretmochelys imbricata) spotted during routine survey in Australia.'),
(162, 3, 96, 162, '2020-04-12', 34, NULL, 'Poaching', 'Patrol encountered individuals in possession of South American Tapir parts in Peru; arrested by rangers.'),
(163, 7, 101, 163, '2025-02-11', 34, NULL, 'Animal Spotting', 'Field team documented South American Tapir activity in Peru as part of ongoing population survey.'),
(164, 7, 25, 164, '2020-09-04', 35, NULL, 'Animal Spotting', 'Rare sighting of Rodrigues Flying Fox confirmed in Mauritius; GPS coordinates logged for tracking database.'),
(165, 14, 33, 165, '2024-10-29', 11, NULL, 'Animal Spotting', 'Healthy Leatherback Sea Turtle (Dermochelys coriacea) spotted during routine survey in Trinidad and Tobago.'),
(166, 15, 31, 166, '2018-02-16', 2, NULL, 'Animal Spotting', 'African Lion spotted with offspring in South Africa; positive indicator for local population recovery.'),
(167, 2, 157, 167, '2019-06-04', 4, NULL, 'Poaching', 'Evidence of illegal poaching of Mountain Gorilla detected in Rwanda; incident logged by field team.'),
(168, 9, 160, 168, '2022-10-25', 4, NULL, 'Animal Spotting', 'Field team documented Mountain Gorilla activity in Uganda as part of ongoing population survey.'),
(169, 8, 72, 169, '2023-09-24', 19, NULL, 'Animal Spotting', 'Grey Wolf spotted with offspring in Norway; positive indicator for local population recovery.'),
(170, 2, 141, 170, '2020-11-10', 20, NULL, 'Animal Spotting', 'Individual Brown Bear observed in natural habitat in Norway; behaviour recorded.'),
(171, 12, 116, 171, '2018-02-20', 12, NULL, 'Poaching', 'Snare traps discovered close to known Hawksbill Sea Turtle habitat in Seychelles; traps removed and photographed.'),
(172, 4, 130, 172, '2020-01-04', 37, NULL, 'Animal Spotting', 'Arctic Fox spotted with offspring in Norway; positive indicator for local population recovery.'),
(173, 12, 99, 173, '2022-09-14', 34, NULL, 'Animal Spotting', 'Rare sighting of South American Tapir confirmed in Colombia; GPS coordinates logged for tracking database.'),
(174, 2, 19, 174, '2018-11-16', 22, NULL, 'Animal Spotting', 'Plains Zebra spotted with offspring in Zimbabwe; positive indicator for local population recovery.'),
(175, 3, 194, 175, '2020-01-05', 24, NULL, 'Animal Spotting', 'Healthy Common Hippopotamus (Hippopotamus amphibius) spotted during routine survey in Democratic Republic of Congo.'),
(176, 3, 142, 176, '2023-03-21', 24, NULL, 'Poaching', 'Snare traps discovered close to known Common Hippopotamus habitat in Uganda; traps removed and photographed.'),
(177, 4, 93, 177, '2018-02-02', 5, NULL, 'Animal Spotting', 'Black Rhinoceros spotted with offspring in South Africa; positive indicator for local population recovery.'),
(178, 14, 50, 178, '2020-09-20', 6, NULL, 'Animal Spotting', 'Individual Northern White Rhinoceros observed in natural habitat in Democratic Republic of Congo; behaviour recorded.'),
(179, 19, 144, 179, '2020-10-01', 47, NULL, 'Animal Spotting', 'Healthy Mountain Hawk-Eagle (Spizaetus nipalensis) spotted during routine survey in Thailand.'),
(180, 7, 146, 180, '2025-02-17', 17, NULL, 'Animal Spotting', 'Field team documented Cheetah activity in Tanzania as part of ongoing population survey.'),
(181, 17, 14, 181, '2022-03-22', 28, NULL, 'Animal Spotting', 'Healthy Great White Shark (Carcharodon carcharias) spotted during routine survey in New Zealand.'),
(182, 5, 103, 182, '2020-09-02', 30, NULL, 'Animal Spotting', 'Individual Humpback Whale observed in natural habitat in Brazil; behaviour recorded.'),
(183, 12, 12, 183, '2020-08-06', 27, NULL, 'Poaching', 'Carcass of Whale Shark found in Belize with signs consistent with poaching; samples collected.'),
(184, 19, 186, 184, '2018-12-14', 18, NULL, 'Animal Spotting', 'Individual African Wild Dog observed in natural habitat in Botswana; behaviour recorded.'),
(185, 7, 104, 185, '2024-05-14', 12, NULL, 'Poaching', 'Suspected poachers observed near Hawksbill Sea Turtle territory in Seychelles; authorities notified.'),
(186, 7, 94, 186, '2021-07-14', 18, NULL, 'Poaching', 'Snare traps discovered close to known African Wild Dog habitat in Botswana; traps removed and photographed.'),
(187, 3, 187, 187, '2020-08-14', 42, NULL, 'Animal Spotting', 'Individual Fishing Cat observed in natural habitat in Thailand; behaviour recorded.'),
(188, 15, 68, 188, '2019-03-09', 46, NULL, 'Poaching', 'Snare traps discovered close to known Hyacinth Macaw habitat in Bolivia; traps removed and photographed.'),
(189, 11, 35, 189, '2022-01-07', 17, NULL, 'Poaching', 'Carcass of Cheetah found in Namibia with signs consistent with poaching; samples collected.'),
(190, 14, 111, 190, '2019-05-07', 42, NULL, 'Animal Spotting', 'Fishing Cat spotted with offspring in Sri Lanka; positive indicator for local population recovery.'),
(191, 14, 28, 191, '2021-09-04', 11, NULL, 'Poaching', 'Snare traps discovered close to known Leatherback Sea Turtle habitat in Australia; traps removed and photographed.'),
(192, 4, 3, 192, '2021-05-09', 39, NULL, 'Animal Spotting', 'Healthy Argali (Ovis ammon) spotted during routine survey in Mongolia.'),
(193, 19, 138, 193, '2024-03-27', 27, NULL, 'Animal Spotting', 'Healthy Whale Shark (Rhincodon typus) spotted during routine survey in Mexico.'),
(194, 1, 74, 194, '2019-07-27', 33, NULL, 'Poaching', 'Suspected poachers observed near Jaguar territory in Brazil; authorities notified.'),
(195, 3, 121, 195, '2022-06-29', 4, NULL, 'Poaching', 'Patrol encountered individuals in possession of Mountain Gorilla parts in Democratic Republic of Congo; arrested by rangers.'),
(196, 7, 173, 196, '2018-11-04', 29, NULL, 'Animal Spotting', 'Individual Common Bottlenose Dolphin observed in natural habitat in Australia; behaviour recorded.'),
(197, 7, 168, 197, '2019-01-12', 24, NULL, 'Animal Spotting', 'Healthy Common Hippopotamus (Hippopotamus amphibius) spotted during routine survey in Kenya.'),
(198, 18, 153, 198, '2018-07-27', 15, NULL, 'Animal Spotting', 'Rare sighting of West Indian Manatee confirmed in Mexico; GPS coordinates logged for tracking database.'),
(199, 8, 127, 199, '2022-10-14', 33, NULL, 'Poaching', 'Suspected poachers observed near Jaguar territory in Brazil; authorities notified.'),
(200, 11, 73, 200, '2019-09-01', 31, NULL, 'Poaching', 'Snare traps discovered close to known Sperm Whale habitat in New Zealand; traps removed and photographed.');

-- --------------------------------------------------------

--
-- Table structure for table `Species`
--

CREATE TABLE `Species` (
  `SpeciesID` int(11) NOT NULL,
  `ScientificName` varchar(100) NOT NULL,
  `CommonName` varchar(100) NOT NULL,
  `ConservationStatus` enum('Least Concern','Near Threatened','Vulnerable','Endangered','Critically Endangered','Unknown') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Species`
--

INSERT INTO `Species` (`SpeciesID`, `ScientificName`, `CommonName`, `ConservationStatus`) VALUES
(1, 'Panthera tigris', 'Bengal Tiger', 'Endangered'),
(2, 'Panthera leo', 'African Lion', 'Vulnerable'),
(3, 'Ailuropoda melanoleuca', 'Giant Panda', 'Vulnerable'),
(4, 'Gorilla beringei beringei', 'Mountain Gorilla', 'Endangered'),
(5, 'Diceros bicornis', 'Black Rhinoceros', 'Critically Endangered'),
(6, 'Ceratotherium simum cottoni', 'Northern White Rhinoceros', 'Critically Endangered'),
(7, 'Elephas maximus', 'Asian Elephant', 'Endangered'),
(8, 'Loxodonta africana', 'African Bush Elephant', 'Vulnerable'),
(9, 'Spheniscus mendiculus', 'Galápagos Penguin', 'Endangered'),
(10, 'Chelonoidis niger', 'Galápagos Tortoise', 'Vulnerable'),
(11, 'Dermochelys coriacea', 'Leatherback Sea Turtle', 'Vulnerable'),
(12, 'Eretmochelys imbricata', 'Hawksbill Sea Turtle', 'Critically Endangered'),
(13, 'Pongo pygmaeus', 'Bornean Orangutan', 'Critically Endangered'),
(14, 'Pongo abelii', 'Sumatran Orangutan', 'Critically Endangered'),
(15, 'Trichechus manatus', 'West Indian Manatee', 'Vulnerable'),
(16, 'Ursus maritimus', 'Polar Bear', 'Vulnerable'),
(17, 'Acinonyx jubatus', 'Cheetah', 'Vulnerable'),
(18, 'Lycaon pictus', 'African Wild Dog', 'Endangered'),
(19, 'Canis lupus', 'Grey Wolf', 'Least Concern'),
(20, 'Ursus arctos', 'Brown Bear', 'Least Concern'),
(21, 'Bison bison', 'American Bison', 'Near Threatened'),
(22, 'Equus quagga', 'Plains Zebra', 'Near Threatened'),
(23, 'Giraffa camelopardalis', 'Masai Giraffe', 'Endangered'),
(24, 'Hippopotamus amphibius', 'Common Hippopotamus', 'Vulnerable'),
(25, 'Crocodylus niloticus', 'Nile Crocodile', 'Least Concern'),
(26, 'Varanus komodoensis', 'Komodo Dragon', 'Endangered'),
(27, 'Rhincodon typus', 'Whale Shark', 'Endangered'),
(28, 'Carcharodon carcharias', 'Great White Shark', 'Vulnerable'),
(29, 'Tursiops truncatus', 'Common Bottlenose Dolphin', 'Least Concern'),
(30, 'Megaptera novaeangliae', 'Humpback Whale', 'Least Concern'),
(31, 'Physeter macrocephalus', 'Sperm Whale', 'Vulnerable'),
(32, 'Balaenoptera musculus', 'Blue Whale', 'Endangered'),
(33, 'Panthera onca', 'Jaguar', 'Near Threatened'),
(34, 'Tapirus terrestris', 'South American Tapir', 'Vulnerable'),
(35, 'Pteropus rodricensis', 'Rodrigues Flying Fox', 'Endangered'),
(36, 'Sphenodon punctatus', 'Tuatara', 'Least Concern'),
(37, 'Vulpes lagopus', 'Arctic Fox', 'Least Concern'),
(38, 'Rangifer tarandus', 'Reindeer', 'Vulnerable'),
(39, 'Ovis ammon', 'Argali', 'Near Threatened'),
(40, 'Panthera pardus', 'Leopard', 'Vulnerable'),
(41, 'Neofelis nebulosa', 'Clouded Leopard', 'Vulnerable'),
(42, 'Prionailurus viverrinus', 'Fishing Cat', 'Vulnerable'),
(43, 'Helarctos malayanus', 'Sun Bear', 'Vulnerable'),
(44, 'Ailurus fulgens', 'Red Panda', 'Endangered'),
(45, 'Babyrousa celebensis', 'Sulawesi Babirusa', 'Vulnerable'),
(46, 'Anodorhynchus hyacinthinus', 'Hyacinth Macaw', 'Vulnerable'),
(47, 'Spizaetus nipalensis', 'Mountain Hawk-Eagle', 'Least Concern'),
(48, 'Haliaeetus leucocephalus', 'Bald Eagle', 'Least Concern'),
(49, 'Aquila chrysaetos', 'Golden Eagle', 'Least Concern'),
(50, 'Strigops habroptilus', 'Kākāpō', 'Critically Endangered'),
(51, 'Manis crassicaudata', 'Indian Pangolin', 'Endangered');

-- --------------------------------------------------------

--
-- Table structure for table `Tracked_Animal`
--

CREATE TABLE `Tracked_Animal` (
  `AnimalID` int(11) NOT NULL,
  `SpeciesID` int(11) NOT NULL,
  `BirthDate` date DEFAULT NULL,
  `Status` enum('Alive','Dead','Hospitalised','Unknown') NOT NULL,
  `Name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Tracked_Animal`
--

INSERT INTO `Tracked_Animal` (`AnimalID`, `SpeciesID`, `BirthDate`, `Status`, `Name`) VALUES
(1, 6, '2005-12-14', 'Alive', 'Arthur'),
(2, 16, '2020-11-23', 'Alive', 'Kodiak'),
(3, 2, '1995-05-08', 'Alive', 'Leo'),
(4, 20, '2013-08-18', 'Alive', 'Mishka'),
(5, 48, '2011-06-23', 'Alive', 'Blaze'),
(6, 17, '2004-02-24', 'Alive', 'Dash'),
(7, 48, '2001-04-07', 'Alive', 'Shadow'),
(8, 47, '2008-02-27', 'Alive', 'Ranger'),
(9, 24, '2001-05-01', 'Alive', 'Echo'),
(10, 18, '1992-01-18', 'Alive', 'Kioni'),
(11, 41, '2021-02-28', 'Alive', 'Blaze'),
(12, 31, '2020-08-11', 'Alive', 'Beta'),
(13, 17, '2020-02-27', 'Alive', 'Malaika'),
(14, 5, '1993-03-05', 'Dead', 'Kilaguni'),
(15, 6, '2005-02-18', 'Alive', 'River'),
(16, 39, '2004-09-13', 'Alive', 'Atlas'),
(17, 20, '2017-05-19', 'Alive', 'Medved'),
(18, 48, '1996-04-21', 'Alive', 'Cedar'),
(19, 6, '2000-04-06', 'Alive', 'Foxtrot'),
(20, 1, '2016-08-23', 'Alive', 'Ravi'),
(21, 3, '2004-05-23', 'Alive', 'Lun Lun'),
(22, 5, '2004-05-26', 'Dead', 'Baraka'),
(23, 43, '2002-07-04', 'Alive', 'Sky'),
(24, 10, '2007-03-03', 'Alive', 'Blaze'),
(25, 39, '2008-08-04', 'Alive', 'Blaze'),
(26, 45, '2015-05-17', 'Alive', 'Atlas'),
(27, 6, '1992-07-24', 'Alive', 'Shadow'),
(28, 2, '1995-04-22', 'Dead', 'Simba'),
(29, 49, '2007-10-02', 'Alive', 'Foxtrot'),
(30, 31, '2018-05-06', 'Dead', 'Nova'),
(31, 41, '2021-02-16', 'Alive', 'Storm'),
(32, 21, '1996-03-11', 'Alive', 'Dust'),
(33, 19, '2015-09-02', 'Alive', 'Storm'),
(34, 17, '2010-02-25', 'Alive', 'Imara'),
(35, 1, '2019-07-02', 'Alive', 'Meena'),
(36, 40, '2021-11-15', 'Alive', 'Scout'),
(37, 18, '1998-05-15', 'Dead', 'Shida'),
(38, 8, '1991-11-20', 'Dead', 'Amara'),
(39, 11, '2009-09-01', 'Alive', 'Gamma'),
(40, 15, '1997-08-04', 'Alive', 'Echo'),
(41, 32, '2008-09-23', 'Alive', 'Orion'),
(42, 31, '2005-08-18', 'Alive', 'Scout'),
(43, 39, '2022-12-05', 'Dead', 'Shadow'),
(44, 50, '2016-06-26', 'Alive', 'Sirocco'),
(45, 19, '2009-10-19', 'Dead', 'Orion'),
(46, 10, '2018-09-16', 'Alive', 'Ember'),
(47, 49, '2014-08-11', 'Dead', 'Hawk'),
(48, 16, '2014-04-28', 'Alive', 'Nanook'),
(49, 21, '2020-12-26', 'Alive', 'Sage'),
(50, 42, '1999-08-02', 'Alive', 'Frost'),
(51, 22, '1996-08-04', 'Alive', 'Atlas'),
(52, 1, '1999-07-28', 'Alive', 'Arjun'),
(53, 5, '2020-05-11', 'Alive', 'Zawadi'),
(54, 42, '1995-06-28', 'Alive', 'Ember'),
(55, 25, '2010-11-23', 'Dead', 'Orion'),
(56, 35, '1992-10-03', 'Alive', 'Cedar'),
(57, 19, '2004-12-03', 'Alive', 'Delta'),
(58, 49, '1996-08-06', 'Alive', 'Alpha'),
(59, 3, '2010-01-10', 'Alive', 'Er Shun'),
(60, 10, '2005-09-14', 'Alive', 'Foxtrot'),
(61, 11, '2001-02-20', 'Dead', 'River'),
(62, 44, '2005-08-19', 'Alive', 'Atlas'),
(63, 41, '2006-08-09', 'Alive', 'Atlas'),
(64, 19, '2000-02-15', 'Dead', 'Frost'),
(65, 20, '2017-12-09', 'Alive', 'Kodiak'),
(66, 13, '2014-08-04', 'Alive', 'Frost'),
(67, 23, '2008-12-10', 'Alive', 'Cedar'),
(68, 26, '2007-01-19', 'Dead', NULL),
(69, 48, '1993-10-24', 'Alive', 'Blaze'),
(70, 50, '2004-10-26', 'Alive', 'Pounamu'),
(71, 13, '2006-11-25', 'Alive', 'Cedar'),
(72, 44, '1998-11-04', 'Dead', 'Sky'),
(73, 3, '2009-08-02', 'Alive', 'Ling'),
(74, 6, '2008-06-24', 'Alive', 'Scout'),
(75, 9, '2013-09-17', 'Dead', 'Flipper'),
(76, 17, '2020-05-24', 'Dead', 'Dash'),
(77, 30, '1994-03-25', 'Dead', 'Aria'),
(78, 47, '2015-09-12', 'Alive', 'Luna'),
(79, 1, '2006-09-04', 'Alive', 'Ravi'),
(80, 38, '2014-11-12', 'Alive', 'Ranger'),
(81, 31, '1991-10-18', 'Alive', 'River'),
(82, 15, '1994-11-27', 'Alive', 'Hawk'),
(83, 20, '2016-02-05', 'Alive', 'Bruno'),
(84, 20, '2021-02-04', 'Alive', 'Medved'),
(85, 9, '2014-08-12', 'Alive', 'Pepita'),
(86, 45, '2016-10-24', 'Alive', 'Nova'),
(87, 42, '1996-08-20', 'Alive', 'Shadow'),
(88, 3, '2013-04-15', 'Alive', 'Tian'),
(89, 24, '1996-11-12', 'Alive', 'Sky'),
(90, 23, '1993-07-09', 'Alive', 'Delta'),
(91, 30, '1995-11-07', 'Alive', 'Pacific'),
(92, 2, '1993-06-08', 'Dead', 'Leo'),
(93, 5, '2003-10-07', 'Dead', 'Fatu'),
(94, 22, '1999-10-01', 'Alive', 'Echo'),
(95, 9, '2006-03-04', 'Alive', 'Pebble'),
(96, 9, '1990-06-26', 'Dead', 'Blu'),
(97, 21, '1991-03-09', 'Alive', 'Sage'),
(98, 27, '1997-12-03', 'Alive', NULL),
(99, 24, '2022-10-04', 'Alive', 'Ranger'),
(100, 40, '1992-12-26', 'Dead', 'Cedar'),
(101, 34, '2009-08-21', 'Dead', 'Beta'),
(102, 31, '2015-07-22', 'Alive', 'Hawk'),
(103, 29, '1994-02-11', 'Alive', 'Gamma'),
(104, 9, '2007-10-21', 'Alive', 'Pepita'),
(105, 21, '2014-10-17', 'Alive', 'Hickory'),
(106, 39, '2017-02-26', 'Alive', 'Sky'),
(107, 42, '2003-07-15', 'Dead', 'Nova'),
(108, 22, '2019-07-14', 'Alive', 'Storm'),
(109, 28, '2010-11-09', 'Alive', 'Echo'),
(110, 44, '2020-02-03', 'Dead', 'Gamma'),
(111, 28, '1996-12-24', 'Alive', 'Echo'),
(112, 36, '1993-10-18', 'Alive', 'Cedar'),
(113, 8, '2016-06-28', 'Alive', 'Zuri'),
(114, 28, '1993-05-20', 'Alive', 'Delta'),
(115, 37, '2022-04-05', 'Alive', 'Ranger'),
(116, 7, '2012-09-12', 'Alive', 'Priya'),
(117, 37, '2004-07-28', 'Alive', NULL),
(118, 40, '1991-10-22', 'Dead', 'Shadow'),
(119, 2, '2001-05-23', 'Alive', 'Mufasa'),
(120, 23, '1990-03-28', 'Alive', 'Cedar'),
(121, 26, '1994-03-24', 'Alive', 'Alpha'),
(122, 6, '2003-07-14', 'Alive', 'Foxtrot'),
(123, 24, '2009-12-11', 'Alive', 'Frost'),
(124, 39, '1995-01-05', 'Alive', 'River'),
(125, 4, '1995-05-15', 'Alive', 'Urugamba'),
(126, 39, '2018-07-09', 'Alive', 'Sage'),
(127, 8, '2012-07-04', 'Alive', 'Amara'),
(128, 38, '2021-09-22', 'Alive', 'Ranger'),
(129, 26, '1993-01-07', 'Alive', 'Scout'),
(130, 50, '1998-05-10', 'Alive', 'Sirocco'),
(131, 32, '2017-03-05', 'Alive', 'Hawk'),
(132, 15, '2022-09-27', 'Alive', 'Spirit'),
(133, 5, '2015-12-02', 'Alive', 'Zawadi'),
(134, 5, '2010-10-14', 'Alive', 'Jasiri'),
(135, 41, '2016-05-04', 'Alive', 'Storm'),
(136, 11, '2019-12-12', 'Alive', 'Delta'),
(137, 16, '2017-10-13', 'Alive', 'Frost'),
(138, 20, '2011-04-11', 'Alive', 'Bruno'),
(139, 33, '1997-09-17', 'Alive', 'Tupã'),
(140, 23, '1999-04-04', 'Alive', 'Scout'),
(141, 12, '1999-11-03', 'Alive', NULL),
(142, 41, '2021-08-25', 'Alive', 'Frost'),
(143, 29, '2010-11-11', 'Alive', 'Gamma'),
(144, 31, '2018-11-10', 'Dead', 'Frost'),
(145, 4, '2012-09-03', 'Alive', 'Urugamba'),
(146, 3, '1993-06-27', 'Alive', 'Bao'),
(147, 40, '2022-07-15', 'Alive', 'Reed'),
(148, 3, '2018-10-21', 'Alive', 'Lun Lun'),
(149, 33, '1999-01-15', 'Alive', 'Tupã'),
(150, 46, '1995-09-21', 'Alive', 'Ranger'),
(151, 46, '2018-08-17', 'Alive', 'Foxtrot'),
(152, 24, '2013-05-13', 'Alive', 'Storm'),
(153, 44, '1993-11-21', 'Alive', 'Storm'),
(154, 7, '2014-05-09', 'Alive', 'Kalpana'),
(155, 39, '1999-06-03', 'Alive', 'Echo'),
(156, 23, '2009-11-23', 'Alive', 'Echo'),
(157, 39, '1995-05-18', 'Alive', 'Storm'),
(158, 9, '1995-11-22', 'Alive', 'Tux'),
(159, 2, '2013-05-06', 'Dead', 'Mufasa'),
(160, 50, '2021-04-08', 'Dead', 'Rangi'),
(161, 5, '2008-02-17', 'Alive', 'Jasiri'),
(162, 34, '1992-11-11', 'Dead', 'River'),
(163, 9, '2014-03-06', 'Alive', 'Pepita'),
(164, 50, '2000-12-15', 'Alive', 'Tiaki'),
(165, 44, '2005-08-20', 'Alive', 'Reed'),
(166, 29, '2004-09-08', 'Alive', 'Orion'),
(167, 13, '2013-11-19', 'Dead', 'Atlas'),
(168, 50, '2008-07-17', 'Alive', 'Rangi'),
(169, 13, '1998-05-02', 'Alive', 'Spirit'),
(170, 36, '1996-12-28', 'Alive', 'Delta'),
(171, 19, '1995-03-09', 'Alive', 'Sage'),
(172, 10, '2017-02-08', 'Dead', 'Spirit'),
(173, 2, '2016-01-13', 'Alive', 'Leo'),
(174, 25, '1995-06-08', 'Alive', 'Delta'),
(175, 46, '2011-03-05', 'Alive', 'Orion'),
(176, 45, '1998-12-16', 'Alive', 'Alpha'),
(177, 6, '1991-05-07', 'Dead', 'Ember'),
(178, 47, '2017-02-25', 'Alive', 'Blaze'),
(179, 8, '1993-04-14', 'Alive', 'Nguvu'),
(180, 30, '1994-02-27', 'Dead', 'Pacific'),
(181, 35, '1991-11-17', 'Alive', 'Hawk'),
(182, 10, '2008-07-01', 'Alive', 'Ranger'),
(183, 37, '2016-03-22', 'Alive', 'Sage'),
(184, 24, '1994-09-18', 'Alive', 'Sage'),
(185, 36, '1991-07-28', 'Alive', 'Sky'),
(186, 25, '2013-05-24', 'Alive', 'Gamma'),
(187, 23, '2005-12-22', 'Alive', NULL),
(188, 38, '2011-03-02', 'Alive', 'Storm'),
(189, 42, '2001-11-15', 'Dead', 'Orion'),
(190, 41, '2001-03-03', 'Alive', 'Atlas'),
(191, 3, '2008-04-02', 'Dead', 'Mei'),
(192, 21, '2009-09-13', 'Dead', 'Hickory'),
(193, 31, '2006-01-25', 'Alive', 'Blaze'),
(194, 23, '1993-11-11', 'Alive', 'Spirit'),
(195, 28, '2015-12-15', 'Dead', 'Luna'),
(196, 22, '2001-08-23', 'Alive', 'Sage'),
(197, 18, '1995-12-14', 'Alive', 'Tembo'),
(198, 12, '2008-06-04', 'Alive', 'Cedar'),
(199, 19, '2009-08-20', 'Alive', 'Foxtrot'),
(200, 45, '2018-06-15', 'Alive', 'Spirit');

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_logger_activity`
-- (See below for the actual view)
--
CREATE TABLE `vw_logger_activity` (
`LoggerID` int(11)
,`FullName` varchar(101)
,`Email` varchar(255)
,`TotalReports` bigint(21)
,`FirstReport` date
,`MostRecentReport` date
,`AvgDaysBetweenReports` decimal(9,1)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_BiodiversityHotspots`
-- (See below for the actual view)
--
CREATE TABLE `v_BiodiversityHotspots` (
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_EvidenceTypeSummary`
-- (See below for the actual view)
--
CREATE TABLE `v_EvidenceTypeSummary` (
`EvidenceID` int(11)
,`EvidenceType` enum('Photographic','Audio','Video','Sighting')
,`Description` varchar(255)
,`TimesUsed` bigint(21)
,`SpeciesDocumented` bigint(21)
,`LoggersUsing` bigint(21)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_HighPrioritySpeciesSummary`
-- (See below for the actual view)
--
CREATE TABLE `v_HighPrioritySpeciesSummary` (
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_LocationBiodiversity`
-- (See below for the actual view)
--
CREATE TABLE `v_LocationBiodiversity` (
`LocationID` int(11)
,`Country` varchar(50)
,`Latitude` decimal(9,6)
,`Longitude` decimal(9,6)
,`SpeciesDiversity` bigint(21)
,`TotalObservations` bigint(21)
,`ContributingLoggers` bigint(21)
,`LastObservation` date
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_Logger2024Performance`
-- (See below for the actual view)
--
CREATE TABLE `v_Logger2024Performance` (
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_LoggerActivityDashboard`
-- (See below for the actual view)
--
CREATE TABLE `v_LoggerActivityDashboard` (
`LoggerID` int(11)
,`FullName` varchar(101)
,`Email` varchar(255)
,`TotalReports` bigint(21)
,`SpeciesReported` bigint(21)
,`ActiveYears` bigint(21)
,`LastReportDate` date
,`FirstReportDate` date
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_LoggerPerformance`
-- (See below for the actual view)
--
CREATE TABLE `v_LoggerPerformance` (
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_SpeciesReportDetail`
-- (See below for the actual view)
--
CREATE TABLE `v_SpeciesReportDetail` (
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_SpeciesReportSummary`
-- (See below for the actual view)
--
CREATE TABLE `v_SpeciesReportSummary` (
);

-- --------------------------------------------------------

--
-- Structure for view `GlobalThreatAudit`
--
DROP TABLE IF EXISTS `GlobalThreatAudit`;

CREATE ALGORITHM=UNDEFINED DEFINER=`eallen14`@`localhost` SQL SECURITY DEFINER VIEW `GlobalThreatAudit`  AS SELECT `L`.`Country` AS `Country`, `R`.`ReportType` AS `ReportType`, `E`.`EvidenceType` AS `EvidenceType`, ucase(`E`.`Description`) AS `Evidence_Note`, `R`.`ReportDate` AS `ReportDate` FROM ((`Report` `R` join `Location` `L` on(`R`.`LocationID` = `L`.`LocationID`)) join `Evidence` `E` on(`R`.`EvidenceID` = `E`.`EvidenceID`)) ;

-- --------------------------------------------------------

--
-- Structure for view `vw_logger_activity`
--
DROP TABLE IF EXISTS `vw_logger_activity`;

CREATE ALGORITHM=UNDEFINED DEFINER=`cwatkins03`@`localhost` SQL SECURITY DEFINER VIEW `vw_logger_activity`  AS SELECT `l`.`LoggerID` AS `LoggerID`, ucase(concat(`l`.`Forename`,' ',`l`.`Surname`)) AS `FullName`, `l`.`Email` AS `Email`, count(`r`.`ReportID`) AS `TotalReports`, min(`r`.`ReportDate`) AS `FirstReport`, max(`r`.`ReportDate`) AS `MostRecentReport`, CASE WHEN count(`r`.`ReportID`) > 1 THEN round((to_days(max(`r`.`ReportDate`)) - to_days(min(`r`.`ReportDate`))) / (count(`r`.`ReportID`) - 1),1) ELSE NULL END AS `AvgDaysBetweenReports` FROM (`Logger` `l` left join `Report` `r` on(`l`.`LoggerID` = `r`.`LoggerID`)) GROUP BY `l`.`LoggerID`, `l`.`Forename`, `l`.`Surname`, `l`.`Email` ;

-- --------------------------------------------------------

--
-- Structure for view `v_BiodiversityHotspots`
--
DROP TABLE IF EXISTS `v_BiodiversityHotspots`;

CREATE ALGORITHM=UNDEFINED DEFINER=`cwatkins03`@`localhost` SQL SECURITY DEFINER VIEW `v_BiodiversityHotspots`  AS SELECT `l`.`LocationID` AS `LocationID`, `l`.`Country` AS `Country`, `l`.`Latitude` AS `Latitude`, `l`.`Longitude` AS `Longitude`, count(distinct `r`.`SpeciesID`) AS `SpeciesDiversity`, count(`r`.`ReportID`) AS `TotalObservations`, count(distinct case when `s`.`Status` = 'High' then `r`.`SpeciesID` end) AS `HighPrioritySpeciesCount`, group_concat(distinct `s`.`Name` order by `s`.`Name` ASC separator '; ') AS `SpeciesList` FROM ((`Location` `l` join `Report` `r` on(`l`.`LocationID` = `r`.`LocationID`)) join `Species` `s` on(`r`.`SpeciesID` = `s`.`SpeciesID`)) GROUP BY `l`.`LocationID`, `l`.`Country`, `l`.`Latitude`, `l`.`Longitude` HAVING `SpeciesDiversity` >= 5 ORDER BY count(distinct `r`.`SpeciesID`) DESC ;

-- --------------------------------------------------------

--
-- Structure for view `v_EvidenceTypeSummary`
--
DROP TABLE IF EXISTS `v_EvidenceTypeSummary`;

CREATE ALGORITHM=UNDEFINED DEFINER=`cwatkins03`@`localhost` SQL SECURITY DEFINER VIEW `v_EvidenceTypeSummary`  AS SELECT `e`.`EvidenceID` AS `EvidenceID`, `e`.`EvidenceType` AS `EvidenceType`, `e`.`Description` AS `Description`, count(`r`.`ReportID`) AS `TimesUsed`, count(distinct `r`.`SpeciesID`) AS `SpeciesDocumented`, count(distinct `r`.`LoggerID`) AS `LoggersUsing` FROM (`Evidence` `e` left join `Report` `r` on(`e`.`EvidenceID` = `r`.`EvidenceID`)) GROUP BY `e`.`EvidenceID`, `e`.`EvidenceType`, `e`.`Description` ;

-- --------------------------------------------------------

--
-- Structure for view `v_HighPrioritySpeciesSummary`
--
DROP TABLE IF EXISTS `v_HighPrioritySpeciesSummary`;

CREATE ALGORITHM=UNDEFINED DEFINER=`cwatkins03`@`localhost` SQL SECURITY DEFINER VIEW `v_HighPrioritySpeciesSummary`  AS SELECT `s`.`SpeciesID` AS `SpeciesID`, `s`.`Name` AS `SpeciesName`, `s`.`Status` AS `Status`, count(`r`.`ReportID`) AS `TotalReports`, max(`r`.`ReportDate`) AS `LastReported`, count(distinct `r`.`LocationID`) AS `LocationCount`, count(distinct `r`.`LoggerID`) AS `ObserverCount` FROM (`Species` `s` left join `Report` `r` on(`s`.`SpeciesID` = `r`.`SpeciesID`)) WHERE `s`.`Status` = 'High' GROUP BY `s`.`SpeciesID`, `s`.`Name`, `s`.`Status` ;

-- --------------------------------------------------------

--
-- Structure for view `v_LocationBiodiversity`
--
DROP TABLE IF EXISTS `v_LocationBiodiversity`;

CREATE ALGORITHM=UNDEFINED DEFINER=`cwatkins03`@`localhost` SQL SECURITY DEFINER VIEW `v_LocationBiodiversity`  AS SELECT `loc`.`LocationID` AS `LocationID`, `loc`.`Country` AS `Country`, `loc`.`Latitude` AS `Latitude`, `loc`.`Longitude` AS `Longitude`, count(distinct `r`.`SpeciesID`) AS `SpeciesDiversity`, count(`r`.`ReportID`) AS `TotalObservations`, count(distinct `r`.`LoggerID`) AS `ContributingLoggers`, max(`r`.`ReportDate`) AS `LastObservation` FROM (`Location` `loc` left join `Report` `r` on(`loc`.`LocationID` = `r`.`LocationID`)) GROUP BY `loc`.`LocationID`, `loc`.`Country`, `loc`.`Latitude`, `loc`.`Longitude` ;

-- --------------------------------------------------------

--
-- Structure for view `v_Logger2024Performance`
--
DROP TABLE IF EXISTS `v_Logger2024Performance`;

CREATE ALGORITHM=UNDEFINED DEFINER=`cwatkins03`@`localhost` SQL SECURITY DEFINER VIEW `v_Logger2024Performance`  AS SELECT `l`.`LoggerID` AS `LoggerID`, `l`.`Forename` AS `Forename`, `l`.`Surname` AS `Surname`, `l`.`Email` AS `Email`, count(`r`.`ReportID`) AS `TotalReports`, count(distinct `r`.`SpeciesID`) AS `SpeciesReported`, count(distinct case when `s`.`Status` = 'High' then `r`.`ReportID` end) AS `HighPriorityReports`, count(distinct `loc`.`Country`) AS `CountriesCovered` FROM (((`Logger` `l` join `Report` `r` on(`l`.`LoggerID` = `r`.`LoggerID`)) join `Species` `s` on(`r`.`SpeciesID` = `s`.`SpeciesID`)) left join `Location` `loc` on(`r`.`LocationID` = `loc`.`LocationID`)) WHERE year(`r`.`ReportDate`) = 2024 GROUP BY `l`.`LoggerID`, `l`.`Forename`, `l`.`Surname`, `l`.`Email` ;

-- --------------------------------------------------------

--
-- Structure for view `v_LoggerActivityDashboard`
--
DROP TABLE IF EXISTS `v_LoggerActivityDashboard`;

CREATE ALGORITHM=UNDEFINED DEFINER=`cwatkins03`@`localhost` SQL SECURITY DEFINER VIEW `v_LoggerActivityDashboard`  AS SELECT `l`.`LoggerID` AS `LoggerID`, concat(`l`.`Forename`,' ',`l`.`Surname`) AS `FullName`, `l`.`Email` AS `Email`, count(`r`.`ReportID`) AS `TotalReports`, count(distinct `r`.`SpeciesID`) AS `SpeciesReported`, count(distinct year(`r`.`ReportDate`)) AS `ActiveYears`, max(`r`.`ReportDate`) AS `LastReportDate`, min(`r`.`ReportDate`) AS `FirstReportDate` FROM (`Logger` `l` left join `Report` `r` on(`l`.`LoggerID` = `r`.`LoggerID`)) GROUP BY `l`.`LoggerID`, `l`.`Forename`, `l`.`Surname`, `l`.`Email` ;

-- --------------------------------------------------------

--
-- Structure for view `v_LoggerPerformance`
--
DROP TABLE IF EXISTS `v_LoggerPerformance`;

CREATE ALGORITHM=UNDEFINED DEFINER=`cwatkins03`@`localhost` SQL SECURITY DEFINER VIEW `v_LoggerPerformance`  AS SELECT `l`.`LoggerID` AS `LoggerID`, `l`.`Forename` AS `Forename`, `l`.`Surname` AS `Surname`, `l`.`Email` AS `Email`, count(`r`.`ReportID`) AS `TotalReports`, count(distinct `r`.`SpeciesID`) AS `SpeciesReported`, count(distinct case when `s`.`Status` = 'High' then `r`.`ReportID` end) AS `HighPriorityReports`, count(distinct `loc`.`Country`) AS `CountriesCovered` FROM (((`Logger` `l` join `Report` `r` on(`l`.`LoggerID` = `r`.`LoggerID`)) join `Species` `s` on(`r`.`SpeciesID` = `s`.`SpeciesID`)) left join `Location` `loc` on(`r`.`LocationID` = `loc`.`LocationID`)) GROUP BY `l`.`LoggerID`, `l`.`Forename`, `l`.`Surname`, `l`.`Email` ;

-- --------------------------------------------------------

--
-- Structure for view `v_SpeciesReportDetail`
--
DROP TABLE IF EXISTS `v_SpeciesReportDetail`;

CREATE ALGORITHM=UNDEFINED DEFINER=`cwatkins03`@`localhost` SQL SECURITY DEFINER VIEW `v_SpeciesReportDetail`  AS SELECT `s`.`SpeciesID` AS `SpeciesID`, `s`.`Name` AS `SpeciesName`, `s`.`Status` AS `ConservationStatus`, `r`.`ReportID` AS `ReportID`, `r`.`LoggerID` AS `LoggerID`, `r`.`ReportDate` AS `ReportDate`, `loc`.`Country` AS `Country`, `e`.`EvidenceType` AS `EvidenceType` FROM (((`Species` `s` join `Report` `r` on(`s`.`SpeciesID` = `r`.`SpeciesID`)) left join `Location` `loc` on(`r`.`LocationID` = `loc`.`LocationID`)) left join `Evidence` `e` on(`r`.`EvidenceID` = `e`.`EvidenceID`)) ;

-- --------------------------------------------------------

--
-- Structure for view `v_SpeciesReportSummary`
--
DROP TABLE IF EXISTS `v_SpeciesReportSummary`;

CREATE ALGORITHM=UNDEFINED DEFINER=`cwatkins03`@`localhost` SQL SECURITY DEFINER VIEW `v_SpeciesReportSummary`  AS SELECT `s`.`SpeciesID` AS `SpeciesID`, `s`.`Name` AS `SpeciesName`, `s`.`Status` AS `ConservationStatus`, count(`r`.`ReportID`) AS `TotalReports`, count(distinct `r`.`LoggerID`) AS `UniqueLoggers`, count(distinct `r`.`LocationID`) AS `UniqueLocations`, max(`r`.`ReportDate`) AS `LastReported`, min(`r`.`ReportDate`) AS `FirstReported`, count(distinct `r`.`EvidenceID`) AS `EvidenceTypesCount` FROM (`Species` `s` left join `Report` `r` on(`s`.`SpeciesID` = `r`.`SpeciesID`)) GROUP BY `s`.`SpeciesID`, `s`.`Name`, `s`.`Status` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Evidence`
--
ALTER TABLE `Evidence`
  ADD PRIMARY KEY (`EvidenceID`);

--
-- Indexes for table `Location`
--
ALTER TABLE `Location`
  ADD PRIMARY KEY (`LocationID`);

--
-- Indexes for table `Logger`
--
ALTER TABLE `Logger`
  ADD PRIMARY KEY (`LoggerID`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `Username` (`Username`);

--
-- Indexes for table `Report`
--
ALTER TABLE `Report`
  ADD PRIMARY KEY (`ReportID`),
  ADD KEY `LoggerID` (`LoggerID`),
  ADD KEY `LocationID` (`LocationID`),
  ADD KEY `EvidenceID` (`EvidenceID`),
  ADD KEY `SpeciesID` (`SpeciesID`);

--
-- Indexes for table `Species`
--
ALTER TABLE `Species`
  ADD PRIMARY KEY (`SpeciesID`),
  ADD UNIQUE KEY `ScientificName` (`ScientificName`);

--
-- Indexes for table `Tracked_Animal`
--
ALTER TABLE `Tracked_Animal`
  ADD PRIMARY KEY (`AnimalID`),
  ADD KEY `SpeciesID` (`SpeciesID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Evidence`
--
ALTER TABLE `Evidence`
  MODIFY `EvidenceID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=210;

--
-- AUTO_INCREMENT for table `Location`
--
ALTER TABLE `Location`
  MODIFY `LocationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=210;

--
-- AUTO_INCREMENT for table `Logger`
--
ALTER TABLE `Logger`
  MODIFY `LoggerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `Report`
--
ALTER TABLE `Report`
  MODIFY `ReportID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=205;

--
-- AUTO_INCREMENT for table `Species`
--
ALTER TABLE `Species`
  MODIFY `SpeciesID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `Tracked_Animal`
--
ALTER TABLE `Tracked_Animal`
  MODIFY `AnimalID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=201;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Report`
--
ALTER TABLE `Report`
  ADD CONSTRAINT `Report_ibfk_1` FOREIGN KEY (`LoggerID`) REFERENCES `Logger` (`LoggerID`),
  ADD CONSTRAINT `Report_ibfk_2` FOREIGN KEY (`LocationID`) REFERENCES `Location` (`LocationID`),
  ADD CONSTRAINT `Report_ibfk_3` FOREIGN KEY (`EvidenceID`) REFERENCES `Evidence` (`EvidenceID`),
  ADD CONSTRAINT `Report_ibfk_4` FOREIGN KEY (`SpeciesID`) REFERENCES `Species` (`SpeciesID`);

--
-- Constraints for table `Tracked_Animal`
--
ALTER TABLE `Tracked_Animal`
  ADD CONSTRAINT `Tracked_Animal_ibfk_1` FOREIGN KEY (`SpeciesID`) REFERENCES `Species` (`SpeciesID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
