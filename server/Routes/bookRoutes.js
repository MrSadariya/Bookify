const express = require("express");

const authenticate=require("../Middlewares/auth");
const {getAllBooks,getParticularBooks,getSoldBooks,getPendingBooks,addBook,getParticularBook}=require("../Controllers/bookController");

const router=express.Router();

router.get("/All",getAllBooks);
router.get("/getbookssold",authenticate,getSoldBooks);
router.get("/getbookspending",authenticate,getPendingBooks);
router.post("/addbook",authenticate,addBook);
router.get("/book/:bookID",getParticularBook);
router.get("/:booktype",getParticularBooks);


module.exports=router;