const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName : {type:String,required:true},
    lastName : {type:String,required:false},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlength:6},
    contactNumber:{type:String,required:true,unique:true,maxlength:14},
    roleId :{type:String,default:2},
    isActive:{type:Boolean,default:true}
})

module.exports = mongoose.model('User',userSchema);

