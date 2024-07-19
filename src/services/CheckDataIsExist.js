
const mongoose = require("mongoose");
const isEmpty = require('lodash//isEmpty');

const  checkCodeIsExist = async (req, res, Model) => {
    let ID = req.body.province_code;
    const data = await Model.findOne({ 'code': ID });
    if (data == null) {
        throw new Error('Data code not found in database');
    }
   
}



// check province code
const checkIdIsExist = async (req, res, Model) => {

    try {
        let ID = req.body.id;
        const ObjectId = mongoose.Types.ObjectId;
        const data = await Model.findOne(new ObjectId(ID));

        if (isEmpty(data)) {
            console.log(111111111111);
            throw new Error('Data id tidak ada di dalam datsssssabase');
        } 
         res.status(200).json({'s':'s'})
    } catch (error) {
         res.status(500).json({ message: "error", data: error.message });
    }
    // check province id

}


module.exports = {
    checkCodeIsExist,
    checkIdIsExist
}