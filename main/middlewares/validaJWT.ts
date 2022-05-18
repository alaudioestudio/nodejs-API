import { Response, Request, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

function validateJWT (token: string, roles: string[]): boolean {
  if (token == null) return false

  token = token.replace('Bearer ', '')
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string)
    if (decoded.exp == null || decoded.exp <= Date.now()) {
      return false
    }
    if (!decoded.role || decoded.role.length === 0) {
      return false
    }
    return roles.find(r => decoded.role.indexOf(r) !== -1) != null
  } catch (err) {
    console.log(err)
    return false
  }
}

export const auth = (roles: string[]): any => {
  return function (req: Request, res: Response, next: NextFunction) {
    const canAcess = validateJWT(
      req.headers != null ? (req.headers.authorization as string) : '',
      roles
    )
    if (!canAcess) {
      res.sendStatus(401)
    } else next()
  }
}
