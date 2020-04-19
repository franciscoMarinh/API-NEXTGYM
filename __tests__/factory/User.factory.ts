import * as Faker from 'faker'
import { User } from '../../src/database/entity/User'

interface Params {
  name?: string
  email?: string
  password?: string
}

class FactoryUser {
  public build = (params?: Params): Promise<User> => {
    const {
      email = Faker.internet.email(),
      name = Faker.internet.userName(),
      password = Faker.internet.password(),
    } = params || {}

    const user = User.create({ name, password, email })
    return user.save()
  }
}

export default new FactoryUser()
