const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    paymentId : {type:String,required:true},
    userId : {type:String,required:true},
    contactNumber : {type:String,rewuired:true},
    validUpto :{type:Date,required:true},
    cvv : {type:Number,required:true},
    isActive :{type:Boolean,default:true}
})

module.exports = mongoose.model('Payments',paymentSchema);