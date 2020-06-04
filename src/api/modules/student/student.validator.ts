import Joi from '@hapi/joi'
import { User } from '../../../types/requests/user.type'

type ValidateParams = (body: User, requiredAll?: boolean) => void | Error

class ValidatorController {
  public validateParams: ValidateParams = (body, requiredAll = true) => {
    const name = Joi.string().min(3).max(45)

    const schema = Joi.object({
      name: requiredAll ? name.required() : name,
      password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
      email: Joi.string().email().required(),
      birthDate: Joi.string().required(),
      biography: Joi.string().required(),
    })

    const isValid = schema.validate(body)
    if (isValid.error) throw new Error(isValid.error.details[0].message)
  }
}

export default new ValidatorController()
