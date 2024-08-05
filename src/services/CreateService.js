const CreateService= async (req,res,DataModel) => {
        let PostBody = req.body;
        return await DataModel.create(PostBody)
}


module.exports= {
    CreateService
}