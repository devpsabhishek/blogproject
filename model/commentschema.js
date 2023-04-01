const mongoose=require('mongoose');
const commentSchema =new mongoose.Schema({
    articleid: String,
    articleuseremail:String,
    commentby:String,
    comment: String, 
});
module.exports = mongoose.model('Comment',commentSchema);