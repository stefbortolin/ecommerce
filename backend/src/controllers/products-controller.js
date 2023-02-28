import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import {config} from 'dotenv'
config()

const prisma = new PrismaClient()

export const getAllProducts = async (req,res,next) => {
    try {
        const results = await prisma.product.findMany()
        res.json({data:results})
    } catch (error) {
        next
    }
}

export const getProducts = async (req,res,next) => {
    const {offset = "0"} = req.query
    
    try {
        const results = await prisma.product.findMany({
            skip: parseInt(offset),
            take: 5,
          }) 
          res.json({data:results})
    } catch (error) {
        next(error)
    }
    
}


export const getCategories = async(req,res,next) => {
    try {
        const result = await prisma.category.findMany()
    res.json({data:result})
    } catch (error) {
        next(error)
    }
}

export const createNewProduct = async(req,res,next) =>{
    const {name, price, rating, image, description, catid} = req.body
    console.log(req.body)

    const authorization = req.get('authorization')
    let token = null
    if (authorization && authorization.toLowerCase().startsWith('bearer')){
        token = authorization.substring(7)
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }

    const {id: userid} = decodedToken

    try {
        const result = await prisma.product.create({
            data: {
                name,
                description,
                image,
                price,
                rating,
                category: {
                    connect: {id: catid}
                },
                user: {
                    connect : {id: userid}
                }
            }
        })
        res.json(result)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const getProduct = async (req,res,next) =>{
    const {id} = req.params
    try {
        const result = await prisma.product.findUnique({
            where:{
                id: parseInt(id)
            }
        })
        res.json({data:result})
    } catch (error) {
        next(error)
    }
    
}

export const getProductCat = async (req,res,next) =>{
    const {cat} = req.params
    console.log(cat)
    const {offset = "0"} = req.query
    
    try {
        const result = await prisma.product.findMany({
            where: {
                category: {
                    name: cat
                }
            },
            skip: parseInt(offset),
            take: 5,
            
        })
        console.log(result)
        res.json({data:result})
    } catch (error) {
        next(error)
    }
}

export const deleteProduct = async (req,res,next) =>{
    const {id} = req.params
    try {
        const result = await prisma.product.delete({
            where:{
                id:parseInt(id)
            }
        })
        res.json({data:result})
    } catch (error) {
        next(error)
    }
    
}

export const updateProduct = async (req,res,next) =>{
    const {id} = req.params
    const {name, price, rating, image, description, catid, userid} = req.body
    console.log(req.body)
    try {
        const result = await prisma.product.update({
            where:{
                id: parseInt(id)
            },
            data: {
                name,
                description,
                image,
                price,
                rating,
                catid,
                userid
            }
        }) 
        res.json(result)
    } catch (error) {
        next(error)
    }
    
}


