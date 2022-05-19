const articlesModel = require("../models/articlesModel")
const adminModel = require('../models/adminModel')
const subcriptionModel = require('../models/subscriptionModel')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}
const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

const registerTitle = async function (req, res) {
    try {
        let decodedAdminToken = req.admins;
        //console.log(decodedAdminToken)
        const requestBody = req.body;
        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'Please provide intern details' })
        }
        const admin = await adminModel.find()

        console.log(admin)
        if (!(decodedAdminToken === admin._id)) {
            return res.status(400).send({ status: false, message: "token id or admin id not matched" });
        }

        let { Title, Description, WebsiteId } = requestBody

        if (!isValid(Title)) {
            res.status(400).send({ status: false, message: 'Title is required' })
            return
        }
        if (!isValid(Description)) {
            res.status(400).send({ status: false, message: 'Description is required' })
            return
        }
        if (!isValid(WebsiteId)) {
            res.status(400).send({ status: false, message: 'WebsiteId is required' })
            return
        }
        if (!isValidObjectId(WebsiteId)) {
            res.status(400).send({ status: false, message: `${WebsiteId} is not a valid user id` })
            return
        }


        const articleDetails = await articlesModel.find({ WebsiteId }).select({ "Title": 1, "Description": 1, "_id": 0 })


        // fetch the email list from the database
        const emailList = await subcriptionModel.find({ WebsiteId }).select({ "email": 1, "_id": 0 })

        var result = [];
        emailList.forEach((e) => {
            result.push(`${e.email}`);
        });
         //console.log(result)

        /// sending mail to subscribers
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "felicia.mills16@ethereal.email", // generated ethereal user
                pass: "epy2EnYJkr7hjdSSsH", // generated ethereal password
            },
        });
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '<saurabh@gmail.com>', // sender address
            to: result, // list of receivers
            subject: "Updated in Website ✔", // Subject line
            text: `${"Title", Title},${"Description", Description}`, // plain text body
            html: `${"Title", Title},${"Description", Description}`, // html body
        });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // end sending email logics


        //const Titles = { Title, Description, WebsiteId }

        let savedTitle = await articlesModel.create(requestBody)
        res.status(201).send({ status: true, data: savedTitle, articleDetails, result })



    } catch (e) {
        res.status(500).send(e.message);
    }
}

module.exports = { registerTitle }