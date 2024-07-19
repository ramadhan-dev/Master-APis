const CreateService= async (req,res,DataModel) => {
        let PostBody = req.body;
        console.log("🚀 ~ CreateService ~ PostBody:", PostBody)
        return  await DataModel.create(PostBody)

}


module.exports= {
    CreateService
}