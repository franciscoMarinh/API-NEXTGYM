import nodeMailer from 'nodemailer'
import config from '../config/mail.config'

export default nodeMailer.createTransport(config)
