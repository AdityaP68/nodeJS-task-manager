const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
        unique: true,
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
    },
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }]
})


//instance method
userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({id: user._id.toString()},'thisismyfirstbackendproject')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token

}

//adding login feature to the schema
//sttic function
//model methods
userSchema.statics.findByCredentials = async (email, password)=>{
    const user = await User.findOne({email})
    console.log(user)
    if(!user){
        throw new Error('Unable to Login')
    }
    
    const isMatch = await bcrypt.compare(password, user.password)
    console.log(isMatch)

    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user

}

//hashing the password before saving
userSchema.pre('save',async function(next){
    const user = this

    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('Users',userSchema)

module.exports = User