const mongoose = require("mongoose");
const RemoveAdminService = async (req, res, UserModel) => {
    try{
        let id = req.params.id;
        const ObjectId = mongoose.Types.ObjectId;
        let UpdateQueryObject = {_id: new ObjectId(id)};

        let admins = await UserModel.aggregate([
            {$match: {role: "admin"}}
        ]);

        if(admins.length > 1){
            let Update = await UserModel.updateOne(UpdateQueryObject, {role: "user"});
            res.status(200).json({message: "success", data: Update});
        }
        else{
            res.status(400).json({message: "fail", data: "minimum have to be an one admin"});
        }

    }
    catch (error) {
        res.status(500).json({message: "error", data: error});
    }
}

module.exports=RemoveAdminService