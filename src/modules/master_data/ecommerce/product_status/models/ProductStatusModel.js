const mongoose = require("mongoose");

const ProductStatusSchema = new mongoose.Schema(
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



const ProductStatusModel = mongoose.model("ProductStatuss", ProductStatusSchema);

module.exports = ProductStatusModel