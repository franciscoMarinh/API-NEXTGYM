import Joi from '@hapi/joi'

class ValidatorController {
  public validateStudentParams = (body: object) => {
    const schema = Joi.object({
      password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
      email: Joi.string().email().required(),
      biography: Joi.string().required(),
      birthDate: Joi.string().required(),
      license: Joi.string().required(),
      name: Joi.string().required(),
    })

    const isValid = schema.validate(body)
    if (isValid.error) throw new Error(isValid.error.details[0].message)
  }

  public validateTrainingParams = (body: object) => {
    const schema = Joi.object({
      description: Joi.string().required(),
      urlYoutube: Joi.string(),
      title: Joi.string().required(),
      exerciseDate: Joi.date().required(),
    })

    const isValid = schema.validate(body)
    if (isValid.error) throw new Error(isValid.error.details[0].message)
  }

  public validateTrainingUpdateParams = (body: object) => {
    const schema = Joi.object({
      description: Joi.string().required(),
      urlYoutube: Joi.string(),
      title: Joi.string().required(),
      exerciseDate: Joi.date().required(),
    })

    const isValid = schema.validate(body)
    if (isValid.error) throw new Error(isValid.error.details[0].message)
  }
}

export default new ValidatorController()
