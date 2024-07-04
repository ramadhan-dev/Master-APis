const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "name is required"],
        },
        email: {
            type: String,
            required: [true, "email is required"],
        },
        phone: {
            type: String,
            required: [true, "phone is required"],
        },
        specialization: {
            type: String,
            required: [true, "specialization is required"]
        },
        experience: {
            type: String,
            required: [true, "experience is required"]
        }
    },
    { timestamps: true, versionKey:false}
)


const DoctorModel = mongoose.model("doctors", DoctorSchema);

module.exports = DoctorModel