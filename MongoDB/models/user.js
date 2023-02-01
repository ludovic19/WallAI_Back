import mongoose from "mongoose"

const User = new mongoose.Schema({
    first_name : { type : String, required : true},
    last_name : { type : String, required : true},
    email : { type : String, required : true, unique : true},
    password : { type : String, required : true},
});

const UserSchema = mongoose.model('User', User)

export default UserSchema;