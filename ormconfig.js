require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env.local',
})

const basePath = process.env.NODE_ENV === 'production' ? `dist` : 'src'

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
  entities: [`${basePath}/database/entity/*.{ts,js}`],
  migrations: [`${basePath}/database/migration/*.{ts,js}`],
  subscribers: [`${basePath}/database/subscriber/*.{ts,js}`],
  cli: {
    entitiesDir: 'src/database/entity',
    migrationsDir: 'src/database/migration',
    subscribersDir: 'src/database/subscriber',
  },
}
