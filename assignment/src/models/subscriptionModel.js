const mongoose = require('mongoose')
const subscriptionSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true 
    },
    WebsiteId : {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true,
        unique:true
    }

    },{ timestamps: true })

module.exports = mongoose.model('subscription', subscriptionSchema)