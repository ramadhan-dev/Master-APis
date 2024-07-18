const express = require('express');
const ProductVisibilityController = require("../controllers/ProductVisibilityController");
const ProductVisibilityRule = require('../rules/ProductVisibilityRule')
const validate = require(process.cwd() + '/src/validations/common/validate')

const router = express.Router();
router.post('/create-product-visibility', validate(ProductVisibilityRule.create), ProductVisibilityController.CreateProductVisibility);
router.get("/get-all-product-visibility", ProductVisibilityController.GetAllProductVisibility);
router.delete('/delete-product-visibility/:id', ProductVisibilityController.DeleteProductVisibility);
router.put('/update-product-visibility/:id', ProductVisibilityController.UpdateProductVisibility);
router.get('/get-product-visibility', ProductVisibilityController.GetProductVisibility);

module.exports = router;

