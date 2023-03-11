const { Movie, User, Genre } = require('../models')
const { Op, literal } = require('sequelize')

class PublicController {
  static async movieRandom(req, res, next) {
    try {
      const movie = await Movie.findOne({
        where: { status: 'active' },
        order: [literal('random()')],
        include: Genre,
      })
      res.json(movie)
    } catch (error) {
      next(error)
    }
  }
  static async genres(req, res, next) {
    const { search, letter } = req.query

    let where = {}

    if (search) {
      where.name = { [Op.iLike]: `%${search}%` }
    }
    if (letter) {
      where.name = { [Op.iLike]: `${letter}%` }
    }

    try {
      const genres = await Genre.findAll({ where })

      res.json(genres)
    } catch (error) {
      next(error)
    }
  }

  static async movies(req, res, next) {
    try {
      let option = {
        where: { status: 'active' },
        include: Genre,
      }

      // pagination /?page=
      const page = req.query.page || 1

      const postPerPage = req.query.perPage || 10

      const offset = Math.max(+page - 1, 0) * postPerPage
      const limit = postPerPage

      option.offset = offset
      option.limit = limit

      // filter /?rating=
      const { rating } = req.query
      if (rating) {
        // ranged rating /?rating=from-to (/?rating=3-7)
        if (~rating.indexOf('-')) {
          const [from, to] = rating.split('-').map(Number)
          option.where.rating = { [Op.gte]: from, [Op.lte]: to }
        }

        // rating with exact number /?rating=10
        if (Number(rating)) {
          option.where.rating = +rating
        }
      }

      // search /?search=
      // searching thru title or synopsis
      const { search } = req.query
      if (search) {
        option.where[Op.or] = [
          {
            title: {
              [Op.iLike]: `%${search}%`,
            },
          },
        ]
      }

      // filter by genre /?genre= (/?genre=1 || /?genre=1,4,5)
      const { genre } = req.query
      if (genre) {
        const genres = genre.split(',').map(Number)
        option.where.genreId = { [Op.or]: genres }
      }

      // filter by user /?author= (/?author=1 || /?author=1,2,3)
      const { author } = req.query
      if (author) {
        const authors = author.split(',').map(Number)
        option.where.authorId = { [Op.or]: authors }
      }

      // sort /?sortby= ('title-asc' || 'rating-desc' || 'createdAt-asc')
      const { sortby } = req.query
      if (sortby) {
        const [column, type] = sortby.split('-')
        option.order = [[column, type]]
      }

      const { count, rows } = await Movie.findAndCountAll(option)

      res.json({
        totalPage: Math.ceil(count / postPerPage),
        currentPage: page,
        movies: rows,
      })
    } catch (error) {
      next(error)
    }
  }

  static async moviesDetail(req, res, next) {
    try {
      const data = await Movie.findOne({
        where: { id: +req.params.id, status: 'active' },
        include: Genre,
      })
      if (!data) throw { name: 'NotFound', message: 'Movie not found' }
      res.json(data)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = PublicController
