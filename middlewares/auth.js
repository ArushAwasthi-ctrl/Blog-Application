const {verifyToken} = require('../services/auth');
function checkforAuthenticaionCookie(cookieName)
{
    return(req,res,next)=>
    {
        const tokenCookieValue = req.cookies[cookieName];
        
        if(!tokenCookieValue)
        {
            return next();
        }
        
        try {
            const userPayLoad = verifyToken(tokenCookieValue);  
            req.user = userPayLoad; 
            next();
        } catch (error) {
            console.error('Token verification failed:', error);
            return res.status(401).json({"error":"Invalid token"});
        }       
    }
}

module.exports = {
    checkforAuthenticaionCookie,
};