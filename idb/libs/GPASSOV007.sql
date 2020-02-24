-- MySQL Script generated by MySQL Workbench
-- Sun Feb  2 21:29:57 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema default_schema
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `default_schema` ;

-- -----------------------------------------------------
-- Schema default_schema
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `default_schema` ;
-- -----------------------------------------------------
-- Schema GPASSO
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `GPASSO` ;

-- -----------------------------------------------------
-- Schema GPASSO
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `GPASSO` DEFAULT CHARACTER SET ascii COLLATE ascii_bin ;
USE `default_schema` ;
USE `GPASSO` ;

-- -----------------------------------------------------
-- Table `GPASSO`.`TASK007MT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `GPASSO`.`TASK007MT` ;

CREATE TABLE IF NOT EXISTS `GPASSO`.`TASK007MT` (
  `_ID` INT NOT NULL,
  `MKR_ID` INT NULL DEFAULT NULL,
  `DT_CREATED` DATETIME NULL DEFAULT NULL,
  `ATH_ID` INT NULL DEFAULT NULL,
  `DT_MODIFIED` DATETIME NULL DEFAULT NULL,
  `METHOD` VARCHAR(45) NULL DEFAULT NULL,
  `AUTH_REQ` VARCHAR(45) NULL DEFAULT NULL,
  `TASK` VARCHAR(45) NULL DEFAULT NULL,
  `REQ_SJSON` BLOB NULL DEFAULT NULL,
  `RES_SJSON` BLOB NULL DEFAULT NULL,
  `ENTTL` INT NULL,
  PRIMARY KEY (`_ID`));


-- -----------------------------------------------------
-- Table `GPASSO`.`SRVS006MT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `GPASSO`.`SRVS006MT` ;

