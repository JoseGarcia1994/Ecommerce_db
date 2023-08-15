const { check } = require('express-validator');
const validateResult = require('../middlewares/validate.middleware');

const productsInCartValidator = [
    check("cartId", "Error with cartId"),
    check("productId", "Error with productId")
        .exists().withMessage("productId is required")
        .notEmpty().withMessage("productId cannot be empty")
        .isInt().withMessage("Needs to be a number"),
    check("quantity", "Error with quantity")
        .exists().withMessage("quantity is required")
        .notEmpty().withMessage("quantity cannot be empty")
        .isInt({ min: 1 }).withMessage("Needs to be a number"),
    check("price", "Error with price")
        .exists().withMessage("price is required")
        .notEmpty().withMessage("price cannot be empty")
        .isInt().withMessage("Needs to be a number"),
    validateResult
];

module.exports = {
    productsInCartValidator,
}