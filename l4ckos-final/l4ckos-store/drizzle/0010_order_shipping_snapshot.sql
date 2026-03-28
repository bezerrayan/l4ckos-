ALTER TABLE `orders`
  ADD COLUMN `shippingRecipient` varchar(255) NULL,
  ADD COLUMN `shippingZipCode` varchar(20) NULL,
  ADD COLUMN `shippingStreet` varchar(255) NULL,
  ADD COLUMN `shippingNumber` varchar(30) NULL,
  ADD COLUMN `shippingComplement` varchar(255) NULL,
  ADD COLUMN `shippingNeighborhood` varchar(255) NULL,
  ADD COLUMN `shippingCity` varchar(255) NULL,
  ADD COLUMN `shippingState` varchar(100) NULL;
