const DoctorModel = require("./../models/DoctorModel");
const AppointmentModel = require('./../../appointment/models/AppointmentModel');

const GetAllService = require(process.cwd() + "/src/services/GetAllService");
const CreateService = require(process.cwd() + "/src/services/CreateService");
const UpdateService = require(process.cwd() + "/src/services/UpdateService");
const DeleteService = require(process.cwd() + "/src/services/DeleteService");
const CheckAssociateService = require(process.cwd() + "/src/services/CheckAssociateService");
const DetailsByIDService = require(process.cwd() + "/src/services/DetailsService");

const mongoose = require("mongoose");


exports.CreateDoctor = async (req, res) =>{
    await CreateService(req,res,DoctorModel);
}

exports.GetAllDoctor=async(req,res)=>{
    const projection = {$project: {_id:1, email:1, name:1, phone:1, specialization:1, experience:1}}
    await GetAllService(req,res,DoctorModel, projection)
}

exports.UpdateDoctor = async (req, res) =>{
    await UpdateService(req,res,DoctorModel);
}

exports.GetDoctor = async (req, res) => {
    await DetailsByIDService(req, res, DoctorModel);
}

exports.DeleteDoctor=async (req, res) => {
    let deleteId=req.params.id;
    const ObjectId = mongoose.Types.ObjectId;
    let CheckAssociate = await CheckAssociateService(req, res,{doctorId: new ObjectId(deleteId)},AppointmentModel);
    if(CheckAssociate){
        res.status(403).json({message:"associate", data: "associated with Appointment"})
    }else{
        await DeleteService(req, res, DoctorModel);
    }
}
