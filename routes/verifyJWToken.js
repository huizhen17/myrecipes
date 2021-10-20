const jwt = require('jsonwebtoken');

//Create a middleware for private route
//For checking the token before access 
module.exports = function (req, res, next){
    const token = req.header('auth-token'); //request the token from header
    
    if(!token){
        return res.status(401).send('Access denied.');
    }

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err){
        res.status(400).status('Invalid Token');
    }

}