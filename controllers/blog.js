const multer = require("multer");
const path = require("path");
const blog = require("../models/blog");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

async function handlePostBlogReq(req, res) {
  console.log("=== Blog Creation Debug ===");
  console.log("User from req.user:", req.user);
  console.log("User ID:", req.user?._id);
  console.log("User authenticated:", !!req.user);
  
  const temp = req.body;
  const file = req.file;

  console.log("File details:", file);
  console.log("Generated image URL:", `/public/${file.filename}`);

  // Check if user is authenticated
  if (!req.user || !req.user._id) {
    console.error(" No authenticated user found!");
    return res.status(401).redirect('/signin');
  }

  try {
    const tempBlog = await blog.create({
      title: temp.title,
      body: temp.body,
      coverImageUrl: `/public/${file.filename}`,
      createdBy: req.user._id,
    });
    
    console.log(" Blog created successfully with createdBy:", tempBlog.createdBy);

    console.log("Blog created with image URL:", tempBlog.coverImageUrl);

    // redirect to that blog's page
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return res.redirect("/");
  }
}
module.exports = { handlePostBlogReq, upload };
