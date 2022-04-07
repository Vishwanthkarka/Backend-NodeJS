// creating express object
const express = require('express')  // exporting the express function to express variable
// Here express is an function 
//console.log(express)
const app = express() // we use app variable to get the express object
const mclient = require("mongodb").MongoClient;

//DB connection URL
const DBurl ="mongodb+srv://vishwa:vishwa@cluster0.ot5sq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//connect with mongoDB 
mclient.connect(DBurl)
.then((client)=> {  // as the catch method contains err object as the samoe way then contains client objects
    //get DB object
    let dbObj = client.db('vnr2022db')
    //create collection objects
    let userCollectionObject = dbObj.collection("usercollection")
    let productCollectionObject = dbObj.collection("productcollection")
    //sharing collection objects to APIS
    app.set("userCollectionObject",userCollectionObject) // key ,value
    app.set("productCollectionObject",productCollectionObject)
    
    console.log("DB connection sucess")
})
.catch(err=> console.log('Error in DB connection',err))

//import userApp  and productApp
const userApp = require('./API/userAPI')
const productApp = require('./API/productAPI')


app.use('/user-api',userApp)  // it is the type of execution to of middleware
// middleware will be executed when the request contains user-api
app.use('/product-api',productApp)


app.use((req,res,next)=> { // this is a middleware with out assigning the variable 
    res.send({message:`path ${req.url} is invalid`})
}) // if no route executed the this middleware will execute 


//error handling middleware
app.use((err,req,res,next)=> {
    res.send({message:"An error occurred" , reason:`${err.message}`})
})
app.listen(4000,()=> {
    console.log("server is running in the port no 4000") // we had created http server with the express module
})