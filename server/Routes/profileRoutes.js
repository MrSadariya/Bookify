const express = require("express");
const authenticate=require("../Middlewares/auth");

const {getProfile,addProfilePicture}=require("../Controllers/profileController")

const router=express.Router();

router.get("/getprofile",authenticate,getProfile);
router.post("/addProfilePic",authenticate,addProfilePicture);

module.exports=router;
