import { Router } from 'express'
import { UserController } from '../../controllers/user.controller'

export default (router: Router): Router => {
  const userController = new UserController()

  router.post('/usuario/registrar', (req, res) => {
    userController.create(req.body).then((response) => res.status(response.statusCode).json(response.body)).catch(() => res.sendStatus(500))
  })

  return router
}
