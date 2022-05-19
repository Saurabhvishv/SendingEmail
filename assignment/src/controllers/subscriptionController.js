const mongoose = require('mongoose')
const subcriptionModel = require('../models/subscriptionModel')

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}
const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const subscribeEmail = async function (req, res) {
    try {
        const requestBody = req.body
        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'Please provide intern details' })
        }
        let { email } = requestBody;  //destructuring


        let WebsiteId = requestBody.WebsiteId

        if (!isValid(WebsiteId)) {
            res.status(400).send({ status: false, message: 'website id is required' })
            return
        }
        if (!isValidObjectId(WebsiteId)) {
            res.status(400).send({ status: false, message: `${WebsiteId} is not a valid user id` })
            return
        }
        let savedWebsite = await subcriptionModel.create(requestBody)
        res.status(201).send({ status: true, data: savedWebsite })
    }

    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { subscribeEmail }