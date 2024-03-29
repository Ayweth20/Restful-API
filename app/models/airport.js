const { Model, DataTypes } = require("sequelize");
const database = require("./database");

class Airport extends Model {}

Airport.init({
    /*
    //The id is automatically generated by the database, so it's not necessary to create it
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        validate: {
            primaryKey: true,
            autoIncrement: true
        }
    },
    */
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            // Letters, spaces and symbol -
            is: /^[A-z- ]{4,50}$/
        }
    },
    code: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            // 3 uppercase letters and 3 numbers
            is: /^[A-Z]{3}[0-9]{3}$/
        }
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // Letters, spaces and symbol -
            is: /^[A-z- ]{3,100}$/
        }
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // Letters, spaces and symbol -
            is: /^[A-z- ]{3,100}$/
        }
    }
}, {
    tableName: "airports",
    sequelize: database,
    timestamps: false,
});

module.exports = Airport;