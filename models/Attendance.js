const mongoose = require('mongoose');


const AttendanceSchema = new mongoose.Schema({ 
  employeeId: { type: String, required: true }, // References employeeId from EmployeeSchema
  date: { type: Date, default: () => new Date(new Date().getTime() +5.5 * 60 * 60 * 1000).toISOString().split('T')[0] }, // The specific date of attendance
  checkInTime: { type: Date, default: () => new Date()}, // Check-in timestamp
  checkOutTime: { type: Date, default:null
   }, // Check-out timestamp
  status: { 
    type: String, 
    enum: ["Present", "Absent","Short Leave", "Late", "On Leave"], 
    default: "Absent" 
  }, // Attendance status
  workLocation: { type: String},
  remarks: { type: String },
})

const Attendance = mongoose.model('Attendance', AttendanceSchema);
module.exports = Attendance;