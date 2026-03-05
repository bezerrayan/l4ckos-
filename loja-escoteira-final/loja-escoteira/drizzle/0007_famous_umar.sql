ALTER TABLE `orders` MODIFY COLUMN `status` enum('pending','processing','paid','shipped','delivered','cancelled') NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `orders` ADD `asaasCheckoutId` varchar(64);--> statement-breakpoint
ALTER TABLE `users` ADD `cpf` varchar(18);--> statement-breakpoint
ALTER TABLE `users` ADD `phone` varchar(32);--> statement-breakpoint
ALTER TABLE `users` ADD `asaasCustomerId` varchar(64);