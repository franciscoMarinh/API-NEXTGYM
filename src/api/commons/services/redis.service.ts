import redis from 'redis'
import config from '../config/redis.config'

const client = redis.createClient(config)

export default client
