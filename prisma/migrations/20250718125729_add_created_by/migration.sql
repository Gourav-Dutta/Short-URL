ALTER TABLE `ShortUrl` ADD COLUMN `createdById` INT;

UPDATE `ShortUrl` SET `createdById` = 1;  -- Assuming user ID 1 exists

ALTER TABLE `ShortUrl`
MODIFY `createdById` INT NOT NULL;

ALTER TABLE `ShortUrl`
ADD CONSTRAINT `ShortUrl_createdBy_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`);
