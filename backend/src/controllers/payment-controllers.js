import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import mercadopago from 'mercadopago'
config()

export const payment = async (req, res, next) => {
    mercadopago.configure({ access_token: process.env.MERCADOPAGO_KEY })
    const { items, payer } = req.body
    console.log(req.body)
    let preference = {
        payer: payer,
        items: items,
        back_urls: {
            success: 'http://localhost:3000/checkout',
            failure: '',
            pending: '',
        },
        auto_return: 'approved',
        binary_mode: true
    }
    mercadopago.preferences.create(preference)
        .then((response) => res.status(200).send({ response }))
        .catch((error) => res.status(400).send({ error }))
}
