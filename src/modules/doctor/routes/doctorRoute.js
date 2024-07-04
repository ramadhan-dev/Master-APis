const express = require('express');
const DoctorController = require("../controllers/DoctorController");


const router = express.Router();


router.post("/create-doctor",  DoctorController.CreateDoctor);
router.get("/get-all-doctor", DoctorController.GetAllDoctor);
router.put("/update-doctor/:id",  DoctorController.UpdateDoctor);
router.delete("/delete-doctor/:id",  DoctorController.DeleteDoctor);

router.get('/get-doctor/:id', DoctorController.GetDoctor);




module.exports = router;