// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectId

//replacement code

const {MongoClient, ObjectID} = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1/27017'
const databaseName = 'task-manager'

const id = ObjectID()
console.log(id)
console.log(id.getTimestamp())

//making connection with the database
MongoClient.connect(connectionUrl,{useNewUrlParser: true},(error,client)=>{
    //if error in establishing a connection 
    if(error){
        return console.log(error)
    }
    //if connection with the database is a success
    console.log('\nMongo connection success!')
    //with client as a response we use db method to create/connect to the databasse provided as an argument
    const db = client.db(databaseName)
    db.collection('users').insertOne({
        name:'sump',
        age: 20
    })


    const test = db.collection('users').find({})


    //prints all the docs in a collection
    //db.collection('users').find({}).forEach(doc=>console.log(doc))

    db.collection('tasks').insertMany([{
        _id: id,
        task: "CodeChef Long Challenge Feb",
    }, {
        task: "LeetCode",
    }, {
        task: "Node JS",
    }, {
        task: "Machine Learning",
    }, {
        task: "Finance model AI/ML",
    }, {
        task: "ReactJS"
    }], (error,result)=>{
        if(error){
            return console.log("Error while inserting Docs")
        }
        if(result.acknowledged === true){
            console.log("insertion successful")
        }
    })

    // db.collection('users').insertOne({
    //     name: 'Aditya',
    //     age: 20
    // }, (error,result)=>{
    //     if(error){
    //         return console.log('error inserting docs')
    //     }
    //     console.log(result)
        
    // })

    //connecting/creating a collection and inserting a document with a callback
    // db.collection('users').insertMany(
    //      //array of object is passed
    //     [{
    //         name: 'rrehweee',
    //         age: 20
    //     },
    //     {
    //         name: 'fqefeqfeq',
    //         age: 'DND'
    //     }], 

    //     //insertion is an async process
    //     (error, result)=>{
    //         if(error){
    //             return console.log('Data inserted successfully')
    //         }
    //         console.log(db.collection('users').find())

    //     })


})
