const { Router } = require('express')
const MoviesController = require('../controllers/movies.controller')
const {
  authorizationDeleteMovie,
  authorizationUpdateStatus,
  authorizationEditMovie,
} = require('../middlewares/auth.middleware')

const router = Router()

router.get('/', MoviesController.list)
router.post('/', MoviesController.add)

router.get('/:id', MoviesController.detail)
router.delete('/:id', authorizationDeleteMovie, MoviesController.delete)

router.patch('/:id', authorizationUpdateStatus, MoviesController.status)
router.put('/:id', authorizationEditMovie, MoviesController.editMovie)

module.exports = router
