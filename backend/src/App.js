import express from 'express'
import conf from './config'
import cors from 'cors'
import {config} from 'dotenv'
import mercadopago from 'mercadopago'
import productRoutes from './routes/products-routes'
import categoryRoutes from './routes/category-routes'
import userRoutes from './routes/user-routes'
import authRoutes from './routes/auth-routes'
import paymentRoutes from './routes/payment-routes'
import orderRoutes from './routes/order-routes'

config()
const app = express()


app.set('port', conf.port)
app.use(cors({origin: "*"}))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(productRoutes)
app.use(categoryRoutes)
app.use(userRoutes)
app.use(authRoutes)
app.use(paymentRoutes)
app.use(orderRoutes)

app.use((err,req,res,next)=> {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    return res.json({
        message:err.message
    })
    
})
export default app