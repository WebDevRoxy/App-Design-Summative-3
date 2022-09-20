//code by Jacynta
//edits by Hunter
//code inspired by "React & Node ECommerce Tutorials for Beginners 2022 [MERN Stack ECommerce Website]" tutorial by Coding with Basir on YouTube


import express from 'express';
import data from './data.js';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import cors from 'cors';

import productModel from './models/productModel.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

//create/update/delete routes setup (Hunter)
app.post('/insert', async (req, res) => {

const name = req.body.name
const price = req.body.price
const countInStock = req.body.countInStock
const description = req.body.description
const category = req.body.category
const slug = req.body.name

const prod = new productModel({ 
  name: name, 
  image: "/images/placeholder.png", 
  countInStock: countInStock,
  price: price,
  description: description,
  category: category, 
  slug: name}); 

  try{
    await prod.save();
  } catch(err){
    console.log(err)
  }
});

app.get('/read', async (req, res) => {
  productModel.find({}, (err, result) => {
    if (err) {
      res.send(err)
    }

    res.send(result);
  })
});

app.put('/update', async (req, res) => {

  const newName = req.body.newName;
  const newDesc = req.body.newDesc;
  const newPrice = req.body.newPrice;
  const id = req.body.id;
  
  const price = req.body.price
  const countInStock = req.body.countInStock
  const description = req.body.description
  const category = req.body.category
  const slug = req.body.name
  
    try{
     await productModel.findById(id, (err, updatedProduct) => {
        updatedProduct.name = newName;
        updatedProduct.description = newDesc;
        updatedProduct.price = newPrice;
        updatedProduct.save();
        res.send("update");
      })
    } catch(err){
      console.log(err)
    }
  });

//To do



//api router
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

//Error Handling for Express
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

//defines port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`); //server starts so can respond to frontend
});
