import jwt from 'jsonwebtoken'

export class JwtTokenService {
  private readonly secret
  constructor () {
    this.secret = process.env?.JWT_SECRET != null ? process.env.JWT_SECRET : 'jwt_secret'
  }

  async createToken (user, expires): Promise<string> {
    return jwt.sign({
      id: user.id,
      name: user.email,
      exp: expires
    }, this.secret)
  }

  async decrypt (ciphertext: string): Promise<string> {
    return jwt.verify(ciphertext, this.secret) as any
  }
}
