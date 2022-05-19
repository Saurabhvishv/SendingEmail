const mongoose = require('mongoose')
const websiteSchema = new mongoose.Schema({

    WebsiteName: {
        type: String,
        required: true, 
        unique: true
    }

    },{ timestamps: true })

module.exports = mongoose.model('website', websiteSchema)