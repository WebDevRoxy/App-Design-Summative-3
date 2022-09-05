//code by Jacynta
//currently following "React & Node ECommerce Tutorials for Beginners 2022 [MERN Stack ECommerce Website]" tutorial by Coding with Basir on YouTube. Will make more tweaks for originality later on

import express from "express";
import Product from "../models/productModel.js";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

//:slug gets data about product from backend
productRouter.get("/slug/:slug", async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug }); //value is what user entered in url
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});
productRouter.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

export default productRouter;
