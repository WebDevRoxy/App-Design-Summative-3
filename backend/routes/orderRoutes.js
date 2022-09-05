//code by Jacynta
//currently following "React & Node ECommerce Tutorials for Beginners 2022 [MERN Stack ECommerce Website]" tutorial by Coding with Basir on YouTube. Will make more tweaks for originality later on

import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../orderModel.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();
//API for post
orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({
        ...Order,
        product: x._id,
      })),
      shippingAddress: req.body.orderItems.map((x) => ({
        ...x,
        product: x._id,
      })),
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });

    const order = await newOrder.save();
    res.status(201).send({ message: "New Order Created", order });
  })
);

export default orderRouter;
