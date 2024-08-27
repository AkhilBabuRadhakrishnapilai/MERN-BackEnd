const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
    className : {type:String,required:true},
    price : {type:Number,required:true},
    isActive : {type:Boolean,default:true}
})

module.exports = mongoose.model('Class',classSchema);