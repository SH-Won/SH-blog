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

module.exports = router;