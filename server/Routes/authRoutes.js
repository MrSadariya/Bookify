const express = require("express");

const router=express.Router();
const {handleSignup,handleLogin,confirmSignUp,handleForgetPassword,handleForgetPasswordVerifyOTP,handleResetPassword} =require("../Controllers/authController")

router.post("/signup",handleSignup);
router.post("/login",handleLogin);
router.post("/signupconfirm",confirmSignUp);
router.post("/forgetpassword",handleForgetPassword);
router.post("/forgetpasswordverifyotp",handleForgetPasswordVerifyOTP);
router.post("/resetpassword",handleResetPassword);

module.exports=router;