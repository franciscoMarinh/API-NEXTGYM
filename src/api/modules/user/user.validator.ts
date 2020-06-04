import Joi from '@hapi/joi'

class ValidatorController {
  public validateParams = (body: object) => {
    const schema = Joi.object({
      password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
      email: Joi.string().email().required(),
    })

    const isValid = schema.validate(body)
    if (isValid.error) throw new Error(isValid.error.details[0].message)
  }
}

export default new ValidatorController()
