const {Schema , model} = require("mongoose")

const userSchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required error from db"]
    },
    email:{
        type: String,
        required: [true, "Email is required error from db"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Password is required error from db"]
    },
    img: {
        type: String
    },
    role:{
        type: String,
        required: [true, "Role is required error from db"],
        enum: ['ADMIN_ROLE','USER_ROLE']
    },
    state:{
        type: Boolean,
        default: true
    },
    google:{ 
        type: Boolean,
        default: false
    }

})

userSchema.methods.toJSON = function(){
    const {__v, password,...user} = this.toObject()
    return user 
}


module.exports = model('User',userSchema)