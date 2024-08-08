//express
const express = require('express');
//body parser
const bodyParser = require('body-parser');
const app = express();
//mongoose
const mongoose = require('mongoose');
const { error } = require('console');

const userRoutes = require('./Routes/userRoutes');
const adminRoutes = require('./Routes/adminRoutes');

//middleware common
app.use(bodyParser.json());

//sign and login
app.use('/flights/users',userRoutes);
//Travel Agent
app.use('/flights/admin',adminRoutes);
//Customers


//connection
mongoose.connect("mongodb+srv://akhilbn4:Qwertyuiop%40123@ams.p0mdg3z.mongodb.net/AMS?retryWrites=true&w=majority&appName=AMS")
.then(()=>{
    app.listen(5000);
}).catch(error=>{
    console.log(error);
})