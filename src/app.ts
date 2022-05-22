import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import basicAuth from 'express-basic-auth'
// Monkey-patch express's `next` method to be automatically
// called when an error is thrown or a promise is rejected.
// This is the default behaviour in Express v5 and therefore
// we can remove the import once we upgrade
// https://expressjs.com/en/guide/error-handling.html
import 'express-async-errors'
import { api } from './api'
import * as error from './api/errorMiddleware'
import config from './config'

const options = {
  swaggerDefinition: config.swaggerDefinition,
  apis: ['src/**/swagger.yaml', './src/**/routes.ts'],
}

const swaggerSpec = swaggerJsdoc(options)

export default function createApp(): express.Express {
  const app = express()
  const { version } = config.service

  // Once we grant access to external developers, we should
  // enable API token based authentication for any calls made
  // through Swagger (e.g. via a user or developer token).
  app.use(
    config.swaggerDefinition.basePath,
    basicAuth({
      users: { [config.basicAuth.user]: config.basicAuth.password },
      challenge: true,
    }),
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
  )

  app.use(cors())
  app.use(helmet())
  app.use(
    express.json({
      limit: 200000,
      verify(req: any, res, buf) {
        if (req.originalUrl.includes('/stripehook')) {
          req.rawBody = buf.toString()
        }
      },
    })
  ) // Limit increase required for GetStream's webhook updates
  // Allow images from other domains (ie: S3)
  app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', `img-src self * data:`)
    return next()
  })

  app.use(`/${version}`, api)

  // If error is not an instanceOf APIError, convert it.
  app.use(error.converter)
  // Catch all other routes and return a 404 by forwarding to error handler
  app.use(error.notFound)
  // Error handler, send stacktrace only during development
  app.use(error.handler)

  return app
}
