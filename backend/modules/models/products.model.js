const { MongoCryptKMSRequestNetworkTimeoutError } = require("mongodb");

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    product_name: {
        type: String,
        required: [true, "ProductNAme is required"],
        
      },
    description: {
      type: String,
      required: [true, "Description is required"],
      
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    category: {
        type: String,
        required: [true, "It is required"],
      },
      
    
    
  },
  {
    timestamps: true,
  }
);
const productModal = mongoose.model("products", productSchema);
module.exports=productModal;
