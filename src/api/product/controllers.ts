import {
  Product, ProductModel
} from './models'

export async function getAllProducts(): Promise<Product[]> {
  const products = (await ProductModel.findAll({raw: true}) as unknown) as Product[]
  return products
}