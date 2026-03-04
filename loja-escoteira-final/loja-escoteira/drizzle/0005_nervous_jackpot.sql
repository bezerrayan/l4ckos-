CREATE TABLE `promoBanners` (
	`id` int AUTO_INCREMENT NOT NULL,
	`badge` varchar(80) NOT NULL DEFAULT 'PROMOCAO',
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`ctaLabel` varchar(120) NOT NULL DEFAULT 'Aproveitar Oferta',
	`discountText` varchar(60) NOT NULL,
	`discountLabel` varchar(40) NOT NULL DEFAULT 'OFF',
	`bgStyle` varchar(255) NOT NULL DEFAULT 'linear-gradient(135deg, #1a1a1a 0%, #333333 100%)',
	`sortOrder` int NOT NULL DEFAULT 0,
	`isActive` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `promoBanners_id` PRIMARY KEY(`id`)
);
