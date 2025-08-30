function handleRenderHome(req,res){
    res.render("home");
}
function handleRenderSignIn(req,res){
    res.render("signIn");
}
function handleRenderSignUp(req,res)
{
    res.render("signUp");
}
module.exports = {handleRenderHome , handleRenderSignIn , handleRenderSignUp};