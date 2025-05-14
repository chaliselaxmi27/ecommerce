const mongoose = require("mongoose");
const Product = require("../modules/models/products.model");

const productAdd = async (req, res) => {
  const { product_name, description, price, category } = req.body;
  if (!product_name || !description || !price || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const createdProduct = await Product.create({
      product_name,
      description,
      price,
      category,
    });
    res.status(201).json({
      message: "Added Successfully",
      product: createdProduct
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ 
      message: "Failed to fetch products", 
      error: error.message 
    });
  }
};

const productUpdate = async (req, res) => {
  const { product_name } = req.params;

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { product_name },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
};

const productDelete = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      product_name: req.params.product_name,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully", product });
  } catch (error) {
    res.status(500).json({ 
      message: "Failed to delete product", 
      error: error.message 
    });
  }
};

// Export all functions together
module.exports = {
  productAdd,
  getAllProduct,
  productUpdate,
  productDelete
};