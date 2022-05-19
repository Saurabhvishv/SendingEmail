const websiteModel = require("../models/websiteModel")
const mongoose = require('mongoose')


const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const resisterWebsite = async function (req, res) {
    try {
        const requestBody = req.body

        let { WebsiteName } = requestBody;  //destructuring

        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'Please provide website details' })
        }

        //validation starts
        if (!isValid(WebsiteName)) {
            return res.status(400).send({ status: false, message: 'Please provide valid website name' })
        }

        const websiteData = { WebsiteName }

        let savedWebsite = await websiteModel.create(websiteData)
        res.status(201).send({ status: true, data: savedWebsite })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { resisterWebsite }