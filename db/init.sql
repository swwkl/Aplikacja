CREATE DATABASE IF NOT EXISTS todos_db;
USE todos_db;

CREATE TABLE users (
                       id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
                       email VARCHAR(255) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       register_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE todos (
                       id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
                       name VARCHAR(255) NOT NULL,
                       creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

