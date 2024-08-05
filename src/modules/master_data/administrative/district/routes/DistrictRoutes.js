const express = require('express');
const DistrictController = require("../controllers/DistrictController");
const DistrictRules = require('../rules/DistrictRules')
const validate = require(process.cwd() + '/src/validations/common/validate')

const router = express.Router();
router.post('/create-district', validate(DistrictRules.create), DistrictController.CreateDistrict);
router.get("/get-all-district", DistrictController.GetAllDistrict);
router.delete('/delete-district', DistrictController.DeleteDistrict);
router.put('/update-district', DistrictController.UpdateDistrict);
router.get('/get-district', DistrictController.GetDistrict);

module.exports = router;

