'use strict'
const { Model } = require('sequelize')
const { hash } = require('../helpers/bcyprt')
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.belongsToMany(models.Movie, {
        through: models.Favorite,
        foreignKey: 'CustomerId',
      })
    }
  }
  Customer.init(
    {
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: {
          msg: 'Email already registered!',
        },
        validate: {
          isEmail: {
            msg: 'Invalid email format',
          },
          notNull: {
            msg: 'Email is required',
          },
          notEmpty: {
            msg: 'Email is required',
          }
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: 'Password is required',
          },
          notEmpty: {
            msg: 'Password is required',
          }
        },
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Customer',
      hooks: {
        beforeCreate(customer) {
          if (!customer.role) customer.role = 'customer'
          customer.password = hash(customer.password)
        },
      },
    }
  )
  return Customer
}
