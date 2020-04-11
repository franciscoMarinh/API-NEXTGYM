import Promises from 'bluebird'

export default fn => (req, res, next) => {
  Promises.resolve(fn(req, res, next))
    .catch(error => {
      res.status(500).json({
        message: error.message
      })
    })
}
