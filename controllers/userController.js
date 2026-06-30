const { sequelize } = require("../config/db")
const User = require("../models/userModels")
const bcryptjs = require('bcryptjs')
const { Op, where } = require("sequelize");
const jwt = require("jsonwebtoken")
require("dotenv").config()

const register = async (req, res) => {
    let { username, email, password, contactnumber } = req.body
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(401).send({ msg: 'User Already Exist', success: false })
        }
        const salt = bcryptjs.genSaltSync(8)
        password = bcryptjs.hashSync(password, salt)
        const newUser = await User.create({ username, email, password, contactnumber })
        return res.status(201).send({ msg: 'Succesfully Registered', success: true })
    }
    catch (error) {
        res.status(500).send({ msg: "Server Error", success: false })
    }
}
const login = async (req, res) => {
    let { email, password } = req.body
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (!existingUser) {
            return res.status(401).send({ msg: 'User Not Found', success: false })
        }
        isPassCorrect = await bcryptjs.compare(password, existingUser.password)
        if (!isPassCorrect) {
            return res.status(401).send({ msg: "INVALID PASSWORD", success: false })
        }
        const id = existingUser.id
        const role = existingUser.roleofuser
        const token = jwt.sign({ id: id, role: role }, process.env.SECRET_KEY, { expiresIn: "2h" })
        return res.status(200).send({
            msg: "Logged In successfully",
            success: true,
            token,
            user: {
                id: existingUser.id,
                username: existingUser.username,
                email: existingUser.email,
                role: existingUser.roleofuser
            }
        });
    }
    catch (error) {
        res.status(500).send({ msg: "Server Error", success: false })
    }
}
const getUserInfo = async (req, res) => {
    try {
        console.log("************")
        const loggedUser = await User.findByPk(req.user.id, {
            attributes:
            {
                exclude: ["password", "createdAt", "updatedAt"]
            }
        })
        res.status(200).send({ loggedUser: loggedUser, success: true })
    }
    catch (error) {
        res.status(500).send({ msg: "Server Error", success: false })

    }

}
async function updateProfile(req, res) {
    try {

    }
    catch (error) {
        res.status(500).send({ msg: "Server Error", success: false })

    }

}


module.exports = {
    register,
    login,
    getUserInfo,
    updateProfile
}