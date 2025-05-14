const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../modules/models/users.model"); // Assuming this is your model

const userRegister = async (req, res) => {
  const { name, email, password, confirm_password } = req.body;

  // Validation
  if (!name || !email || !password || !confirm_password) {
    return res.status(400).json({ 
      status: "failed",
      message: "All fields are required" 
    });
  }

  if (password !== confirm_password) {
    return res.status(400).json({ 
      status: "failed",
      message: "Passwords do not match" 
    });
  }

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ // 409 Conflict for duplicate resource
        status: "failed",
        message: "Email already exists" 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      status: "success",
      message: "Registered successfully",
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error("Register Error:", {
      message: error.message,
      stack: error.stack,
      body: req.body
    });
    
    res.status(500).json({
      status: "failed",
      message: process.env.NODE_ENV === 'development' 
        ? error.message 
        : "Registration failed. Please try again."
    });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ 
      status: "failed",
      message: "Email and password are required" 
    });
  }

  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ // 401 Unauthorized
        status: "failed",
        message: "Invalid credentials" // Generic message for security
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid credentials"
      });
    }

    // Consider adding JWT token here for authentication
    res.status(200).json({
      status: "success",
      message: "Logged in successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Login Error:", {
      message: error.message,
      stack: error.stack,
      body: req.body
    });
    
    res.status(500).json({
      status: "failed",
      message: "Login failed. Please try again."
    });
  }
};

module.exports = {
  userRegister,
  userLogin,
};