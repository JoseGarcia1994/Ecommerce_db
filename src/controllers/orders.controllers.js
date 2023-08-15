const { Orders, ProductsInOrders, Products } = require('../models');

const buyProductsInCart = async (req, res, next) => {
  try {
    // What do we need to create order?
    //userId
    // create order with userId to get id
    // add products from cart to order
    // orderId
    // array with each product in cart
    // [{productId, price, quantity}, {}]
    // add total to order

    // {userId, products [{price, quantity}, {}]}

    const { userId, products } = req.body

    let total = 0;
    products.forEach(product => {
      total += product.price * product.quantity
    });

    const order = await Orders.create({ userId, total });

    const productsWithOrder = products.map(product => ({ ...product, orderId: order.id }));
    await ProductsInOrders.bulkCreate(productsWithOrder);

    // decrement quantity from each producto

    /* let findProduct = [];
    for (let i = 0; i < products.length; i++) {
      findProduct.push(await Products.findAll({
        where: { id: products[i].productId }
      }))
    };

    for (let i = 0; i < findProduct.length; i++) {
      for (let x = 0; x < products.length; x++) {
        await Products.decrement({
          availableQty:  - 1
          },
          { where: { id: 4 } }
        );
      }
      console.log(findProduct[i].availableQty);
    } */
    //await Products.decrement({availableQty: findProduct.availableQty - productsWithOrder.quantity }, {where: {id: productsWithOrder.productId}});

    res.status(201).json({
      orderId: order.id,
      total: order.total,
      products: productsWithOrder,
    });
  } catch (error) {
    next(error)
  }
}

const confirmedPurchased = async (req, res, next) => {
  try {
    const {id} = req.params;

    const {completed}= req.body;

    await Orders.update(
      {completed},
      {where: {id}, }
    );

    res.status(204).send();
  } catch(error) {
     next(error)
  }
}

module.exports = {
  buyProductsInCart,
  confirmedPurchased,
}