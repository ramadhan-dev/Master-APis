const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose")

const dbConnect = async () => {
    try{
        mongoose.set('strictQuery', false);
        let uri = process.env.MONGO_URI;
        await mongoose.connect(uri);
    }
    catch(error){
        console.log(error);
    }
}


module.exports = dbConnect