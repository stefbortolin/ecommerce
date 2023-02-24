import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const getAllUsers = async(req,res,next) => {
    try {
        const results = await prisma.user.findMany({
            select: {
                id: true,
                username: true
            }
        })
        res.json({data:results})
    } catch (error) {
        next
    }
}

export const createNewUser = async(req,res,next) =>{
    console.log(req.body)
    const {username, password} = req.body
    const passwordHash = await bcrypt.hash(password,10)
    console.log(req.body)
    try {
        const result = await prisma.user.create({
            data: {
                username,
                password: passwordHash
            }
        })
        res.json(result)
    } catch (error) {
        console.log(error)
        next(error)
    }
}