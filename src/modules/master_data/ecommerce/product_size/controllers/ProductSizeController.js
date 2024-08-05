
const mongoose = require("mongoose");

const ProductSizeModel = require("../models/ProductSizeModel");
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
exports.CreateProductSize = async (req, res) => {
    await CreateService(req, res, ProductSizeModel);
}


exports.GetAllProductSize = async (req, res) => {
    const projection = { $project: { _id: 1, name:1, code: 1, createdAt: 1, updatedAt: 1, status:1 } }
    await GetAllService(req, res, ProductSizeModel, projection)
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.DeleteProductSize = async (req, res) => {
    await DeleteService(req, res, ProductSizeModel)
}



/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.GetProductSize = async (req, res) => {
    await DetailsByIDService(req, res, ProductSizeModel);
}



/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.UpdateProductSize = async (req, res) => {
    await UpdateService(req, res, ProductSizeModel)
}
