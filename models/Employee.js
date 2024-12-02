const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  
    employee_id: { type: String, required: true },
    company_name: { type: String, default:"Focalyt" },  
    password:{type:String,default:"Focalyt@123"},
    role:{type:String,default:"employee"},
    user_id: { type: String },
    designation: { type: String },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    personalEmail: { type: String, required: true, unique: true,validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    } },
    officialEmail: { type: String,validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }  },
    phone_number: { type: String, required: true },
    date_of_birth: { type: Date }, // Consider using Date type if possible
    gender: { type: String},
    marital_status: { type: String},
    logo_url: { type: String },
    logo_id: { type: String },
    photo_url: { type: String, default: '/public/images/default-logo.png'},
    photo_id: { type: String },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      pin_code: { type: String },
      country: { type: String },
    },
    employment_details: {      
      department: { type: String },
      job_role: { type: String },
      work_location: { type: String },
      joining_date: { type: Date },
      termination_date: { type: String },
      manager_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }, // Changed to ObjectId
      team_members: [
        {
          member_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
          member_name: { type: String },
        },
      ],
      team: [
        {
          team_id: { type: String },
          team_name: { type: String },
        },
      ],
      status: { type: Boolean, default:true },
    },
    working_hours: { 
      shift_start: { type: String }, // Format: 'HH:mm'
      shift_end: { type: String },   // Format: 'HH:mm'
      
  },
    salary_details: {
      base_salary: { type: Number },
      benefits: {
        health_insurance: { type: Boolean },
        life_insurance: { type: Boolean },
        
      },
    },   
    
    documents: {
      aadhaarUrl: { type: String },
      aadhaar_id: { type: String },
      panUrl: { type: String },
      pan_id: { type: String },      
      resumeUrl: { type: String },
      resume_id: { type: String },
      expLetterUrl: { type: String },
      expLetter_id: { type: String },
      offer_letterUrl: { type: String },
      offer_letter_id: { type: String },
      educationDocuments:[{
      doccumnentName: { type: String }, 
      educationDoccumentUrl: { type: String },      
      educationDoccument_id: { type: String },}]
    },
   
    emergency_contact: {
      emergency_contact_name: { type: String },
      relationship: { type: String },
      emergency_contact_phone: { type: String },
      emergency_contact_email: { type: String },
    },
    userType:{
      type:Number, default:0
    }
    // access_control: {
    //   role: { type: String },
    //   permissions: {
    //     can_edit_profile: { type: Boolean },
    //     can_approve_leaves: { type: Boolean },
    //     can_view_salary: { type: Boolean },
    //     can_view_documents: { type: Boolean },
    //   },
    // },
    
  },
  {timestamps: true
});

const EmployeeDetails = mongoose.model('Employee', EmployeeSchema);
module.exports = EmployeeDetails;
