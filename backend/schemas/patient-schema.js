const mongoose = require('mongoose')
const validation = require('validator')
const bcrypt = require('bcryptjs')


const addressSchema = mongoose.Schema({
    Area: String,
    City: String,
    Pincode: Number
})

const patientSchema = mongoose.Schema({
    name : {
        type: String,
        required: 'Name is missing'
    },
    username:{
        type: String,
        minLength: 5,
        required : 'Username is missing',
        immutable: true,
        unique: true,
    },
    email: {
        type: String,
        required: 'Email is empty',
        lowercase: true, 
        validate : {
            validator : async (value)=> { return await validation.isEmail(value) },
            message: "Invalid email"
        }
    },
    password:{
        type:String,
        required: 'Password is missing',
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
    dob: {
        type: Date,
        default: new Date()
    },
    gender: {
        type: String
    },
    address: addressSchema,
    
    createdAt: {
        type: Date,
        default: new Date(),
        immutable: true 
    }
    
})

patientSchema.pre('save', function(next) {
    //password hashing
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    next()
});


module.exports = mongoose.model('patients', patientSchema, 'patients')