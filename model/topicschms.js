const mongoose = require('mongoose');

const topicSchema =new mongoose.Schema({
    subject:String
})
 
module.exports = mongoose.model('Topic',topicSchema);
