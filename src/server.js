import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'
import {join} from 'path'
import postsRouter from './service/posts/index.js'
import { errorHandler } from './service/posts/errorHandler.js'

const server = express()
const port = 3001
const publicFolderPath = join(process.cwd(),'./public/image')

server.use(express.json())
server.use(express.static(publicFolderPath))

const whiteListOrigins = [process.env.FE_DEV_URL]
server.use(cors({origin:function(origin, next){
    if(!origin || whiteListOrigins.indexOf(origin)!== -1){
        next(null, true)
    } else{
        next(new Error("cors error"))
    }
}}))

server.use('/posts',postsRouter)
server.use(errorHandler)
console.table(listEndpoints(server))
server.listen(port, ()=>console.log(`the server is running in ${port}`))
