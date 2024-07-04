const mongoose = require("mongoose");
const BanUserService = async (req, res,DataModel) => {

    try{
        let id = req.params.id;
        const ObjectId = mongoose.Types.ObjectId;
        let UpdateQueryObject = {_id: new ObjectId(id)};


        let Update = await DataModel.updateOne(UpdateQueryObject,{isBanned:true});
        res.status(200).json({message: "success", data: Update});

    }
    catch (error) {
        res.status(500).json({message: "error", data: error});
    }
}
module.exports=BanUserService

