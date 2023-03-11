const { verify } = require('../helpers/jwt')
const { User, Movie, Customer } = require('../models')

const authenticate = async (req, res, next) => {
  try {
    const error = {
      name: 'AuthenticationFailed',
      message: 'Please login first',
    }

    const { access_token } = req.headers
    if (!access_token) throw error

    const { id, role } = verify(access_token)

    const user = await User.findOne({ where: { id, role } })
    if (!user) throw error

    req.user = { id, role, email: user.email }

    next()
  } catch (err) {
    console.log(err)
    next(err)
  }
}

const authenticateCustomer = async (req, res, next) => {
  try {
    const error = {
      name: 'AuthenticationFailed',
      message: 'Please login first',
    }
    
    const { access_token } = req.headers
    if (!access_token) throw error
    
    const { id, role } = verify(access_token)

    const user = await Customer.findOne({ where: { id, role } })
    if (!user) throw error
    
    req.user = { id, role, email: user.email }
    
    next()
  } catch (err) {
    // console.log(err)
    next(err)
  }
}

const authorizationDeleteMovie = async (req, res, next) => {
  try {
    const { id, role } = req.user

    const { id: paramsId } = req.params
    const movie = await Movie.findByPk(paramsId)

    if (role !== 'admin' && id !== movie.authorId)
      throw { name: 'UnAuthorized', message: 'You are not authorized' }

    next()
  } catch (err) {
    next(err)
  }
}

const authorizationEditMovie = async (req, res, next) => {
  try {
    const { id, role } = req.user

    const { id: paramsId } = req.params
    const movie = await Movie.findByPk(paramsId)

    if (role !== 'admin' && id !== movie.authorId)
      throw { name: 'UnAuthorized', message: 'You are not authorized' }

    next()
  } catch (err) {
    next(err)
  }
}

const authorizationDeleteGenre = (req, res, next) => {
  try {
    const { role } = req.user

    if (role !== 'admin')
      throw { name: 'UnAuthorized', message: 'You are not authorized' }

    next()
  } catch (err) {
    next(err)
  }
}

const authorizationUpdateStatus = (req, res, next) => {
  try {
    const { role } = req.user

    if (role !== 'admin')
      throw { name: 'UnAuthorized', message: 'You are not authorized' }

    next()
  } catch (err) {
    next(err)
  }
}

module.exports = {
  authenticate,
  authenticateCustomer,
  authorizationDeleteMovie,
  authorizationDeleteGenre,
  authorizationUpdateStatus,
  authorizationEditMovie,
}
