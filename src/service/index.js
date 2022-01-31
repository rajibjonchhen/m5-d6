import express from "express";
import multer from 'multer'
import { v4 } from "uuid";

import { v4 as uuidv4 } from 'uuid';
import { readPosts, writePosts ,uploadImg } from "../lib/fsUtils.js";
 
const postsRouter = express.Router()


postsRouter.post('/',multer().single('image'),uploadImg, async(req, res, next) => {
    try {
        const postsArray = await readPosts()
        const newPost = {...postsArray, ...req.body,id:v4(), createdAt:new Date(),title:req.file.originalname, link:req.file.imageUrl}
        postsArray.push(newPost)
        await writePosts(postsArray)
        res.status(201).send({msg:'uploaded successfully'})

    } catch (error) {
       next(error) 
    }
})

postsRouter.get('/', async(req, res, next) => {
    try {
        const postsArray = await readPosts()
        res.status(201).send(postsArray)

    } catch (error) {
       next(error) 
    }
})

export default postsRouter