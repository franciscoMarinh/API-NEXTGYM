require('dotenv').config()

module.exports = {
  url: process.env.DATABASE_URL,
  type: 'postgres',
  synchronize: true,
  logging: false,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [`src/database/entity/*.{ts,js}`],
  migrations: [`src/database/migration/*.{ts,js}`],
  subscribers: [`src/database/subscriber/*.{ts,js}`],
  cli: {
    entitiesDir: 'src/database/entity',
    migrationsDir: 'src/database/migration',
    subscribersDir: 'src/database/subscriber',
  },
}
