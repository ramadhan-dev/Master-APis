const express = require('express');
const ProductBrandController = require("../controllers/ProductBrandController");
const ProductBrandRule = require('../rules/ProductBrandRule')
const validate = require(process.cwd() + '/src/validations/common/validate')

const router = express.Router();
router.post('/create-product-brand', validate(ProductBrandRule.create), ProductBrandController.CreateProductBrand);
router.get("/get-all-product-brand", ProductBrandController.GetAllProductBrand);
router.delete('/delete-product-brand/:id', ProductBrandController.DeleteProductBrand);
router.put('/update-product-brand/:id', ProductBrandController.UpdateProductBrand);
router.get('/get-product-brand', ProductBrandController.GetProductBrand);

module.exports = router;

