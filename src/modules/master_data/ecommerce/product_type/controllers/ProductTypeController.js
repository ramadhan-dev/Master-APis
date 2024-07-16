
const mongoose = require("mongoose");

const ProductTypeModel = require("../models/ProductTypeModel");
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
exports.CreateProductType = async (req, res) => {
    await CreateService(req, res, ProductTypeModel);
}


exports.GetAllProductType = async (req, res) => {
    console.log(1111);
    const projection = { $project: { _id: 1, name:1, code: 1, createdAt: 1, updatedAt: 1, status:1 } }
    await GetAllService(req, res, ProductTypeModel, projection)
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.DeleteProductType = async (req, res) => {
    await DeleteService(req, res, ProductTypeModel)
}



/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.GetProductType = async (req, res) => {
    await DetailsByIDService(req, res, ProductTypeModel);
}



/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.UpdateProductType = async (req, res) => {
    await UpdateService(req, res, ProductTypeModel)
}
