
const mongoose = require("mongoose");

const ProductModel = require("../models/ProductModel");
const DeleteService = require(process.cwd() + "/src/services/DeleteService");
const DetailsByIDService = require(process.cwd() + "/src/services/DetailsService");
const GetAllService = require(process.cwd() + "/src/services/GetAllService");
const UpdateService = require(process.cwd() + "/src/services/UpdateService");
const saveData = require('./../services/ProductService')
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.CreateProduct = async (req, res) => {
    await saveData()
    // await CreateService(req, res, ProductModel);
}


exports.GetAllProduct = async (req, res) => {
    const projection = { $project: { _id: 1, name:1, code: 1, createdAt: 1, updatedAt: 1, status:1 } }
    await GetAllService(req, res, ProductModel, projection)
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.DeleteProduct = async (req, res) => {
    await DeleteService(req, res, ProductModel)
}



/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.GetProduct = async (req, res) => {
    await DetailsByIDService(req, res, ProductModel);
}



/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.UpdateProduct = async (req, res) => {
    await UpdateService(req, res, ProductModel)
}
