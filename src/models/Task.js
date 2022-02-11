const mongoose = require('mongoose')
const validator = require('validator')

const Model = mongoose.model('Tasks', {
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

module.exports = Model