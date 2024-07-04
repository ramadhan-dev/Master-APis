const express = require('express');
const app = express();
const AuthVerifyMiddleware = require("./../middlewares/AuthVerifyMiddleware");
const IsAdmin = require("./../middlewares/IsAdmin");

const contactRouter = require("../modules/contact/routers/contactRoute");
const doctorRouter = require("../modules/doctor/routes/doctorRoute");
const appointmentRouter = require("../modules/appointment/routes/appointmentRoute");
const userRouter = require("../modules/user/routes/userRoute");

const authRouter = require("../modules/auth/routes/authRoute");
const reportRouter = require("../modules/report/routes/reportRoute");
const uploadRouter = require("./uploadRoute");
console.log(process.cwd());
app.use('/api/auth', authRouter);

app.use('/api/contact', AuthVerifyMiddleware, IsAdmin, contactRouter);
app.use('/api/user', AuthVerifyMiddleware, IsAdmin, userRouter);
app.use('/api/doctor', AuthVerifyMiddleware, IsAdmin, doctorRouter);
app.use('/api/appointment', AuthVerifyMiddleware, IsAdmin, appointmentRouter);
app.use('/api/report', AuthVerifyMiddleware, IsAdmin, reportRouter);
app.use('/api/upload', AuthVerifyMiddleware, IsAdmin, uploadRouter);

module.exports = app;