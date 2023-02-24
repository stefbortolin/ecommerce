import {Router} from 'express'
import { createNewUser, getAllUsers } from '../controllers/user-controllers'

const router = Router()

router.get('/user', getAllUsers)

router.post('/user', createNewUser)

export default router