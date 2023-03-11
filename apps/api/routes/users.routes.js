const { Router } = require('express')
const UsersController = require('../controllers/users.controller')
const { authorizationDeleteGenre } = require('../middlewares/auth.middleware')

const router = Router()

router.get('/', UsersController.list)
// router.post('/', UsersController.add)

router.get('/:id', UsersController.detail)
// router.delete('/:id', authorizationDeleteGenre, UsersController.delete)

module.exports = router
