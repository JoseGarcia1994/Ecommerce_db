const {ProductsInCarts, Carts} = require('../models');
const { Op } = require("sequelize");

const addProductsToCart = async (req, res, next) => {
  try {
    // In body we need the following
    // body: { productId, quantity, price  }
    const cartId = req.params.id
    const {productId, quantity, price} = req.body;

    // If product already exsist in cart add to quantity
    // verify

    const productsInCarts = await ProductsInCarts.findAll({
      where: {
        [Op.and]: [{cartId}, {productId}],
      }
    }) // 

    if(productsInCarts.length < 1) {
      await ProductsInCarts.create({cartId, productId, quantity, price});
    }

    if(productsInCarts.length > 0) {
      await ProductsInCarts.increment({quantity}, {where: {cartId}});
    }

   
    // If i add a product
    // Need to update the total of cart
    // sum of price * quantity

    await Carts.increment({total: quantity * price }, {where: {id: cartId}});

    res.status(204).end();
  } catch(error) {
     next(error);
  }
};

module.exports = {
    addProductsToCart,
}