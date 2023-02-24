import {Router} from 'express'
import { createNewProduct, getProducts, getProduct, getProductCat, deleteProduct, updateProduct , getCategories, getAllProducts } from '../controllers/products-controller'


const router = Router()

router.get('/products', getProducts)

router.get('/products/all', getAllProducts)

router.post('/products', createNewProduct)

router.get('/products/:id', getProduct)

router.get('/categories', getCategories)

router.get('/products/category/:cat', getProductCat)

router.delete('/products/:id', deleteProduct)

router.put('/products/:id', updateProduct)

export default router