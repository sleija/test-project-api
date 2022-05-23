import express from 'express'
import config from '../../config'
import { getAllProducts, saveProduct } from './controllers'

const router = express.Router()

router.get('/', async (req, res) => {
  const allProducts = await getAllProducts()
  return res.json(allProducts)
})

router.post('/', async (req, res) => {
  const savedProduct = await saveProduct(req.body)
  return res.json(savedProduct)
})

export { router as product }
