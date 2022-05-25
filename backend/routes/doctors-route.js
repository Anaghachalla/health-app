const express = require('express')
const bcrypt = require('bcryptjs')

const Doctor = require('../schemas/doctor-schema')
const Patient = require('../schemas/patient-schema')
const Specializations = require('../schemas/specializations-schema')

const router = express.Router()

//all specializations

router.get('/specializations', async (req,res)=>{
    var spec = await Specializations.find({}, {specialization:1, _id: 0})
    var specializations=[]
    spec.forEach( spec=> specializations.push(spec['specialization']) )
    res.send(specializations)
})

//new doctor

router.post('/new', async(req,res)=>{
    var user_details = req.body
    delete user_details.dob
    delete user_details.gender
    
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
            var user = await Doctor.create(user_details)
            user.password = undefined
            res.send({status: 'success', ...user})
        }
    }
    catch(err)
    {
        res.send({status: 'failed', message: err.errors, thrown : err.message})
    }

})

//edit doctor
router.put('/update', async(req,res)=>{
    try
    {
        var user = await Doctor.findOne({username: req.body.username})
        if(user)
        {
            var updated = await Doctor.updateOne({username: req.body.username}, { $set: { ...req.body }})
            var user_new = await Doctor.findOne({username: req.body.username})
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

//get details of all doctors
router.get('/all', async(req, res)=>{
    try
    {
        var doctors = await Doctor.find({}, {password: 0})
        res.send({status: 'success', data: doctors})
    }
    catch(err)
    {
        res.send({status: 'failed', message: err.message})
    }
})

router.get('/search/:spec/:search_str', async(req, res)=>{
    try
    {
        if(req.params.spec==='all')
        {
            var doctors = await Doctor.find({name: {$regex:  new RegExp(req.params.search_str), $options: 'i'}})
            res.send({status: 'success', data: doctors})
        }
        else
        {
            var doctors = await Doctor.find({name: {$regex: new RegExp(req.params.search_str), $options: 'i'}, specialization: req.params.spec})
            res.send({status: 'success', data: doctors})
        }
    }
    catch(err)
    {
        console.log(err);
        res.send({status: 'failed', message: err.message})
    }
})

router.get('/specialization/:spec', async(req, res)=>{
    try
    {
        var doctors = await Doctor.find({specialization: req.params.spec})
        res.send({status: 'success', data: doctors})
    }
    catch(err)
    {
        res.send({status: 'failed', message: err.message})
    }
})


//get details of one doctor
router.get('/:username', async(req, res)=>{
    try
    {
        var user = await Doctor.findOne({username: req.params.username}, {password:0, createdAt:0, _id:0, __v:0})
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

//doctor login validation
router.post('/login', async(req,res)=>{
    var user_details = req.body
    try
    {
        var user = await Doctor.findOne({username: user_details.username})
        
        if(user)
        {
            if(bcrypt.compareSync(user_details.password, user.password))
            {
                user.password = undefined
                res.send({status: 'success', ...user})
            }
            else
            {
                throw new Error('Password does not match')
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