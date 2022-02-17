const express = require('express')

const router = new express.Router()

router.get('/test2',(req,res)=>{
    res.send('klkl')
})

module.exports = router