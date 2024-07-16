
const mongoose = require("mongoose");

const ProductCategoryModel = require("../models/ProductCategoryModel");
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
exports.CreateProductCategory = async (req, res) => {
    await CreateService(req, res, ProductCategoryModel);
}


exports.GetAllProductCategory = async (req, res) => {
    console.log(1111);
    const projection = { $project: { _id: 1, name:1, code: 1, createdAt: 1, updatedAt: 1, status:1 } }
    await GetAllService(req, res, ProductCategoryModel, projection)
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.DeleteProductCategory = async (req, res) => {
    await DeleteService(req, res, ProductCategoryModel)
}



/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.GetProductCategory = async (req, res) => {
    await DetailsByIDService(req, res, ProductCategoryModel);
}



/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.UpdateProductCategory = async (req, res) => {
    await UpdateService(req, res, ProductCategoryModel)
}
