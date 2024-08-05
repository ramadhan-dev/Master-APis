const mongoose = require("mongoose");
const UpdateService = async (req, res, DataModel, PostBody) => {

    let ID = req.body.id;
    const ObjectId = mongoose.Types.ObjectId;
    let UpdateQueryObject = {_id: new ObjectId(ID)};
    let Update = await DataModel.updateOne(UpdateQueryObject,PostBody);
    res.status(200).json({message: "success", data: Update});
}
module.exports=UpdateService

