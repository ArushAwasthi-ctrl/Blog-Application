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
  console.log("Body starts from here");
  const temp = req.body;
  const file = req.file;

  try {
    const tempBlog = await blog.create({
      title: temp.title,
      body: temp.body,
      coverImageUrl: `./public/${file.filename}`,
      createdBy: req.user._id, // make sure req.user exists
    });

    // redirect to that blog's page
    return res.redirect(`/blogs/${tempBlog._id}`);
  } catch (error) {
    console.error(error);
    return res.redirect("/add-new");
  }
}
module.exports = { handlePostBlogReq, upload };
