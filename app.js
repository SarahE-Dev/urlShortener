require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const logger = require('morgan')

const urlRouter = require('./routes/user/model/urlRouter')

app.use(cors());
app.use(express.json());
app.use(logger('dev'))
app.use(express.urlencoded({extended: true}))

const mongoose = require('mongoose');

app.use('/api', urlRouter)


mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        console.log(('MONGO DB CONNECTED'));
    })
    .catch(e=>{
        console.log(e);
    })

app.listen(3000, ()=>{
    console.log('server on port 3000');
})