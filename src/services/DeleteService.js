const mongoose = require("mongoose");
const DeleteService = async (req,res, Model) => {
    try{

        let ID=req.body.id;
        const ObjectId = mongoose.Types.ObjectId;
        let DeleteQueryObject = {_id: new ObjectId(ID)};
        console.log("🚀 ~ DeleteService ~ ObjectId:", ObjectId)

        let Delete =  await     Model.deleteOne(DeleteQueryObject)
        res.status(200).json({message: "success", data: Delete});
    }
    catch (error) {
          res.status(500).json({message: "error", data: error.toString()});
    }
}
module.exports=DeleteService  