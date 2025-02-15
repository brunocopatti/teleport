CREATE TABLE `redirects` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`short_path` VARCHAR(255) UNIQUE NOT NULL,
	`destination_url` VARCHAR(255) NOT NULL,
	`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);