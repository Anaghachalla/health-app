const mongoose = require('mongoose')
const validation = require('validator')
const bcrypt = require('bcryptjs')


const addressSchema = mongoose.Schema({
    Area: String,
    City: String,
    Pincode: Number
})

const doctorSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    username:{
        type: String,
        minLength: 5,
        required : true,
        immutable: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true, 
        validate : {
            validator : async (value)=> { return await validation.isEmail(value) },
            message: "Invalid email"
        }
    },
    password:{
        type:String,
        required: true,
        validate : {
            validator: (value)=>{
               return (/[a-z]/.test(value) && /[A-Z]/.test(value) && /[0-9]/.test(value) && !/\s/.test(value) && /\W/.test(value))
            },
            message: "Invalid password"
        }
    },
    // age: {
    //     type: Number,
    //     min: 18,
    //     max: 30,
    // },
    phone: String,
    specialization: {
        type: String,
        required: 'Specialization not specified'
    },
    qualifications: {
        type: [String],
        required: 'Qualifications not specified'
    },
    address: addressSchema,
    createdAt: {
        type: Date,
        default: new Date(),
        immutable: true 
    }
})

doctorSchema.pre('save', function(next) {
    //password hashing
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    //qualifications string
    next()
});


module.exports = mongoose.model('doctors', doctorSchema, 'doctors')