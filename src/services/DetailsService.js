const mongoose = require("mongoose");
const DetailsService= async (req, res, Model) => {

    try {
        let ID=req.params.id;
        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject = {_id: new ObjectId(ID)};

        let data = await Model.aggregate([
            {$match: QueryObject}
        ]);

        res.status(200).json({message: "success", data: data[0]});

    } catch (error) {
        res.status(500).json({message: "error", data: error.toString()});
    }


}
module.exports=DetailsService