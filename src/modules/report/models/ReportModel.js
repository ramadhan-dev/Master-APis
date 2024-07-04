const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
    {
        invoiceNumber:{
            type: Number,
            required: [true, "invoiceNumber is required"],
            unique:true
        },
        result: {
            type: String,
            required: [true, "result is required"],
        }
    },
    { timestamps: true, versionKey:false}
)


const ReportModel = mongoose.model("reports", ReportSchema);

module.exports = ReportModel