const { History, User } = require('../models')

const logs = async({ title, description, updatedBy }) => {
  try {
    await History.create({ title, description, updatedBy })
  } catch (error) {
    console.error(error)
  }
}

module.exports = { logs }