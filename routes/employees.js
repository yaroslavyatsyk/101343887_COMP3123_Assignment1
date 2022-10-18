const express = require('express')
const route = express.Router()
const emp = require('../models/employees')

route.post('/employees', async(req, res) => {
    // Validate request
    if(req.body.content) {
        return res.status(400).send({
            message: "Employee content can not be empty"
        });
    }
    

    try {
        const employee = new emp(req.body)
        await employee.save()
        res.status(201).send(employee)
    }
    catch(error) {
        res.status(500).send(error)
    }
});

//http://mongoosejs.com/docs/api.html#find_find
route.get('/employees', async(req, res) => {
    try {
        const employees = await emp.find({})
        res.status(200).send(employees)
    }
    catch(error) {
        res.status(500).send(error)
    }
});


//http://mongoosejs.com/docs/api.html#findbyid_findById
route.get('/employees/:eid', async(req, res) => {
    // Validate request
    if(req.body.content) {
        return res.status(400).send({
            message: "Employee content can not be empty"
        });
    }
    
    try {
        const employee = await emp.findById(req.params.eid)
        res.status(200).send(employee)
    }
    catch(error) {
        res.status(500).send(error)
    }
    
});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
route.put('/employees/:eid', async(req, res) => {
    // Validate request
    if(req.body.content) {
        return res.status(400).send({
            message: "Employee content can not be empty"
        });
    }
    try {
        console.log(req.body)
        const updatedEmployee = await emp.findByIdAndUpdate(req.params.eid, req.body)
        //console.log(updatedBook)
        await updatedEmployee.save()
        res.status(202).send(req.body)
      } catch (err) {
        res.status(500).send(err)
      }
    
});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
route.delete('/employees/:eid', async (req, res) => {
    // Validate request
    if(req.body.content) {
        return res.status(400).send({
            message: "Employee content can not be empty"
        });
    }
    //TODO - Write your code here to delete the note using noteid
    try {
        const employee = await emp.findByIdAndDelete(req.params.eid)
    
        if (!employee) { 
            res.status(404).send("No item found")
        }
        res.status(204).send(employee)
      } catch (err) {
        res.status(500).send(err)
      }
});
module.exports = route