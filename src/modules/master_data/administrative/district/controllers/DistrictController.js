
const mongoose = require("mongoose");

const DistrictModel = require("../models/DistrictModel");
const CityModel = require("../../city/models/CityModel");
const ProvinceModel = require("../../province/models/ProvinceModel");

const {CreateService} = require(process.cwd() + "/src/services/CreateService");
const DeleteService = require(process.cwd() + "/src/services/DeleteService");
const UpdateService = require(process.cwd() + "/src/services/UpdateService");
const { GetAllService } = require(process.cwd() + "/src/services/GetAllService");
const { checkCodeIsExist } = require(process.cwd() + "/src/services/CheckDataIsExist")

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.CreateDistrict = async (req, res) => {
    try {
        let ID = req.body.city_code;
        const checkId = await checkCodeIsExist(req, res, CityModel, ID);  
        if (checkId == null ) {
            throw new Error('Data City Code not found in database');
        }
        const data = await CreateService(req, res, DistrictModel);
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
exports.GetAllDistrict = async (req, res) => {
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
                                from: 'citys', 
                                localField: 'city_code', 
                                foreignField: 'code', 
                                as: 'City' 
                            },
                        },
                        {
                            $match: {
                                "City.code": { $ne: [] }
                            }
                        },
                        {
                            $unwind: {
                                path: "$City",
                            }
                        },
                        {
                            $lookup: {
                                from: 'provinces', 
                                localField: 'City.province_code', 
                                foreignField: 'code', 
                                as: 'Province' 
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
                                ProvinceName: '$Province.name',
                                CityName: '$City.name'
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
        let results = await GetAllService(req, res, DistrictModel, Projection)
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
exports.UpdateDistrict = async (req, res) => {

    try {
        let provinceCode = req.body.province_code;
        const checkProvince = await checkCodeIsExist(req, res, ProvinceModel, provinceCode);
        if (checkProvince == null) {
            throw new Error('Data Province Code not found in database');
        }

        let cityCode = req.body.city_code;
        const checkCity = await checkCodeIsExist(req, res, CityModel, cityCode);
        if (checkCity == null) {
            throw new Error('Data City Code not found in database');
        }


        let PostBody = {
            code: req?.body.code,
            name: req?.body.name,
            city_code: req?.body?.city_code
        };
        await UpdateService(req, res, DistrictModel, PostBody)

    } catch (error) {
        res.status(500).json({ message: "error", data: error.toString() });
    }

    
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
                $match: { _id: new ObjectId(req.query.id) } 
            },
            {
                $lookup: {
                    from: 'citys',
                    localField: 'city_code',
                    foreignField: 'code',
                    as: 'City'
                },
            },
            {
                $match: {
                    "City.code": { $ne: [] }
                }
            },
            {
                $unwind: {
                    path: "$City",
                }
            },
            {
                $lookup: {
                    from: 'provinces',
                    localField: 'City.province_code',
                    foreignField: 'code',
                    as: 'Province'
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
                    province_code: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    province_data: {
                        label: '$Province.name',
                        value: '$Province.code'
                    },
                    city_data: {
                        label: '$City.name',
                        value: '$City.code'
                    }
                }
            }
        ]);
        return res.status(200).json({ message: "success", data: data[0] });

    } catch (error) {
        return res.status(500).json({ message: "error", data: error.toString() });
    }
}





/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.GetDistrictOptions = async (req, res) => {
    try {
        const Projection = [
            {
                $facet: {
                    data: [
                        {
                            $match: { city_code: req.query.id }
                        },
                        {
                            $project: {
                                name: 1,
                                code: 1,
                                province_code: 1
                            }
                        }
                    ],
                }
            },
            {
                $project: {
                    data: 1,
                }
            }
        ];

        let results = await GetAllService(req, res, DistrictModel, Projection)

        const transformedData = results[0].data.map(item => {
            return {
                label: item.name,
                value: item.code
            };
        });

        const response = {
            data: transformedData,
            message: 'success'
        }

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}