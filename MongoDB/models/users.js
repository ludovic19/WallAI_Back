import mongoose from "mongoose"

const Users = new mongoose.Schema({
    first_name : { type : String, required : true},
    last_name : { type : String, required : true},
    email : { type : String, required : true},
    password : { type : String, required : true, minLength : 6},
});

const UsersSchema = mongoose.model('Users', Users)

export default UsersSchema;