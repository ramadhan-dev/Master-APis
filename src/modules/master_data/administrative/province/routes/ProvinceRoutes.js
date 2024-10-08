const express = require('express');
const ProvinceController = require("../controllers/ProvinceController");
const ProvinceRules = require('../rules/ProvinceRules')

const validate = require(process.cwd() + '/src/validations/common/validate')



const router = express.Router();
router.post('/create-province', validate(ProvinceRules.create), ProvinceController.CreateProvince);
router.get("/get-all-province", ProvinceController.GetAllProvince);
router.delete('/delete-province', ProvinceController.DeleteProvince);
router.put('/update-province', validate(ProvinceRules.update), ProvinceController.UpdateProvince);
router.get('/get-province', ProvinceController.GetProvince);
router.get('/get-province-options', ProvinceController.GetProvinceOptions);


module.exports = router;



