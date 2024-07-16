const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize")
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const dbConnect = require("./src/utility/dbConnect");

const loggingMiddleware = require("./src/utility/morgan")
const responsePoweredBy = require('response-powered-by')
const cors = require("./src/utility/cors");
const routes = require('./src/routes');
const app = express();


app.use(loggingMiddleware());
app.use(cors.create())
app.use(helmet())
app.use(responsePoweredBy("ramadhan-dev"))
app.use(mongoSanitize())
app.use(hpp())


app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));

//Request Rate Limit Implementation
const Limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 })
app.use(Limiter);

//MongoDB(mongoose) Atlas Database Connection
dbConnect();

app.use(routes);

app.use('*',(req,res)=>{
    res.status(404).json({message:"Fail", data:"Route Not Found"});
});

module.exports = app;