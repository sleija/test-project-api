import {
  Product, ProductModel
} from './models'

export async function getAllProducts(): Promise<Product[]> {
  const products = (await ProductModel.findAll({raw: true}) as unknown) as Product[]
  return products
}

export async function saveProduct(product: Product): Promise<Product> {
  const [savedProduct, created] = await ProductModel.upsert(product)
  return savedProduct.get()
}