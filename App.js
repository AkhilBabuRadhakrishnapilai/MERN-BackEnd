//express
const express = require('express');
//body parser
const bodyParser = require('body-parser');
const app = express();
//mongoose
const mongoose = require('mongoose');
const { error } = require('console');


//middleware common
app.use(bodyParser.json());

//sign and login


//Travel Agent

//Customers


//connection
mongoose.connect("mongodb+srv://akhilbn4:Qwertyuiop@123@ams.p0mdg3z.mongodb.net/AMS?retryWrites=true&w=majority&appName=AMS")
.then(()=>{
    app.listen(5000);
}).catch(error=>{
    console.log(error);
})