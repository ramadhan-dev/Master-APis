
const GetAllService= async (req,res,DataModel, Projection) => {
    try {
        return await DataModel.aggregate(Projection);
    }
    catch (error){
        res.status(500).json({message: "error", data: error.toString()});
    }
}

module.exports= {
    GetAllService
}