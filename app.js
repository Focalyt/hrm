const express = require('express')
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')
const cors = require('cors');
const verifyTokenRoutes = require('./routes/verify-token');
const userRoutes = require('./routes/user');
const employeeRoutes = require('./routes/employee');
const path = require('path');


require('dotenv').config()




const connectWithDatabase = async()=>{
    try{
        const res = await mongoose.connect(process.env.MONGO_URI)
        console.log('connected with database..')
    }
    catch(err){
        console.log(err)
    }
}
connectWithDatabase()

app.use(bodyParser.json());

// POST API to create a new employee

// Note that this option available for versions 1.0.0 and newer. 
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use('/public', express.static(path.join(__dirname, 'public')));


app.use(cors());

app.use('/employee',employeeRoutes);
app.use('/user',userRoutes);
app.use('/',verifyTokenRoutes);

module.exports =  app, mongoose ;