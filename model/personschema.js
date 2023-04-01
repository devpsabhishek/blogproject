const mongoose = require('mongoose');
const personSchema = new mongoose.Schema({
    email: String,
    password: String,
    name:String ,
    address:String,
    phoneno:Number,
    current_date:Date,
    user:String,
    //createdat:{type:date,default:Date.now},
    approved:Number
});

module.exports= mongoose.model('Person',personSchema);
 