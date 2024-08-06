const express = require('express');
const ProductTagController = require("../controllers/ProductTagController");
const ProductTagRule = require('../rules/ProductTagRule')
const validate = require(process.cwd() + '/src/validations/common/validate')

const router = express.Router();
router.post('/create-product-tag', validate(ProductTagRule.create), ProductTagController.CreateProductTag);
router.get("/get-all-product-tag", ProductTagController.GetAllProductTag);
router.delete('/delete-product-tag', ProductTagController.DeleteProductTag);
router.put('/update-product-tag', ProductTagController.UpdateProductTag);
router.get('/get-product-tag', ProductTagController.GetProductTag);
router.put('/update-status-tag', ProductTagController.UpdateStatusTag);
router.get("/get-tag-options", ProductTagController.GetTagOptions);

module.exports = router;

