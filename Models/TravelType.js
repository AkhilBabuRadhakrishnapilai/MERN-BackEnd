const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const travelTypeSchema = new Schema({
    travelType :{type:String,required:true},
    isActive:{type:Boolean,default:true}
})

module.exports = mongoose.model('Type of Travel',travelTypeSchema);