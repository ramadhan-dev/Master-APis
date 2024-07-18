const express = require('express');
const ProductSizeController = require("../controllers/ProductSizeController");
const ProductSizeRule = require('../rules/ProductSizeRule')
const validate = require(process.cwd() + '/src/validations/common/validate')

const router = express.Router();
router.post('/create-product-size', validate(ProductSizeRule.create), ProductSizeController.CreateProductSize);
router.get("/get-all-product-size", ProductSizeController.GetAllProductSize);
router.delete('/delete-product-size/:id', ProductSizeController.DeleteProductSize);
router.put('/update-product-size/:id', ProductSizeController.UpdateProductSize);
router.get('/get-product-size', ProductSizeController.GetProductSize);

module.exports = router;

