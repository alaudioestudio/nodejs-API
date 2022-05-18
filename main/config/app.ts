import express from 'express'
import setupMiddlwares from './middlewares'
import setupRoutes from './routes'

const app = express()

app.use(express.static('public'))

setupMiddlwares(app)
setupRoutes(app)
export default app
