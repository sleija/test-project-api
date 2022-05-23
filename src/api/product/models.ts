import { Model, DataTypes, UUIDV4 } from 'sequelize'
import sequelize, { commonModelOptions } from '../../services/sequelize'
// import { UserSettingsModel } from '../user/models'

export const enum ProductStatus {
  InProgress = 'ACTIVE',
  Paid = 'INACTIVE',
}

export interface Product {
  productId?: string
  name: string
  description: string
  price: number
  status: ProductStatus
}

export type ProductInstance = Model<Product>

export const ProductModel = sequelize.define<ProductInstance>(
  'Product',
  {
    productId: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('ACTIVE', 'INACTIVE'),
      allowNull: false,
    },
  },
  {
    ...commonModelOptions,
    tableName: 'product',
  }
)
