const express = require('express');
const router = express.Router();
const config = require('../config/key');
const {Post}  = require('../models/Post');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} =require('multer-storage-cloudinary');

const {Article} = require('../models/Article');

const cloud_name=process.env.cloud_name || config.cloud_name
const api_key=process.env.api_key || config.api_key
const api_secret=process.env.api_secret || config.api_secret

cloudinary.config({
    cloud_name:config.cloud_name,
   api_key:config.api_key,
   api_secret:config.api_secret
})

const Storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'uploads',
        format: async (req,file)=>{
            'jpg','png','gif';
        },
        public_id:(req,file)=>{
        }
    }
})
const upload = multer({storage:Storage}).array('file');

router.post('/uploadfiles',(req,res)=>{
    upload(req,res,err=>{
        console.log(req.body);
        if(err) return res.json({success:false,err});

        let urlData = [];
        
        req.files.forEach(file=>{
            urlData.push(file.path);
        })
        console.log(urlData);
        return res.json({success:true, url:urlData.length === 1? urlData[0] : urlData})
    })
})
router.post('/uploadPost',(req,res)=>{
    
    const post = new Post(req.body);
    post.save((err,result)=>{
        if(err) return res.json({success:false,err})
        res.json({success:true});
        // console.log(result);
    })
})

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

// article
router.get('/article',(req,res) =>{
    Article
    .find()
    .exec((err,articles)=>{
        if(err) res.status(400).json({success:false,err});
        res.status(200).json({articles,success:true});
    })
})
router.get('/detailArticle',(req,res)=>{
    const articleId = req.query.articleId;
    Article.find({_id:articleId})
    .exec((err,article) =>{
        if(err) res.status(400).json({success:false,err});
        res.status(200).json(article)
    })

})

router.post('/uploadArticle', (req,res)=>{
    // console.log(req.body);
    // console.log(typeof req.body);
    // console.log(JSON.parse(req.body));
    // const {data} = JSON.parse(req.body);
    new Article(req.body)
    .save((err,result)=>{
        if(err) res.status(400).json({success:false,err});
        res.status(200).json({success:true});
    })
})
router.post('/updateArticle',(req,res) =>{
    const {_id,title,category,data,thumbnail} = req.body;
    Article.findOneAndUpdate({_id},
    {$set : {
        title,
        thumbnail,
        category,
        data
    }})
    .exec((err,result) =>{
         if(err) res.status(400).json({success:false,err});
         res.status(200).json({success:true});
    })
})
router.post('/deleteArticle',(req,res) =>{
    const {_id}  = req.body;
    Article.findOneAndDelete({_id})
    .exec((err,result) =>{
        if(err) res.status(400).json({success:false,err});
        res.status(200).json({success:true});
    })
})

module.exports = router;