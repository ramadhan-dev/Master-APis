

exports.UploadImage = async (req, res)=>{
    try{
        res.status(200).json({message:"success"})
    }
    catch(e) {
        res.status(500).json({message:"error"})
    }
}