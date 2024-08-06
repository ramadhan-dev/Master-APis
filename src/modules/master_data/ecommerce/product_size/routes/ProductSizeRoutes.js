const express = require('express');
const ProductSizeController = require("../controllers/ProductSizeController");
const ProductSizeRule = require('../rules/ProductSizeRule')
const validate = require(process.cwd() + '/src/validations/common/validate')

const router = express.Router();
router.post('/create-product-size', validate(ProductSizeRule.create), ProductSizeController.CreateProductSize);
router.get("/get-all-product-size", ProductSizeController.GetAllProductSize);
router.delete('/delete-product-size', ProductSizeController.DeleteProductSize);
router.put('/update-product-size', ProductSizeController.UpdateProductSize);
router.get('/get-product-size', ProductSizeController.GetProductSize);
router.put('/update-status-size', ProductSizeController.UpdateStatusSize);
router.get("/get-size-options", ProductSizeController.GetSizeOptions);

module.exports = router;

