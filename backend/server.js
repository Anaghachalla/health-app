const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const doctors = require('./routes/doctors-route');
const patients = require('./routes/patients-route')


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

app.listen(3000, ()=>{
    console.log('Listening on 3000');
})