require('dotenv').config({
  path: process.env.NODE_ENV !== 'test' ? '.env.local' : '.env.test',
})

export default {
  redis: {
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASS,
    host: process.env.REDIS_HOST,
  },
}
