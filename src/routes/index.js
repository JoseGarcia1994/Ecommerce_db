const userRoutes = require('./user.routes');
const cartRoutes = require('./carts.routes');
const productRoutes = require('./products.routes');
const orderRoutes = require('./orders.routes');

const apiRoutes = (app) => {
    app.use(userRoutes);
    app.use(cartRoutes);
    app.use(productRoutes);
    app.use(orderRoutes);
};

module.exports = apiRoutes;