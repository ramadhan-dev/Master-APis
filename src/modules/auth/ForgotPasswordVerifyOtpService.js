const OtpModel = require("../user/models/OtpModel");

const ForgotPasswordVerifyOtpService= async (req,res) => {

    try {
        const {email, otp} = req.body;
        let status=0;
        let statusUpdate=1;

        //Database First Process
        let OtpCount = await OtpModel.aggregate([
            {$match: {email:email, otp: otp, status: status }}
        ]);


        if (OtpCount.length >0) {
            //Database Second Process
            let OtpExpired = await OtpModel.aggregate([
                {$match: {email:email,otp: otp,status: status, otpExpires: {$gt: new Date(Date.now()) } }}
            ]);

            if(OtpExpired.length>0){
                //Database Third Process
                let OtpUpdate = await OtpModel.updateOne(
                    {email: email, otp: otp, status: status},
                    {email: email, otp: otp, status: statusUpdate}
                );
                res.status(200).json({message: "success", data: "OTP verification success"});
            }
            else{
                res.status(400).json({message: "fail", data:"OTP Expired!"});
            }
        }
        else{
            res.status(400).json({message: "fail", data:"Invalid OTP Code!"});
        }
    }
    catch(error){
        res.status(500).json({ message: "error", data:error.toString()});
    }
}
module.exports=ForgotPasswordVerifyOtpService