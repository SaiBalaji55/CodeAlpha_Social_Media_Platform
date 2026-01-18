const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;
    
    console.log("Registration attempt:", { username, email, fullName });
    
    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        message: "User already exists with this email or username" 
      });
    }
    
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ 
      username, 
      email, 
      password: hash,
      fullName: fullName || username
    });
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    
    // Return user without password
    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName || user.username,
      profilePicture: user.profilePicture || null,
      bio: user.bio || '',
      postsCount: 0,
      followersCount: 0,
      followingCount: 0,
      isFollowing: false,
      isOnline: true,
      lastSeen: 'Just now'
    };
    
    res.json({ 
      token, 
      user: userResponse 
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// Login - accepts both email and username
router.post("/login", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    
    console.log("Login attempt received:", { email, username });
    
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    
    // Build query based on provided credentials
    let query = {};
    if (email && email.trim() !== '') {
      query.email = email.trim();
    } else if (username && username.trim() !== '') {
      query.username = username.trim();
    } else {
      return res.status(400).json({ message: "Email or username is required" });
    }
    
    console.log("Finding user with query:", query);
    
    // Find user
    const user = await User.findOne(query);
    
    if (!user) {
      console.log("User not found with query:", query);
      return res.status(400).json({ message: "User not found" });
    }

    console.log("User found:", user.username);
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log("Password mismatch for user:", user.username);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    
    // Return user in the format frontend expects
    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName || user.username,
      profilePicture: user.profilePicture || null,
      bio: user.bio || '',
      postsCount: 0,
      followersCount: 0,
      followingCount: 0,
      isFollowing: false,
      isOnline: true,
      lastSeen: 'Just now'
    };
    
    console.log("Login successful for:", user.username);
    
    res.json({ 
      token, 
      user: userResponse 
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;