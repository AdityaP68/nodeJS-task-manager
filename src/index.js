const express = require('express')
const User = require('./models/User')
const Task = require('./models/Task')
const bcrypt = require('bcryptjs')
const { findByIdAndUpdate, findById } = require('./models/User')
const userRoutes = require('./routers/Users')
const taskRoutes = require('./routers/Tasks')

//check its functioning
require('./db/mongoose')
const app = express()
const port = process.env.PORT || 3000

//check its functioning
app.use(express.json())

app.use(taskRoutes)
app.use(userRoutes)

// const router = new express.Router()
// router.get('/test',(req,res)=>{
//     res.send('lmao dead')
// })

// app.use(router)


//-----------------------------------------------task-manager-endpoints--------------------------------------

//async and await throw error and crash the application
//thats why we use try catch block so the if error thrown, we can isolate that error while that program still runs






app.listen(port, ()=>{
    console.log(`The server is running on port ${port}`)
})

//becrypt module for password hashing


//these return promises

//hashing is a one way algo while encryption algo is reversible 2 way
const func = async ()=>{
    const password = "Red1234!"
    const hashPass = await bcrypt.hash(password, 8) //8 is best value between security and speed
    console.log(password)
    console.log(hashPass)

    //compares the password and the hash by hashing the password and then comparing it 
    const ismatch = await bcrypt.compare('red1234!', hashPass)
    console.log(ismatch)
}

func()