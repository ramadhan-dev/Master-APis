const express =require('express');
const UserController = require("../controllers/UserController");

const router = express.Router();


router.get("/get-all-user", UserController.GetAllUser);
// router.put("/update-user/:id", AuthVerifyMiddleware, UserController.UpdateUser);
// router.delete("/delete-user/:id", AuthVerifyMiddleware, IsAdmin, UserController.DeleteUser);


module.exports=router;

