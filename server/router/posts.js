const express = require('express');
const router = express.Router();
const config = require('../config/key');
const { Post } = require('../models/Post');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');
const fs = require('fs');
const { Article } = require('../models/Article');
const { auth } = require('../middleware/auth');
const cors = require('cors');
const { User } = require('../models/User');

const origin = process.env.WHITE_URL || 'http://localhost:3000';

const cloud_name = process.env.cloud_name || config.cloud_name;
const api_key = process.env.api_key || config.api_key;
const api_secret = process.env.api_secret || config.api_secret;

cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret,
});

const Storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        format: async (req, file) => {
            'jpg', 'png', 'gif';
        },
        // public_id:(req,file)=>{
        //     console.log(req);
        //     console.log(file);
        // }
        public_id: (req, file) => {},
    },
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(`${path.join(__dirname, '..')}/uploads/${req.user.id}`))
            fs.mkdirSync(`${path.join(__dirname, '..')}/uploads/${req.user.id}`);
        cb(null, `${path.join(__dirname, '..')}/uploads/${req.user.id}`);
    },

    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + '' + ext);
        // console.log(file);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg' || ext !== '.png' || ext !== '.gif') {
            return cb(res.status(400).end('jpg,png,gif 파일만 가능합니다'), false);
        }
        cb(null, true);
    },
});

const upload = multer({ storage }).array('file');

// const upload = cloudinary.uploader.upload;
router.post('/upload', async (req, res) => {
    const { userId, paths } = req.body;
    const data = [];

    const result = await Promise.all(
        paths.map(async p => {
            const filePath = `${path.join(__dirname, '..', 'uploads', `${userId}`, `${p}`)}`;
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload(filePath, { folder: 'Article-Images' }, (err, result) => {
                    if (err) reject(err);
                    resolve({
                        id: result.public_id,
                        url: result.secure_url,
                    });
                });
            });
        }),
    );
    res.status(200).json({ success: true, data: result });
});

router.post('/uploadfiles', cors({ origin, credentials: true }), auth, upload, (req, res) => {
    let dataUrl = [];
    req.files.forEach(file => {
        dataUrl.push({
            url: file.path.split('server')[1],
        });
    });

    return res.json({ success: true, data: dataUrl });
});
router.post('/uploadPost', (req, res) => {
    const post = new Post(req.body);
    post.save((err, result) => {
        if (err) return res.json({ success: false, err });
        res.json({ success: true });
    });
});
router.get('/destory', auth, (req, res) => {
    const writer = req.user._id;
    const dir = `${path.join(__dirname, '..', 'uploads', `${writer}`)}`;
    if (fs.existsSync(dir)) fs.rmdirSync(dir, { recursive: true });
    res.status(200).json({ success: true });
});
router.get('/', (req, res) => {
    let skip = req.query.skip ? parseInt(req.query.skip) : Number(0);
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;
    let category = req.query.category ? req.query.category : null;
    let findArg = {};
    if (category) {
        findArg['category'] = category.split(',').map(Number);
    }

    Post.find(findArg)
        .sort({ $natural: -1 })
        .skip(skip)
        .limit(limit)
        .exec((err, posts) => {
            if (err) res.json({ success: false, err });
            res.json({ posts, postSize: posts.length });
        });
});
router.get('/detail', (req, res) => {
    const postId = req.query.postId;
    // Post.find({_id:{$in:postIds}})
    Post.find({ _id: postId }).exec((err, post) => {
        if (err) res.status(400).json({ success: false, err });
        res.status(200).json(post);
    });
});

// article
router.get('/article', (req, res) => {
    let skip = req.query.skip ? parseInt(req.query.skip) : Number(0);
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;
    let category = req.query.category ? req.query.category : null;

    let findArg = {};
    if (category === 'popular') {
        findArg['favoriteCount'] = { $gt: 0 };
    } else if (category) {
        findArg['category'] = category.split(',').map(Number);
    }

    Article.find(findArg)
        .sort({ $natural: -1 })
        .skip(skip)
        .limit(limit)
        .exec((err, posts) => {
            if (err) res.json({ success: false, err });
            if (category === 'popular') posts.sort((a, b) => b.favoriteCount - a.favoriteCount);
            res.json({ posts, postSize: posts.length });
        });
});
router.get('/detailArticle', (req, res) => {
    const articleId = req.query.articleId;
    Article.find({ _id: articleId })
        .populate('writer')
        .exec((err, article) => {
            if (err) res.status(400).json({ success: false, err });
            res.status(200).json(article);
        });
});

router.post('/uploadArticle', (req, res) => {
    new Article(req.body).save((err, result) => {
        if (err) res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, article: result });
    });
    const { writer, removeIds } = req.body;
    const remove = Promise.all(
        removeIds.map(async id => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.destroy(id, result => {
                    resolve(result);
                });
            });
        }),
    );
    const dir = `${path.join(__dirname, '..', 'uploads', `${writer}`)}`;
    if (fs.existsSync(dir)) fs.rmdirSync(dir, { recursive: true });
});
router.post('/updateArticle', (req, res) => {
    const { _id, writer, title, category, data, thumbnail, imageIds, removeIds } = req.body;
    Article.findOneAndUpdate(
        { _id },
        {
            $set: {
                writer,
                title,
                thumbnail,
                category,
                data,
                imageIds,
            },
        },
    ).exec((err, result) => {
        if (err) res.status(400).json({ success: false, err });
        res.status(200).json({ success: true });
    });
    const remove = Promise.all(
        removeIds.map(async id => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.destroy(id, result => {
                    resolve(result);
                });
            });
        }),
    );
    const dir = `${path.join(__dirname, '..', 'uploads', `${writer}`)}`;
    if (fs.existsSync(dir)) fs.rmdirSync(dir, { recursive: true });
});
router.post('/deleteArticle', async (req, res) => {
    const { _id, imageIds } = req.body;
    Article.findOneAndDelete({ _id }).exec((err, result) => {
        if (err) res.status(400).json({ success: false, err });
        res.status(200).json({ success: true });
    });

    const remove = await Promise.all(
        imageIds.map(async id => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.destroy(id, result => {
                    resolve(result);
                });
            });
        }),
    );
});

module.exports = router;
