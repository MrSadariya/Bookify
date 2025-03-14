const express = require("express");
const authenticate=require("../Middlewares/auth");

const {getProfile}=require("../Controllers/profileController")

const router=express.Router();

router.get("/getprofile",authenticate,getProfile);

module.exports=router;
