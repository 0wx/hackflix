const { Router } = require('express')
const HistoryController = require('../controllers/history.controller')

const router = Router()

router.get('/', HistoryController.list)

module.exports = router