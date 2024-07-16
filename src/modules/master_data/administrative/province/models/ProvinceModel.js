const mongoose = require("mongoose");

const ProvinceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Province Name is required"],
            unique: true
        },
        code: {
            type: String,
            required: [true, "Province Code is required"],
            unique: true
        },
       
    },
    { timestamps: true, versionKey: false }
)


ProvinceSchema.pre("deleteOne",  async function (next) {

    const data = await this.model.findOne(this.getQuery());
    const city = await mongoose.model('Citys').findOne({ province_code: data.code }).select('code');
    const district = await mongoose.model('Districts').findOne({ city_code: city.code }).select('code');

    await mongoose.model('Citys').deleteMany({ province_code: data.code });
    await mongoose.model('Districts').deleteMany({ city_code: city.code });
    await mongoose.model('SubDistricts').deleteMany({ district_code: district.code });

    next();
});


const ProvinceModel = mongoose.model("provinces", ProvinceSchema);

module.exports = ProvinceModel