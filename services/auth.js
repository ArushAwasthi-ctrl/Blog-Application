const jwt = require('jsonwebtoken');
function createTokenForUser(user)
{
    if(!user)
    {
        return null;
    }
    const payload = {
         _id: user._id,              // ✅ Added user ID - CRITICAL for blog linking
         fullname:user.fullname,
         email:user.email,
         profilePicture:user.profilePicture,
         roles:user.roles
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