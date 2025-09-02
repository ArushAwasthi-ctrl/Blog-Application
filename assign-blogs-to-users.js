const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const Blog = require('./models/blog');
const User = require('./models/user');

async function assignBlogsToUsers() {
    try {
        // Connect to database
        await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);
        console.log("Connected to database");

        // Get all blogs without createdBy
        const orphanedBlogs = await Blog.find({ createdBy: { $exists: false } });
        console.log(`Found ${orphanedBlogs.length} blogs without creators`);

        // Get all users
        const users = await User.find({});
        console.log(`Found ${users.length} users`);

        if (orphanedBlogs.length === 0) {
            console.log("✅ All blogs already have creators assigned!");
            return;
        }

        if (users.length === 0) {
            console.log("❌ No users found to assign blogs to!");
            return;
        }

        console.log("\n🔧 FIXING OPTIONS:");
        console.log("1. Assign all orphaned blogs to the first user");
        console.log("2. Assign blogs randomly to different users");
        console.log("3. Assign based on blog titles (if they contain user names)");

        // Option 1: Assign all to first user (safest)
        console.log(`\n📝 Assigning all ${orphanedBlogs.length} orphaned blogs to: ${users[0].fullname}`);
        
        const result = await Blog.updateMany(
            { createdBy: { $exists: false } },
            { createdBy: users[0]._id }
        );

        console.log(`✅ Updated ${result.modifiedCount} blogs`);

        // Verify the fix
        console.log("\n--- Verification ---");
        const updatedBlogs = await Blog.find({}).populate('createdBy', 'fullname');
        updatedBlogs.forEach(blog => {
            console.log(`✓ Blog: "${blog.title}" by ${blog.createdBy?.fullname || 'Still Unknown'}`);
        });

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.connection.close();
        console.log("\nDatabase connection closed");
    }
}

assignBlogsToUsers();
