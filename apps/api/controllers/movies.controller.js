const { logs } = require('../helpers/logs')
const { Movie, User, Genre } = require('../models')
const { Op } = require('sequelize')

class MoviesController {
  static async list(req, res, next) {

    const { search } = req.query

    let where = {}

    if(search) {
      where.title = { [Op.iLike]: `%${search}%` }
    }

    try {
      const movies = await Movie.findAll({
        where,
        include: [
          Genre,
          {
            model: User,
            attributes: { exclude: ['password'] },
          },
        ],
      })

      res.json(movies)
    } catch (error) {
      next(error)
    }
  }

  static async add(req, res, next) {
    try {
      const { title, synopsis, trailerUrl, imgUrl, rating, genreId } =
        req.body

      const data = await Movie.create({
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        genreId,
        authorId: req.user.id,
      })

      // no await needed
      logs({
        title,
        description: `new movie with id ${data.id} created`,
        updatedBy: req.user.email
      })

      res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async detail(req, res) {
    try {
      const { id } = req.params

      const data = await Movie.findByPk(id, {
        include: [
          Genre,
          {
            model: User,
            attributes: { exclude: ['password'] },
          },
        ],
      })

      if (!data) throw { name: 'NotFound', message: 'Movie not found' }

      res.json(data)
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params

      const data = await Movie.findByPk(id)

      if (!data) throw { name: 'NotFound', message: 'Movie not found' } 

      await data.destroy()

      res.json({ message: `${data.title} success to delete` })
    } catch (error) {
      next(error)
    }
  }

  static async editMovie(req, res, next) {
    try {
      const { id } = req.params
      const { title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body

      const movie = await Movie.findByPk(id)

      if(!movie) throw { name: 'NotFound', message: 'Movie not found' } 

      const newMovie = await movie.update({ title, synopsis, trailerUrl, imgUrl, rating, genreId })

      logs({
        title,
        description: `movie with id ${id} updated`,
        updatedBy: req.user.email
      })

      res.json(newMovie)
    } catch (error) {
      next(error)
    }
  }


  static async status(req, res, next) {
    try {
      const { status } = req.body
      const { id } = req.params
      const movie = await Movie.findByPk(id)

      if(!movie) throw { name: 'NotFound', message: 'Movie not found' }

      const statusBefore = movie.status

      if(status === statusBefore) {
        res.status(304).json({ message: 'status no modified' })
        return
      }

      const newMovie = await movie.update({ status })
      
      logs({
        title: movie.title,
        description: `movie with id ${id} status has been updated from ${statusBefore} to ${status}`,
        updatedBy: req.user.email
      })

      res.json(newMovie)

    } catch (error) {
      next(error)
    }
  }
}

module.exports = MoviesController
