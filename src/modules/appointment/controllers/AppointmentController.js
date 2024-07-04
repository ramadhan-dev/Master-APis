const AppointmentModel = require("../models/AppointmentModel");

const GetAppointmentsService = require("../services/CreateAppointmentService");
const CreateAppointmentService = require("../services/GetAppointmentsService");

const DeleteService = require(process.cwd() + "/src/services/DeleteService");



exports.CreateAppointment=async (req, res) => {
    await CreateAppointmentService(req,res,AppointmentModel);
}
exports.GetAppointments=async(req,res)=>{
    await GetAppointmentsService(req,res,AppointmentModel)
}

exports.DeleteAppointment = async (req, res) =>{
    await DeleteService(req,res,AppointmentModel);
}