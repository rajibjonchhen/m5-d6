import fs from 'fs-extra'
import { nextTick } from 'process'
import { fileURLToPath } from "url"
import {dirname, join, extname} from 'path'
import { v4 as uuidv4 } from 'uuid';

const {readJSON, writeJSON, writeFileSync} = fs

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)),'../data')
const postsJSONPath = join (dataFolderPath, 'posts.json')
const publicFolderPath = join(process.cwd(),'./public/image')


export const readPosts = () => readJSON(postsJSONPath)
export const writePosts =(content) => writeJSON(postsJSONPath, content)

export const uploadImg = (req, res, next) =>{
try {
    const{originalname,buffer} = req.file
    const extension = extname(originalname)
    const id = uuidv4()
    const filename = `${id}${extension}`
    const pathToFile = join(publicFolderPath, filename)
    writeFileSync(pathToFile,buffer)
    const imageUrl = `http://localhost:3001/${filename}`
    req.file.imageUrl = imageUrl
    req.file.id = id
    next()
} catch (error) {
   next(error) 
}
}