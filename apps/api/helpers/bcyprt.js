const bcrypt = require('bcryptjs')

const validate = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}


const hash = (password) => {
  const hashPassword = bcrypt.hashSync(password, 10)
  return hashPassword
}

const salt = (length = 10) => bcrypt.genSaltSync(length)

module.exports = { validate, hash, salt }

