const { Sequelize } = require("sequelize")
require('dotenv').config()
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql'

    }
)
async function connectDB() {
    try {
        await sequelize.authenticate()
        console.log("database connected succesfully")
        await sequelize.sync()
        console.log("Models synchronized succesfully")
    }
    catch (error) {
        console.log("Database connection error", error)
    }
}

connectDB()
module.exports={sequelize}