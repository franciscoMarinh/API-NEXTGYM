require('dotenv').config({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env'
      : process.env.NODE_ENV === 'test'
      ? '.env.test'
      : '.env.local',
})

export default {
  redis: {
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASS,
    host: process.env.REDIS_HOST,
  },
}
