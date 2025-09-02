const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const Blog = require('./models/blog');
const User = require('./models/user');

async function clearDatabase() {
    try {
        // Connect to database
        await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);
        console.log("Connected to database");

        // Count existing data
        const blogCount = await Blog.countDocuments();
        const userCount = await User.countDocuments();
        
        console.log(`\n📊 Current data:`);
        console.log(`- Blogs: ${blogCount}`);
        console.log(`- Users: ${userCount}`);

        if (blogCount === 0 && userCount === 0) {
            console.log("✅ Database is already empty!");
            return;
        }

        console.log("\n🗑️  Clearing all data...");

        // Delete all blogs
        const blogResult = await Blog.deleteMany({});
        console.log(`✅ Deleted ${blogResult.deletedCount} blogs`);

        // Delete all users  
        const userResult = await User.deleteMany({});
        console.log(`✅ Deleted ${userResult.deletedCount} users`);

        console.log("\n🎉 Database cleared successfully!");
        console.log("You can now create new users and blogs, and they will be properly linked.");

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.connection.close();
        console.log("\nDatabase connection closed");
    }
}

console.log("⚠️  WARNING: This will delete ALL users and blogs!");
console.log("Make sure this is what you want before proceeding.");
console.log("\nStarting database clear in 3 seconds...");

setTimeout(() => {
    clearDatabase();
}, 3000);
