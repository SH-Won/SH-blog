const express = require('express');
const router = express.Router();

const config = require('../config/key');
const {Post}  = require('../models/Post');

router.get('/', (req,res) =>{
    let skip = req.query.skip ? parseInt(req.query.skip) : Number(0);
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;
    let category = req.query.category ? req.query.category : null;
    let findArg = {};
    if(category){
        findArg['category'] = category.split(',').map(Number);
    }
    console.log(findArg);
    
    Post.find(findArg)
    .skip(skip)
    .limit(limit)
    .exec((err,posts) =>{
        if(err) res.json({success:false,err});
        res.json({posts,postSize:posts.length});
    })
})
router.get('/detail',(req,res)=>{
    const postId = req.query.postId;
    // Post.find({_id:{$in:postIds}})
    Post.find({_id:postId})
    .exec((err,post)=>{
        if(err) res.status(400).json({success:false,err});
        res.status(200).json(post);
    })

})

module.exports = router;