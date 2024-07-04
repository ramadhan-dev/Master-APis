const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
    {
        userId: {//who will book for appointment
            type:mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: [true, "userId is required"],
        },
        doctorId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "doctors",
            required: [true, "doctorId is required"],
        },
        patientName: {
            type: String,
            trim:true,
            required: [true, "patientName is required"],
            minLength: [3, "patientName must be minimum 3 characters"],
            maxLength: [31, "patientName must be maximum 31 characters"],
        },
        phone: {
            type: String,
            trim:true,
            required: [true, "phone is required"],
            maxLength: [11, "name must be maximum 11 characters"],
        },
        age: {
            type: String,
            required: [true, "age is required"],
            trim:true,
        },
        address: {
           type: String,
           trim:true,
           required: [true, "address is required"],
        },
        status: {
            type: String,
            required: true,
            default: "pending",
            enum:["pending", "approved", "cancelled"]
        },
        invoiceNumber:{
            type: Number,
            required: [true, "invoiceNumber is required"],
            trim:true,
            unique:true
        }
    },
    { timestamps: true, versionKey:false}
);

const AppointmentModel = mongoose.model("appointments", AppointmentSchema);

module.exports = AppointmentModel;
