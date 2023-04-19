const express = require('express');
const user = require('../models/user');

const router = express.Router()


///////////////////////////
const mongoose = require('mongoose')
require('dotenv').config();

const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const db = mongoose.connection

db.on('error', (error) => {
  console.log("------------ERROR------------\n")
  console.log(error)
})

db.once('connected', () => {
  console.log('Database Connected');
})
///////////////////////////////////////



router.get('/', (req, res) =>{
    res.render('index', {title : 'Express'});
})

router.get('/register', (req, res) =>{
    res.render('register');
})

router

router.post('/register', async (req, res) =>{
    const data = new user({
        username: req.body.username,
        password: req.body.password
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = router;
