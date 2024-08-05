
const mongoose = require("mongoose");
const ProvinceModel = require("../../province/models/ProvinceModel");
const CityModel = require("../models/CityModel");


const { CreateService } = require(process.cwd() + "/src/services/CreateService");
const DeleteService = require(process.cwd() + "/src/services/DeleteService");
const { GetAllService } = require(process.cwd() + "/src/services/GetAllService");
const UpdateService = require(process.cwd() + "/src/services/UpdateService");

const { checkCodeIsExist, checkIdIsExist } = require(process.cwd() + "/src/services/CheckDataIsExist")

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.CreateCity = async (req, res) => {
    try {
        await checkCodeIsExist(req, res, ProvinceModel);
        const data = await CreateService(req, res, CityModel);
        res.status(201).json({ message: "success", data: data });
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
    const page = parseInt(req.query.pageIndex) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;
    const sortBy = req.query.sortBy || '_id';
    const sortOrder = parseInt(req.query.sortOrder) || -1;
    const sort = { [sortBy]: sortOrder }
    try {
        const Projection = [
            {
                $facet: {
                    data: [
                        {
                            $lookup: {
                                from: 'provinces', // collection  Target
                                localField: 'province_code', // Field di Post
                                foreignField: 'code', // Field di User
                                as: 'Province' // Alias untuk hasil gabungan
                            },
                        },
                        {
                            $match: {
                                "Province.code": { $ne: [] }
                            }
                        },
                        {
                            $unwind: {
                                path: "$Province",
                            }
                        },
                        { $sort: sort }, // Sorting stage
                        { $skip: skip },
                        { $limit: pageSize },
                        {
                            $project: {
                                _id: 1,
                                name: 1,
                                code: 1,
                                createdAt: 1,
                                updatedAt: 1,
                                ProvinceName: '$Province.name'
                            }
                        }
                    ],
                    totalCount: [
                        { $count: 'count' }
                    ]
                }
            },
            {
                $project: {
                    data: 1,
                    totalData: { $arrayElemAt: ['$totalCount.count', 0] },
                    totalPages: { $ceil: { $divide: [{ $arrayElemAt: ['$totalCount.count', 0] }, pageSize] } },
                    currentPage: { $literal: page },
                }
            }
        ];
        let results = await GetAllService(req, res, CityModel, Projection)
        const response = {
            data: results[0].data,
            totalData: results[0].totalData,
            totalPage: results[0].totalPages,
            currentPage: results[0]?.currentPage,
        }

        res.status(200).json(response);
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
    let PostBody = {
        code: req?.body.code,
        name: req?.body.name,
        province_code: req?.body.province_code,
    };
    await checkIdIsExist(req, res, CityModel);
    await UpdateService(req, res, CityModel, PostBody)
}

573.500   
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.DeleteCity = async (req, res) => {
    await checkIdIsExist(req, res, CityModel);
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
        let Projection = await CityModel.aggregate([
            {
                $match: { _id: new ObjectId(req.query.id) } // Filter untuk hanya mengambil post dengan title tertentu
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
                $match: {
                    "Province.code": { $ne: [] }
                }
            },
            {
                $unwind: {
                    path: "$Province",
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    code: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    province_data: {
                        label: '$Province.name',
                        value:'$Province.code'
                    }
                }
            }
        ]);

        return res.status(200).json({ message: "success", data: Projection[0] });

    } catch (error) {
        return res.status(500).json({ message: "error", data: error.toString() });
    }
}

