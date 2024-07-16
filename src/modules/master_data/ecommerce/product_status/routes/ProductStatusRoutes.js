const express = require('express');
const ProductStatusController = require("../controllers/ProductStatusController");
const ProductStatusRule = require('../rules/ProductStatusRule')
const validate = require(process.cwd() + '/src/validations/common/validate')

const router = express.Router();
router.post('/create-product-status', validate(ProductStatusRule.create), ProductStatusController.CreateProductStatus);
router.get("/get-all-product-status", ProductStatusController.GetAllProductStatus);
router.delete('/delete-product-status/:id', ProductStatusController.DeleteProductStatus);
router.put('/update-product-status/:id', ProductStatusController.UpdateProductStatus);
router.get('/get-product-status/:id', ProductStatusController.GetProductStatus);

module.exports = router;

