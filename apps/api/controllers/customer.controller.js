const { validate, salt } = require('../helpers/bcyprt')
const { verifyToken } = require('../helpers/google')
const { sign } = require('../helpers/jwt')
const { Customer, Movie, Favorite } = require('../models')

class CustomerController {
  static async addFavorites(req, res, next) {
    try {
      const { id: CustomerId } = req.user
      const { movieId: MovieId } = req.params
      const movie = await Movie.findOne({
        where: { id: MovieId, status: 'active' },
      })
      if (!movie) throw { name: 'NotFound', message: 'Data not found' }

      const [, created] = await Favorite.findOrCreate({
        where: { CustomerId, MovieId },
      })

      if (created) {
        res.status(201).json({ message: `Added to favorite list` })
        return
      }
      res.status(200).json({ message: `Already in favorite list` })
    } catch (error) {
      next(error)
    }
  }

  static async removeFavorites(req, res, next) {
    try {
      const { id: CustomerId } = req.user
      const { movieId: MovieId } = req.params

      const data = await Favorite.findOne({
        where: { CustomerId, MovieId },
      })

      if (!data) {
        throw { name: 'NotFound', message: 'Data not found' }
      }

      await data.destroy()
      res.json({ message: 'Data removed' })
    } catch (error) {
      next(error)
    }
  }

  static async userFavorites(req, res, next) {
    try {
      const { id } = req.user
      const data = await Customer.findByPk(id, {
        include: { model: Movie, where: { status: 'active' } },
      })
      res.json(data.Movies)
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body

      const user = await Customer.findOne({
        where: {
          email,
        },
      })

      const err = {
        name: 'AuthenticationFailed',
        message: 'Email or Password is invalid',
      }

      if (!user) throw err

      const isValid = validate(password, user.password)
      if (!isValid) throw err

      const { id, role } = user

      const access_token = sign({ id, role, email })

      res.json({ access_token })
    } catch (error) {
      next(error)
    }
  }

  static async register(req, res, next) {
    try {
      const { email, password } = req.body

      const user = await Customer.create({ email, password, role: 'customer' })

      const { id, role } = user
      const access_token = sign({ id, role, email })
      res.status(201).json({
        message: `Customer with email ${email} has been registered!`,
        access_token,
      })
    } catch (error) {
      next(error)
    }
  }

  static async loginWithGoogle(req, res, next) {
    try {
      const token = req.headers['google-auth-token']
      const { email } = await verifyToken(token)

      let [user, created] = await Customer.findOrCreate({
        where: {
          email,
        },
        defaults: {
          password: salt(),
          role: 'customer',
        },
        hooks: false,
      })

      let code = 200

      if (created) {
        code = 201
      }

      const { id, role } = user

      const access_token = sign({ id, role, email })

      res.status(code).json({ access_token })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CustomerController
