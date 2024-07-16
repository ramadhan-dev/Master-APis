const mongoose = require("mongoose");

const DistrictSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "District Name is required"],
        },
        code: {
            type: String,
            required: [true, "District Code is required"],
            unique:true
        },
        city_code: {
            type: mongoose.Schema.Types.String,
            ref: "citys",
            required: [true, "City Code is required"],
        }
    },
    { timestamps: true, versionKey: false }
)


DistrictSchema.pre("deleteOne", async function (next) {
    const data = await this.model.findOne(this.getQuery());
    await mongoose.model('SubDistricts').deleteMany({ district_code: data.code });
    next();
});


const DistrictModel = mongoose.model("Districts", DistrictSchema);

module.exports = DistrictModel