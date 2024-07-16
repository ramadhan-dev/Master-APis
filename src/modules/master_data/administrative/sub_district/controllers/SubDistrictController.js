
const mongoose = require("mongoose");

const SubDistrictModel = require("../models/SubDistrictModel");
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
exports.CreateSubDistrict = async (req, res) => {
    await CreateService(req, res, SubDistrictModel);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.GetAllSubDistrict = async (req, res) => {
    try {
        let data = await SubDistrictModel.aggregate([
            {
                $lookup: {
                    from: 'districts', // collection  Target
                    localField: 'district_code', // Field di Post
                    foreignField: 'code', // Field di User
                    as: 'district' // Alias untuk hasil gabungan
                },
            },
            {
                $unwind: '$district'
            },
            {
                $lookup: {
                    from: 'citys', // collection  Target
                    localField: 'district.city_code', // Field di Post
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
                    provinceName: '$province.name',
                    districtName: '$district.name',
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
exports.UpdateSubDistrict = async (req, res) => {
    await UpdateService(req, res, SubDistrictModel)
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.DeleteSubDistrict = async (req, res) => {
    await DeleteService(req, res, SubDistrictModel)
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.GetSubDistrict = async (req, res) => {
    try {
        const ObjectId = mongoose.Types.ObjectId;
        let data = await SubDistrictModel.aggregate([
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
                    province: 1,
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
    // await DetailsByIDService(req, res, SubDistrictModel);
}

