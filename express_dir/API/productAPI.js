const express = require('express')
const ProductApp = express.Router()
const expressAsyncHandler = require('express-async-handler') // with this module you don't need to have try and catch block

//to extract body of request object
ProductApp.use(express.json());

//get all products
ProductApp.get('/getproduct',(request,response)=>{
  response.send({message:"all products"})
})


// update product 
ProductApp.put('/update-product',expressAsyncHandler(async(req,res)=> {
  let productCollectionObject = req.app.get("productCollectionObject")
let modifiedProduct  = req.body
let products = await productCollectionObject.updateOne({productId:modifiedProduct.productId},{$set:{...modifiedProduct}}) // ... => spread syntax
res.send({message:"product modified"})
}))

ProductApp.get("/getproducts",expressAsyncHandler(async(req,res)=> {
  // get product object
  let productCollectionObject = req.app.get("productCollectionObject")
  //  get all the values from the server
  let products = await productCollectionObject.find().toArray()//  returns the curser and the toArray all the object into an array
  //send response
  res.send({message:"All products",payload:products}) 
} ))
//#1 Using callback
// ProductApp.post("/postProduct",(req,res)=> { 
// //get productCollection Object
//   let productCollectionObject = req.app.get("productCollectionObject") // in request obj it contents .app

//   //get product object 
//  let productObj =req.body
//  console.log(productObj)

//  //insert productObj 
 // there is no gauntry the that request successfully completed(network error) so we use err object to handle
// this is called as error first call 
// we use the result object to handling when there is no error 
// ofter the productObj is added in the collection in database if it takes 7s to perform it then ofter the call back will executed up
// #1
//USING CALL BACK 
//  productCollectionObject.insertOne(productObj,(err,result)=>{
//    if(err){
//      console.log("error in creating the product",err)
//    }
//    else{
//      res.send({message:'product created sucecessfully'})
//    }
//  })
//  // all the database operations are blocking request ,it's time taking process 
//  // first it should connect the server 
// })

ProductApp.get("/getproduct/:id",expressAsyncHandler(async(req,res)=> {
  //get productCollectionObject
  let productCollectionObject = req.app.get("productCollectionObject")
  // get the id 
  let pid = (+req.params.id)
  let product = await productCollectionObject.findOne({productId:pid})
  // if product is not existed then it returns null
  if (product == null){
    res.send({message:"product not existed"})
  }
  // if product existing
  else{
  res.send({message:"product existed",payload:product})
  }
}))

// //#2
// //Creating product using promise 
// ProductApp.post("/postProduct",(req,res)=> { 
//     let productCollectionObject = req.app.get("productCollectionObject")
//    let productObj =req.body
//    productCollectionObject.insertOne(productObj)
//    .then(result=>{res.send({message:'product created sucecessfully'})} )
//    .catch(err=> console.log('err in creating product ',err))

//   })

// #3
  //Async and await
  ProductApp.post("/create-product", expressAsyncHandler( async(req,res)=> { 
   // try{
    let productCollectionObject = req.app.get("productCollectionObject")

   let productObj =req.body
   // insertOne is an blocking request
  await productCollectionObject.insertOne(productObj)
  //send response
res.send({message:'product created successfully'})
  //}
  //catch(err){
// handling err obj to error handling middleware 
 // }
   
  }))

  // deleting product
  ProductApp.delete('/delete-product/:id',expressAsyncHandler(async(req,res)=> {
    // get productCollectionobject
    let productCollectionObject = req.app.get("productCollectionObject")
// product id to delete
    let productDel = (+req.params.id)
    console.log(productDel);
await productCollectionObject.deleteOne({productId:productDel})
res.send({message:"deleted successfully"})
  }))
  


module.exports = ProductApp