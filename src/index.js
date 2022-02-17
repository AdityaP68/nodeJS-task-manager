const express = require('express')
const User = require('./models/User')
const Task = require('./models/Task')
const { findByIdAndUpdate, findById } = require('./models/User')
const route = require('./routers/Users')

//check its functioning
require('./db/mongoose')
const app = express()
const port = process.env.PORT || 3000

//check its functioning
app.use(express.json())

app.use(route)
const router = new express.Router()
router.get('/test',(req,res)=>{
    res.send('lmao dead')
})

app.use(router)

app.post('/users',async (req, res)=>{
    const user = new User(req.body)

    try{
        await user.save()
        res.status(201).send(user)
    }   
    catch (e){
        res.status(400).send(e)
    }

    // user.save().then((result)=>{
    //                 res.status(201).send(result)
    //             })
    //             .catch((e)=>{
    //                 res.status(400).send(e)
    //             })

    //cant send 2 response to the user only 1 response per request
   // res.send('testing')
})


app.get('/users',async (req,res)=>{

    try{
        const users = await User.find({})
        res.status(200).send(users)
    }
    catch (e){
        res.status(500).send(e)
    }
    // User.find({}).then((result)=>{
    //         res.status(200).send(result)
    //     }).catch((e)=>{
    //         res.status(500).send(e)
    //     })
})

app.get('/users/:id',async (req,res)=>{
    const _id = req.params.id
    try{
        const val = await User.findById(_id)
        //val check for???
        if(!val){
            return res.status(200).send(val)
        }
        res.send(val)
    }
    catch(e){
        res.status(400).send(e)
    }
    // User.findById(_id).then((result)=>{
    //     if(!result){
    //         return res.status('200').send(result)
    //     }
    //     res.send(result)
    // }).catch((e)=>{
    //     res.status('400').send(e)
    // })

})


//update routes are most complex
app.patch('/users/:id', async (req,res)=>{
    //const data = req.body.params

    //converts the arguments provided to the query string to an array
    const updates = Object.keys(req.body)
    //an array of all the allowed updates that can be made
    const allowedUpdates = ["name", "password", "email", "age"]
    //compare all the provided changes with the allowed update name field
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation){
        return res.status(404).send({error:"Invalid Arguments provided"})
    }


    try{
        // (Id, suggested update, options object)
        const user = await User.findByIdAndUpdate("6208d799ee282d1202d16d3f", req.body, {new: true, runValidators: true})
        
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }
    catch (e){
        //there will be multiple  kinds of error
        res.status(500).send(e)
    }

})
app.delete('/users/:id',async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send('Object not found!')
        }
        res.send(user)
    }
    catch (e) {
        res.status(500).send(e)
    }
    

    

})


//-----------------------------------------------task-manager-endpoints--------------------------------------

//async and await throw error and crash the application
//thats why we use try catch block so the if error thrown, we can isolate that error while that program still runs


//add new task ---CREATE
app.post('/tasks',async (req, res)=>{
    const task = new Task(req.body)

    try{
        await task.save()
        res.status(201).send(task)
    }   
    catch (e){
        res.status(400).send(e)
    }
})


//list all tasks -- READ-ALL
app.get('/tasks', async (req,res)=>{
    try{
        const task = await Task.find({})
        res.status(201).send(task)
    }
    catch (e){
        res.status(400).send(e)
    }

})

//search for specific doc -- READ-ONE
app.get('/tasks/:id', async (req,res)=>{
    
    const _id = req.params.id
    try{
        const task = await Task.findById(_id)
        if(!task){
            return res.status(404).send(task)
        }
        res.status(200).send(task)
    }
    catch(e){
        res.status(500).send(e)
    }
    
})





//delete document by ID => find + delete -- DELETE-ONE
app.get('/tasks/delete/:id', async (req,res)=>{
    const _id = req.params.id
    try{
        const del = await Task.findByIdAndDelete(_id)
        //res.send(del)
        const count = await Task.countDocuments({commpleted: false})
        res.send(count)
    }
    catch (e)
    {
        console.log(e)
    }
    
    // .then((result)=>{
    //     res.render(result)
    //     return Task.countDocuments({completed: false})
    // }).then((result)=>{
    //     res.render(result)
    // }).catch((e)=>{
    //     res.render(e)
    // })
})

app.patch('/tasks/:id',async (req,res)=>{

    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ["completed"]
    console.log(_id)
    const check = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })

    if(!check){
        return res.send('Invalid Arguments! ')
    }
    try{
        const user = await Task.findByIdAndUpdate(_id,req.body,{new: true, isValidOperation: true})
        if(!user){
            return res.status(404).send({error: "Object not found!"})
        }
        res.send(user)

    }
    catch (e) {
        res.status(500).send(e)
    }
})






app.listen(port, ()=>{
    console.log(`The server is running on port ${port}`)
})