//create router to handle user api reqs
// importing bcryptjs
const bcryptjs = require('bcryptjs')
const express = require('express')
const userApp  = express.Router() // created min express application
const expressAsyncHandler = require('express-async-handler') // with this module you don't need to have try and catch block
// importing jsonwebtoken to create token
const jwt = require("jsonwebtoken")

userApp.use(express.json()) // it is also a middleware  
// in this body is extracted from the request and it is called as body passer middleware

//Using middleware 
//To execute middleware for each request 
// we use app.use(middleware)



// to use middleware to executed at specific methods
//app.htt-method(path,middleware,(req,res)={})




userApp.get('/getusers',expressAsyncHandler(async(req,res)=> {   //:id is an url parameter

        const userCollectionObject = req.app.get('userCollectionObject')
        const userObj = await userCollectionObject.find().toArray()
        res.send({message:"user"})
        console.log(userObj)

}))

//ex: http://localhost:4000/getuser/2 or 3 2 an or 3 are ids => this is called as url argument


// create a route to create-user
// To create client should send post request (new user resource)
// while sending request we need to send what kind of the data we are sending we needed to send 
//***** for POST and PUT request contents the body   */
userApp.post('/create-user',expressAsyncHandler(async(req,res)=> {
    const userCollectionObject = req.app.get('userCollectionObject')
    let newUserObj = req.body;
    console.log(newUserObj)
    let userOfDB = await userCollectionObject.findOne({username:newUserObj.username})
    // if user exist
    if(userOfDB !== null){
res.send({message:"UserName has already taken.. PLZ choose another username"})

    }
    // if user not existed
    else{
        // hashing the password
let hashedPassword = await bcryptjs.hash(newUserObj.password,6)
//change the password with hash password 
newUserObj.password = hashedPassword
//inserting to the database
        await userCollectionObject.insertOne(newUserObj)
        res.send({message:"Created user"})
    }
        
}))



userApp.post("/login",expressAsyncHandler (async(req,res)=> {
    const userCollectionObject = req.app.get('userCollectionObject')
    let userCredObj = req.body
    let userOfDB = await userCollectionObject.findOne({username:userCredObj.username})
    // checking the username existed or not
    if (userOfDB == null){
        res.send({message:"Invalid user"})

    }
    // if username exited
else{
    // comparing password
let status = await bcryptjs.compare(userCredObj.password,userOfDB.password)
//if password not match 
if(status == false){
    res.send({message:"Invalid password"})
}
// if password matches
else{
// create token 
let token = jwt.sign({username:userOfDB.username},'abcdef',{expiresIn:60})
//send the token 
res.send({message:"login success ", payload:token, userObj:userOfDB})
}
}
}))



// create a route  to modify  user data
userApp.put('/update-user',expressAsyncHandler(async(req,res)=> {
    //get modified user obj
    /// userCollection object
    const userCollectionObject = req.app.get('userCollectionObject')
   let  userUpdateObj = req.body
   let userUpdateOfDB = await userCollectionObject.updateOne({username:userUpdateObj.username},{ $set: {...userUpdateObj}})
   res.send({message:"update successful "})
}))

userApp.delete('/remove-user/:id',(req,res) => {
   let userID = req.params.id
   const userCollectionObject = req.app.get('userCollectionObject')
   let userDeleteOfOBJ = userCollectionObject.deleteOne({username:userID})
   res.send({message:"Delete Succussfully"})
  
})


module.exports = userApp
