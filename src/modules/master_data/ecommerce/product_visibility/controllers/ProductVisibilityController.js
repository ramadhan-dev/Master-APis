
const mongoose = require("mongoose");

const ProductVisibilityModel = require("../models/ProductVisibilityModel");
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
exports.CreateProductVisibility = async (req, res) => {
    await CreateService(req, res, ProductVisibilityModel);
}


exports.GetAllProductVisibility = async (req, res) => {
    const projection = { $project: { _id: 1, name:1, code: 1, createdAt: 1, updatedAt: 1, status:1 } }
    await GetAllService(req, res, ProductVisibilityModel, projection)
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.DeleteProductVisibility = async (req, res) => {
    await DeleteService(req, res, ProductVisibilityModel)
}



/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.GetProductVisibility = async (req, res) => {
    await DetailsByIDService(req, res, ProductVisibilityModel);
}



/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.UpdateProductVisibility = async (req, res) => {
    await UpdateService(req, res, ProductVisibilityModel)
}
