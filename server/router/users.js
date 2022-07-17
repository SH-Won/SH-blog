const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const {auth} = require('../middleware/auth');
const { sign, refresh } = require('../middleware/jwt');
const { Article } = require('../models/Article');

router.get('/auth',auth,(req,res) =>{
    // res.status(200).json({
    //     _id:req.user._id,
    //     isAdmin : req.user.role === 0 ? false : true,
    //     isAuth : true,
    //     email:req.user.email,
    //     name: req.user.name,
    //     role: req.user.role,
    // })
    res.status(200).json({
        user:{
        _id:req.user._id,
        isAdmin : req.user.role === 0 ? false : true,
        isAuth : true,
        email:req.user.email,
        name: req.user.name,
        role: req.user.role,
        favorite:req.user.favorite,
        },
        token:req.token,
        refreshToken:req.refreshToken,
    })
});
router.post('/register',(req,res) =>{
    const user = new User(req.body);
    user.save((err,doc) =>{
        if(err) return res.json({ success:false, err});
        return res.status(200).json({ success : true });
    })
})
router.post('/login',(req,res) =>{
    User.findOne({email:req.body.email},(err,user) =>{
        if(!user) return res.json({loginSuccess:false,message:'가입한 이메일이 없습니다'});
        user.comparePassword(req.body.password,(err,isMatch) =>{
            if(!isMatch) return res.json({loginSuccess:false, message:"비밀번호가 잘못됐습니다"});

            const token = sign(user);
            const refreshToken = refresh();

            user.refreshToken = refreshToken;
            user.save(function (err,user){
                if(err) return res.status(400).send(err);
                res
                .status(200)
                .json({
                    loginSuccess: true, userId : user._id, token, refreshToken
                })
            })
        })
    })
})

router.get('/logout',auth ,(req,res) =>{
    User.findOneAndUpdate({_id: req.user._id},{token:'', refreshToken:'' ,tokenExp:''},(err,doc) =>{

        if(err) return res.json({success: false, err});
        return res.status(200).json({
            success:true,
        })
    })
})
router.post('/favorite',(req,res) =>{
    const count = parseInt(req.body.count);
    const articleId = req.body.articleId;
    console.log(req.body);
    const filter = count === -1 ? {
        $pull:{
            favorite:articleId,
        }
    } : {
        $addToSet:{
             favorite:articleId,
        }
    }
    User.findOneAndUpdate({_id:req.body.userId},filter,{new : true} ,(err,user) =>{
       
    });
    Article.findOneAndUpdate({_id:articleId},{
        $inc:{
            favoriteCount:count,
        }
    },{new : true},(err,article) =>{
        
    })
})


// router.post('/login',(req,res) =>{
//     User.findOne({ email:req.body.email}, (err,user) =>{
//         if(!user) return res.json({loginSuccess:false, message : "가입한 이메일이 없습니다"});
        
//         user.comparePassword(req.body.password, (err, isMatch) =>{
//             if(!isMatch) return res.json({ loginSuccess:false, message: "비밀번호가 잘못됐습니다"});
            
//             user.generateToken((err,user) =>{
//                 if(err) return res.status(400).send(err);
                
//                 // res.cookie("w_authExp" ,user.tokenExp,{
//                 //     httpOnly:true,
//                 //     sameSite:'none',
//                 //     secure:true,
//                 //     // domain:'sh-blog-sh-won.vercel.app',
//                 // });
//                 // res.cookie('w_auth',user.token,{
//                 //     httpOnly:true,
//                 //     sameSite:'none',
//                 //     secure:true,
//                 //     // domain:'sh-blog-sh-won.vercel.app'
//                 //     // domain:process.env.WHITE_URL || 'http://localhost:3000',
//                 // })
//                 // res.header({
//                 //     'authorization':user.token,
//                 // })
//                 res
//                 .status(200)
//                 .json({
//                     loginSuccess: true, userId : user._id, userToken:user.token,
//                 })
//                 // res.header("Access-Control-Allow-Origin",process.env.WHITE_URL);
//                 // res.header("Access-Control-Allow-Credentials",true);
//                 // res.setHeader("Set-Cookie",`w_auth=${user.token}; HttpOnly; SameSite=None; secure=true`)
//                 // res
//                 // .status(200)
//                 // .json({
//                 //     loginSuccess:true, userId: user.id,
//                 // })
//             })
//         })
//     })
// })

module.exports = router;