import sequelize from './services/sequelize'
import config from './config'
import createApp from './app'


const { port } = config.service

// https://github.com/prettier/prettier/issues/7423
// eslint-disable-next-line
;(async () => {
  // IMPORTANT: This creates the DB schema if it doesn't exist already
  // Keep in mind that this only works if the database version is fetched
  // after authentication.
  // https://github.com/sequelize/sequelize/issues/8846
  await sequelize.authenticate()
  await sequelize.createSchema(config.db.schema, { logging: true })
  // IMPORTANT: This syncs all defined models to the database
  // Do not enable "force: true" on any production database as that would
  // drop any table if it exists
  // https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-method-sync
  await sequelize.sync()

  const app = createApp()

  app.listen(port, () => {
    console.info(`Listening on port: ${port}`)
    console.info(`Swagger UI Docs available at: ${port}`)
  })

})()
