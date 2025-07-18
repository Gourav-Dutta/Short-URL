-- DropForeignKey
ALTER TABLE `shorturl` DROP FOREIGN KEY `ShortUrl_createdBy_fkey`;

-- DropIndex
DROP INDEX `ShortUrl_createdBy_fkey` ON `shorturl`;

-- AddForeignKey
ALTER TABLE `ShortUrl` ADD CONSTRAINT `ShortUrl_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
