// const express = require('express');
// const Router = express.Router();
// const bcrypt = require('bcrypt')
// const cloudinary = require('cloudinary').v2;
// const Employee = require('../models/EmployeeDetails');
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const verifyToken = require('../middleware/Auth');
// require('dotenv').config();


// cloudinary.config({
   
//         cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//         api_key: process.env.CLOUDINARY_API_KEY, 
//         api_secret: process.env.CLOUDINARY_API_SECRET
        
// })

// // Create Employee with File Uploads
// Router.post('/add-employee',verifyToken, async (req, res) => {
//     try {
//         // Password hash karna
//         const uploadProfilePic = await cloudinary.uploader.upload(req.files.profilePic.tempFilePath);
//         const uploadAadhaar = await cloudinary.uploader.upload(req.files.aadhar.tempFilePath);
//         const uploadPanCard = await cloudinary.uploader.upload(req.files.panCard.tempFilePath);
//         const uploadResume = await cloudinary.uploader.upload(req.files.resume.tempFilePath);
//         const uploadOfferLetter = await cloudinary.uploader.upload(req.files.offerLetter.tempFilePath);
//         const uploadEducationDoccument = await cloudinary.uploader.upload(req.files.educationDoccument.tempFilePath);

//         // New user object create karte waqt hashed password assign karein
//         const employee = new Employee({
//             ...Employee.req.body,
//             photo_url:uploadProfilePic.secure_url,
//             photo_Id:uploadProfilePic.public_id,
//             aadhaarUrl:uploadProfilePic.secure_url,
//             aadhaar_id:uploadProfilePic.public_id,
//             panUrl:uploadProfilePic.secure_url,
//             pan_id:uploadProfilePic.public_id,
//             resumeUrl:uploadProfilePic.secure_url,
//             resume_id:uploadProfilePic.public_id,
//             offer_letter_id:uploadProfilePic.public_id,
//             offer_letterUrl:uploadProfilePic.secure_url,
//             educationDoccumentUrl:uploadProfilePic.secure_url,
//             educationDoccument_id:uploadProfilePic.public_id,
//         });

//         // User ko database me save karein
//         await employee.save();

//         res.status(201).json({
//             message: 'Employee created successfully',
//             employee,
//         });

//     } catch (error) {
        
//         res.status(500).json({
//             message: 'Error creating employee',
//             error: error.message,
//         });
//     }
// });

// module.exports = Router;
