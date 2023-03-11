'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Genre.hasMany(models.Movie, { foreignKey: 'genreId' })
    }
  }
  Genre.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: `Genre Name can't be empty`
        },
        notNull: {
          msg: `Genre Name can't be null`
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Genre',
    hooks: {
      beforeCreate(genre) {
        genre.name = genre.name.toLowerCase()
      },
      beforeUpdate(genre) {
        genre.name = genre.name.toLowerCase()
      }
    }
  });
  return Genre;
};