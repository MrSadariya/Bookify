const express = require("express");

const router=express.Router();
const {handleSignup,handleLogin,confirmSignUp} =require("../Controllers/authController")

router.post("/signup",handleSignup);
router.post("/login",handleLogin);
router.post("/signupconfirm",confirmSignUp);

module.exports=router;