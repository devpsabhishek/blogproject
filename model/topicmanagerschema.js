const mongoose = require('mongoose');
const topicmanagerSchema =new mongoose.Schema({
    userid: String,
    password: String,
    name:String,
    subject:String,
    current_date:Date,
    //createdat:{type:date,default:Date.now},
});
   
module.exports= mongoose.model('Topicmanager',topicmanagerSchema);
 