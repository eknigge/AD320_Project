DROP DATABASE IF EXISTS `mydb`;
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`USERS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`USERS` (
  `USER_ID` INT NOT NULL AUTO_INCREMENT,
  `EMAIL` VARCHAR(45) NOT NULL,
  `PASSWORD` VARCHAR(45) NOT NULL,
  `FIRST_NAME` VARCHAR(45) NOT NULL,
  `LAST_NAME` VARCHAR(45) NOT NULL,
  `PERMISSION` ENUM("ADMIN", "VENDOR", "CUSTOMER") NOT NULL,
  PRIMARY KEY (`USER_ID`),
  UNIQUE INDEX `User_ID_UNIQUE` (`USER_ID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`MENU`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`MENU` (
  `MENU_ID` INT NOT NULL AUTO_INCREMENT,
  `DESCRIPTION_MENU` VARCHAR(45) NOT NULL,
  `MENU_TITLE` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`MENU_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ITEMS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ITEMS` (
  `ITEM_ID` INT NOT NULL AUTO_INCREMENT,
  `ITEM_NAME` VARCHAR(45) NOT NULL,
  `ITEM_CATEGORY` VARCHAR(45) NOT NULL,
  `PRICE` INT NOT NULL,
  `DESCRIPTION_ITEM` VARCHAR(300) NULL,
  PRIMARY KEY (`ITEM_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ITEMS_MENU`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ITEMS_MENU` (
  `ITEM_ID` INT NOT NULL,
  `MENU_ID` INT NOT NULL,
  `AVAILABLE` ENUM("Y", "N") NOT NULL,
  PRIMARY KEY (`ITEM_ID`, `MENU_ID`),
  INDEX `fk_ITEMS_has_Menu_Menu1_idx` (`MENU_ID` ASC) VISIBLE,
  INDEX `fk_ITEMS_has_Menu_ITEMS1_idx` (`ITEM_ID` ASC) VISIBLE,
  CONSTRAINT `fk_ITEMS_has_Menu_ITEMS1`
    FOREIGN KEY (`ITEM_ID`)
    REFERENCES `mydb`.`ITEMS` (`ITEM_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ITEMS_has_Menu_Menu1`
    FOREIGN KEY (`MENU_ID`)
    REFERENCES `mydb`.`MENU` (`MENU_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`CART`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`CART` (
  `CART_ID` INT NOT NULL AUTO_INCREMENT,
  `LOCATION` VARCHAR(45) NOT NULL,
  `MENU_ID` INT NOT NULL,
  `AVAILABLE` ENUM("Y", "N") NOT NULL,
  PRIMARY KEY (`CART_ID`),
  INDEX `fk_CART_MENU1_idx` (`MENU_ID` ASC) VISIBLE,
  CONSTRAINT `fk_CART_MENU1`
    FOREIGN KEY (`MENU_ID`)
    REFERENCES `mydb`.`MENU` (`MENU_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ORDERS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ORDERS` (
  `ORDER_ID` INT NOT NULL AUTO_INCREMENT,
  `DATE` DATETIME NOT NULL,
  PRIMARY KEY (`ORDER_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ORDER_USERS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ORDER_USERS` (
  `USER_ID` INT NOT NULL,
  `ORDER_ID` INT NOT NULL,
  PRIMARY KEY (`USER_ID`, `ORDER_ID`),
  INDEX `fk_Users_has_ORDER_ITEMS_ORDER_ITEMS1_idx` (`ORDER_ID` ASC) VISIBLE,
  INDEX `fk_Users_has_ORDER_ITEMS_Users1_idx` (`USER_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Users_has_ORDER_ITEMS_Users1`
    FOREIGN KEY (`USER_ID`)
    REFERENCES `mydb`.`USERS` (`USER_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Users_has_ORDER_ITEMS_ORDER_ITEMS1`
    FOREIGN KEY (`ORDER_ID`)
    REFERENCES `mydb`.`ORDERS` (`ORDER_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`LOG`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`LOG` (
  `LOG_ITEM_ID` INT NOT NULL AUTO_INCREMENT,
  `DATETIME` DATETIME NOT NULL,
  `EVENT` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`LOG_ITEM_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`USER_LOGS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`USER_LOGS` (
  `USER_ID` INT NOT NULL,
  `LOG_ITEM_ID` INT NOT NULL,
  PRIMARY KEY (`USER_ID`, `LOG_ITEM_ID`),
  INDEX `fk_Users_has_LOG_LOG1_idx` (`LOG_ITEM_ID` ASC) VISIBLE,
  INDEX `fk_Users_has_LOG_Users1_idx` (`USER_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Users_has_LOG_Users1`
    FOREIGN KEY (`USER_ID`)
    REFERENCES `mydb`.`USERS` (`USER_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Users_has_LOG_LOG1`
    FOREIGN KEY (`LOG_ITEM_ID`)
    REFERENCES `mydb`.`LOG` (`LOG_ITEM_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`CART_ORDERS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`CART_ORDERS` (
  `CART_ID` INT NOT NULL,
  `ORDER_ID` INT NOT NULL,
  `COMPLETE` ENUM("Y", "N") NOT NULL,
  PRIMARY KEY (`CART_ID`, `ORDER_ID`),
  INDEX `fk_CART_has_ORDER_ORDER1_idx` (`ORDER_ID` ASC) VISIBLE,
  INDEX `fk_CART_has_ORDER_CART1_idx` (`CART_ID` ASC) VISIBLE,
  CONSTRAINT `fk_CART_has_ORDER_CART1`
    FOREIGN KEY (`CART_ID`)
    REFERENCES `mydb`.`CART` (`CART_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_CART_has_ORDER_ORDER1`
    FOREIGN KEY (`ORDER_ID`)
    REFERENCES `mydb`.`ORDERS` (`ORDER_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ORDERS_ITEMS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ORDERS_ITEMS` (
  `ORDER_ID` INT NOT NULL,
  `ITEM_ID` INT NOT NULL,
  `QUANTITY` SMALLINT NOT NULL,
  PRIMARY KEY (`ORDER_ID`, `ITEM_ID`),
  INDEX `fk_ORDERS_has_ITEMS_ITEMS1_idx` (`ITEM_ID` ASC) VISIBLE,
  INDEX `fk_ORDERS_has_ITEMS_ORDERS1_idx` (`ORDER_ID` ASC) VISIBLE,
  CONSTRAINT `fk_ORDERS_has_ITEMS_ORDERS1`
    FOREIGN KEY (`ORDER_ID`)
    REFERENCES `mydb`.`ORDERS` (`ORDER_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ORDERS_has_ITEMS_ITEMS1`
    FOREIGN KEY (`ITEM_ID`)
    REFERENCES `mydb`.`ITEMS` (`ITEM_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`USERS_CART`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`USERS_CART` (
  `USER_ID` INT NOT NULL,
  `CART_ID` INT NOT NULL,
  PRIMARY KEY (`USER_ID`, `CART_ID`),
  INDEX `fk_USERS_has_CART_CART1_idx` (`CART_ID` ASC) VISIBLE,
  INDEX `fk_USERS_has_CART_USERS1_idx` (`USER_ID` ASC) VISIBLE,
  CONSTRAINT `fk_USERS_has_CART_USERS1`
    FOREIGN KEY (`USER_ID`)
    REFERENCES `mydb`.`USERS` (`USER_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_USERS_has_CART_CART1`
    FOREIGN KEY (`CART_ID`)
    REFERENCES `mydb`.`CART` (`CART_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
