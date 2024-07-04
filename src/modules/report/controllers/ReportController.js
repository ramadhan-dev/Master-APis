const ReportModel = require("../models/ReportModel");
const CreateReportService = require("../services/CreateReportService");

exports.CreateReport=async (req, res) => {
    await CreateReportService(req,res,ReportModel);
}