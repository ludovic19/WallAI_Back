import mongoose from "mongoose"

const Comment = new mongoose.Schema({
    author : { type : String, required : true},
    comment : { type : String, required : true},
    date : {type : Date, default : Date.now()},
    userId : { type : mongoose.Schema.Types.ObjectId, ref : 'Users'},
    PostId : { type : mongoose.Schema.Types.ObjectId, ref : 'Post'}

});

const PostSchema = mongoose.model('Comment', Comment)

export default PostSchema;