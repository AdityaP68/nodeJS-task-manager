const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient
const connectionUrl = 'mongodb://127.0.0.1/27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionUrl,{useNewUrlParser: true},(error,client)=>{
    if(error){
        return console.log(error)
    }
    console.log('connected')
    const db = client.db(databaseName)

    db.collection('users').insertOne({
        name: 'Aditya',
        age: 20
    }, (error,result)=>{
        if(error){
            return console.log('error inserting docs')
        }
        console.log(result)
        
    })
})