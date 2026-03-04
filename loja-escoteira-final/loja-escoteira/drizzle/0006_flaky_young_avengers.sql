ALTER TABLE `products` ADD `optionColors` text;--> statement-breakpoint
ALTER TABLE `products` ADD `optionSizes` text;--> statement-breakpoint
ALTER TABLE `products` ADD `sizeType` enum('alpha','numeric','custom') DEFAULT 'alpha' NOT NULL;