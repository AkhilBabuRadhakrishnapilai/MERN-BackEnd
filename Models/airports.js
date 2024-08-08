const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const airportsSchema = new Schema({
    airportName : {type:String,required:true,minlength:5},
    location : {type:String,required:true,minlength:5},
    isActive : {type:Boolean,default:true}
})

module.exports = mongoose.model('Airports',airportsSchema);