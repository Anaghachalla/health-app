const mongoose = require('mongoose')
const validation = require('validator')
const bcrypt = require('bcryptjs')


// const addressSchema = mongoose.Schema({
//     Area: String,
//     City: String,
//     Pincode: Number
// })

const patientSchema = mongoose.Schema({
    name : {
        type: String,
        required: 'Name is required',
        validate:{
            validator: (value)=>{
                return (/[a-z A-Z]/.test(value)) && !(/[^a-zA-Z\d\s:]/.test(value))
            }
        }
    },
    username:{
        type: String,
        minLength: 5,
        required : 'Username is required',
        immutable: true,
        unique: true,
        validate :{
            validator: (value)=>{
                return /[a-z A-Z 0-9]/.test(value) && !(/\W/.test(value))
            },
            message: 'Username is invalid'
        }
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
                return (/[a-z A-Z 0-9]/.test(value) && !/\s/.test(value))
               //return (/[a-z]/.test(value) && /[A-Z]/.test(value) && /[0-9]/.test(value) && !/\s/.test(value) && /\W/.test(value))
            },
            message: "Invalid password"
        }
    },
    confirm_password:{
        type: String,
        required: 'Confirm your password',
        validate: {
            validator: function (value){
                return value===this.password
            },
            message: 'Passwords do not match'
        }
    },
    user_type:{
        type: String,
        default: 'patient'
    },
    phone: String,
    dob: {
        type: Date,
        default: new Date()
    },
    gender: {
        type: String
    },
    //address: addressSchema,
    address: String,
    
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

    this.confirm_password = undefined
    next()
});


module.exports = mongoose.model('patients', patientSchema, 'patients')