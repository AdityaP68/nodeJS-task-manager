const mongoose = require('mongoose')
const validator = require('validator')


const taskSchema = mongoose.Schema({
    //model schema
    description: {
        required: true,
        type: String,
        trim: true

    },
    completed: {
        type: Boolean,
        default: false,
        trim: true
    }
})

taskSchema.pre('save',async function(next){

    //this is the id of the doc
    const task = this
    console.log(this)

    if(task.isModified('completed')){
        //console.log('omkie')
    }
    //console.log(next)
    next()
})

const Model = mongoose.model('Tasks', taskSchema)

module.exports = Model