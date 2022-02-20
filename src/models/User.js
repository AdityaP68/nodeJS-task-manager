const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

//to take advantage of mongoose middleware
const userSchema = mongoose.Schema({
    //default data validation schema for these member properties
    name: {
        type: String,
        required: true,
        trim: true

    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email invalid")
            }
        }
    },
    password:{
        type: String,
        minLength: 6,
        required: true,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password'))
                throw new Error('You cant have this password')
        }

    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if (value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    }
})

userSchema.pre('save',async function(next){
    const user = this

    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('Users',userSchema)

module.exports = User