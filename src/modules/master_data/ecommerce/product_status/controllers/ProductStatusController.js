
const mongoose = require("mongoose");

const ProductStatusModel = require("../models/ProductStatusModel");
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
exports.CreateProductStatus = async (req, res) => {
    await CreateService(req, res, ProductStatusModel);
}


exports.GetAllProductStatus = async (req, res) => {
    console.log(1111);
    const projection = { $project: { _id: 1, name:1, code: 1, createdAt: 1, updatedAt: 1, status:1 } }
    await GetAllService(req, res, ProductStatusModel, projection)
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.DeleteProductStatus = async (req, res) => {
    await DeleteService(req, res, ProductStatusModel)
}



/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.GetProductStatus = async (req, res) => {
    await DetailsByIDService(req, res, ProductStatusModel);
}



/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.UpdateProductStatus = async (req, res) => {
    await UpdateService(req, res, ProductStatusModel)
}
