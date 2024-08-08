const mongoose = require('momgoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    userId :{type:String,required:true},
    startingDate :{type:Date,required:true},
    routeId : {type:String,required:true},
    totalPrice:{type:Number,required:true},
    category :{type:String,required:true},
    typeOfTravel : {type:String,required:true},
    endDate : {type:Date,required:true},
    paymentId:{type:String,required:true},
    isActive:{type:Boolean,default:true}
    
})

module.exports = mongoose.model('Bookings',bookingSchema);