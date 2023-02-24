import {Router} from 'express'
import { createOrder } from '../controllers/order-controller'
import AuthMiddleware from '../middlewares/auth-middleware'

const router = Router()

router.post('/productDetail', [AuthMiddleware,createOrder])

export default router