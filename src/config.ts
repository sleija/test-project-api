import dotenv from 'dotenv'
import { env } from '@usefultools/utils'
import { OAS3Definition } from 'swagger-jsdoc'
import packageJson from '../package.json'

dotenv.config()

interface SimpleFlags {
  [key: string]: boolean
}

export interface Config {
  isProductionEnvironment: boolean
  service: {
    version: string
    port: number
  }
  db: {
    ssl: boolean
    max: number
    min: number
    idleTimeoutMillis: number
    schema: string
    url: string
  }
  swaggerDefinition: OAS3Definition & { basePath: string }
  basicAuth: { user: string; password: string }
}

const isProductionEnvironment = env.getAsStr('NODE_ENV') === 'production'
const service: Config['service'] = {
  version: 'v1',
  port: env.getAsInt('PORT'),
}

const config: Config = {
  isProductionEnvironment,
  service,
  db: {
    url: env.getAsStr('DATABASE_URL'),
    //Leave this configured and not hard coded, because unlike app urls, the db conn urls change regularly with staff changes for security purposes
    ssl: env.getAsBool('PGSSLMODE'),
    max: env.getAsInt('DATABASE_MAX_CONNECTIONS'),
    min: env.getAsInt('DATABASE_MIN_CONNECTIONS'),
    idleTimeoutMillis: 30000,
    schema: 'public',
  },
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: packageJson.name,
      description: packageJson.description,
      version: packageJson.version,
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/${service.version}`,
        description: `localhost:${process.env.PORT}`,
      },
    ],
    // Additional properties for setting up the route
    basePath: '/docs',
  },
  basicAuth: {
    user: env.getAsStr('BASIC_AUTH_USER'),
    password: env.getAsStr('BASIC_AUTH_PASSWORD'),
  },
}

export default config
