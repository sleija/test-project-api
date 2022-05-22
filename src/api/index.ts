import express from 'express'
import { product } from './product/routes'

const router = express.Router()

router.use('/product', product)

export { router as api }
