const  mongoose=require('mongoose');
const OtpSchema= new mongoose.Schema(
    {

    email:{
        type:String,
        required: [true, "email is required"],
        trim: true,
    },
    otp:{
        type:String,
        required: [true, "otp is required"],
        trim: true,
        maxlength: 6,
    },
    status:{
        type:Number,
        default:0
    },
    otpExpires:{
        type: Date,
        default: () => new Date(+new Date() + 600000), // 10 minutes // OTP Code Will be expired within 10 minutes
    }
  },
    { timestamps: true, versionKey:false},
);
const OtpModel=mongoose.model('otps',OtpSchema);
module.exports=OtpModel

