const express = require('express');
const user = require('../models/user');

const router = express.Router()

router.get('/login', async (req, res, next) => {
    let data = req.body
    let usr = data.username
    let pwd = data.password

    let result = await user.findOne({
        username : usr,
        password : pwd
    })

    if(!result) res.send("Not found").status(404);
    else res.render('lab_status', {user : usr}).status(200);

})


router.get('/', (req, res) =>{
    res.render('index', {title : 'Express'}).status(200);
})

router.get('/register', (req, res) =>{
    res.render('register').status(200);
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
