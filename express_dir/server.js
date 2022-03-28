// creating express object
const express = require('express')  // exporting the express function to express variable
// Here express is an function 
//console.log(express)

const app = express() // we use app variable to get the express object

// to extract body of request object 
app.use(express.json())

//Fake user data
let users =[
    {id:1,
    name:'ravi',
    age:21
},
{
    id: 2,
    name:"vishwanath",
    age:19
}
]

// create  RestAPI
app.get('/getusers',(req,res)=> {  // defining the route 
    res.send({massage:"all users", payload:users}) // sending the response to the browser
})

// O/P:
// {
//     "massage": "all users",
//     "payload": [
//       {
//         "id": 1,
//         "name": "ravi",
//         "age": 21
//       },
//       {
//         "id": 2,
//         "name": "vishwanath",
//         "age": 19
//       }
//     ]
//   }

app.get('/getusers/:id',(req,res)=> {   //:id is an url parameter
//get url param
let userID = (+req.params.id) //{id:123} // (+ ....) it converts string to number
//O/P:
//{ id: '1' }

//search user object
let userOBJ = users.find(userObj=> userObj.id == userID)
// if user not found
console.log(userID)
//O/P : 2
console.log(userOBJ) 
//O/P : { id: 2, name: 'vishwanath', age: 19 }
if (userOBJ  === undefined){
    res.send({message:"user not found"})
}
//if user found
else{
    res.send({message:"user found ", payload:userOBJ})
}
})

//ex: http://localhost:4000/getuser/2 or 3 2 an or 3 are ids => this is called as url argument


// create a route to create-user
// To create client should send post request (new user resource)
// while sending request we need to send what kind of the data we are sending we needed to send 
//***** for POST and PUT request contents the body   */
app.post('/create-user',(req,res)=> {
    //get user object sent by client 
    let newUser  = req.body;
   
    // push new user to users list 
    users.push(newUser)
    //send response
    res.send({message:"New User  Created "})

})

// create a route  to modify  user data
app.put('/update-user',(req,res)=> {
    //get modified user obj
    users.map(us=> {
if (us.id == req.body.id){
    us.name = req.body.name,
    us.age = req.body.age
    console.log(req.body.name)
}
// console.log(us)
// console.log(us.id)
    })
    console.log(users)
    // let modifiedObj= req.body 
    res.send({message:"Modified"})
})

app.delete('/remove-user/:id',(req,res) => {
   let userID = (+req.params.id)
   console.log(userID)
    users.forEach((user)=> {
        if (user.id == userID){
            delete user
        }
        res.send({message:"deleted successfully"})
    })
})

app.listen(4000,()=> {
    console.log("server is running in the port no 4000") // we had created http server with the express module
})