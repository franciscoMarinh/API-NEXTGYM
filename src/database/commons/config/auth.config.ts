const privateKey = `
-----BEGIN RSA PRIVATE KEY-----
${process.env.JWT_PRIVATEKEY}
-----END RSA PRIVATE KEY-----
`

const configOptions = {
  issuer: process.env.JWT_ISSUER,
  subject: process.env.JWT_SUBJECT,
  audience: process.env.JWT_AUDIENCE,
  expiresIn: process.env.JWT_EXPIRES,
  algorithm: 'RS256',
}

export default {
  configOptions,
  privateKey,
}
