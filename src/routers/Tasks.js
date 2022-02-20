const express = require('express')
const Task = require('../models/Task')
const router = new express.Router()




//add new task ---CREATE
router.post('/tasks',async (req, res)=>{
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
router.get('/tasks', async (req,res)=>{
    try{
        const task = await Task.find({})
        res.status(201).send(task)
    }
    catch (e){
        res.status(400).send(e)
    }

})

//search for specific doc -- READ-ONE
router.get('/tasks/:id', async (req,res)=>{
    
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
router.get('/tasks/delete/:id', async (req,res)=>{
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

router.patch('/tasks/:id',async (req,res)=>{

    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ["completed"]

    const check = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })

    if(!check){
        return res.send('Invalid Arguments! ')
    }
    try{
        //const user = await Task.findByIdAndUpdate(_id,req.body,{new: true, isValidOperation: true})
        const task = await Task.findByIdAndUpdate(_id)
        console.log(task)
        updates.forEach((update)=>{
            console.log(req.body)
            console.log(update)
            task[update] = req.body[update]
        })
        task.save()
        if(!task){
            return res.status(404).send({error: "Object not found!"})
        }
        res.send(task)

    }
    catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router