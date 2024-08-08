const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    userId : {type:String,required:true},
    dateOfBirth : {type:Date,required:false},
    address : {type:String,required:false,minlength:3,maxlength:100},
    gender :{type:String,required:false,enum:['Male','Female','Non-Binary','Prefer not to say']},
    isActive:{type:Boolean,default:true}
})

module.exports = mongoose.model('Profile',profileSchema);