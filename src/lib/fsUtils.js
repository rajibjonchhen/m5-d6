import fs from 'fs-extra'
import { nextTick } from 'process'
import { fileURLToPath } from "url"
import {dirname, join, extname} from 'path'

const currentFilePath = join(dirname(fileURLToPath(import.meta.url)),'./data/post.json')
const {readJSON, writeJSON, writeFile} = fs

export const uploadImg = () =>{
try {
    const{originalname,buffer} = req.file
} catch (error) {
   nextTick(error) 
}
}