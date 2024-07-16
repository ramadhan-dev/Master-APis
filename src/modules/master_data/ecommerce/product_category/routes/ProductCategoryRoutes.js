const express = require('express');
const ProductCategoryController = require("../controllers/ProductCategoryController");
const ProductCategoryRule = require('../rules/ProductCategoryRule')
const validate = require(process.cwd() + '/src/validations/common/validate')

const router = express.Router();
router.post('/create-product-category', validate(ProductCategoryRule.create), ProductCategoryController.CreateProductCategory);
router.get("/get-all-product-category", ProductCategoryController.GetAllProductCategory);
router.delete('/delete-product-category/:id', ProductCategoryController.DeleteProductCategory);
router.put('/update-product-category/:id', ProductCategoryController.UpdateProductCategory);
router.get('/get-product-category/:id', ProductCategoryController.GetProductCategory);

module.exports = router;

