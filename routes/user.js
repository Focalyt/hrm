const express = require('express');
const Router = express.Router();
const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary').v2;
const User = require('../models/User');
const Employee = require('../models/EmployeeDetails');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/Auth');
require('dotenv').config();


cloudinary.config({
   
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
        
})

// Endpoint to get all employees
Router.get('/employee-list',verifyToken, async (req, res) => {
    try {
        const user = await User.find({ officialEmail: req.query.email });
        console.log(user)
        if (user.length === 0) {
            return res.status(500).json({ error: 'User not found' });
        }

        // Check if `simple` query parameter is provided
        const isSimple = req.query.simple === 'true';
        

        // Decide fields to return based on `simple` parameter
        const fields = isSimple
            ? { 'employee_id': 1, 'first_name': 1, 'last_name': 1, '_id': 1 }
            : {}; // Empty object to select all fields

        // Fetch employees with specified fields
        const employee = await Employee.find({}, fields);

        // If `simple` is true, transform the response for dropdown
        const transformedEmployees = isSimple
            ? employee.map(emp => ({
                  _id: emp._id,
                  employee_id: emp.employee_id,
                  first_name: emp.first_name,
                  last_name: emp.last_name,
              }))
            : employee; // Return the full data if `simple` is not set

        res.json(transformedEmployees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});


Router.patch("/edit-employee/:id", async (req, res) => {
    const { id } = req.params; // Employee ID from the URL
    const updates = req.body; // Updates from the request body

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid employee ID" });
    }

    // Check if there are updates
    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ message: "No fields provided for update" });
    }

    try {
        // Update the employee using $set for partial and nested updates
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            { $set: updates }, // Use $set for partial updates
            { new: true, runValidators: true } // Return the updated document and validate inputs
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({
            message: "Employee updated successfully",
            employee: updatedEmployee,
        });
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({
            message: "Failed to update employee",
            error: error.message,
        });
    }
});
// DELETE API to remove an employee by ID
Router.delete('/delete-employee/:id',verifyToken, async (req, res) => {
    try {
        const employeeId = req.params.id;

        // Find the employee by ID and delete them
        const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ message: 'Error deleting employee', error: error.message });
    }
});


Router.post('/add-user', async (req, res) => {
    try {
        // Password hash karna
        const passwordToHash = req.body.password || "Focalyt@123";
        const hashedPassword = await bcrypt.hash(passwordToHash, 10); // 10 is the salt rounds
        const uploadProfilePic = await cloudinary.uploader.upload(req.files.profilePic.tempFilePath)

        // New user object create karte waqt hashed password assign karein
        const user = new User({
            ...req.body,
            password: hashedPassword,
            photo_url:uploadProfilePic.secure_url,
            photo_Id:uploadProfilePic.public_id
        });

        // User ko database me save karein
        await user.save();

        res.status(201).json({
            message: 'User created successfully',
            user,
        });

    } catch (error) {
        
        res.status(500).json({
            message: 'Error creating user',
            error: error.message,
        });
    }
});


Router.post('/login', async (req, res) => {
    try {
        const user = await User.find({ officialEmail: req.body.email });
        
        if (user.length == 0) {
            return res.status(500).json({
                error: 'User not found'
                

            })
            
        }


        const isValid = await bcrypt.compare(req.body.password, user[0].password)
        

        if (!isValid) {
            return res.status(500).json({
                error: 'Invalid Password'
            })
        }

        const token = jwt.sign({
            _id: user[0]._id,
            company_name: user[0].company_name,
            email: user[0].officialEmail,
            first_name: user[0].first_name,
            last_name: user[0].last_name,
            phone: user[0].phone,
            photo_url: user[0].photo_url,
            photo_Id: user[0].photo_Id,
            designation: user[0].designation,
            role: user[0].role,
        },
            'Rahul HRM Software',
            {
                expiresIn: '365d'
            }
        )

        res.status(200).json({
            _id: user[0]._id,
            company_name: user[0].company_name,
            email: user[0].officialEmail,
            first_name: user[0].first_name,
            last_name: user[0].last_name,
            phone: user[0].phone,
            photo_url: user[0].photo_url,
            photo_Id: user[0].photo_Id,
            designation: user[0].designation,
            role: user[0].role,
            token: token

        })
    }
    catch (error) {
        res.status(500).json({
            message: 'Email not found',
            error: error.message,
        });
    }
})

module.exports = Router