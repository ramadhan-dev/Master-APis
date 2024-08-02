
const ProvinceModel = require("./../models/ProvinceModel");
const mongoose = require("mongoose");

const { CreateService } = require(process.cwd() + "/src/services/CreateService");
const DeleteService = require(process.cwd() + "/src/services/DeleteService");
const DetailsByIDService = require(process.cwd() + "/src/services/DetailsService");
const {GetAllService} = require(process.cwd() + "/src/services/GetAllService");
const UpdateService = require(process.cwd() + "/src/services/UpdateService");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.CreateProvince = async (req, res) => {
    try {
        const data = await CreateService(req, res, ProvinceModel);
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
exports.GetAllProvince = async (req, res) => {



    const page = parseInt(req.query.pageIndex) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;
    const sortBy = req.query.sortBy || '_id';
    const sortOrder = parseInt(req.query.sortOrder) || 1; 

    const sort = { [sortBy] :sortOrder}
    
    try {
        const Projection = [
            {
                $facet: {
                    data: [
                        { $sort: sort }, // Sorting stage
                        { $skip: skip },
                        { $limit: pageSize },
                        {
                            $project: {
                                _id: 1,    
                                name: 1,
                                code: 1,
                                updatedAt:1
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

        let results = await GetAllService(req, res, ProvinceModel, Projection)

        const response = {
            data: results[0].data,
            totalData: results[0].totalData,
            totalPage: results[0].totalPages,
            currentPage: results[0]?.currentPage,
        }

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }

}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.UpdateProvince = async (req, res) => {
    await UpdateService(req, res, ProvinceModel)
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.DeleteProvince = async (req, res) => {
    await DeleteService(req, res, ProvinceModel)
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.GetProvince = async (req, res) => {
    await DetailsByIDService(req, res, ProvinceModel);
}