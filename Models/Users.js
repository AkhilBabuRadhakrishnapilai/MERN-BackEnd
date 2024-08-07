const mongoose = require('mongoose');
const { type } = require('os');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName : {type:String,required:true},
    lastName : {type:String,required:false},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlength:6},
    contactNumber:{type:String,required:true,unique:true,minlength:14},
    isActive:{type:String,default:true}
})