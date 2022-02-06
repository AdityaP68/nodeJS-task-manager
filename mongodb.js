
//C:\Users\adity\mongodb\bin\mongod.exe --dbpath=C:\Users\adity\mongodb-data
//const mongodb = require('mongodb');
//console.log(mongodb)
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectId

//replacement code
const {MongoClient, ObjectID, ObjectId} = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1/27017'
const databaseName = 'task-manager'

const id = new ObjectID()
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


//------------------------------------------------CREATE--------------------------------------------

    //const db = client.db("DATABASE_NAME")
    //db.collection('collection_name') selects the collection u defined
    //.insertOne() creates/inserts the documents in the collection

    db.collection('test').insertOne(
        {
            name: "XYZ",
            age: 25
        },
        (error, result)=>{
            if(error){
                return console.log(error)
            }
            console.log(result)
        }
    )

    // a promise is returned if callback not provided
    db.collection('test').insertMany([
        {
            name: "Aditya",
            age: 22
        },
        {
            name: "KD",
            age: 20
        }
    ])
    .then((result)=>{
        console.log(result)
    })
    .catch((error)=>{
        console.log(error)
    })
//-------------------------------------------------READ---------------------------------------------

    //.find &.findOne return a cursor that can be used to iterate over the resultant JS objects

    //using forEach to iterate over the returned object
    db.collection('test').find({}).forEach((cursor)=>{
        console.log(cursor)
    })
    //built in toArray method for the find cursor to return the docs JS object in an array
    db.collection('test').find({}).toArray((error, result)=>{
        console.log(result)
    })
    //returns a promise if callback not provided
    db.collection('test').findOne({name: "Aditya"})

//------------------------------------------------UPDATE--------------------------------------------

    //updateOne returns a promise which can be chained by resolve() and reject()

    //syntax 1 updateOne(filter, update: updatefilter, options, callack)
    db.collection('tasks').updateOne(
        {_id: ObjectId("61fd85bb56a771a21b87eb98")} //filter
        ,{$set: {"task": "oh demm!!!!"}} //Update
        , {upsert: true} // add document if _id doesnt exist
    ).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })

    //syntax 2
    console.log('\n')
    const updatePromise =    db.collection('tasks').updateOne(
            {_id: new ObjectID("61fd85bb56a771a21b87eb99")} //filter
            ,{$set: {"task": "lmaou"}} //Update
            ,{upsert: true} // dont insert new if doc doesnt exists
        )

        updatePromise
        .then((result)=>{
            console.log(result)
        })
        .catch((error)=>{
            console.log(error)
        })

    //updateMany
    db.collection('test').updateMany(
        {_id: new ObjectID("61ffb031576bb1ca7dda2887")},//filter
        {$inc: {age:1}},//update
        {upsert: true} //option setting
    )
    .then((result)=>{
        console.log(result)
    })
    .catch((error)=>{
        console.log(error)
    })

//------------------------------------------------DELETE--------------------------------------------

    //deleteOne(filter,options,callback) and deleteMany
    db.collection('test').deleteMany(
        {age: 20}, //filter
    ).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })

})

