const { error } = require('console');
const blog = require('../models/blog');
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

async function handleRenderDynamicBlog(req,res) {
    if(!req.params.id)
    {
        throw new error;
    }
    else{
            const blogy =  await blog.findById(req.params.id) 
            res.render("singleBlog",{
                user:req.user,
                blogy
            })
    }
}
module.exports = {handleRenderHome , handleRenderSignIn , handleRenderSignUp, handleRenderLogout , handleRenderBlog ,handleRenderDynamicBlog};