CREATE TABLE `users` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`username` VARCHAR(255) NOT NULL UNIQUE,
	`password_hash` VARCHAR(255) NOT NULL,
	`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `redirects` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`user_id` INT NOT NULL,
	`short_path` VARCHAR(20) UNIQUE NOT NULL,
	`destination_url` VARCHAR(255) NOT NULL,
	`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY(`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

CREATE TABLE `redirect_reports` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`redirect_id` INT NOT NULL,
	`location` VARCHAR(255),
	`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY(`redirect_id`) REFERENCES `redirects`(`id`) ON DELETE CASCADE
);