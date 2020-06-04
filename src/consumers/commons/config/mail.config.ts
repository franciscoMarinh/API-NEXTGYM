require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env.local',
})

export default {
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
}
