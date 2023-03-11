const errorMiddleware = (err, req, res, next) => {
  console.log(err)
  if (
    err.name &&
    (err.name === 'SequelizeValidationError' ||
      err.name === 'SequelizeUniqueConstraintError' ||
      err.name === 'SequelizeForeignKeyConstraintError')
  ) {
    const error = {
      name: 'ValidationError',
      message: err.errors[0].message,
    }
    res.status(400).json({ message: error.message })
    return
  }
  if (
    err.name &&
    (err.name === 'AuthenticationFailed' ||
      err.name === 'JsonWebTokenError' ||
      err.name === 'TokenExpiredError')
  ) {
    res.status(401).json({ message: err.message })
    return
  }
  if (err.name && err.name === 'UnAuthorized') {
    res.status(403).json({ message: err.message })
    return
  }
  if (err.name && err.name === 'NotFound') {
    res.status(404).json({ message: err.message })
    return
  }
  res.status(500).json({ message: 'Internal Server Error' })
}

module.exports = { errorMiddleware }
