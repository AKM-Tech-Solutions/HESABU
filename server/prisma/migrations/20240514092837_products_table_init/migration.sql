-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `category_id` INTEGER NOT NULL DEFAULT 0,
    `default_price` DECIMAL(65, 30) NOT NULL,
    `quantity` INTEGER NOT NULL,

    UNIQUE INDEX `products_name_key`(`name`),
    UNIQUE INDEX `products_category_id_key`(`category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `categories_id_key`(`id`),
    UNIQUE INDEX `categories_name_key`(`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions` (
    `id` INTEGER NOT NULL,
    `org_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `value` DECIMAL(65, 30) NOT NULL,
    `product_id` INTEGER NOT NULL,
    `quantity_change` INTEGER NOT NULL,
    `date_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `transactions_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orgAccount` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `current_balance` DECIMAL(65, 30) NOT NULL,

    UNIQUE INDEX `orgAccount_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userAccount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `org_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_org_id_fkey` FOREIGN KEY (`org_id`) REFERENCES `orgAccount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `userAccount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userAccount` ADD CONSTRAINT `userAccount_org_id_fkey` FOREIGN KEY (`org_id`) REFERENCES `orgAccount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
