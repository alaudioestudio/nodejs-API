module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  },
  test: {
    url: process.env.DATABASE_URL
  },
  production: {
    url: process.env.DATABASE_URL
  }
}
