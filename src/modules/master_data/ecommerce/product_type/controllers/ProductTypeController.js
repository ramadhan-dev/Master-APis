
const mongoose = require("mongoose");

const ProductTypeModel = require("../models/ProductTypeModel");
const {CreateService} = require(process.cwd() + "/src/services/CreateService");
const DeleteService = require(process.cwd() + "/src/services/DeleteService");
const DetailsByIDService = require(process.cwd() + "/src/services/DetailsService");
const {GetAllService} = require(process.cwd() + "/src/services/GetAllService");
const UpdateService = require(process.cwd() + "/src/services/UpdateService");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.CreateProductType = async (req, res) => {

    try {
        const data = await CreateService(req, res, ProductTypeModel)
        res.status(201).json({ message: "success", data: data });
    } catch (error) {
        res.status(500).json({ message: "error", data: error.toString() });
    }

}


exports.GetAllProductType = async (req, res) => {
    const page = parseInt(req.query.pageIndex) || 1;
    const pageType = parseInt(req.query.pageType) || 10;
    const skip = (page - 1) * pageType;
    const sortBy = req.query.sortBy || '_id';
    const sortOrder = parseInt(req.query.sortOrder) || -1;

    const sort = { [sortBy]: sortOrder }

    try {
        const Projection = [
            {
                $facet: {
                    data: [
                        { $sort: sort }, // Sorting stypee
                        { $skip: skip },
                        { $limit: pageType },
                        {
                            $project: {
                                _id: 1,
                                name: 1,
                                code: 1,
                                description:1,
                                status: 1,
                                updatedAt: 1
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
                    totalPages: { $ceil: { $divide: [{ $arrayElemAt: ['$totalCount.count', 0] }, pageType] } },
                    currentPage: { $literal: page },
                }
            }
        ];

        let results = await GetAllService(req, res, ProductTypeModel, Projection)

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
exports.DeleteProductType = async (req, res) => {
    await DeleteService(req, res, ProductTypeModel)
}



/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.GetProductType = async (req, res) => {
    await DetailsByIDService(req, res, ProductTypeModel);
}



/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.UpdateProductType = async (req, res) => {
    try {

        let ID = req.body.id;
        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject = { _id: new ObjectId(ID) };

        let data = await ProductTypeModel.findOne(QueryObject);
        if (data == null) {
            throw new Error('Data Type Code not found in database');
        }

        let PostBody = {
            code: req.body?.code,
            name: req.body?.name,
            status: req.body?.status,
            description: req.body?.description,
        };
        await UpdateService(req, res, ProductTypeModel, PostBody)

    } catch (error) {
        res.status(500).json({ message: "error", data: error.toString() });
    }
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.UpdateStatusType = async (req, res) => {
    try {

        let ID = req.body.id;
        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject = { _id: new ObjectId(ID) };

        let data = await ProductTypeModel.findOne(QueryObject);

        let PostBody = {
            status: !data?.status
        };

        if (data == null) {
            throw new Error('Data Type Code not found in database');
        }
        await UpdateService(req, res, ProductTypeModel, PostBody)

    } catch (error) {
        res.status(500).json({ message: "error", data: error.toString() });
    }
}



/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.GetTypeOptions = async (req, res) => {
    try {
        const Projection = [
            {
                $facet: {
                    data: [
                        {
                            $project: {
                                name: 1,
                                code: 1,
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

        let results = await GetAllService(req, res, ProductTypeModel, Projection)

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