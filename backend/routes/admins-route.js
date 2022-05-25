const mongoose = require('mongoose')
const express = require('express')
const bcrypt = require('bcryptjs')

const Admin = require('../schemas/admin-schema')

const router = express.Router()


router.post('/login', async(req,res)=>{
    var user_details = req.body
    try
    {
        var user = await Admin.findOne({username: user_details.username})
        
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