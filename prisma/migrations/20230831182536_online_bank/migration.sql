-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `avatar_path` VARCHAR(191) NOT NULL DEFAULT '/uploads/default-avatar.png',

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Card` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `number` VARCHAR(16) NOT NULL,
    `expire_date` VARCHAR(191) NOT NULL,
    `cvc` INTEGER NOT NULL,
    `payment_system` ENUM('VISA', 'MAESTRO', 'MASTERCARD', 'MIR') NOT NULL,
    `balance` INTEGER NOT NULL DEFAULT 0,
    `user_id` INTEGER NOT NULL,

    UNIQUE INDEX `Card_number_key`(`number`),
    UNIQUE INDEX `Card_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `amount` INTEGER NOT NULL DEFAULT 0,
    `type` ENUM('TOP_UP', 'WITHDRAWAL') NOT NULL,
    `card_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_card_id_fkey` FOREIGN KEY (`card_id`) REFERENCES `Card`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
