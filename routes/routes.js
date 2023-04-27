const express = require('express');
const router = express.Router()

const user = require('../models/user');
const lab = require('../models/lab');

const access = process.env.ADMIN_PWD

router.get('/', (req, res) =>{
    res.status(200).render('index', {title : 'Room Booking System'});
})

// router.get('/view_labs', async (req, res, next) =>{
//     try{
//         const data = await lab.find();
//         const labs = data;
//         console.log(labs)
//         res.status(200).render('view_labs', {data : labs});
//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//     }
// })

router.get('/approve_lab', (req, res) =>{
    res.status(200).render('approve_lab');
})

router.post('/approve_lab', async (req, res, next) =>{

    console.log("approving...")

    try {
        console.log(req.body.lab)
        console.log(req.body.name)
        let result = await lab.updateOne(
            {
                "lab" : req.body.lab,
                "professor" : req.body.name
            },
            {
                $set : {"approved" : "Approved"}
            }
        )

        res.status(200).send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.get('/lab_book', (req, res) => {
    res.status(200).render('lab_book');
})

router.post('/lab_book', async (req, res, next) => {
    const data = new lab({
        lab  : req.body.lab,
        datetime : req.body.datetime,
        professor : req.body.name,
        approved : "Pending"
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }

})

router.get('/main', async (req, res, next) => {
    let usr = req.query.username
    let pwd = req.query.password
    
    console.log(usr)
    console.log(pwd)

    let result = await user.findOne({
        "username" : usr,
        "password" : pwd
    })

    console.log(result);

    if(!result) res.status(400).send("Error");
    else{
        try{
            const data = await lab.find();
            const labs = data;
            console.log(labs)
            res.status(200).render('view_labs', {data : labs});
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    }
})

router.get('/view_labs_secret', async (req, res, next) => {
    try{
        const data = await lab.find();
        const labs = data;
        console.log(labs)
        res.status(200).render('view_labs', {data : labs});
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get('/login', (req, res, next) => {
    res.status(200).render('login');
})

router.get('/register', (req, res) =>{
    res.status(200).render('register');
})

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

router.get('/view_labs', async (req, res, next) => {
    try{
        const data = await lab.find();
        const labs = data;
        console.log(labs)
        res.status(200).render('view_labs', {data : labs});
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports = router;
