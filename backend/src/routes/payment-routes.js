import {Router} from 'express'
import { payment } from '../controllers/payment-controllers'

const router = Router()

router.post('/payment', payment)

export default router