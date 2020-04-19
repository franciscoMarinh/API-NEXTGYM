import typeorm, { createConnection } from 'typeorm'
import factory from '../../factory/User.factory'
import bcrypt from 'bcrypt'

describe('User entity', () => {
  let connection: typeorm.Connection

  beforeAll(async () => {
    connection = await createConnection()
  })
  afterAll(async () => {
    connection.close()
  })

  it('should encript the password', async () => {
    const password = '12345678'
    const encryptedPass = await bcrypt.hash(password, 10)
    expect(encryptedPass).not.toEqual(password)
  })

  it('should encode and decode the password', async () => {
    const password = '12345678'
    const encryptedPass = await bcrypt.hash(password, 10)
    const compare = await bcrypt.compare(password, encryptedPass)
    expect(compare).toEqual(true)
  })

  it('should return a valid user token', async () => {
    const user = await factory.build()
    const token = await user.generateUserToken()
    expect(token).toBeDefined()
  })
})
