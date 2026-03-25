CREATE TABLE `emailUnsubscribes` (
  `id` int AUTO_INCREMENT NOT NULL,
  `email` varchar(320) NOT NULL,
  `reason` varchar(120),
  `source` varchar(120),
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `emailUnsubscribes_id` PRIMARY KEY(`id`),
  CONSTRAINT `emailUnsubscribes_email_unique` UNIQUE(`email`)
);
