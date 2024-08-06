const mongoose = require("mongoose");

const ProductVisibilitySchema = new mongoose.Schema(
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



const ProductVisibilityModel = mongoose.model("ProductVisibilitys", ProductVisibilitySchema);

module.exports = ProductVisibilityModel