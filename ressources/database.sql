CREATE DATABASE IF NOT EXISTS db_restful;

USE db_restful;

CREATE TABLE airports (
    airportId INT PRIMARY KEY AUTO_INCREMENT,
    airportName VARCHAR(255) NOT NULL,
    airportCode VARCHAR(255) NOT NULL,
    airportCity VARCHAR(255) NOT NULL,
    airportCountry VARCHAR(255) NOT NULL
);

CREATE TABLE flights (
    flightID INT PRIMARY KEY AUTO_INCREMENT,
    airline VARCHAR(255) NOT NULL,
    dateStart DATE NOT NULL,
    dateEnd DATE NOT NULL,
    origin VARCHAR(255) NOT NULL,
    arrival VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    capacity INT NOT NULL,
    FOREIGN KEY (origin) REFERENCES airports(airportCode),
    FOREIGN KEY (arrival) REFERENCES airports(airportCode)
);

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    dateOfBirth DATE NOT NULL,
    passportNumber VARCHAR(255) NOT NULL,
    passportCountry VARCHAR(255) NOT NULL,
    Role VARCHAR(255) NOT NULL
);

CREATE TABLE bookings (
    bookingId INT PRIMARY KEY AUTO_INCREMENT,
    flightID INT NOT NULL,
    userId INT NOT NULL,
    seatNumber INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    dateBooked DATE NOT NULL,
    FOREIGN KEY (flightID) REFERENCES flights(flightID),
    FOREIGN KEY (userId) REFERENCES users(id)
);