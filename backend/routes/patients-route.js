const express = require('express')
const bcrypt = require('bcryptjs')

const Patient = require('../schemas/patient-schema')
const Doctor = require('../schemas/doctor-schema')

const router = express.Router()


//new patient
router.post('/new', async(req,res)=>{
    
    var user_details = req.body
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
        }
        res.send('Successful')
    }
    catch(err)
    {
        res.send(err.message)
    }

})

//edit patient
router.put('/:user_type/update', async(req,res)=>{
    var user_type = req.params.user_type
    try
    {
        var user = await Patient.findOne({username: req.body.username})
        if(user)
        {
            let detail= Object.keys(req.body)
            detail.forEach((key)=> {
                if(key!=='username')
                {
                    user[key]= req.body[key]
                }
            })
            user.save()
        }
        else
        {
            throw new Error('User does not exist')
        }
    
        res.send('Successful')
    }
    catch(err)
    {
        res.send(err.message)
    }

})

//get details of one patient
router.get('/:username', async(req, res)=>{
    
    try
    {
        var user = await Patient.findOne({username: req.params.username},{password:0, createdAt:0, _id:0, __v:0})
        if(user)
        {
            res.send(user)
        }
        else
        {
            throw new Error('User does not exist')
        }
    }
    catch(err)
    {
        res.send(err.message)
    }
})

//patient login validation
router.post('/login', async(req,res)=>{
    var user_details = req.body
    try
    {
        var user = await Patient.findOne({username: user_details.username}, {_id:0, username:1, password:1})
        if(user)
        {
            if(bcrypt.compareSync(user_details.password, user.password))
            {
                res.send('Login successful')
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
        res.send(err.message)
    }

})






module.exports = router