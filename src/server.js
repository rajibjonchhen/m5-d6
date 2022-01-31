import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'
import {join} from 'path'
import postsRouter from './service/index.js'

const server = express()
const port = 3001
const publicFolderPath = join(process.cwd(),'./public/image')

server.use(express.json())
server.use(express.static(publicFolderPath))
server.use(cors())

server.use('/posts',postsRouter)
console.table(listEndpoints(server))
server.listen(port, ()=>console.log(`the server is running in ${port}`))
