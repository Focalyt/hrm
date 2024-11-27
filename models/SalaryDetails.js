const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema ({ 

salary_details: {
    base_salary: { type: Number },
    currency: { type: String },
    pay_frequency: { type: String, default:"Monthly" },
    
  }})