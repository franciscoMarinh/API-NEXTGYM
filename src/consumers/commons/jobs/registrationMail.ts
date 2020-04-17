import nodeMailer from '../libs/mail'
import logger from '../utils/logger'

import { ProcessPromiseFunction } from 'bull'

interface Email {
  user: {
    email: string
    name: string
  }
}

const handle: ProcessPromiseFunction<Email> = async ({ data }) => {
  try {
    await nodeMailer.sendMail({
      from: 'nextgymnoreply@gmail.com',
      to: data.user.email,
      subject: 'Bem-vindo',
      text: `Olá ${data.user.name}, Parabéns por se registrar em nossa plataforma`,
    })
    logger.info(`RegistrationMail, E-mail enviado para: ${data.user.email}`)
  } catch (error) {
    logger.error(`RegistrationMail, Error no envio do E-mail ${error.message}`)
  }
}

export default {
  name: 'RegistrationMail',
  handle,
}
