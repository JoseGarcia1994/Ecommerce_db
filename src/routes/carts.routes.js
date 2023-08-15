const {Router} = require('express');
const {addProductsToCart} = require('../controllers/carts.controllers');
const {productsInCartValidator} = require('../validators/carts.validators');
const authenticate = require('../middlewares/auth.middleware');

const router = Router();

router.post('/add-products/cart/:id', authenticate, productsInCartValidator, addProductsToCart);

module.exports = router

