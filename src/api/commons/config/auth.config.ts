const publicKey = `
-----BEGIN PUBLIC KEY-----
${process.env.JWT_PUBLICKEY}
-----END PUBLIC KEY-----
`

const configOptions = {
  issuer: process.env.JWT_ISSUER,
  subject: process.env.JWT_SUBJECT,
  audience: process.env.JWT_AUDIENCE,
  expiresIn: process.env.JWT_EXPIRES,
  algorithm: 'RS256',
}

export default {
  publicKey,
  configOptions,
}
