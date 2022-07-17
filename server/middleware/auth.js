const {User}  = require('../models/User');

const auth = (req,res,next) =>{
    const token = req.headers.authorization;
    const refreshToken = req.headers.refreshtoken;
    User.findByToken(token,refreshToken,(err,user,newToken) =>{
        if(err) throw err;
        if(!user){

            return res.json({
                user:{
                    isAuth:false,
                    error:true,
                }
            })
        }
        req.user = user;
        req.token = newToken;
        req.refreshToken = refreshToken;
        next();
    })
};

// const auth = (req,res,next) =>{
//     // let token = req.cookies.w_auth;
//     let token = req.headers.authorization;

//     User.findByToken(token, (err,user) =>{
//         if(err) throw err;
//         if(!user){
//             return res.json({
//                 isAuth:false,
//                 error : true,
//             })
//         }
//         req.token = token,
//         req.user = user;
//         next();
//     })
// }
module.exports = {auth};