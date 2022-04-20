import express from 'express'
import { connectDB } from '*/config/mongodb'
import { env } from '*/config/environment'

connectDB()
  .then(() => console.log('Connected successfully to database server!'))
  .then(() => bootServer()) // If the connection is successful to the DB, then boot the app
  .catch(err => {
    console.log(err)
    process.exit(1) // Crash - stop app
  })

const bootServer = () => {
  const app = express()

  app.get('/test', async (req, res) => {
    res.end('<h1>Hí anh em</h1>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Server running at ${env.APP_HOST}:${env.APP_PORT}`)
  })
}
