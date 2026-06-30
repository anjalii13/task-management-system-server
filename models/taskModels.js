const { DataTypes } = require("sequelize")
const { sequelize } = require("../config/db")


const Task = sequelize.define("Task", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false

    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("Pending", "In-Progress", "Completed"),
        allowNull: false,
        defaultValue: "Pending"
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false

    },
}, { timeStamp: true, tableName: "task" })

module.exports = Task