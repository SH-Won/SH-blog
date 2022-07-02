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
        //  await new Promise((resolve,reject) =>{
        //      User.findOne({_id : userId},(err,user) => {
        //          if(err) return reject(false);
        //         resolve(user.refreshToken);
        //      })
        //  }).then(refreshToken =>{
        //      if(refreshToken === token) return true;
        //      else return false;
        //  })
         
        //  console.log(userRefreshToken);
        //  if(userRefreshToken === token) return true;
        //  else return false;
    }
}