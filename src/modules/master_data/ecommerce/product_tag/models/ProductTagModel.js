const mongoose = require("mongoose");

const ProductTagSchema = new mongoose.Schema(
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



const ProductTagModel = mongoose.model("ProductTags", ProductTagSchema);

module.exports = ProductTagModel