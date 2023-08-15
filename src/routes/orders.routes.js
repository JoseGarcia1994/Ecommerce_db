const {Router} = require('express');
const {buyProductsInCart, confirmedPurchased} = require('../controllers/orders.controllers');
const {buyProductsIncartValidator, completeOrderValidator} = require('../validators/orders.validators');
const authenticate = require('../middlewares/auth.middleware');

const router = Router();

router.post('/products/order', authenticate, buyProductsIncartValidator, buyProductsInCart);

router.put('/orders/:id', authenticate, completeOrderValidator, confirmedPurchased);

module.exports = router;