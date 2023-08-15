const { check } = require('express-validator');
const validateResult = require('../middlewares/validate.middleware');

const buyProductsIncartValidator = [
    check("userId", "Error with userId")
        .exists()
        .withMessage("userId is required")
        .notEmpty()
        .withMessage("userId is empty")
        .isInt().withMessage("Needs to be a number"),
    validateResult
];

const completeOrderValidator = [
    check("completed", "Error with completed")
        .exists()
        .withMessage("completed is required")
        .notEmpty()
        .withMessage("completed is empty")
        .isString()
        .withMessage("completed is not a string")
];

module.exports = {
    buyProductsIncartValidator,
    completeOrderValidator,
}