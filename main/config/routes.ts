import { Express, Router } from 'express'
import userRoutes from '../routes/user-routes'
import loginRoutes from '../routes/login-routes'


export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  app.use(loginRoutes(router))
  app.use(userRoutes(router))
}
