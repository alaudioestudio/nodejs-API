import { LoginService } from '../services/login.service'
import { unauthorized, badRequest } from '../helpers/responses'
import { Body, Post, Route, SuccessResponse, Tags } from 'tsoa'
import { LoginParams } from './params/login-params'

@Route('/api/login')
@Tags('Login')
export class LoginController {
  private readonly loginService: LoginService

  public constructor () {
    this.loginService = new LoginService()
  }

  @Post('/')
  @SuccessResponse('201', 'Created')
  async login (@Body() loginParams: LoginParams): Promise<any> {
    try {
      const loginResponse = await this.loginService.login(loginParams)

      if (loginResponse.jwt !== null && loginResponse.jwt !== '') {
        return await new Promise(resolve => resolve({
          statusCode: 200,
          body: loginResponse
        }))
      }

      return unauthorized()
    } catch (error: any) {
      console.log(error)
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
