import express from "express";
import multer from 'multer'

import { v4 as uuidv4 } from 'uuid';
import { uploadImg } from "../lib/fsUtils.js";

const postsRouter = express.Router()



postsRouter.post('/',multer().single('image'),uploadImg, async(req, res, next) => {
    try {
        const postsArray = await getPosts()
        const newPost = {...postsArray, id:uuid(), createdAt:new Date(),title:req.originalname, link:req.file.imageUrl}
        array.push(newPost)
        await writePosts(postsArray)
        res.status(201).send('uploaded successfully')

    } catch (error) {
       next(error) 
    }
})

export default postsRouter