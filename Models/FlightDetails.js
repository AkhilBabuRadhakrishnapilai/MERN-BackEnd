const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightDetails = new Schema ({
    flightId : {type:String,required:true},
    typeId :{type:String,required:true},
    routeId :{type:mongoose.Schema.Types.ObjectId,ref:'Routes',required:true},
    depDate :{type:Date,required:true},
    arrivalDate:{type:Date,required:true},
    depTime : {type:String,required:true},
    arrivalTime :{type:String,required:true},
    isActive :{type:Boolean,default:true}
})

module.exports = mongoose.model('FlightDetails',flightDetails);