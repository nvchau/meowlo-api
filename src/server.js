import express from 'express'
import { mapOrder } from '*/utilities/sorts.js'

const app = express()

const hostname = 'localhost'
const port = 3001

app.get('/', (req, res, next) => {
  res.end('<h1>Hí anh em</h1>')
})

app.listen(port, hostname, () => {
  console.log(`Server running at ${hostname}:${port}`)
})
