const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    flightId : {type:String,required:true,unique:true},
    flightName : {type:String,required:true},
    totalSeat : {type:Number,required:true},
    economySeat : {type:Number,required:true},
    businessSeat : {type:Number,required:true},
    isActive : {type:Boolean,default:true}

})

module.exports = mongoose.model('Flights',flightSchema);