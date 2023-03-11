const { Genre, Movie, User } = require('../models')
const { Op } = require('sequelize')

class GenresController {
  static async list(req, res, next) {
    const { search } = req.query

    let where = {}

    if(search) {
      where.name = { [Op.iLike]: `%${search}%` }
    }

    try {
      const genres = await Genre.findAll({ where })

      res.json(genres)
    } catch (error) {
      next(error)
    }
  }

  static async add(req, res, next) {
    try {
      const { name } = req.body
      const genre = await Genre.create({ name })

      res.status(201).json(genre)
    } catch (error) {
      next(error)
    }
  }

  static async detail(req, res, next) {
    try {
      const { id } = req.params

      const data = await Genre.findByPk(id, { include: Movie })

      if (!data) throw { name: 'NotFound', message: 'Genre not found' }
      
      res.json(data)
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params

      const data = await Genre.findByPk(id)

      if (!data) throw { name: 'NotFound', message: 'Genre not found' }

      await data.destroy()

      res.json({ message: `${data.name} success to delete` })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = GenresController
