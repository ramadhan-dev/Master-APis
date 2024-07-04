const OtpModel = require("../user/models/OtpModel");
const UserModel = require("../user/models/UserModel");
const hashedPassword = require("../../utility/hashedPassword");

const CreateNewPasswordService= async (req,res) => {

    const {email, otp, password} = req.body; //password=new password
    let statusUpdate=1;

    try {
        // Database First Process
          let OtpUsedCount = await OtpModel.aggregate([{$match: {email: email, otp: otp, status: statusUpdate}}]);

          if(OtpUsedCount.length > 0){
              const hashPass = await hashedPassword(password);//hashedPassword
              //Database Second Process
              let PasswordUpdate = await UserModel.updateOne({email: email},{password: hashPass})
              res.status(200).json({message: "success", data: "New password create success"});
          }
          else{
              res.status(400).json({message: "fail", data:"Invalid OTP Code!"});
          }
    }
    catch(error){
        res.status(500).json({ message: "error", data:error.toString()});
    }
}
module.exports=CreateNewPasswordService