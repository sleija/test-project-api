import { ModelOptions, Sequelize } from 'sequelize'
import config from '../config'

export const commonModelOptions: ModelOptions = {
  timestamps: true, // automatically add "createdAt" and "updatedAt" properties
  schema: config.db.schema,
  underscored: true,
}

const sequelize = new Sequelize(config.db.url, {
  dialect: 'postgres',
  ssl: config.db.ssl,
  // Use recommended default settings for the pool
  pool: {
    max: config.db.max,
    min: config.db.min,
  },
  dialectOptions: config.db.ssl
    ? {
        ssl: {
          require: config.db.ssl,
          rejectUnauthorized: false,
        },
      }
    : {},
  logging: (msg) => console.info(msg),
})

export default sequelize
