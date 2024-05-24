CREATE DATABASE STE;

USE STE;

CREATE TABLE USUARIO (
    ID INT(4) AUTO_INCREMENT,
    NOME VARCHAR(30) NOT NULL,
    EMAIL VARCHAR(50) NOT NULL,
    PASSWORD VARCHAR(30) NOT NULL,
    DTCADAST TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (ID)
);

CREATE TABLE TASK (
    ID INT(4) AUTO_INCREMENT,
    TITULO VARCHAR(100) NOT NULL,
    DESCRI VARCHAR(1000),
    DTCRIA TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    DTINI DATE,
    DTFIM DATE,
    PRIMARY KEY (ID)
); 