const jwt = require("jsonwebtoken");
const UserModel = require("../modules/user/models/UserModel");


module.exports= async (req,res,next)=>{
    try{
        const Email = req.headers.email;
        const adminUser = await UserModel.findOne( {email: Email });
        if(adminUser.role !== "admin"){
            res.status(400).json("You are not an Admin")
        }
        else{
            next();
        }
    }
    catch(error) {
        res.status(500).json({message: "admin failure", result: error.toString()})
    }
}

