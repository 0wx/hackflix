'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Favorite.init(
    {
      CustomerId: {
        type: DataTypes.INTEGER,
        references: { model: 'Customers', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      MovieId: {
        type: DataTypes.INTEGER,
        references: { model: 'Movies', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
    },
    {
      sequelize,
      modelName: 'Favorite',
    }
  )
  return Favorite
}
