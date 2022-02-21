const express = require('express')
const { findOne } = require('../models/User')
const User = require('../models/User')
const router = new express.Router()


router.post('/users',async (req, res)=>{
    const user = new User(req.body)
    const token = await user.generateAuthToken()

    try{
        await user.save()
        res.status(201).send({user,token})
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


router.get('/users',async (req,res)=>{

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

router.get('/users/:id',async (req,res)=>{
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
//middlewear is by passed by update request, thus need to be refactored
router.patch('/users/:id', async (req,res)=>{
    //const data = req.body.params
    const _id = req.params.id
    //converts the arguments provided to the query string to an array
    const updates = Object.keys(req.body)
    //an array of all the allowed updates that can be made
    const allowedUpdates = ["name", "password", "email", "age"]
    //compare all the provided changes with the allowed update name field
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(404).send({error:"Invalid Arguments provided"})
    }


    try{
        // (Id, suggested update, options object)
        //need to refactor this because of the direct bypass of middleware
        //const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        const user = await User.findByIdAndUpdate(_id)
        //here we have an instance of user model

        updates.forEach((update)=>{
            
            console.log(update)
            console.log(user[update])
            console.log(req.body[update])
            user[update] = req.body[update]
        })

        await user.save()
        
        
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
router.delete('/users/:id',async (req,res)=>{
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

//login end-point
router.post('/users/login',async (req, res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        //here it wont work on User as this method isnt ment for the collection but for an individual unique user
        //thus the method lives on the user instance
        const token = await user.generateAuthToken()
        res.send({
            user,token
        })

    }
    catch (e){
        res.status(500).send(e)
    }

})


module.exports = router