const Sequelize = require("sequelize");

const DB_URL = process.env.DB_URL || "mysql://root:@localhost:3306/db_restful";
const database = new Sequelize(DB_URL);
database.authenticate().then(() => console.log("Connected to DB"));

module.exports = database;