CREATE TABLE IF NOT EXISTS `GPASSO`.`SRVS006MT` (
  `_ID` INT NOT NULL,
  `MKR_ID` INT NULL DEFAULT NULL,
  `DT_CREATED` DATETIME NULL DEFAULT NULL,
  `ATH_ID` INT NULL DEFAULT NULL,
  `DT_MODIFIED` DATETIME NULL DEFAULT NULL,
  `SERVICE_NAME` VARCHAR(45) NULL DEFAULT NULL,
  `METHOD` VARCHAR(45) NULL DEFAULT NULL,
  `AUTH_REQD` VARCHAR(45) NULL DEFAULT NULL,
  `TASK_IDS` INT(11) NULL DEFAULT NULL,
  `ENTTL` INT NULL,
  PRIMARY KEY (`_ID`),
  CONSTRAINT `RK_TASK007MT_TASK_IDS`
    FOREIGN KEY (`TASK_IDS`)
    REFERENCES `GPASSO`.`TASK007MT` (`_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE INDEX `RK_TASK007MT__idx` ON `GPASSO`.`SRVS006MT` (`TASK_IDS` ASC);


-- -----------------------------------------------------
-- Table `GPASSO`.`PAGE005MT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `GPASSO`.`PAGE005MT` ;

CREATE TABLE IF NOT EXISTS `GPASSO`.`PAGE005MT` (
  `_ID` INT NOT NULL,
  `MKR_ID` INT NULL DEFAULT NULL,
  `DT_CREATED` DATETIME NULL DEFAULT NULL,
  `ATH_ID` INT NULL DEFAULT NULL,
  `DT_MODIFIED` DATETIME NULL DEFAULT NULL,
  `PAGE_KEY` VARCHAR(60) NULL DEFAULT NULL,
  `PAGE_TITLE` VARCHAR(45) NULL DEFAULT NULL,
  `DISP_ORDER` INT NULL DEFAULT NULL,
  `SERVICE_IDS` INT(11) NULL,
  `ENTTL` INT NULL,
  PRIMARY KEY (`_ID`),
  CONSTRAINT `RK_SRVS006MT_SERVICE_IDS`
    FOREIGN KEY ()
    REFERENCES `GPASSO`.`SRVS006MT` ()
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `GPASSO`.`PGGR004MT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `GPASSO`.`PGGR004MT` ;

CREATE TABLE IF NOT EXISTS `GPASSO`.`PGGR004MT` (
  `_ID` INT(10) NOT NULL,
  `MKR_ID` INT(10) NULL DEFAULT NULL,
  `DT_CREATED` DATETIME NULL DEFAULT NULL,
  `ATH_ID` INT(10) NULL DEFAULT NULL,
  `DT_MODIFIED` DATETIME NULL DEFAULT NULL,
  `PAGE_GRP_KEY` VARCHAR(45) NULL DEFAULT NULL,
  `PAGE_GRP_TITLE` VARCHAR(45) NULL DEFAULT NULL,
  `DISP_ORDER` INT NULL DEFAULT NULL,
  `PAGE_IDS` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`_ID`),
  CONSTRAINT `RK_PAGE005MT_PAGE_IDS`
    FOREIGN KEY (`PAGE_IDS`)
    REFERENCES `GPASSO`.`PAGE005MT` (`_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE INDEX `RF_PAGE005MT_PAGE_IDS_idx` ON `GPASSO`.`PGGR004MT` (`PAGE_IDS` ASC);

CREATE INDEX `RK_PAGE005MT_PAGE_IDS` ON `GPASSO`.`PGGR004MT` (`PAGE_IDS` ASC);

CREATE INDEX `RK_PAGE005MT_PAGE_IDS` ON `GPASSO`.`PGGR004MT` (`PAGE_IDS` ASC);


-- -----------------------------------------------------
-- Table `GPASSO`.`SSID003MT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `GPASSO`.`SSID003MT` ;

CREATE TABLE IF NOT EXISTS `GPASSO`.`SSID003MT` (
  `_ID` INT(10) NOT NULL,
  `MKR_ID` INT(10) NULL DEFAULT NULL,
  `DT_CREATED` DATETIME NULL DEFAULT NULL,
  `ATH_ID` INT(10) NULL DEFAULT NULL,
  `DT_MODIFIED` DATETIME NULL DEFAULT NULL,
  `FIRST_NAME` VARCHAR(45) NULL DEFAULT NULL,
  `LAST_NAME` VARCHAR(45) NULL DEFAULT NULL,
  `MIDDLE_NAME` VARCHAR(45) NULL DEFAULT NULL,
  `USERNAME` VARCHAR(45) NULL DEFAULT NULL COMMENT '	',
  `PASSWORD` VARCHAR(45) NULL DEFAULT NULL,
  `KEY_ALIAS` VARCHAR(45) NULL DEFAULT NULL,
  `EMP_ID` VARCHAR(45) NULL DEFAULT NULL COMMENT '	',
  `USER_TYPE` VARCHAR(45) NULL DEFAULT NULL,
  `USER_ROLE` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`_ID`));


-- -----------------------------------------------------
-- Table `GPASSO`.`ROLE003MT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `GPASSO`.`ROLE003MT` ;

CREATE TABLE IF NOT EXISTS `GPASSO`.`ROLE003MT` (
  `_ID` INT NOT NULL,
  `MKR_ID` INT(10) NULL DEFAULT NULL,
  `DT_CREATED` DATETIME NULL DEFAULT NULL,
  `ATH_ID` INT(10) NULL DEFAULT NULL,
  `DT_MODIFIED` DATETIME NULL DEFAULT NULL,
  `ROLE_NAME` VARCHAR(45) NULL DEFAULT NULL,
  `STATUS` VARCHAR(45) NULL DEFAULT NULL,
  `ROLE_VALUE` INT NULL DEFAULT NULL,
  `PAGE_GRP_IDS` INT(11) NULL DEFAULT NULL,
  `USR_IDS` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`_ID`),
  CONSTRAINT `RK_PGGR004MB_PAGE_GRP_IDS`
    FOREIGN KEY (`PAGE_GRP_IDS`)
    REFERENCES `GPASSO`.`PGGR004MT` (`_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `RK_ROLE003MT_USR_IDS`
    FOREIGN KEY (`USR_IDS`)
    REFERENCES `GPASSO`.`SSID003MT` (`_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE INDEX `RK_PGGR004MB_PAGE_GRP_IDS_idx` ON `GPASSO`.`ROLE003MT` (`PAGE_GRP_IDS` ASC);

CREATE INDEX `RK_ROLE003MT_USR_IDS_idx` ON `GPASSO`.`ROLE003MT` (`USR_IDS` ASC);

CREATE INDEX `RK_PGGR004MB_PAGE_GRP_IDS` ON `GPASSO`.`ROLE003MT` (`PAGE_GRP_IDS` ASC);

CREATE INDEX `RK_ROLE003MT_USR_IDS` ON `GPASSO`.`ROLE003MT` (`USR_IDS` ASC);

CREATE INDEX `RK_PGGR004MB_PAGE_GRP_IDS` ON `GPASSO`.`ROLE003MT` (`PAGE_GRP_IDS` ASC);

CREATE INDEX `RK_ROLE003MT_USR_IDS` ON `GPASSO`.`ROLE003MT` (`USR_IDS` ASC);


-- -----------------------------------------------------
-- Table `GPASSO`.`PRTL002MT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `GPASSO`.`PRTL002MT` ;

CREATE TABLE IF NOT EXISTS `GPASSO`.`PRTL002MT` (
  `_ID` INT(10) NOT NULL,
  `MKR_ID` INT NULL DEFAULT NULL,
  `DT_CREATED` DATETIME NULL DEFAULT NULL,
  `ATH_ID` INT NULL DEFAULT NULL,
  `DT_MODIFIED` DATETIME NULL DEFAULT NULL,
  `PRTL_NAME` VARCHAR(45) NULL DEFAULT NULL,
  `PRTL_VERSION` VARCHAR(45) NULL DEFAULT NULL,
  `BASE_PATH` VARCHAR(45) NULL DEFAULT NULL,
  `ROLE_IDS` INT(11) NULL DEFAULT NULL,
  `PAGE_GRP_IDS` INT(11) NULL DEFAULT NULL,
  `HOSTS` INT(11) NULL,
  PRIMARY KEY (`_ID`),
  CONSTRAINT `RK_ROLE003MT_ROLE_IDS`
    FOREIGN KEY (`ROLE_IDS`)
    REFERENCES `GPASSO`.`ROLE003MT` (`_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `RK_PGGR004MB_PAGE_GPR_IDS`
    FOREIGN KEY (`PAGE_GRP_IDS`)
    REFERENCES `GPASSO`.`PGGR004MT` (`_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE INDEX `RK_ROLE003MT_ROLE_IDS_idx` ON `GPASSO`.`PRTL002MT` (`ROLE_IDS` ASC);

CREATE INDEX `RK_PGGR004MB_PAGE_GPR_IDS_idx` ON `GPASSO`.`PRTL002MT` (`PAGE_GRP_IDS` ASC);

CREATE INDEX `RK_ROLE003MT_ROLE_IDS` ON `GPASSO`.`PRTL002MT` (`ROLE_IDS` ASC);

CREATE INDEX `RK_PGGR004MB_PAGE_GPR_IDS` ON `GPASSO`.`PRTL002MT` (`PAGE_GRP_IDS` ASC);

CREATE INDEX `RK_ROLE003MT_ROLE_IDS` ON `GPASSO`.`PRTL002MT` (`ROLE_IDS` ASC);

CREATE INDEX `RK_PGGR004MB_PAGE_GPR_IDS` ON `GPASSO`.`PRTL002MT` (`PAGE_GRP_IDS` ASC);


-- -----------------------------------------------------
-- Table `GPASSO`.`PROD001MT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `GPASSO`.`PROD001MT` ;

CREATE TABLE IF NOT EXISTS `GPASSO`.`PROD001MT` (
  `_ID` INT(10) NOT NULL,
  `MKR_ID` INT(10) NULL DEFAULT NULL,
  `DT_CREATED` DATETIME NULL DEFAULT NULL,
  `ATH_ID` INT NULL DEFAULT NULL,
  `DT_MODIFIED` DATETIME NULL DEFAULT NULL,
  `PROD_NAME` VARCHAR(45) NULL DEFAULT NULL,
  `PROD_VERSION` VARCHAR(45) NULL DEFAULT NULL,
  `PRTL_IDS` INT(11) NULL DEFAULT NULL,
  `USR_IDS` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`_ID`),
  CONSTRAINT `RK_PRTL002MT_PRTL_IDS`
    FOREIGN KEY (`PRTL_IDS`)
    REFERENCES `GPASSO`.`PRTL002MT` (`_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `RK_SSID003MT_USR_IDS`
    FOREIGN KEY (`USR_IDS`)
    REFERENCES `GPASSO`.`SSID003MT` (`_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE INDEX `RK_PRTL002MT_PRTL_IDS_idx` ON `GPASSO`.`PROD001MT` (`PRTL_IDS` ASC);

CREATE INDEX `RK_SSID003MT_USR_IDS_idx` ON `GPASSO`.`PROD001MT` (`USR_IDS` ASC);

CREATE INDEX `RK_PRTL002MT_PRTL_IDS` ON `GPASSO`.`PROD001MT` (`PRTL_IDS` ASC);

CREATE INDEX `RK_SSID003MT_USR_IDS` ON `GPASSO`.`PROD001MT` (`USR_IDS` ASC);

CREATE INDEX `RK_PRTL002MT_PRTL_IDS` ON `GPASSO`.`PROD001MT` (`PRTL_IDS` ASC);

CREATE INDEX `RK_SSID003MT_USR_IDS` ON `GPASSO`.`PROD001MT` (`USR_IDS` ASC);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
