const User = require('../models/user');

async function handlePostSignUp(req, res) {
  try {
    console.log("Request body:", req.body);

    const { fullname, email, password } = req.body;

    // Validate required fields
    if (!fullname || !email || !password) {
      console.log("Missing required fields:", { fullname: !!fullname, email: !!email, password: !!password });
      return res.status(400).json({ 
        error: "All fields (fullname, email, password) are required" 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists with email:", email);
      return res.status(400).json({ error: "Email already registered" });
    }

    // Create new user
    const newUser = await User.create({ fullname, email, password });
    console.log("User created successfully:", newUser.email);

    return res.redirect('/signin');
  } catch (err) {
    console.error("Signup error:", err);
    
    // Handle specific MongoDB errors
    if (err.code === 11000) {
      return res.status(400).json({ error: "Email already registered" });
    }
    
    if (err.name === 'ValidationError') {
      const validationErrors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: `Validation failed: ${validationErrors.join(', ')}` });
    }
    
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { handlePostSignUp };
