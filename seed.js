const { mongoose } = require('./app');
const bcrypt = require('bcrypt');
const Employee = require('./models/EmployeeDetails'); // Import Employee model



const seedEmployees = async () => {
  try {
    // Check if default employee already exists
    const existingUser = await Employee.findOne({ officialEmail: 'admin@example.com' });
    if (existingUser) {
      console.log('Default admin user already exists.');
      return mongoose.disconnect();
    }

    // Hash the default password
    const hashedPassword = await bcrypt.hash('Focalyt@123', 10);

    // Insert default admin user
    await Employee.create({
      first_name: 'Admin',
      employee_id:'default',
      last_name: 'User',
      officialEmail: 'admin@focalyt.com',
      personalEmail: 'admin@focalyt.com',
      phone_number: '8699081947',
      designation: 'Admin',
      role: 'admin',
      password: hashedPassword,
    });

    console.log('Default admin user created successfully.');
  } catch (error) {
    console.error('Error seeding default admin user:', error);
  } finally {
    mongoose.disconnect(); // Close the database connection
  }
};

// Run the seed function
seedEmployees();
