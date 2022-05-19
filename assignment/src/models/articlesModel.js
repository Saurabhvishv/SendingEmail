const mongoose = require('mongoose')
const articleSchema = new mongoose.Schema({

    Title: {
        type: String,
        required: true, 
        unique: true
    },
    Description: {
        type: String,
        required: true, 
        unique: true
    },
    WebsiteId : {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    }
    },{ timestamps: true })

module.exports = mongoose.model('articles', articleSchema)