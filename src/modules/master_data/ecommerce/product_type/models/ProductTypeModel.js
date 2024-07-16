const mongoose = require("mongoose");

const ProductTypeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product Status Name is required"],
        },
        code: {
            type: String,
            required: [true, "Product Status Code is required"],
            unique: true
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true, versionKey: false }
)



const ProductTypeModel = mongoose.model("ProductTypes", ProductTypeSchema);

module.exports = ProductTypeModel