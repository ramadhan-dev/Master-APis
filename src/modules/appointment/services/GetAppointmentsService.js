const GetAppointmentsService = async (req, res, AppointmentModel) => {
    try{

        const appointments = await AppointmentModel.aggregate([
            {$lookup: {from: "doctors", localField: "doctorId", foreignField: "_id", as: "doctor"}},
            {$sort : { createdAt: -1 }},
        ]);

        res.status(200).json({message: "success", data: appointments});
    }
    catch(error){
        res.status(500).json({message: "error", data: error.toString()});
    }
}


module.exports = GetAppointmentsService;