
const User = require('../models/user');

async function handlePostSignIn(req, res) {
    try {
        console.log("Sign in request body:", req.body);
        
        const { email, password } = req.body;
        
        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ 
                error: "Email and password are required" 
            });
        }
        
        // Check user credentials
        const currUser = await User.matchPassword(email, password);
        
        if (currUser) {
            console.log("User signed in successfully:", currUser.email);
            return res.redirect('/');
        } else {
            console.log("Invalid credentials for email:", email);
            return res.status(401).json({ error: "Invalid email or password" });
        }
        
    } catch (err) {
        console.error("Signin error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {handlePostSignIn};