import { PrismaClient } from "@prisma/client"
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export function getDate() {
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    const fecha = hoy.toDateString()
    return fecha
}

export const createOrder = async (req,res,next) => {
    const token = req.get('authorization').split('Bearer ')[1]
    const {id} = jwt.verify(token, process.env.SECRET)
    const fecha = getDate()

    const products = req.body
    try {
        const result = await prisma.$transaction(
                                    products.map(({ quantity, id }) =>
                                        prisma.productDetail.create({
                                            data: {
                                                quantity,
                                                productid: id,
                                            },
                                        }),
                                    ),
                                );
        if (user) {
            const result2 = await prisma.order.create({
                data: {
                    user:{
                        connect: {id}
                    },
                    products: {
                        connect: result.map( ({id}) => ({id}))
                    },
                    date: fecha
                }
            })
            res.json(result2)
        } else {
            const result2 = await prisma.order.create({
                data: {
                    products: {
                        connect: result.map( ({id}) => ({id}))
                    },
                    date: fecha
                }
            })
            res.json(result2)
        }
        
    } catch (error) {
        next(error)
    }
}