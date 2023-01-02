const { Model, DataTypes } = require("sequelize");
const database = require("./database");
const bcrypt = require("bcryptjs");

class User extends Model {}

User.init({
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
    name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // At least 8 caracters, 1 uppercase, 1 lowercase, 1 number, 1 special character
            is: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=(?:.*[!@#$%^&*()\-_=+{};:,<.>])).{7,})\S$/
        }
    },
    dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,
        }
    },
    passportNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // 3 uppercase letters and 7 numbers
            is: /^[A-Z]{3}[0-9]{7}$/
        }
    },
    passportCountry: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // 3 uppercase letters
            is: /^[A-Z]{3}$/
        }
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "passenger",
        validate: {
            isIn: [["admin", "pilot" , "passenger"]]
        }
    }
}, {
    sequelize: database,
    timestamps: false,
});

User.addHook("beforeCreate", async (user) => {
    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());
});

User.addHook("beforeUpdate", async (user, {fields}) => {
    if(fields.includes("password")) {
        user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());
    }
});

module.exports = User;