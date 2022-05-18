import { badRequest } from '../helpers/responses'
import { UserService } from '../services/create-user.service'
import { CreateUserParams } from './params/user-params'

export class UserController {
  private readonly userService: UserService

  public constructor () {
    this.userService = new UserService()
  }

  async create (userParams: CreateUserParams): Promise<any> {
    try {
      if (userParams?.password.length < 8) {
        return badRequest(['Senha precisa ter pelo menos 8 caracteres.'])
      }

      await this.userService.createUser(userParams)

      return await new Promise(resolve => resolve({
        statusCode: 201,
        body: true
      }))
    } catch (error: any) {
      if (error.errors != null) {
        const errors: string[] = error.errors.map((e: Error) => e.message)
        return badRequest(errors)
      }

      return new Promise(resolve => resolve({
        statusCode: 500,
        body: error.message
      }))
    }
  }

}
