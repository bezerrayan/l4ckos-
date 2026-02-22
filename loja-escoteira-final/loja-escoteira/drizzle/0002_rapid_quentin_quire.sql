CREATE TABLE `userAddresses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`label` varchar(100) NOT NULL,
	`recipient` varchar(255) NOT NULL,
	`zipCode` varchar(20) NOT NULL,
	`street` varchar(255) NOT NULL,
	`number` varchar(30) NOT NULL,
	`complement` varchar(255),
	`neighborhood` varchar(255) NOT NULL,
	`city` varchar(255) NOT NULL,
	`state` varchar(100) NOT NULL,
	`isDefault` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userAddresses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userPaymentMethods` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`label` varchar(100) NOT NULL,
	`holderName` varchar(255) NOT NULL,
	`brand` varchar(80) NOT NULL,
	`last4` varchar(4) NOT NULL,
	`expiry` varchar(8) NOT NULL,
	`isDefault` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userPaymentMethods_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userProfiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`phone` varchar(32),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userProfiles_id` PRIMARY KEY(`id`)
);
