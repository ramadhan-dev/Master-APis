
const mongoose = require("mongoose");

const ProductTagModel = require("../models/ProductTagModel");
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
exports.CreateProductTag = async (req, res) => {

    try {
        const data = await CreateService(req, res, ProductTagModel)
        res.status(201).json({ message: "success", data: data });
    } catch (error) {
        res.status(500).json({ message: "error", data: error.toString() });
    }

}


exports.GetAllProductTag = async (req, res) => {
    const page = parseInt(req.query.pageIndex) || 1;
    const pageTag = parseInt(req.query.pageTag) || 10;
    const skip = (page - 1) * pageTag;
    const sortBy = req.query.sortBy || '_id';
    const sortOrder = parseInt(req.query.sortOrder) || -1;

    const sort = { [sortBy]: sortOrder }

    try {
        const Projection = [
            {
                $facet: {
                    data: [
                        { $sort: sort }, // Sorting stage
                        { $skip: skip },
                        { $limit: pageTag },
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
                    totalPages: { $ceil: { $divide: [{ $arrayElemAt: ['$totalCount.count', 0] }, pageTag] } },
                    currentPage: { $literal: page },
                }
            }
        ];

        let results = await GetAllService(req, res, ProductTagModel, Projection)

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
exports.DeleteProductTag = async (req, res) => {
    await DeleteService(req, res, ProductTagModel)
}



/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.GetProductTag = async (req, res) => {
    await DetailsByIDService(req, res, ProductTagModel);
}



/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.UpdateProductTag = async (req, res) => {
    try {

        let ID = req.body.id;
        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject = { _id: new ObjectId(ID) };

        let data = await ProductTagModel.findOne(QueryObject);
        if (data == null) {
            throw new Error('Data Tag Code not found in database');
        }

        let PostBody = {
            code: req.body?.code,
            name: req.body?.name,
            status: req.body?.status,
            description: req.body?.description,
        };
        await UpdateService(req, res, ProductTagModel, PostBody)

    } catch (error) {
        res.status(500).json({ message: "error", data: error.toString() });
    }
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.UpdateStatusTag = async (req, res) => {
    try {

        let ID = req.body.id;
        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject = { _id: new ObjectId(ID) };

        let data = await ProductTagModel.findOne(QueryObject);

        let PostBody = {
            status: !data?.status
        };

        if (data == null) {
            throw new Error('Data Tag Code not found in database');
        }
        await UpdateService(req, res, ProductTagModel, PostBody)

    } catch (error) {
        res.status(500).json({ message: "error", data: error.toString() });
    }
}



/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.GetTagOptions = async (req, res) => {
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

        let results = await GetAllService(req, res, ProductTagModel, Projection)

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