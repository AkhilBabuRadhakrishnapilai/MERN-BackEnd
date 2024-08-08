const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seatBookingSchema = new Schema({
    bookingId : {type:String,required:true},
    numberOfSeats : {type:Number,required:true},
    isActive:{type:Boolean,default:true}
})

module.exports = mongoose.model('SeatBooking',seatBookingSchema);