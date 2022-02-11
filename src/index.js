const express = require('express')
const User = require('./models/User')
const Task = require('./models/Task')

//check its functioning
require('./db/mongoose')
const app = express()
const port = process.env.PORT || 3000

//check its functioning
app.use(express.json())

app.post('/users',(req, res)=>{
    const user = new User(req.body)
    user.save().then((result)=>{
                    res.status(201).send(result)
                })
                .catch((e)=>{
                    res.status(400).send(e)
                })
    //cant send 2 response to the user only 1 response per request
   // res.send('testing')
})

app.get('/users',(req,res)=>{
    User.find({}).then((result)=>{
            res.status(200).send(result)
        }).catch((e)=>{
            res.status(500).send(e)
        })
})

app.get('/users/:id',(req,res)=>{
    const _id = req.params.id

    User.findById(_id).then((result)=>{
        if(!result){
            return res.status('200').send(result)
        }
        res.send(result)
    }).catch((e)=>{
        res.status('400').send(e)
    })

})

//-----------------------------------------------task-manager-endpoints--------------------------------------

app.post('/tasks',(req,res)=>{
    const task = new Task(req.body)
    task.save().then((result)=>{
            res.status(201).send(result)
        }).catch((e)=>{
            res.status(400).send(e)
        })
})


//query to list all the docs
app.get('/tasks', (req,res)=>{
    User.find({}).then((result)=>{
        res.send(result)
    }).catch((e)=>{
        res.send(e)
    })
})

app.get('/tasks/:id', (req,res)=>{
    
    const _id = req.params.id
    User.findById(_id).then((result)=>{
        if(!result){
            return res.status('404').send(result)
        }
        res.send(result)
    }).catch((e)=>{
        res.send(e)
    })
})



app.listen(port, ()=>{
    console.log(`The server is running on port ${port}`)
})