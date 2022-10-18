const mongoose = require('mongoose')
const express = require('express')

const userModel = require('../models/users')

const route = express.Router()

route.post('/user/signup', async(req, res) => {

    if(req.body.content) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }
    const user = new userModel(req.body)
    try {
        await user.save()
        res.status({code: 201, message: "Successfully added user"}).send(user)
    }
    catch(error) {
        res.status(500).send(error.message)
    }
})

route.post('/user/login/:username/:password', async(req, res) => {
    if(req.body.content) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }
    const user = await userModel.findOne({username: req.params.username})

    let password = req.params.password
    let userName = req.params.username

    if(userName == user.username && password == user.password) {
        res.status(200).send({"status" : true, "username": user.username, message: "Successfully signed in"})
    }
    else {
        res.status(500).send({status: false, message: "Incorrect username or password"})
    }
})
module.exports = route