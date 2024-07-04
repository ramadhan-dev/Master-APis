const express = require('express');
const AppointmentController = require("../controllers/AppointmentController");


const router = express.Router();

router.post("/create-appointment", AppointmentController.CreateAppointment);
router.get("/get-appointments",  AppointmentController.GetAppointments);
router.delete("/delete-appointment/:id",  AppointmentController.DeleteAppointment);


module.exports = router;