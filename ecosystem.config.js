module.exports = [{
  script: './dist/server.js',
  name: 'api',
  exec_mode: 'cluster',
  instances: 'max'
}, {
  script: './dist/consumers/run.js',
  name: 'job'
}]