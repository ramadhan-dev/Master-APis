const OtpModel = require("../user/models/OtpModel");
const SendEmailUtility = require("../../utility/SendEmailUtility");

const ForgotPasswordVerifyEmailService = async (req,res, UserModel) => {
    try {
        // Email Account Query
        let email = req.body['email'];
        let OtpCode = Math.floor(100000 + Math.random() * 900000)

        // Database First process
        let UserCount = await UserModel.aggregate([{$match: {email: email}}]);

        if(UserCount.length>0){
            // OTP Insert
            // Database Second process
            await OtpModel.create({email: email, otp: OtpCode})

            // Email Send
            let SendEmail = await SendEmailUtility(email,OtpCode)
            res.status(200).json({message: "success", data: "We have sent you a 6 digit verification code"});
        }
        else{
            res.status(404).json({message: "fail", data:"Could not Find this Email!"});
        }
    }catch (error) {

        res.status(500).json({ message: "error", data:error.toString()});
    }
}
module.exports=ForgotPasswordVerifyEmailService