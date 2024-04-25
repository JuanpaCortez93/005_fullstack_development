CREATE DATABASE IF NOT EXISTS company;
SHOW DATABASES;

USE company;

CREATE TABLE employees (

    id SERIAL,
    name VARCHAR(50) NOT NULL,
    salary DECIMAL(10,2) NOT NULL DEFAULT(450),
    PRIMARY KEY (id)

);

DESCRIBE employees;
SHOW TABLES;
DESCRIBE employees;

INSERT INTO employees (name, salary) VALUES 
('Joe', 1000),
('Henry', 2000),
('Sam', 2500),
('Max', 1500);