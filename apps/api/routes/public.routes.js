const { Router } = require('express')
const CustomerController = require('../controllers/customer.controller')
const PublicController = require('../controllers/public.controller')
const { authenticateCustomer } = require('../middlewares/auth.middleware')

const router = Router()

router.get('/movies', PublicController.movies)
router.get('/genres', PublicController.genres)
router.get('/movies/random', PublicController.movieRandom)
router.get('/movies/:id', PublicController.moviesDetail)

router.post('/login', CustomerController.login)
router.post('/register', CustomerController.register)
router.post('/google-sign-in', CustomerController.loginWithGoogle)

router.get('/customer/favorites', authenticateCustomer, CustomerController.userFavorites)
router.post('/customer/favorites/:movieId', authenticateCustomer, CustomerController.addFavorites)
router.delete('/customer/favorites/:movieId', authenticateCustomer, CustomerController.removeFavorites)
module.exports = router