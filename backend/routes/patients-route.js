const express = require('express')
const bcrypt = require('bcryptjs')

const Patient = require('../schemas/patient-schema')
const Doctor = require('../schemas/doctor-schema')

const router = express.Router()


//new patient
router.post('/new', async(req,res)=>{
    
    var user_details = req.body
    delete user_details.qualifications
    delete user_details.specialization
    var existsUnameDoc = await Doctor.findOne({ username: req.body.username});
    var existsUnamePat = await Patient.findOne({ username: req.body.username});
    try
    {
        if (existsUnameDoc || existsUnamePat)
        {
            throw new Error('Username taken')
        }
        else
        {
            var user = await Patient.create(user_details)
            user.password = undefined
            res.send({status: 'success', ...user})
        }
    }
    catch(err)
    {
        res.send({status: 'failed', message: err.errors, thrown : err.message})
    }

})

//edit patient
router.put('/update', async(req,res)=>{
    try
    {
        var user = await Patient.findOne({username: req.body.username})
        if(user)
        {
            var updated = await Patient.updateOne({username: req.body.username}, { $set: { ...req.body }})
            var user_new = await Patient.findOne({username: req.body.username})
            user_new.password = undefined
            res.send({status: 'success', ...user_new})
        }
        else
        {
            throw new Error('User does not exist')
        }
    
    }
    catch(err)
    {
        res.send({status: 'failed', message: err.message})
    }

})

//get details of one patient
router.get('/:username', async(req, res)=>{
    try
    {
        var user = await Patient.findOne({username: req.params.username},{password:0, createdAt:0, _id:0, __v:0})
        if(user)
        {
            res.send({status: 'success', ...user})
        }
        else
        {
            throw new Error('User does not exist')
        }
    }
    catch(err)
    {
        res.send({status: 'failed', message: err.message})
    }
})

//patient login validation
router.post('/login', async(req,res)=>{
    var user_details = req.body
    try
    {
        var user = await Patient.findOne({username: user_details.username})
        if(user)
        {
            if(bcrypt.compareSync(user_details.password, user.password))
            {
                user.password = undefined
                res.send({status: 'success', ...user})
            }
            else
            {
                throw new Error('Passwords do not match')
            }
        }
        else
        {
            throw new Error('User does not exist')
        }
    }
    catch(err)
    {
        res.send({status: 'failed', message: err.errors, thrown : err.message})
    }

})






module.exports = router