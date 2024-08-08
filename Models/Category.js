const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const categorySchema = new Schema({
    catType : {type:String,required:true},
    isActive :{type:Boolean,default:true}
})

module.exports = mongoose.model('Category',categorySchema);