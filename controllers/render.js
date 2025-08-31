function handleRenderHome(req,res){
    res.render("home");
}
function handleRenderSignIn(req,res){
    res.render("signin");
}
function handleRenderSignUp(req,res)
{
    res.render("signup");
}
module.exports = {handleRenderHome , handleRenderSignIn , handleRenderSignUp};