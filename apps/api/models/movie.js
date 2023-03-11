'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.User, { foreignKey: 'authorId' })
      Movie.belongsTo(models.Genre, { foreignKey: 'genreId' })
      Movie.belongsToMany(models.Customer, { through: models.Favorite, foreignKey: 'MovieId' })
    }
  }
  Movie.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Title cannot be null',
          },
          notEmpty: {
            msg: 'Title cannot be empty',
          },
        },
      },
      synopsis: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Synopsis cannot be null',
          },
          notEmpty: {
            msg: 'Synopsis cannot be empty',
          },
        },
      },
      trailerUrl: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: 1,
            msg: 'Rating must be at least 1',
          },
          max: {
            args: 10,
            msg: 'Rating must be at most 10',
          },
        },
      },
      genreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Genres',
          key: 'id',
        },
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          statusType(status) {
            const allowedStatus = ['active', 'inactive', 'archived']
            if (!allowedStatus.includes(status))
              throw new Error(
                'status can only be active, inactive, or archived'
              )
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Movie',
      hooks: {
        beforeCreate(movie) {
          movie.status = 'active'
        },
        beforeValidate(movie) {
          if (!movie.status) movie.status = 'active'
        },
      },
    }
  )
  return Movie
}
