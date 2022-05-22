import express from 'express'
import config from '../../config'
import { getAllProducts } from './controllers'

const router = express.Router()

/**
 * @swagger
 * /shopping-cart/:
 *   get:
 *     tags:
 *       - shopping-cart
 *     summary: Get the logged in user's shopping cart, if it exists
 *     responses:
 *       200:
 *         description: User's active shopping cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingCart'
 *     security:
 *       - BearerAuth: []
 */
router.get('/', async (req, res) => {
  const allProducts = await getAllProducts()
  return res.json(allProducts)
})

export { router as product }
