
import createError from "http-errors"
export const errorHandler = (error, req, res, next) =>{
    if(error){
    res.status(error.statusCode||500).send({msg:'error no such file found'})
    } else{
        next(error)
    }
}