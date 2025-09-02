const {verifyToken} = require('../services/auth');
function checkforAuthenticaionCookie(cookieName)
{
    return(req,res,next)=>
    {
        console.log('=== Auth Middleware Debug ===');
        const tokenCookieValue = req.cookies[cookieName];
        console.log('Cookie name:', cookieName);
        console.log('Token value:', tokenCookieValue ? 'EXISTS' : 'MISSING');
        
        if(!tokenCookieValue)
        {
            console.log('No token found, proceeding without user');
            return next();
        }
        
        try {
            const userPayLoad = verifyToken(tokenCookieValue);  
            console.log('User payload:', userPayLoad);
            req.user = userPayLoad; 
            console.log('=== Auth Success ===');
            return next();
        } catch (error) {
            console.error('Token verification failed:', error);
            console.log('=== Auth Failed ===');
            return res.status(401).json({"error":"Invalid token"});
        }       
    }
}

module.exports = {
    checkforAuthenticaionCookie,
};