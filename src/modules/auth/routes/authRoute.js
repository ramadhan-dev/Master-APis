const express = require('express');
const UserController = require("../../user/controllers/UserController");
const AuthVerifyMiddleware = require("../../../middlewares/AuthVerifyMiddleware");
const IsAdmin = require("../../../middlewares/IsAdmin");


const router = express.Router();

router.post("/register", UserController.Register);
router.post("/login", UserController.Login);
router.post('/admin-login',UserController.AdminLogin);

router.put("/make-admin/:id", AuthVerifyMiddleware,IsAdmin,  UserController.MakeAdmin);
router.put("/remove-admin/:id", AuthVerifyMiddleware, IsAdmin,  UserController.RemoveAdmin);

router.put("/ban-user/:id", AuthVerifyMiddleware,IsAdmin,  UserController.BanUser);
router.put("/unban-user/:id", AuthVerifyMiddleware, IsAdmin,  UserController.UnbanUser);


// //ForgotPassword
router.post("/forgot-password-verify-email",UserController.ForgotPasswordVerifyEmail);
router.post("/forgot-password-verify-otp",UserController.ForgotPasswordVerifyOtp);
router.post("/create-new-password",UserController.CreateNewPassword);


module.exports = router;