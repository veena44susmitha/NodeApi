const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Product = require('./models/productModel')

//middleware
app.use(express.json())

//routes

//Create a Product
app.post('/products',async(req,res)=>{
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
    
})

//Read Products
app.get('/products',async(req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//Read a Product by Id
app.get('/products/:id',async(req,res)=> {
    try{
        const {id}=req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update a product by Id
app.put('/products/:id',async(req,res)=>{
    try{
        const {id}= req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//delete a product by Id

app.delete('/products/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status().json({message:`cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
//mongoDB connection
mongoose.connect('mongodb+srv://veena:admin12345@devapi.dyfg0cy.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    app.listen(3000, ()=>{
        console.log('NodeAPI app is running on port 3000')
    });
    console.log('Connected to MongoDB')
}).catch(()=>{
    console.log('Error connecting MongoDB')
})