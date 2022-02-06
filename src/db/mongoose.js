const mongoose = require('mongoose')
const validator = require('validator')

//mongose uses mongodb at the backend
mongoose.connect('mongodb://127.0.0.1:27017/taskmanager-api', {
    useNewUrlParser: true,
   // useCreateIndex: true //this method is showing error

})


//defining the mongoose model  for a user
const User = mongoose.model('Users',{
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



const me = new User({
    name: " A ",
    email: ' mike@bb.com ',
    password: 'njgwwr123'
 
})

me.save().then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
})

const Task = mongoose.model('Tasks',{
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const task1 = new Task({
    description: 'bobob'
})
task1.save().then((result)=>console.log(result)).catch((error)=>console.log(error))