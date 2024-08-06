const mongoose = require("mongoose");

const ProductTypeSchema = new mongoose.Schema(
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

        description: {
            type: String,
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