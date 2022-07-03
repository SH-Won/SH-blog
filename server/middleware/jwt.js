const jwt = require('jsonwebtoken');


module.exports = {
    sign : user =>{
        const payload = {
            id:user._id,
        }
        return jwt.sign(payload,'secret',{
            algorithm:'HS256',
            expiresIn:'1m',
        });
    },
    verify : token =>{
        let decode = null;
        try{
            decode = jwt.verify(token,'secret');
            return{
                success:true,
                id:decode.id,
            }

        }catch(err){
            return {
                success:false,
                message: err.message
            }
        }
    },
    refresh : () =>{
        return jwt.sign({},'secret',{
            algorithm:'HS256',
            expiresIn:'3d',
        })
    },
    refreshVerify : (token,userId) => {
        try{
            jwt.verify(token,'secret');
            return true;

        }catch(err){
            return false;
        }
    }
}