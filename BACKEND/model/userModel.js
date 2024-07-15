import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullName: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    about:{
        type:String,
    },
    image:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    is_Admin:{
        type:Boolean,
        required:true,
    }
})

const User = mongoose.model('USERS',userSchema)

export default User