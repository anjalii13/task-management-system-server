const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        contactnumber: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [10, 15],
            },
        },

        roleofuser: {
            type: DataTypes.ENUM("admin", "user"),
            allowNull: false,
            defaultValue: "user",
        },
    },
    {
        timestamps: true,
        tableName: "user",
    }
);

module.exports = User;