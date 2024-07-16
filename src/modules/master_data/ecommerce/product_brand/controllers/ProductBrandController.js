
const mongoose = require("mongoose");

const ProductBrandModel = require("../models/ProductBrandModel");
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
exports.CreateProductBrand = async (req, res) => {
    await CreateService(req, res, ProductBrandModel);
}


exports.GetAllProductBrand = async (req, res) => {
    const projection = { $project: { _id: 1, name:1, code: 1, createdAt: 1, updatedAt: 1, status:1 } }
    await GetAllService(req, res, ProductBrandModel, projection)
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.DeleteProductBrand = async (req, res) => {
    await DeleteService(req, res, ProductBrandModel)
}



/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.GetProductBrand = async (req, res) => {
    await DetailsByIDService(req, res, ProductBrandModel);
}



/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.UpdateProductBrand = async (req, res) => {
    await UpdateService(req, res, ProductBrandModel)
}
