function handleRenderHome(req,res){
    res.render("home",{
        user:req.user
    });
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
module.exports = {handleRenderHome , handleRenderSignIn , handleRenderSignUp, handleRenderLogout , handleRenderBlog};