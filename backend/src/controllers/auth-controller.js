import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import {config} from 'dotenv'
config()

const prisma = new PrismaClient()

export const loginAuth = async (req,res,next) => {
    const {username, password} = req.body

    const user = await prisma.user.findUnique({
        where: {
            username: username}
    })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.password)
    
    if (!(user && passwordCorrect)){
        res.status(401).json({
            error: 'invalid user or password'
        })
    }

    const userForToken = {
        id: user.id,
        name: username.name
    }

    const token = jwt.sign(userForToken, process.env.SECRET,
        {
            expiresIn: 60 * 60 * 24 * 7
        })

    res.send({
        username: user.username,
        token,
        role:user.role
    })
}