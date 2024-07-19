const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "City Name is required"],
        },
        code: {
            type: String,
            required: [true, "City Code is required"],
            unique:true
        },
        province_code: {
            type: mongoose.Schema.Types.String,
            ref: "provinces",
            required: [true, "Province Code is required"],
        }
    },
    { timestamps: true, versionKey: false }
)


CitySchema.pre("deleteOne", async function (next) {

    const data = await this.model.findOne(this.getQuery());

    if(data?.length > 0) {
        const district = await mongoose.model('Districts').findOne({ city_code: data.code }).select('code');
        await mongoose.model('Districts').deleteMany({ city_code: data.code });
        await mongoose.model('SubDistricts').deleteMany({ district_code: district.code });

    }
    

    next();
});




const CityModel = mongoose.model("Citys", CitySchema);

module.exports = CityModel