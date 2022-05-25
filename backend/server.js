const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer')

const doctors = require('./routes/doctors-route');
const patients = require('./routes/patients-route');
const feedbacks = require('./routes/feedbacks-route');
const appointments = require('./routes/appointments-route');
const medicines = require('./routes/medicines-route');
const admins = require('./routes/admins-route')

const Doctor = require('./schemas/doctor-schema')
const Patient = require('./schemas/patient-schema');



//const dburl = 'mongodb://admin:anagha902@cluster0-shard-00-00.pq5u2.mongodb.net:27017,cluster0-shard-00-01.pq5u2.mongodb.net:27017,cluster0-shard-00-02.pq5u2.mongodb.net:27017/health-app?ssl=true&replicaSet=atlas-12pjft-shard-0&authSource=admin&retryWrites=true&w=majority'
const dburl = 'mongodb+srv://admin:anagha902@cluster0.pq5u2.mongodb.net/health-app?retryWrites=true&w=majority'
mongoose.connect(dburl, ()=> console.log('Connected to db'), (err)=>console.log(err))

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "*",
}));

app.use('/doctor', doctors)
app.use('/patient', patients)
app.use('/feedback', feedbacks)
app.use('/appointment', appointments)
app.use('/medicine', medicines)
app.use('/admin', admins)

//nodemailer for forgot password
app.post('/forgot-password', async(req, res)=>{
    var details = req.body
    try
    {
        var user_doc = Doctor.findOne({username: details.username})
        var user_pat = Patient.findOne({username: details.username})
        if(user_doc || user_pat)
        {
            var code = Math.floor(Math.random()*(99999-10000))+ 10000
            //nodemailer workflow
            //let testAccount = await nodemailer.createTestAccount();
            //console.log(testAccount);
            let transporter = nodemailer.createTransport({
                service: 'gmail' ,
                auth: { 
                    user: 'anagha902@gmail.com',
                    pass: 'spizaqnatmsautsd'
                }
            });

            let info = await transporter.sendMail({
                from: "anagha902@gmail.com",
                to: details.email,
                subject: "Password reset",
                text: `The code for password reset is ${code}. Please enter this code in the app to reset your password.`
            });

            console.log('Message sent--', info.messageId);
            res.send({status: 'success', code: `${code}`})
        }
        else
        {
            throw new Error('User does not exist')
        }
        res.send()
    {
        
    }
    }
    catch(err)
    {
        res.send({status: 'failed', message: err.error, thrown: err.message})
    }
})

app.listen(3000, ()=>{
    console.log('Listening on 3000');
})