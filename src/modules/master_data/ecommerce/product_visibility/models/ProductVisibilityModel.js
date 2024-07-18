const mongoose = require("mongoose");

const ProductVisibilitySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name Name is required"],
        },
        code: {
            type: String,
            required: [true, "Code Code is required"],
            unique: true
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