const http = require('http')

class HttpError extends Error {
  constructor(status, message) {
    super(message || http.STATUS_CODES[status])
    this.status = status
  }

  middleware = () => {
    return (req, res, next) => {
      next(this)
    }
  }
}

module.exports = HttpError
