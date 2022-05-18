import sequelize from '../database/index'

export class UserRepository  {
  async create (user: any): Promise<any> {
    const userDB = await sequelize.query(`
      insert into users values(${user.name}, ${user.email}, ${user.password})
    `)
    return await new Promise((resolve) => resolve(userDB))
  }

  async findByEmail (email: string): Promise<any> {
    const query = ` select  * from users u where email = '${email}' limit 1`
    const [results] = await sequelize.query(query)
    const result: any = results
    return await new Promise((resolve) => resolve(result))
  }


}
