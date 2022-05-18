import { CreateUserParams } from '../controllers/params/user-params'
import bcrypt from 'bcrypt'
import { UserRepository } from '../repositories/user.repository'

export class UserService {
  private readonly userRepository: UserRepository

  public constructor () {
    this.userRepository = new UserRepository()
  }

  async createUser (user: CreateUserParams): Promise<boolean> {
    const userByEmail = await this.userRepository.findByEmail(user.email)
    if (userByEmail != null) {
      return await new Promise((resolve, reject) => reject(""))
    }


    const passwordEncripted = await bcrypt.hash(user.password, 12)
    const userAttributes = {
      email: user.email,
      password: passwordEncripted,
      name: user.name,
    }

    const userSaved = await this.userRepository.create(userAttributes)
    return await new Promise((resolve) => resolve(true))
  }
}
