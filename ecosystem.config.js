/* eslint-disable @typescript-eslint/camelcase */
module.exports = [
  {
    script: './src/server.js',
    name: 'api',
    exec_mode: 'cluster',
    instances: 'max',
  },
  {
    script: './src/consumers/run.js',
    name: 'job',
  },
]
