const express = require('express');
const ProductTypeController = require("../controllers/ProductTypeController");
const ProductTypeRule = require('../rules/ProductTypeRule')
const validate = require(process.cwd() + '/src/validations/common/validate')

const router = express.Router();
router.post('/create-product-type', validate(ProductTypeRule.create), ProductTypeController.CreateProductType);
router.get("/get-all-product-type", ProductTypeController.GetAllProductType);
router.delete('/delete-product-type/:id', ProductTypeController.DeleteProductType);
router.put('/update-product-type/:id', ProductTypeController.UpdateProductType);
router.get('/get-product-type/:id', ProductTypeController.GetProductType);

module.exports = router;

