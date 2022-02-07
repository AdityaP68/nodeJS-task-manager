const express = require('express')
const User = require('./models/User')

//check its functioning
require('./db/mongoose')
const app = express()
const port = process.env.PORT || 3000

//check its functioning
app.use(express.json())

app.post('/users',(req, res)=>{
    const user = new User(req.body)

    
    user.save().then((result)=>{
                    res.send(result)
                })
                .catch((e)=>{
                    res.status(400).send(e)
                })
    //cant send 2 response to the user only 1 response per request
   // res.send('testing')
})

app.listen(port, ()=>{
    console.log(`The server is running on port ${port}`)
})