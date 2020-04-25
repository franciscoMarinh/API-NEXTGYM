require('dotenv').config({
  path: process.env.NODE_ENV !== 'test' ? '.env.local' : '.env.test',
})

const basePath = process.env.NODE_ENV === 'production' ? 'build' : 'src'
module.exports = {
  type: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_BASE,
  synchronize: true,
  logging: false,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
  entities: [`${basePath}/database/entity/**/*.ts`],
  migrations: [`${basePath}/database/migration/**/*.ts`],
  subscribers: [`${basePath}/database/subscriber/**/*.ts`],
  cli: {
    entitiesDir: 'src/database/entity',
    migrationsDir: 'src/database/migration',
    subscribersDir: 'src/database/subscriber',
  },
}
