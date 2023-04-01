const mongoose = require('mongoose');
const adminSchema =new mongoose.Schema({
    userid:String,
    password:Number
  })
  
  module.exports = mongoose.model('admin',adminSchema);