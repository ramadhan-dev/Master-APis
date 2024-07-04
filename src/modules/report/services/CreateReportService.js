const AppointmentModel = require("../../appointment/models/AppointmentModel");
const CreateReportService = async (req, res, ReportModel) => {
    try{
        let {invoiceNumber} = req.body;
        let appointment =await AppointmentModel.findOne({invoiceNumber:invoiceNumber});

        if(appointment){
            let report = await ReportModel.create(req.body)
            res.status(201).json({message: "success", data: report});
        }
        else{
            res.status(404).json({message: "fail", data: "Could not Match this Invoice Number!"});
        }
    }
    catch (error) {
        res.status(500).json({message: "error", data: error});
    }
}

module.exports=CreateReportService