const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const userRouter = require("./modules/users/users.route");
const productRouter = require("./modules/products/products.route");

const mongo_connect = process.env.mongo_connect;
require("./modules/models/users.model");
require("./modules/models/products.model");


app.use(express.json()); 

app.use(cors());

const options = {
  origin: "http://localhost:3000",
};
app.use(cors(options));

mongoose
  .connect(mongo_connect, {})
  .then(() => {
    console.log("Mongo connection was successfull!");
  })
  .catch((err) => {
    console.log("connection failed");
  });

app.use("/users", userRouter);
app.use("/products", productRouter);

app.listen(8000, () => {
  console.log("server started");
});
