const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    roleId : {type:Number,required:true,unique:true},
    roleName :{type:String,required:true},
    isActive :{type:Boolean,default:true}
})

module.exports = mongoose.model('Roles',roleSchema);