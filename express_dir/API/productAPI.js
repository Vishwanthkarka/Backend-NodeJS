const express = require('express')
const ProductApp = express.Router()

//to extract body of request object
ProductApp.use(express.json());

//get all products
ProductApp.get('/getproduct',(request,response)=>{
  response.send({message:"all products"})
})

//get product by id
ProductApp.get("/getproduct/:id",(request,response)=>{

  response.send({message:`product with id ${request.params.id}`})
})


module.exports = ProductApp