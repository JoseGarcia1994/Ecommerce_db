const {Router} = require('express');
const {createUser, loginUser, confirmEmail, uploadProfileImage, getAllUsersProductsInCart} = require('../controllers/users.controllers');
const {loginUserValidator, registerUserValidator} = require('../validators/users.validators');
const authenticate = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

const router = Router();

router.post('/users', registerUserValidator, createUser);

router.post("/login", loginUserValidator, loginUser);

router.post("/confirm-email", confirmEmail);

router.put('/user', authenticate, upload.single('profileImage'), uploadProfileImage);

router.get('/users/products-in-cart/:id', authenticate, getAllUsersProductsInCart);

module.exports = router;