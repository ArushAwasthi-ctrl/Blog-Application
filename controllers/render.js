const blog = require('../models/blog');
const Comment = require('../models/comment');

 async function  handleRenderHome(req,res){
    try {
        const allBlogs = await blog.find({}).populate({
            path: 'createdBy',
            select: 'fullname email'
        });
        
        res.render("home",{
            user: req.user,
            blogs: allBlogs
        });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.render("home",{
            user: req.user,
            blogs: []
        });
    }
}
function handleRenderSignIn(req,res){
    res.render("signin");
}
function handleRenderSignUp(req,res)
{
    res.render("signup");
}
function handleRenderLogout(req,res)
{
    res.clearCookie("token");
    res.redirect("/");
}
function handleRenderBlog(req,res){
    res.render("blog",{
        user:req.user
    });
};

async function handleRenderDynamicBlog(req, res) {
    try {
        if (!req.params.id) {
            return res.status(400).redirect('/');
        }
        
        // Fetch blog with creator info
        const blogy = await blog.findById(req.params.id).populate('createdBy', 'fullname');
        
        if (!blogy) {
            return res.status(404).redirect('/');
        }
        
        // Fetch comments for this blog
        const comments = await Comment.find({ blogId: req.params.id })
            .populate('createdBy', 'fullname')
            .sort({ createdAt: -1 }); // Most recent first
        
        res.render("singleBlog", {
            user: req.user,
            blogy,
            comments
        });
    } catch (error) {
        console.error("Error fetching blog:", error);
        res.redirect('/');
    }
}
module.exports = {handleRenderHome , handleRenderSignIn , handleRenderSignUp, handleRenderLogout , handleRenderBlog ,handleRenderDynamicBlog};