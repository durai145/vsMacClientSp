-- MySQL Script generated by MySQL Workbench
-- Sun Dec 25 16:06:08 2016
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema GPASSO
-- -----------------------------------------------------
-- Global Product Admin Single Sign On
-- 
DROP SCHEMA IF EXISTS `GPASSO` ;

-- -----------------------------------------------------
-- Schema GPASSO
--
-- Global Product Admin Single Sign On
-- 
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `GPASSO` DEFAULT CHARACTER SET ascii COLLATE ascii_bin ;
USE `GPASSO` ;

-- -----------------------------------------------------
-- Table `GPASSO`.`PAGE005MT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `GPASSO`.`PAGE005MT` ;

CREATE TABLE IF NOT EXISTS `GPASSO`.`PAGE005MT` (
  `_ID` INT NOT NULL,
  `MKR_ID` INT NULL,
  `DT_CREATED` DATETIME NULL,
  `ATH_ID` INT NULL,
  `DT_MODIFIED` DATETIME NULL,
  `PAGE_KEY` VARCHAR(60) NULL,
  `PAGE_TITLE` VARCHAR(45) NULL,
  `DISP_ORDER` INT NULL,
  PRIMARY KEY (`_ID`));


-- -----------------------------------------------------
-- Table `GPASSO`.`PGGR004MT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `GPASSO`.`PGGR004MT` ;

CREATE TABLE IF NOT EXISTS `GPASSO`.`PGGR004MT` (
  `_ID` INT(10) NOT NULL,
  `MKR_ID` INT(10) NULL,
  `DT_CREATED` DATETIME NULL,
  `ATH_ID` INT(10) NULL,
  `DT_MODIFIED` DATETIME NULL,
  `PAGE_GRP_KEY` VARCHAR(45) NULL,
  `PAGE_GRP_TITLE` VARCHAR(45) NULL,
  `DISP_ORDER` INT NULL,
  `PAGE_IDS` INT(11) NULL,
  PRIMARY KEY (`_ID`),
  CONSTRAINT `RK_PAGE005MT_PAGE_IDS`
    FOREIGN KEY (`PAGE_IDS`)
    REFERENCES `GPASSO`.`PAGE005MT` (`_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE INDEX `RF_PAGE005MT_PAGE_IDS_idx` ON `GPASSO`.`PGGR004MT` (`PAGE_IDS` ASC);


-- -----------------------------------------------------
-- Table `GPASSO`.`SSID003MT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `GPASSO`.`SSID003MT` ;

CREATE TABLE IF NOT EXISTS `GPASSO`.`SSID003MT` (
  `_ID` INT(10) NOT NULL,
  `MKR_ID` INT(10) NULL,
  `DT_CREATED` DATETIME NULL,
  `ATH_ID` INT(10) NULL,
  `DT_MODIFIED` DATETIME NULL,
  `FIRST_NANE` VARCHAR(45) NULL,
  `LAST_NAME` VARCHAR(45) NULL,
  `MIDDLE_NAME` VARCHAR(45) NULL,
  `USERNAME` VARCHAR(45) NULL COMMENT '	',
  `PASSWORD` VARCHAR(45) NULL,
  `EMP_ID` VARCHAR(45) NULL COMMENT '	',
  `USER_TYPE` VARCHAR(45) NULL,
  `USER_ROLE` VARCHAR(45) NULL,
  PRIMARY KEY (`_ID`));


-- -----------------------------------------------------
-- Table `GPASSO`.`ROLE003MT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `GPASSO`.`ROLE003MT` ;

CREATE TABLE IF NOT EXISTS `GPASSO`.`ROLE003MT` (
  `_ID` INT NOT NULL,
  `MKR_ID` INT(10) NULL,
  `DT_CREATED` DATETIME NULL,
  `ATH_ID` INT(10) NULL,
  `DT_MODIFIED` DATETIME NULL,
  `ROLE_NAME` VARCHAR(45) NULL,
  `STATUS` VARCHAR(45) NULL,
  `ROLE_VALUE` INT NULL,
  `PAGE_GRP_IDS` INT(11) NULL,
  `USR_IDS` INT(11) NULL,
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


-- -----------------------------------------------------
-- Table `GPASSO`.`PRTL002MT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `GPASSO`.`PRTL002MT` ;

CREATE TABLE IF NOT EXISTS `GPASSO`.`PRTL002MT` (
  `_ID` INT(10) NOT NULL,
  `MKR_ID` INT NULL,
  `DT_CREATED` DATETIME NULL,
  `ATH_ID` INT NULL,
  `DT_MODIFIED` DATETIME NULL,
  `PRTL_NAME` VARCHAR(45) NULL,
  `PRTL_VERSION` VARCHAR(45) NULL,
  `BASE_PATH` VARCHAR(45) NULL,
  `ROLE_IDS` INT(11) NULL,
  `PAGE_GRP_IDS` INT(11) NULL,
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


-- -----------------------------------------------------
-- Table `GPASSO`.`PROD001MT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `GPASSO`.`PROD001MT` ;

CREATE TABLE IF NOT EXISTS `GPASSO`.`PROD001MT` (
  `_ID` INT(10) NOT NULL,
  `MKR_ID` INT(10) NULL,
  `DT_CREATED` DATETIME NULL,
  `ATH_ID` INT NULL,
  `DT_MODIFIED` DATETIME NULL,
  `PROD_NAME` VARCHAR(45) NULL,
  `PROD_VERSION` VARCHAR(45) NULL,
  `PRTL_IDS` INT(11) NULL,
  `USR_IDS` INT(11) NULL,
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


-- -----------------------------------------------------
-- Table `GPASSO`.`mongoTables`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `GPASSO`.`SRVS006MT` ;

CREATE TABLE IF NOT EXISTS `GPASSO`.`SRVS006MT` (
  `_ID` INT NOT NULL,
  `MKR_ID` INT NULL,
  `DT_CREATED` DATETIME NULL,
  `ATH_ID` INT NULL,
  `DT_MODIFIED` DATETIME NULL,
  `SERVICE` VARCHAR(45) NULL,
  `METHOD` VARCHAR(45) NULL,
  `AUTH_REQD` VARCHAR(45) NULL,
  PRIMARY KEY (`_ID`));


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
