const mongoose = require('mongoose')

const feedbackSchema = mongoose.Schema({
    username: 
    {
        type: String,
        required: true
    },
    user_type: 
    {
        type: String,
        required: true
    },
    ratings: 
    {
        type: Number,
        required: true
    },
    suggessions: 
    {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: new Date(),
        immutable: true
    }
})

module.exports = mongoose.model('feedbacks', feedbackSchema, 'feedbacks')