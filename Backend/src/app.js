const express = require('express');
const multer = require('multer');
const uploadFile = require('./services/storage.service');
const postModel = require('./models/post.model');
const cors = require('cors');
const { connectDB } = require('./db/db');

const app = express();

app.use(express.json());
app.use(cors());

// DB connection middleware: Jab tak DB connect nahi hota request wait karegi
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("Database connection error in middleware:", error);
        res.status(500).json({ message: "Database connection failed" });
    }
});

const upload = multer({ storage: multer.memoryStorage() });

app.post('/createPost', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Image file is required" });
        }
        const result = await uploadFile(req.file.buffer);
        const post = await postModel.create({
            image: result.url,
            caption: req.body.caption
        });
        res.status(201).json({
            message: 'Post created successfully',
            post
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/posts', async (req, res) => {
    try {
        const posts = await postModel.find();
        res.status(200).json({
            message: 'Posts fetched successfully',
            posts
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/posts/:id', async (req, res) => {
    try {
        const post = await postModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'Post deleted successfully',
            post
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = app;