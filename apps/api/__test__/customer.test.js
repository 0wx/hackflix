const request = require('supertest')
const app = require('../app')

const { hash } = require('../helpers/bcyprt')
const { Movie, Genre, Customer, User } = require('../models')

beforeAll(async () => {
  await User.bulkCreate(
    require('../data.json').users.map((user) => {
      user.createdAt = new Date()
      user.updatedAt = new Date()

      user.password = hash(user.password)
      return user
    })
  )
  await Customer.bulkCreate(
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
      movie.status = 'active'
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
  await Customer.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  })
})

const newUser = {
  email: 'joh2n@gmail.com',
  password: 'password2',
}

let access_token

describe('GET /register', () => {
  test('200 Success register', (done) => {
    request(app)
      .post('/pub/register')
      .send(newUser)
      .then((response) => {
        const { status } = response
        expect(status).toBe(201)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  test('400 Email must be unique', (done) => {
    request(app)
      .post('/pub/register')
      .send(newUser)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Email already registered!')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  test('400 Email is required', (done) => {
    request(app)
      .post('/pub/register')
      .send({ password: newUser.password })
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Email is required')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  test('400 Email empty', (done) => {
    request(app)
      .post('/pub/register')
      .send({ password: newUser.password, email: '' })
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Invalid email format')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  test('400 Password is required', (done) => {
    request(app)
      .post('/pub/register')
      .send({ email: newUser.email })
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Password is required')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  test('400 Password empty', (done) => {
    request(app)
      .post('/pub/register')
      .send({ email: newUser.email, password: '' })
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Password is required')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})

describe('POST /login', () => {
  test('200 Logged in', (done) => {
    request(app)
      .post('/pub/login')
      .send(newUser)
      .then((response) => {
        const { status } = response
        access_token = response.body.access_token
        expect(status).toBe(200)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  test('401 invalid email or password', (done) => {
    request(app)
      .post('/pub/login')
      .send({ email: newUser.email, password: '12211' })
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'Email or Password is invalid')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  test('401 invalid email or password', (done) => {
    request(app)
      .post('/pub/login')
      .send({ email: 'x@gmail.com', password: newUser.password })
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'Email or Password is invalid')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})

describe('GET /customer/favorites', () => {
  test('401 Unauthenticated', (done) => {
    request(app)
      .get('/pub/customer/favorites')
      .then((response) => {
        const { status, body } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'Please login first')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})
describe('POST /customer/favorites/:movieId', () => {
  test('201 success add movie to favorite', (done) => {
    request(app)
      .post('/pub/customer/favorites/1')
      .set('access_token', access_token)
      .then((response) => {
        const { status } = response
        expect(status).toBe(201)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test('200 favorite list', (done) => {
    request(app)
      .get('/pub/customer/favorites')
      .set('access_token', access_token)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(200)
        expect(body.length).toBeGreaterThanOrEqual(1)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test('401 Unauthenticated', (done) => {
    request(app)
      .post('/pub/customer/favorites/1')
      .then((response) => {
        const { status, body } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'Please login first')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  test('404 Not found', (done) => {
    request(app)
      .post('/pub/customer/favorites/999999')
      .set('access_token', access_token)
      .then((response) => {
        const { status, body } = response
        expect(status).toBe(404)
        expect(body).toHaveProperty('message', 'Data not found')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})
describe('DELETE /customer/favorites/:movieId', () => {
  test('200 success remove movie from favorite', (done) => {
    request(app)
      .delete('/pub/customer/favorites/1')
      .set('access_token', access_token)
      .then((response) => {
        const { status } = response
        expect(status).toBe(200)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  test('401 Unauthenticated', (done) => {
    request(app)
      .delete('/pub/customer/favorites/1')
      .then((response) => {
        const { status, body } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'Please login first')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  test('404 Not found', (done) => {
    request(app)
      .post('/pub/customer/favorites/999999')
      .set('access_token', access_token)
      .then((response) => {
        const { status, body } = response
        expect(status).toBe(404)
        expect(body).toHaveProperty('message', 'Data not found')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})
