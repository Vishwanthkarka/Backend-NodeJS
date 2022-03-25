//importing modules
const http = require('http')

// create http server

// the purpose of the server is it should listen the client request and it should send back the response to the client
 const server = http.createServer((request,response)=> { // request call back function  // two argument
 // which takes request object and which can response object 
console.log(request.method)  // to find request type
 //server with response.end("This is response from http server")
  //GET req
  if(request.method=='GET'){
    if(request.url==='/getusers'){
      response.end("This response for USERS")
    }
    if(request.url==='/getproducts'){
      response.end("This response for PRODUCTS")
    }
  }


  //POST req
  if(request.method=='POST'){
   
    if(request.url=='/createuser'){
      response.end("User created")
    }

    if(request.url=='/createproduct'){
      response.end("Product created")
    }
  }

 //PUT req
 if(request.method=='PUT'){
    response.end("This response for PUT request")
  }
  
  //DELETE req
  if(request.method=='DELETE'){
    response.end("This response for DELETE request")
  }


})
//  client => HTTP Request   Server 
// client  <=  HTTP Response  Server
//TYPES OF REQUESTS

//GET =>  read  - with empty browser we only can  get  request 
//  POST  => create  for other request we needed a client side application like ReactJS
//   PUT  => update
// DELETE => delete

 // every server should have the port number to  listen client request 

 


 //assign port number 
 server.listen(3000,()=> console.log("server listening on port 3000. "))


 // we needed sometext.http file for reqest 