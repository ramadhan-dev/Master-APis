const express = require('express');
const ReportController = require("../controllers/ReportController");
const AuthVerifyMiddleware = require("../../../middlewares/AuthVerifyMiddleware");
const IsAdmin = require("../../../middlewares/IsAdmin");


const router = express.Router();

router.post("/create-report", AuthVerifyMiddleware, ReportController.CreateReport);
// router.get("/get-appointments", AuthVerifyMiddleware, IsAdmin,  AppointmentController.GetAppointments);
// router.delete("/delete-appointment/:id", AuthVerifyMiddleware, IsAdmin,  AppointmentController.DeleteAppointment);


module.exports = router;