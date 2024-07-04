const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "name is required"],
        },
        email: {
            type: String,
            required: [true, "email is required"],
        },
        message: {
            type: String,
            required: [true, "message is required"]
        },
        status: {
            type: String,
            default: "Submitted",
            enum: ["Submitted", "Contacted", "In Progress", "Resolved"],
        },
    },
    { timestamps: true, versionKey:false}
)


const ContactModel = mongoose.model("contacts", ContactSchema);

module.exports = ContactModel