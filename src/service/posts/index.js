import express from "express";
import multer from 'multer'
import { v4 } from "uuid";
import { v4 as uuidv4 } from 'uuid';
import { readPosts, writePosts ,uploadImg } from "../../lib/fsUtils.js";
import createError from "http-errors";
 
const postsRouter = express.Router()


postsRouter.post('/',multer().single('image'),uploadImg, async(req, res, next) => {
    try {
        const postsArray = await readPosts()
        const newPost = {...postsArray, ...req.body,id:v4(), createdAt:new Date(),title:req.file.originalname, link:req.file.imageUrl}
        postsArray.push(newPost)
        await writePosts(postsArray)
        res.status(201).send({msg:'uploaded successfully'})

    } catch (error) {
       next(createError(500, error.msg)) 
    }
})

postsRouter.get('/', async(req, res, next) => {
    try {
        const postsArray = await readPosts()
        res.status(201).send(postsArray)

    } catch (error) {
        console.log(error)
        throw error 
    }
})

postsRouter.get('/:id', async(req, res, next) => {
    try {
        const postsArray = await readPosts()
        const reqPost = postsArray.find(post => post.id === req.params.id)
        if(reqPost>0){
        res.status(201).send(reqPost)
        } else{
            next(createError()) 
         }
        

    } catch (error) {
        console.log(error)
        throw error 
    }
})

postsRouter.put('/:id', async(req,res, next) =>{
    try {
        const postsArray = await readPosts()
        const index = postsArray.findIndex(post => post.id === req.params.id)
        const oldPost = postsArray[index]
    } catch (error) {
        console.log(error)
        throw error 
    }
})

export default postsRouter