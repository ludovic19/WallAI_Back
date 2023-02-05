import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from 'cloudinary'
import verify from "../Middlewares/verify.js";

import Post from '../MongoDB/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

router.get('/', async (req,res) => {
    try {
        const posts = await Post.find({})

        res.status(200).json({ success : true, data : posts })
    } catch(error) {
        res.status(500).json({ success : false, message : error })
    }
})

router.get('/:userId', async (req,res) => {
    try {
        const posts = await Post.find({userId : req.params.userId})

        res.status(200).json({ success : true, data : posts })
    } catch(error) {
        res.status(500).json({ success : false, message : error })
    }
})

router.post('/', async (req,res) => {
    try {
        const { name, prompt, photo } = req.body;
        // const userId = req.user._id
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
        name,
        prompt,
        photo: photoUrl.url,
        userId : req.body.userId
    })

    res.status(201).json({ success : true, data : newPost})
    } catch(error) {
    res.status(500).json({ success : false, message : error}) 
    }
})

export default router;