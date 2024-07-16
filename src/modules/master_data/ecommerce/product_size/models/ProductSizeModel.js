const mongoose = require("mongoose");

const ProductSizeSchema = new mongoose.Schema(
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
        }
    },
    { timestamps: true, versionKey: false }
)



const ProductSizeModel = mongoose.model("ProductSizes", ProductSizeSchema);

module.exports = ProductSizeModel