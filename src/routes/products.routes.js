const {Router} = require('express');
const {createProduct, productDescriptionUpdate, getProducts} = require('../controllers/products.controllers');
const {createProductsValidator, updateProductValidator} = require('../validators/products.validator');
const authenticate = require('../middlewares/auth.middleware');

const router = Router();

router.post('/products', authenticate, createProductsValidator, createProduct);

router.put('/products/:id', authenticate, updateProductValidator, productDescriptionUpdate);

router.get('/products', getProducts)

module.exports = router