const jwt = require("jsonwebtoken");
module.exports = function(req, res, next) {
    try{
        let token = req.header('x-token');
        if(!token){
            return res.status(200).json();
        }
        let decode = jwt.verify(token,'jwtSecret');
        req.user = decode.user;
        req.tokenn = token;
        next();
    }
    catch(e){
           return res.status(200).json();
    }
}