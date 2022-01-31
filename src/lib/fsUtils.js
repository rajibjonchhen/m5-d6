import fs from 'fs-extra'
import { nextTick } from 'process'
import { fileURLToPath } from "url"
import {dirname, join, extname} from 'path'

const {readJSON, writeJSON, writeFileSync} = fs

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)),'../data')
const postsJSONPath = join (dataFolderPath, 'posts.json')
const publicFolderPath = join(process.cwd(),'./public/image')


export const readPosts = () => readJSON(postsJSONPath)
export const writePosts =(content) => writeJSON(postsJSONPath, content)

export const uploadImg = (req, res, next) =>{
try {
    const{originalname,buffer} = req.file
    // const extension = extname(originalname)
    const pathToFile = join(publicFolderPath, originalname)
    writeFileSync(pathToFile,buffer)
    const imageUrl = `http://localhost:3001/${originalname}`
    req.file.imageUrl = imageUrl
    next()
} catch (error) {
   next(error) 
}
}