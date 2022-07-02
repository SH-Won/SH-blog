const {User}  = require('../models/User');
const { verify } = require('./jwt');
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
const auth = (req,res,next) =>{
    const token = req.headers.authorization;
    const refreshToken = req.headers.refreshtoken;
    // console.log('server refresh',refreshToken);
    User.findByToken(token,refreshToken,(err,user,newToken) =>{
        if(err) throw err;
        if(!user){
            // return res.json({
            //     isAuth:false,
            //     error:true,
            // })
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
        // console.log('server auth');
        next();
    })
    
}
module.exports = {auth};