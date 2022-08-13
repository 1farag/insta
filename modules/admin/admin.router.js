const { auth } = require("../../middlwear/auth");
const { endPoint } = require("./admin.endPoint");
const adminController= require("./controller/admin")
const router = require("express").Router();

router.get("/users" , auth(endPoint.getAllUsers), adminController.getAllUsers )

router.patch("/user/:id/block" , auth(endPoint.blockUser), adminController.blockUser )

router.patch("/user/:id/role" , auth(endPoint.changeRole), adminController.changeRole )


module.exports = router