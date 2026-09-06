const express = require('express');
const multer = require('multer');
const uploadFile = require('./services/storage.service');
const postModel = require('./models/post.model');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const upload = multer({storage: multer.memoryStorage()});

app.post('/createPost', upload.single('image'), async(req, res)=>{

    const result = await uploadFile(req.file.buffer);
    const post = await postModel.create({
        image: result.url,
        caption: req.body.caption
    });
    res.status(201).json({
        message: 'Post created successfully',
        post
    });
});

app.get('/posts', async(req, res)=>{
    const posts = await postModel.find();
    res.status(200).json({
        message: 'Posts fetched successfully',
        posts
    });
});

app.delete('/posts/:id', async(req, res)=>{
    const post = await postModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
        message: 'Post deleted successfully',
        post
    });
});

module.exports = app;