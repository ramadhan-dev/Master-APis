const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Name is required"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        image: {
            type: String,
            required: [true, "Image is required"],
        },
        manufacturer_name: {
            type: String,
            required: [true, "Manufacturer Name is required"],
        },
        brand: {
            type: mongoose.Schema.Types.String,
            ref: "productbrands",
            required: [true, "Brand is required"],
        },
        stock: {
            type: Number,
            required: [true, "Stock is required"],
        },
        price: {
            type: mongoose.Types.Decimal128,
            required: [true, "Price is required"],
        },
        discount: {
            type: mongoose.Types.Decimal128,
            required: [true, "Discount is required"],
        },
        status: {
            type: mongoose.Schema.Types.String,
            ref: "productstatuss",
            required: [true, "Product Status is required"],
        },
        visibility: {
            type: mongoose.Schema.Types.String,
            ref: "productvisibilitys",
            required: [true, "Product Visibility is required"],
        },
        publish_date: {
            type: Date,
            required: [true, "Status is required"],
        },
        category: {
            type: mongoose.Schema.Types.String,
            ref: "Productcategorys",
            required: [true, "Product Category is required"],
        },
        sort_description: {
            type: String,
            required: [true, "Sort Description is required"],
        },
        tag: {
            type: String,
            required: [true, "Product Tag is required"],
        },

    },
    { timestamps: true, versionKey: false }
)



const ProductModel = mongoose.model("Products", ProductSchema);

module.exports = ProductModel

