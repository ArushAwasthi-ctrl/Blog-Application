const jwt = require('jsonwebtoken');
function createTokenForUser(user)
{
    if(!user)
    {
        return null;
    }
    const payload = {
         fullname:user.fullname,
         email:user.email,
         profilePicture:user.profilePicture
    }

    const token = jwt.sign(payload , process.env.SECRET);
    return (token);

}
function verifyToken(token)
{
    if(!token)
    {
       return null; 
    }
    const user = jwt.verify(token, process.env.SECRET);
    return user;
}

module.exports = { createTokenForUser , verifyToken};