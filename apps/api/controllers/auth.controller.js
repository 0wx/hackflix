const { validate, salt } = require('../helpers/bcyprt')
const { verifyToken } = require('../helpers/google')
const { sign } = require('../helpers/jwt')
const { User } = require('../models')

class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({
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

      const { id, role, username } = user

      const access_token = sign({ id, role, username, email })

      res.json({ access_token })
    } catch (error) {
      next(error)
    }
  }

  static async register(req, res, next) {
    try {
      const { email, password, username, phoneNumber, address } = req.body

      const user = await User.create({ email, password, username, phoneNumber, address })

      const { id, role } = user
      const access_token = sign({ id, role, username, email })
      res
        .status(201)
        .json({ message: `Admin with email ${email} has been registered!`, access_token })
    } catch (error) {
      next(error)
    }
  }

  static async loginWithGoogle(req, res, next) {
    try {
      const token = req.headers['google-auth-token']
      const { email, name } = await verifyToken(token)

      let [user, created] = await User.findOrCreate({
        where: {
          email
        },
        defaults: {
          password: salt(),
          username: name,
          role: 'staff'
        },
        hooks: false
      })

      let code = 200

      if(created) {
        code = 201
      }
      
      const { id, role, username } = user

      const access_token = sign({ id, role, username, email })

      res.status(code).json({ access_token })

    } catch (error) {
      next(error)
    }
  }
}

module.exports = AuthController
