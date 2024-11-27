const http = require('http');
const app = require('./app');
require('dotenv').config()


const server = http.createServer(app)
const port =process.env.PORT || 4200;

server.listen(port,()=>{
    console.log('app is running on '+port)
})