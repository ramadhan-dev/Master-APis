const mongoose = require("mongoose");

const ProductBrandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product Brand Name is required"],
        },
        code: {
            type: String,
            required: [true, "Product Brand Code is required"],
            unique: true
        },
        status: {
            type: Boolean,
            default: true
        },
        description: {
            type: String,
        },
    },
    { timestamps: true, versionKey: false }
)



const ProductBrandModel = mongoose.model("ProductBrands", ProductBrandSchema);

module.exports = ProductBrandModel