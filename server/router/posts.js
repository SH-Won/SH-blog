const express = require('express');
const router = express.Router();

const config = require('../config/key');
const {Post}  = require('../models/Post');

router.get('/', (req,res) =>{
    
    Post.find()
    .exec((err,posts) =>{
        if(err) res.json({success:false,err});
        console.log(posts);
        res.json(posts);
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