// creating express object
const express = require('express')  // exporting the express function to express variable
// Here express is an function 
//console.log(express)
// importing the dotenv it don't have return stmt
require("dotenv").config()
const app = express() // we use app variable to get the express object
const mclient = require("mongodb").MongoClient;

//importing Path module 
const path = require('path')


//connect build of react app with nodejs
app.use(express.static(path.join(__dirname,'./build'))) // with the backend the reactjs is an static application



//DB connection URL
const DBurl = process.env.DATABASE_CONNECTION_URL
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

app.use('*',(request,response)=> { // * mean except api links
    response.sendFile(path.join(__dirname,'./build/index.html'))
}) 

app.use((req,res,next)=> { // this is a middleware with out assigning the variable 
    res.send({message:`path ${req.url} is invalid`})
}) // if no route executed the this middleware will execute 

//dealing with page refresh


//error handling middleware
app.use((err,req,res,next)=> {
    res.send({message:"An error occurred" , reason:`${err.message}`})
})
const port = process.env.PORT;
app.listen(port,()=> {
    console.log(`web server listening on port  ${port}`) // we had created http server with the express module
})