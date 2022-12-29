CREATE DATABASE IF NOT EXISTS db_restful;

USE db_restful;

CREATE TABLE airports (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL
);

CREATE TABLE flights (
    id INT PRIMARY KEY AUTO_INCREMENT,
    airline VARCHAR(255) NOT NULL,
    dateStart DATETIME NOT NULL,
    dateEnd DATETIME NOT NULL,
    origin VARCHAR(255) NOT NULL,
    arrival VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    capacity INT NOT NULL,
    FOREIGN KEY (origin) REFERENCES airports(code),
    FOREIGN KEY (arrival) REFERENCES airports(code)
);

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    dateOfBirth DATE NOT NULL,
    passportNumber VARCHAR(255) NOT NULL,
    passportCountry VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL
);

CREATE TABLE bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    flightID INT NOT NULL,
    userId INT NOT NULL,
    seatNumber VARCHAR(3) NOT NULL,
    status VARCHAR(255) NOT NULL,
    dateBooked DATE NOT NULL,
    FOREIGN KEY (flightID) REFERENCES flights(id),
    FOREIGN KEY (userId) REFERENCES users(id)
);
