const mongoose = require('mongoose')

const appointmentSchema = mongoose.Schema({
    patient_username: 
    {
        type: String,
        required: true
    },
    patient_name:{
        type: String,
        required: true
    },
    doctor_username: 
    {
        type: String,
        required: true
    },
    doctor_name : {
        type:String,
        required: true
    },
    time: 
    {
        type: Date,
        immutable: true
    },
    problem: 
    {
        type: String,
        required: true
    },
    files:
    {
        type: [String]
    },
    createdAt:{
        type: Date,
        default: new Date(),
        immutable: true
    }
})

module.exports = mongoose.model('appointments', appointmentSchema, 'appointments')