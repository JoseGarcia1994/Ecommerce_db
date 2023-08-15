const { check } = require('express-validator');
const validateResult = require('../middlewares/validate.middleware');

const createProductsValidator = [
    check("name", "Error with name")
        .exists()
        .withMessage("name is required")
        .notEmpty()
        .withMessage("name is empty")
        .isString()
        .withMessage("name is not a string"),
    check("price", "Error with price")
        .exists()
        .withMessage("price is required")
        .notEmpty()
        .withMessage("price is empty"),
    check("availableQty", "Error with availableQty")
        .exists()
        .withMessage("availableQty is required")
        .notEmpty()
        .withMessage("availableQty is empty")
        .isInt().withMessage("Needs to be a number"),
    check("userId", "Error with userId")
        .exists()
        .withMessage("userId is required")
        .notEmpty()
        .withMessage("userId is empty")
        .isInt().withMessage("Needs to be a number"),
    check("productImage", "Error with productImage")
        .exists()
        .withMessage("productImage is required")
        .notEmpty()
        .withMessage("productImage is empty")
        .isString()
        .withMessage("productImage is not a string"),
    validateResult
]

const updateProductValidator = [
    check("description", "Error with description")
        .exists()
        .withMessage("description is required")
        .notEmpty()
        .withMessage("description is empty")
        .isString()
        .withMessage("description is not a string"),
    validateResult
];

module.exports = {
    createProductsValidator,
    updateProductValidator,
}