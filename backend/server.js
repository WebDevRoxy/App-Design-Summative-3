//code by Jacynta
//currently following "React & Node ECommerce Tutorials for Beginners 2022 [MERN Stack ECommerce Website]" tutorial by Coding with Basir on YouTube. Will make more tweaks for originality later on

import express from "express";
import data from "./data.js";
//still need to import mongoose
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

const app = express();
app.use("/api/seed", seedRouter);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//api router
app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

//defines port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("serve at http://localhost:${port}"); //server starts so can respond to frontend
});
