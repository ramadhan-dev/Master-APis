
const mongoose = require("mongoose");

const DistrictModel = require("../models/DistrictModel");
const CreateService = require(process.cwd() + "/src/services/CreateService");
const DeleteService = require(process.cwd() + "/src/services/DeleteService");
const UpdateService = require(process.cwd() + "/src/services/UpdateService");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.CreateDistrict = async (req, res) => {
    await CreateService(req, res, DistrictModel);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.GetAllDistrict = async (req, res) => {
    try {
        let data = await DistrictModel.aggregate([
            {
                $lookup: {
                    from: 'citys', // collection  Target
                    localField: 'city_code', // Field di Post
                    foreignField: 'code', // Field di User
                    as: 'city' // Alias untuk hasil gabungan
                },
            },
            {
                $unwind: '$city'
            },
            {
                $lookup: {
                    from: 'provinces', // collection  Target
                    localField: 'city.province_code', // Field di Post
                    foreignField: 'code', // Field di User
                    as: 'province' // Alias untuk hasil gabungan
                },
            },
            {
                $unwind: '$province'
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    code: 1,
                    province_code: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    cityName: '$city.name',
                    provinceName: '$province.name'
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
exports.UpdateDistrict = async (req, res) => {
    let PostBody = {
        code: req?.body.code,
        name: req?.body.name,
    };
    await UpdateService(req, res, DistrictModel, PostBody)
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.DeleteDistrict = async (req, res) => {
    await DeleteService(req, res, DistrictModel)
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.GetDistrict = async (req, res) => {
    try {
        const ObjectId = mongoose.Types.ObjectId;
        let data = await DistrictModel.aggregate([
            {
                $match: { _id: new ObjectId(req.params.id) } // Filter untuk hanya mengambil post dengan title tertentu
            },
            {
                $lookup: {
                    from: 'citys', // collection  Target
                    localField: 'city_code', // Field di Post
                    foreignField: 'code', // Field di User
                    as: 'city' // Alias untuk hasil gabungan
                },
            },
            {
                $unwind: '$city'
            },
            {
                $lookup: {
                    from: 'provinces', // collection  Target
                    localField: 'city.province_code', // Field di Post
                    foreignField: 'code', // Field di User
                    as: 'province' // Alias untuk hasil gabungan
                },
            },
            {
                $unwind: '$province'
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    code: 1,
                    province_code: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    'cityNname': '$city.name',
                    'provinceName': '$province.name',
                }
            }
        ]);
        return res.status(200).json({ message: "success", data: data[0] });

    } catch (error) {
        return res.status(500).json({ message: "error", data: error.toString() });
    }
    // await DetailsByIDService(req, res, DistrictModel);
}

