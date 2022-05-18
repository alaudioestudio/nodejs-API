import bcrypt from 'bcrypt'
import { LoginParams } from '../controllers/params/login-params'
import { LoginResponse } from '../controllers/responses/login-response'
import { UserRepository } from '../repositories/user.repository'
import { JwtTokenService } from './jwt-token.service'

export class LoginService {
  private readonly userRepository: UserRepository
  private readonly jwtService: JwtTokenService

  public constructor () {
    this.jwtService = new JwtTokenService()
    this.userRepository = new UserRepository()
  }

  async login (loginParams: LoginParams): Promise<LoginResponse> {
    let isValid = false
    const user = await this.userRepository.findByEmail(loginParams.email)
    if (user != null) {
      isValid = await bcrypt.compare(loginParams.password, user.password)
    }

    const expires = new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).getTime()

    const response: LoginResponse = {
      jwt: isValid ? await this.jwtService.createToken(user, expires) : '',
      expires,
      nome: user ? user.name : ''
    }

    return await new Promise((resolve) => resolve(response))
  }
}
