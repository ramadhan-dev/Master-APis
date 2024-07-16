const mongoose = require("mongoose");

const SubDistrictSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Sub District Name is required"],
        },
        code: {
            type: String,
            required: [true, "Sub District Code is required"],
            unique:true
        },
        district_code: {
            type: mongoose.Schema.Types.String,
            ref: "districts",
            required: [true, "District Code is required"],
        }
    },
    { timestamps: true, versionKey: false }
)


const SubDistrictModel = mongoose.model("SubDistricts", SubDistrictSchema);

module.exports = SubDistrictModel