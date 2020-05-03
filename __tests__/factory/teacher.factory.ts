import * as Faker from 'faker'
import { Teacher } from '../../src/database/entity/Teachers'

interface Params {
  name?: string
  email?: string
  password?: string
  birthDate?: string
  license?: string
  biography?: string
}

class FactoryUser {
  public build = (params?: Params): Promise<Teacher> => {
    const {
      email = Faker.internet.email(),
      name = Faker.internet.userName(),
      password = Faker.internet.password(),
      license = Faker.internet.userAgent(),
      biography = Faker.internet.domainWord(),
      birthDate = new Date(),
    } = params || {}
    const user = Teacher.create({
      name,
      password,
      email,
      license,
      birthDate,
      biography,
    })
    return user.save()
  }
}

export default new FactoryUser()
