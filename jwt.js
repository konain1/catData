
const jwt = require('jsonwebtoken');


const jwtAuthmiddleware = function(req,res,next){


    try {
        let varifyToken = req.headers.authorization.split(' ')[1];
        console.log(varifyToken)

        if(!varifyToken) return res.json({msg:"unAuthorized"})
        let token = jwt.verify(varifyToken,'secret');
        req.user = token;
    
        next();
        
    } catch (error) {
        console.log(error);
        throw error
    }
   


}

const generateToken = (catData)=>{

    let token  = jwt.sign(catData,'secret')
    return token
}

module.exports = {generateToken,jwtAuthmiddleware}