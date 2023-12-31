'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Carts.belongsTo(models.Users, {foreignKey: 'userId'});
      Carts.belongsToMany(models.Products, {through: 'ProductsInCarts', foreignKey: 'cartId'})
    }
  }
  Carts.init({
    userId: DataTypes.INTEGER,
    total: DataTypes.REAL
  }, {
    sequelize,
    modelName: 'Carts',
    timestamps: false,
  });
  return Carts;
};