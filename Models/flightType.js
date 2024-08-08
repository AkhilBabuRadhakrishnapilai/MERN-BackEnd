const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightType = new Schema({
    flightType:{type:String,required:true,minlength:5,maxlength:15},
    isActive:{type:Boolean,default:true}
})

module.exports = mongoose.model('FlightTypes',flightType);