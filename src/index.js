const express = require('express')
const User = require('./models/User')
const Task = require('./models/Task')

//check its functioning
require('./db/mongoose')
const app = express()
const port = process.env.PORT || 3000

//check its functioning
app.use(express.json())



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
        await User.find({})
        res.status(200).send(User)
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

//-----------------------------------------------task-manager-endpoints--------------------------------------


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
app.get('/tasks', (req,res)=>{
    try{
        const task = Task.find({})
        res.status(201).send(task)
    }
    catch (e){
        res.status(400).send(e)
    }

})

//search for specific doc -- READ-ONE
app.get('/tasks/:id', (req,res)=>{
    
    const _id = req.params.id
    try{
        const task = Task.findById(_id)
        if(!task){
            return res.status(404).send(task)
        }
        res.status(200).send(task)
    }
    catch(e){
        res.status(500).send(e)
    }
    
})

app.get('/tasks/delete/:id',(req,res)=>{
    const _id = req.params.id
    Task.findByIdAndDelete(_id).then((result)=>{
        res.render(result)
        return Task.countDocuments({completed: false})
    }).then((result)=>{
        res.render(result)
    }).catch((e)=>{
        res.render(e)
    })
})



app.listen(port, ()=>{
    console.log(`The server is running on port ${port}`)
})