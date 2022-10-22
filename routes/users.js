const mongoose = require('mongoose')
const express = require('express')

const userModel = require('../models/users')

const route = express.Router()

route.post('/user/signup', async(req, res) => {

    const addedUser = req.body;
    if(!addedUser) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }
    else {
    try { 
        const user = new userModel(addedUser)
        await user.save()
        res.status(201, { message: "Successfully added user"}).send(user)
    }
    catch(error) {
        res.status(500).send(error.message)
    }
}
})

route.post('/user/login', async(req, res) => {
    const loginUser = req.body
    if(!loginUser) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }
    else {
    let password = loginUser.password
    let userName = loginUser.username
    const user = await userModel.findOne({username : userName})

    if(!user) {
        res.status(404).send({"message": "Error of authentification"})
    }
    else if(userName == user.username && password == user.password) {
        res.status(200).send({"status" : true, "username": user.username, message: "Successfully signed in"})
    }
}
})
module.exports = route