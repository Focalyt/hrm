const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    company_name: { type: String, default:"Focalyt" },    
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    designation: { type: String, required: true },
    officialEmail: { type: String, unique:true, required:true },
    phone_number: { type: Number, required: true },
    photo_url: { type: String },
    photo_Id: { type: String },
    password:{type:String,default:"Focalyt@123"},
    role:{type:String,default:"employee"}
},
{timestamps: true
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
