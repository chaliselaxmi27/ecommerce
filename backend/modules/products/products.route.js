const express = require("express");

const { 
    productAdd, 
    getAllProduct, 
    productUpdate, 
    productDelete 
  } = require('../../controllers/productControllers');

const productRouter = express.Router();

productRouter.post("/add", productAdd);
productRouter.get("/view", getAllProduct);
productRouter.put("/update/:product_name", productUpdate);
productRouter.delete("/delete/:product_name", productDelete);

module.exports = productRouter;
