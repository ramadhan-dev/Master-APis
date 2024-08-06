const express = require('express');
const ProductStatusController = require("../controllers/ProductStatusController");
const ProductStatusRule = require('../rules/ProductStatusRule')
const validate = require(process.cwd() + '/src/validations/common/validate')

const router = express.Router();
router.post('/create-product-status', validate(ProductStatusRule.create), ProductStatusController.CreateProductStatus);
router.get("/get-all-product-status", ProductStatusController.GetAllProductStatus);
router.delete('/delete-product-status', ProductStatusController.DeleteProductStatus);
router.put('/update-product-status', ProductStatusController.UpdateProductStatus);
router.get('/get-product-status', ProductStatusController.GetProductStatus);
router.put('/update-status-status', ProductStatusController.UpdateStatusStatus);
router.get("/get-status-options", ProductStatusController.GetStatusOptions);
module.exports = router;

