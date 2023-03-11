const { History } = require('../models')

class HistoryController {
  static async list(req, res, next) {
    try {
      const result = await History.findAll({
        order: [['id', 'DESC']]
      })

      res.json(result)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = HistoryController