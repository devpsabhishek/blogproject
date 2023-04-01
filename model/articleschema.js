const mongoose=require('mongoose');
const articleSchema =new mongoose.Schema({
    email: String,
    subject:String,
    article: String,
    title:String,
    subject:String,
    description:String,
    current_date:Date,
    approved:Number,
    rating:Number
})

module.exports = mongoose.model('Article',articleSchema);