const express = require("express");
const authenticate=require("../Middlewares/auth");

const router=express.Router();
const {getCartItems,addItemToCart,removeItemFromCart,handleCheckout,handleItemIncrement} =require("../Controllers/cartController")

router.get("/getitems",authenticate,getCartItems);
router.post("/additem",authenticate,addItemToCart);
router.put("/removeitem",authenticate,removeItemFromCart);
router.post("/handlecheckout",authenticate,handleCheckout);
router.post("/incrementItem/:bookid",authenticate,handleItemIncrement);

module.exports=router;