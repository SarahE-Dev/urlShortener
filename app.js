require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const logger = require('morgan')

const urlRouter = require('./routes/user/model/urlRouter')

app.use(cors());
app.use(express.json());
app.use(logger('dev'))

const mongoose = require('mongoose');

app.use('/api', urlRouter)


mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(3001, ()=>{
            console.log('Server started on Port: 3001');
        })
        console.log(('MONGO DB CONNECTED'));
    })
    .catch(e=>{
        console.log(e);
    })

