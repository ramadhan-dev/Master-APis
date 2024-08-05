const ContactModel = require("./../models/ContactModel");

const CreateService = require(process.cwd() + "/src/services/CreateService");
const DeleteService = require(process.cwd() + "/src/services/DeleteService");
const DetailsByIDService = require(process.cwd() + "/src/services/DetailsService");
const GetAllService = require(process.cwd() + "/src/services/GetAllService");
const UpdateService = require(process.cwd() + "/src/services/UpdateService");


exports.CreateContact=async (req, res) => {
    await CreateService(req,res,ContactModel);
}


exports.UpdateContact=async(req,res)=>{
    await UpdateService(req,res,ContactModel)
}

exports.DeleteContact=async(req,res)=>{
    await DeleteService(req, res, ContactModel)
}

exports.GetContact=async (req, res) => {
    await DetailsByIDService(req, res, ContactModel);
}

exports.GetAllContact=async(req,res)=>{
    let Projection = {$project:{_id:1, name:1, email:1, message:1, status:1, createdAt:1, updatedAt:1}};
    await GetAllService(req, res, ContactModel,Projection)
}
