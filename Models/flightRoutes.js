const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routesSchema = new Schema({

    departure : {type:String,required:true,minlength:5},
    arrival : {type:String,required:true,minlength:5},
    price : {type:Number,required:true},
    isActive:{type:Boolean,default:true}
})

module.exports = mongoose.model('Routes',routesSchema);
