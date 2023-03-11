const { Router } = require('express')
const GenresController = require('../controllers/genres.controller')
const { authorizationDeleteGenre } = require('../middlewares/auth.middleware')

const router = Router()

router.get('/', GenresController.list)
router.post('/', GenresController.add)

router.get('/:id', GenresController.detail)
router.delete('/:id', authorizationDeleteGenre, GenresController.delete)

module.exports = router
