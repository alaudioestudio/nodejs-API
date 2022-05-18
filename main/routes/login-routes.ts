import { Router } from 'express'
import { LoginController } from '../../controllers/login.controller'

export default (router: Router): Router => {
  router.post('/login', (req, res) => {
    const loginController = new LoginController()
    loginController.login(req.body).then((httpResponse) => res.status(httpResponse.statusCode).json(httpResponse.body)).catch(() => res.sendStatus(500))
  })
  return router
}
