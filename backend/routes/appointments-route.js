const express = require('express')
const s3 = require('aws-sdk')

const Appointment = require('../schemas/appointment-schema')

const router = express.Router()

router.post('/new', async(req, res)=>{
    try
    {
        var appointment = await Appointment.create(req.body)
        //if(files)
        //{
            //addFilesToS3()
        //}
        res.send({status: 'success'})
    }
    catch(err)
    {
        res.send({status: 'failed', message: err.message})
    }
})

// router.get('/:username', async(req, res)=>{
//     try
//     {
//         if(req.params.role === 'patient')
//         {
//             var data = await Appointment.find({patient: username})
//             res.send({status: 'success', ...data})
//         }
//         else if (req.params.role ==='doctor')
//         {
//             var data = await Appointment.find({doctor: username})
//             res.send({status: 'success', ...data})
//         }
//     }
//     catch(err)
//     {
//         res.send({status: 'failed', message: err.message})
//     }
// })

router.post('/upcoming', async(req,res)=>{
    var username = req.body.username
    var role = req.body.role
    try
    {
        if(role === 'patient')
        {
            var data = await Appointment.find({patient_username: username, time:{ $gte: new Date() }}).sort({time:1})
        }
        else if (role ==='doctor')
        {
            var data = await Appointment.find({doctor_username: username, time: { $gte: new Date() }}).sort({time:1})
        }

        if(data.length>0)
        {
            res.send({status: 'success', data: data})
        }
        else
        {
            res.send({status: 'success', data: ''})
        }
        
    }
    catch(err)
    {
        res.send({status: 'failed', message: err.message})
    }
})

router.post('/past', async(req, res)=>{
    var username = req.body.username
    var role = req.body.role
    try
    {
        if(role === 'patient')
        {
            var data = await Appointment.find({patient_username: username, time:{ $lt: new Date() }}).sort({time:1})
        }
        else if (role ==='doctor')
        {
            var data = await Appointment.find({doctor_username: username, time: { $lt: new Date() }}).sort({time:1})
        }

        if(data.length>0)
        {
            res.send({status: 'success', data: data})
        }
        else
        {
            res.send({status: 'success', data: ''})
        }
    }
    catch(err)
    {
        res.send({status: 'failed', message: err.message})
    }

})

router.post('/new', async(req, res)=>{
    try
    {
        var data = await Appointment.create(req.body)
        res.send({status: 'success', data: data})
    }
    catch(err)
    {
        res.send({status: 'failed', message: err.message})
    }
})


function addFileToS3()
{

}




module.exports = router