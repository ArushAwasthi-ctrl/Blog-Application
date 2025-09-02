const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const Blog = require('./models/blog');
const User = require('./models/user');

async function checkAndFixBlogs() {
    try {
        // Connect to database
        await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);
        console.log("Connected to database");

        // Check existing blogs
        const blogs = await Blog.find({});
        console.log(`\nFound ${blogs.length} blogs in database`);

        // Check how many have createdBy field
        const blogsWithCreatedBy = blogs.filter(blog => blog.createdBy);
        const blogsWithoutCreatedBy = blogs.filter(blog => !blog.createdBy);

        console.log(`Blogs with createdBy: ${blogsWithCreatedBy.length}`);
        console.log(`Blogs without createdBy: ${blogsWithoutCreatedBy.length}`);

        // Check users
        const users = await User.find({});
        console.log(`\nFound ${users.length} users in database`);

        if (users.length > 0) {
            console.log("Users:");
            users.forEach(user => {
                console.log(`- ${user.fullname} (${user.email}) - ID: ${user._id}`);
            });
        }

        // If there are blogs without createdBy and users exist, offer to fix
        if (blogsWithoutCreatedBy.length > 0 && users.length > 0) {
            console.log(`\n⚠️  Found ${blogsWithoutCreatedBy.length} blogs without createdBy field`);
            console.log("Sample blog without createdBy:", {
                title: blogsWithoutCreatedBy[0]?.title,
                createdBy: blogsWithoutCreatedBy[0]?.createdBy
            });

            // Uncomment the lines below if you want to automatically assign all orphaned blogs to the first user
            // console.log(`Assigning all orphaned blogs to user: ${users[0].fullname}`);
            // await Blog.updateMany(
            //     { createdBy: { $exists: false } },
            //     { createdBy: users[0]._id }
            // );
            // console.log("✅ Updated orphaned blogs");
        }

        // Test population
        console.log("\n--- Testing population ---");
        const populatedBlogs = await Blog.find({}).populate('createdBy', 'fullname email');
        populatedBlogs.forEach(blog => {
            console.log(`Blog: "${blog.title}" by ${blog.createdBy?.fullname || 'Unknown'}`);
        });

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.connection.close();
        console.log("\nDatabase connection closed");
    }
}

checkAndFixBlogs();
