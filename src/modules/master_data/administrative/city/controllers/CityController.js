
const mongoose = require("mongoose");
const ProvinceModel = require("../../province/models/ProvinceModel");
const CityModel = require("../models/CityModel");
const isUndefined = require('lodash/isUndefined')


const { CreateService } = require(process.cwd() + "/src/services/CreateService");
const DeleteService = require(process.cwd() + "/src/services/DeleteService");
const DetailsByIDService = require(process.cwd() + "/src/services/DetailsService");
const GetAllService = require(process.cwd() + "/src/services/GetAllService");
const UpdateService = require(process.cwd() + "/src/services/UpdateService");

const { checkCodeIsExist, checkIdIsExist} = require(process.cwd() + "/src/services/CheckDataIsExist" )

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.CreateCity = async (req, res) => {
    try {
        await checkCodeIsExist(req, res, ProvinceModel);
        const data = await CreateService(req, res, CityModel);
        res.status(201).json({message: "success", data: data});
    } catch (error) {
        res.status(500).json({ message: "error", data: error.toString() });
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.GetAllCity = async (req, res) => {
    try {
        let data = await CityModel.aggregate([{
            $lookup: {
                from: 'provinces', // collection  Target
                localField: 'province_code', // Field di Post
                foreignField: 'code', // Field di User
                as: 'Province' // Alias untuk hasil gabungan
            },
        },
        {
            $match: {
                "Province": { $ne: [] }
            }
        },
        {
            $unwind: '$Province'
        },
        {
            $project: {
                _id: 1,
                name: 1,
                code: 1,
                province_code: 1,
                province: 1,
                createdAt: 1,
                updatedAt: 1,
                'Province.name': 1,
            }
        }
        ]);
        return res.status(200).json({ message: "success", data: data });
    }
    catch (error) {
        return res.status(500).json({ message: "error", data: error.toString() });
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.UpdateCity = async (req, res) => {
    await checkIdIsExist(req, res, CityModel);
    await UpdateService(req, res, CityModel)
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.DeleteCity = async (req, res) => {
    await CheckDataService.checkIdIsExist(req, res, CityModel);
    await DeleteService(req, res, CityModel)
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.GetCity = async (req, res) => {
    try {
    const ObjectId = mongoose.Types.ObjectId;
    let data = await CityModel.aggregate([
        {
            $match: { _id: new ObjectId(req.params.id) } // Filter untuk hanya mengambil post dengan title tertentu
        },
        {
            $lookup: {
                from: 'provinces', // collection  Target
                localField: 'province_code', // Field di Post
                foreignField: 'code', // Field di User
                as: 'Province' // Alias untuk hasil gabungan
            },
        },
        {
            $unwind: '$Province'
        },
        {
            $project: {
                _id: 1,
                name: 1,
                code: 1,
                province_code: 1,
                province: 1,
                createdAt: 1,
                updatedAt: 1,
                'Province.name': 1,
            }
        }
    ]);
    return res.status(200).json({ message: "success", data: data[0] });
    
} catch (error) {
        return res.status(500).json({ message: "error", data: error.toString() });
    }
    // await DetailsByIDService(req, res, CityModel);
}

