const request = require('supertest')
const app = require('../app')
const { hash } = require('../helpers/bcyprt')
const { Movie, Genre, User } = require('../models')

beforeAll(async () => {
  await User.bulkCreate(
    require('../data.json').users.map((user) => {
      user.createdAt = new Date()
      user.updatedAt = new Date()

      user.password = hash(user.password)
      return user
    })
  )
  await Genre.bulkCreate(
    require('../data.json').genres.map((genre) => {
      genre.createdAt = new Date()
      genre.updatedAt = new Date()

      return genre
    })
  )
  await Movie.bulkCreate(
    require('../data.json').movies.map((movie) => {
      movie.createdAt = new Date()
      movie.updatedAt = new Date()

      return movie
    })
  )
})

afterAll(async () => {
  await Movie.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  })
  await Genre.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  })
  await User.destroy({ truncate: true, cascade: true, restartIdentity: true })
})

describe('GET /movies', () => {
  test('200 Success get Movies', (done) => {
    request(app)
      .get('/pub/movies')
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(200)
        expect(body).toHaveProperty('currentPage', 1)
        expect(body.movies.length).toBeGreaterThanOrEqual(1)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  test('200 Success get Movies page 1', (done) => {
    request(app)
      .get('/pub/movies?perPage=1&page=1')
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(200)
        expect(body).toHaveProperty('currentPage', '1')
        expect(body.movies.length).toBeGreaterThanOrEqual(1)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  test('200 Success get Movies page 2', (done) => {
    request(app)
      .get('/pub/movies?perPage=1&page=2')
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(200)
        expect(body).toHaveProperty('currentPage', '2')
        expect(body.movies.length).toBeGreaterThanOrEqual(1)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  test('200 Success get Movies with search', (done) => {
    request(app)
      .get('/pub/movies?search=a')
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(200)
        expect(body.movies.length).toBeGreaterThanOrEqual(1)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  test('200 Success get Movies detail', (done) => {
    request(app)
      .get('/pub/movies/1')
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(200)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  test('404 on Movies detail', (done) => {
    request(app)
      .get('/pub/movies/999999')
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(404)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})
describe('GET /genres', () => {
  test('200 Success get genres', (done) => {
    request(app)
      .get('/pub/genres')
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(200)
        expect(Array.isArray(body)).toBeTruthy()
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})
