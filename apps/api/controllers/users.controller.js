const { User, Genre, Movie } = require('../models')

class UsersController {
  static async list(req, res, next) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] },
        include: [
          {
            model: Movie,
            include: Genre,
          },
        ],
      })

      res.json(users)
    } catch (error) {
      next(error)
    }
  }

  static async add(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body

      const data = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      })
      res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async detail(req, res, next) {
    try {
      const { id } = req.params

      const data = await User.findByPk(id, {
        attributes: { exclude: ['password'] },
        include: [
          {
            model: Movie,
            include: Genre,
          },
        ],
      })

      if(!data) throw { name: 'NotFound', message: 'User not found' }

      res.json(data)
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params

      const data = await User.findByPk(id)

      if (!data) throw { name: 'NotFound', message: 'User not found' }

      await data.destroy()

      res.json({ message: `${data.email} success to delete` })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UsersController
