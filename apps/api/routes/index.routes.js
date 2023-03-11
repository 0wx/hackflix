const { Router } = require('express')
const genresRouter = require('./genres.routes')
const usersRouter = require('./users.routes')
const moviesRouter = require('./movies.routes')
const authRouter = require('./auth.routes')
const historyRouter = require('./history.routes')
const publicRouter = require('./public.routes')

const { authenticate } = require('../middlewares/auth.middleware')
const { errorMiddleware } = require('../middlewares/error.middleware')

const router = Router()

router.use('/pub', publicRouter)

router.use(authRouter)
router.use('/genres', authenticate, genresRouter)
router.use('/users', authenticate, usersRouter)
router.use('/movies', authenticate, moviesRouter)
router.use('/history', authenticate, historyRouter)

router.use(errorMiddleware)

module.exports = router
