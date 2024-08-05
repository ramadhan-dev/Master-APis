const express = require('express');
const SubDistrictController = require("../controllers/SubDistrictController");
const SubDistrictRules = require('../rules/SubDistrictRules')
const validate = require(process.cwd() + '/src/validations/common/validate')

const router = express.Router();
router.post('/create-sub-district', validate(SubDistrictRules.create), SubDistrictController.CreateSubDistrict);
router.get("/get-all-sub-district", SubDistrictController.GetAllSubDistrict);
router.delete('/delete-sub-district', SubDistrictController.DeleteSubDistrict);
router.put('/update-sub-district', SubDistrictController.UpdateSubDistrict);
router.get('/get-sub-district', SubDistrictController.GetSubDistrict);

module.exports = router;

