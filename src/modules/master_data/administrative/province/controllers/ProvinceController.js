
const ProvinceModel = require("./../models/ProvinceModel");

const CreateService = require(process.cwd() + "/src/services/CreateService");
const DeleteService = require(process.cwd() + "/src/services/DeleteService");
const DetailsByIDService = require(process.cwd() + "/src/services/DetailsService");
const GetAllService = require(process.cwd() + "/src/services/GetAllService");
const UpdateService = require(process.cwd() + "/src/services/UpdateService");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.CreateProvince = async (req, res) => {
    await CreateService(req, res, ProvinceModel);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.GetAllProvince = async (req, res) => {
    let Projection = { $project: { _id: 1, name: 1, code: 1, createdAt: 1, updatedAt: 1 } };
    await GetAllService(req, res, ProvinceModel, Projection)
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.UpdateProvince = async (req, res) => {
    await UpdateService(req, res, ProvinceModel)
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.DeleteProvince = async (req, res) => {
    await DeleteService(req, res, ProvinceModel)
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.GetProvince = async (req, res) => {
    await DetailsByIDService(req, res, ProvinceModel);
}