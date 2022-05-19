const adminModel = require("../models/adminModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const registerAdmin = async function (req, res) {
    try {
        const requestBody = req.body

        let { name, email, password } = requestBody;  //destructuring

        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide intern details' })
        }

        //validation starts
        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: 'Please provide valid name' })
        }
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: 'Please provide valid email' })
        }
        if (!(password.trim().length > 7 && password.trim().length < 16)) {
            return res.status(400).send({ status: false, message: ' Please provide given length password' })
        }
        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: 'Please provide valid password' })
        }

        const EncrypPassword = await bcrypt.hash(password, 10)
        const adminData = { name, email, password: EncrypPassword }

        let savedAdmin = await adminModel.create(adminData)
        console.log(adminData)
        res.status(201).send({ status: true, data: savedAdmin })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

// login
const loginAdmin = async function (req, res) {
    try {
        const requestBody = req.body

        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'request body is required' })
        }

        let email = req.body.email
        let password = req.body.password

        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: 'Please provide valid email' })
        }
        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: 'password must be present' })
        }

        //if (email && password) {

        let User = await adminModel.findOne({ email: email })

        if (!User) {
            return res.status(400).send({ status: false, msg: "user does not exist" })
        }

        let decryppasss = await bcrypt.compare(password, User.password);
        if (decryppasss) {
            const token = await jwt.sign({ userId: User._id }, 'saurabh', {
                expiresIn: "3h"
            })
            res.header('x-api-key', token);

            res.status(200).send({ status: true, msg: "User login successfull", data: { userId: User._id, Token: token } })
        } else {
            res.status(400).send({ status: false, Msg: "Invalid password write correct password" })
        }
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}



module.exports = { registerAdmin, loginAdmin }

