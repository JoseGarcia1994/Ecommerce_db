const {Products} = require('../models');
const { Op } = require("sequelize");

const createProduct = async (req, res, next) => {
  try {
    // {name, price, availableQty, userId, productImage}
    const {name, price, availableQty, userId, productImage} = req.body

    await Products.create({name, price, availableQty, userId, productImage})

    res.status(201).end();
  } catch(error) {
     next(error)
  }
};

const productDescriptionUpdate = async (req, res, next) => {
  try {
    // obtain id from product
    const {id} = req.params;

    const {description} = req.body
    await Products.update(
      {description},
      {
        where: {id},
      }
    );
    res.status(204).send();
  } catch(error) {
     next(error)
  }
}

const getProducts = async (req, res, next) => {
  try {
    // request all products from module Products
    const products = await Products.findAll({
      where: {availableQty: {
        [Op.gt]: 0
      }}
    });
    res.json(products);
  } catch(error) {
     next(error)
  }
}

module.exports = {
    createProduct,
    productDescriptionUpdate,
    getProducts,
}