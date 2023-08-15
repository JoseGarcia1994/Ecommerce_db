'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductsInCarts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductsInCarts.belongsTo(models.Carts, {foreignKey: 'cartId'});
      ProductsInCarts.belongsTo(models.Products, {foreignKey: 'productId'})
    }
  }
  ProductsInCarts.init({
    cartId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.REAL,
    purchased: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ProductsInCarts',
  });
  return ProductsInCarts;
};