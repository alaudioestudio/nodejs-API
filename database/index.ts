import { Sequelize } from 'sequelize'

const config: any =
  process.env.DISABLE_SSL != null
    ? {
        logging: false,
        dialect: 'postgres'
      }
    : {
        logging: false,
        dialect: 'postgres',
        dialectOptions: {
          ssl: {
            require: false,
            rejectUnauthorized: false
          }
        }
      }

export default new Sequelize(process.env.DATABASE_URL as string, config)