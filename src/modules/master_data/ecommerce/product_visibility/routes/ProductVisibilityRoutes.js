const express = require('express');
const ProductVisibilityController = require("../controllers/ProductVisibilityController");
const ProductVisibilityRule = require('../rules/ProductVisibilityRule')
const validate = require(process.cwd() + '/src/validations/common/validate')

const router = express.Router();
router.post('/create-product-visibility', validate(ProductVisibilityRule.create), ProductVisibilityController.CreateProductVisibility);
router.get("/get-all-product-visibility", ProductVisibilityController.GetAllProductVisibility);
router.delete('/delete-product-visibility', ProductVisibilityController.DeleteProductVisibility);
router.put('/update-product-visibility', ProductVisibilityController.UpdateProductVisibility);
router.get('/get-product-visibility', ProductVisibilityController.GetProductVisibility);
router.put('/update-status-visibility', ProductVisibilityController.UpdateStatusVisibility);
router.get("/get-visibility-options", ProductVisibilityController.GetVisibilityOptions);

module.exports = router;

