const express = require('express');
const ProductTypeController = require("../controllers/ProductTypeController");
const ProductTypeRule = require('../rules/ProductTypeRule')
const validate = require(process.cwd() + '/src/validations/common/validate')

const router = express.Router();
router.post('/create-product-type', validate(ProductTypeRule.create), ProductTypeController.CreateProductType);
router.get("/get-all-product-type", ProductTypeController.GetAllProductType);
router.delete('/delete-product-type', ProductTypeController.DeleteProductType);
router.put('/update-product-type', ProductTypeController.UpdateProductType);
router.get('/get-product-type', ProductTypeController.GetProductType);
router.put('/update-status-type', ProductTypeController.UpdateStatusType);
router.get("/get-type-options", ProductTypeController.GetTypeOptions);

module.exports = router;

