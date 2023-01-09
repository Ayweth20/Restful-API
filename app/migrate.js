const { database } = require("./models");

database.query("CREATE TABLE IF NOT EXISTS airports (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL UNIQUE, code VARCHAR(255) NOT NULL UNIQUE, city VARCHAR(255) NOT NULL, country VARCHAR(255) NOT NULL);")
.then(() => console.log("Created table airports"))
.then(() => database.query("CREATE TABLE IF NOT EXISTS flights (id INT PRIMARY KEY AUTO_INCREMENT, airline VARCHAR(255) NOT NULL, dateStart DATETIME NOT NULL, dateEnd DATETIME NOT NULL, origin VARCHAR(255) NOT NULL, arrival VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, capacity INT NOT NULL, FOREIGN KEY (origin) REFERENCES airports(code), FOREIGN KEY (arrival) REFERENCES airports(code));"))
.then(() => console.log("Created table flights"))
.then(() => database.query("CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, dateOfBirth DATE NOT NULL, passportNumber VARCHAR(255) NOT NULL UNIQUE, passportCountry VARCHAR(255) NOT NULL, role VARCHAR(255) NOT NULL);"))
.then(() => console.log("Created table users"))
.then(() => database.query("CREATE TABLE IF NOT EXISTS bookings (id INT PRIMARY KEY AUTO_INCREMENT, flightID INT NOT NULL, userId INT NOT NULL, seatNumber VARCHAR(3) NOT NULL, status VARCHAR(255) NOT NULL, dateBooked DATE NOT NULL, FOREIGN KEY (flightID) REFERENCES flights(id), FOREIGN KEY (userId) REFERENCES users(id));"))
.then(() => console.log("Created table bookings"))
.then(() => console.log("All tables created. DB is ready"))
.then(() => database.close());