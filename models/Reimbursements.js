const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema ({ 


reimbursements: [
    {
      expense_type: { type: String },
      amount: { type: Number },
      date_submitted: { type: String },
      status: { type: String },
      receipt_url: { type: String },
    },
  ]})