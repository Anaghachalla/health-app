const mongoose = require('mongoose')
const express = require('express')

const Feedback = require('../schemas/feedback-schema')
// const patients = require('./patients-route')

const router = express.Router()

//get all fbs
router.get('/all', async(req, res)=>{
    try
    {
        var feedbacks = await Feedback.find({})
        if(feedbacks.length>0)
        {
            res.send({status: 'success', data: feedbacks})
        }
        else
        {
            res.send({status:'success' , data: ''})
        }
    }
    catch(err)
    {
        res.send({status: 'failed', message: err.message})
    }
})

//create new fb
router.post('/new', async(req, res)=>{
    try
    {
        var feedback = await Feedback.create(req.body)
        res.send({status: 'success'})
    }
    catch(err)
    {
        res.send({status: 'failed', message: err.message})
    }
})



//search for fb
router.get('/search/:str', async(req, res)=>{
    try
    {
        var feedback = await Feedback.find({username: {$regex:  new RegExp(req.params.str), $options: 'i'}})
        if(feedback.length>0)
        {
            res.send({status: 'success', data: feedback})
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

router.get('/sort/:sort', async(req, res)=>{
    try
    {
        if(req.params.sort ==='date')
        {
            var feedback = await Feedback.find({}).sort({createdAt: -1})
        }
        else
        {
            var feedback = await Feedback.find({}).sort({ratings: -1})
        }

        if(feedback.length>0)
        {
            res.send({status: 'success', data: feedback})
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


router.get('/filter/:filter', async(req, res)=>{
    try
    {
        var feedback = await Feedback.find({ratings: req.params.filter})
        if(feedback.length>0)
        {
            res.send({status: 'success', data: feedback})
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



//get fb of a user
router.get('/:uname', async(req, res)=>{
    try
    {
        var feedback = await Feedback.findOne({username: req.params.uname})
        if(feedback)
        {
            res.send({status: 'success', data: feedback})
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

module.exports = router