// creating express object
const express = require('express')  // exporting the express function to express variable
// Here express is an function 
//console.log(express)

const app = express() // we use app variable to get the express object

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