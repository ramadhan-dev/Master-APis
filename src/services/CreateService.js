const CreateService= async (req,res,DataModel) => {
        let PostBody = req.body;
        const a =   await DataModel.create(PostBody)
        return a
}


module.exports= {
    CreateService
}