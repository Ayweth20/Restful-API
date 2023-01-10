const Sequelize = require("sequelize");

//const DB_URL = process.env.DB_URL || "mysql://root:@localhost:3306/db_restful";
const DB_URL_DOCKER = process.env.DB_URL || "mysql://root:root@db:3306/db_restful";
const database = new Sequelize(DB_URL_DOCKER);
database.authenticate().then(() => console.log("Connected to DB"));

module.exports = database;
