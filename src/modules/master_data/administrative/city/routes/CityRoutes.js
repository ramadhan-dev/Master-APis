const express = require('express');
const CityController = require("../controllers/CityController");
const CityRules = require('../rules/CityRules')
const validate = require(process.cwd() + '/src/validations/common/validate')



const router = express.Router();
router.post('/create-city', validate(CityRules.create),   CityController.CreateCity);
router.get("/get-all-city", CityController.GetAllCity);
router.delete('/delete-city',  CityController.DeleteCity);
router.put('/update-city',  CityController.UpdateCity);
router.get('/get-city',  CityController.GetCity);

module.exports = router;

