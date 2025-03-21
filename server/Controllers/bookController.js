const User=require("../Model/UserModel");
const Book=require("../Model/BooksInfo");

const getAllBooks=async (req,res)=>{
    try{
        const books=await Book.find();
        return res.status(200).json(books); 
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Server Error!!"});
    }
}

const getParticularBooks=async(req,res)=>{
    try{
        const booktype=req.params.booktype;
        const books=await Book.find({BookType:booktype});
        return res.status(200).json(books);
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Server Error!!"});
    }
}

const getSoldBooks=async (req,res)=>{
    try{
        const id=req.user.id;
        const user=await User.findOne({_id:id});
        if(!user){
            return res.status(401).json({message:"Unauthorised Access"});
        }
        const booksSold=user.BooksSold;
        return res.status(200).json(booksSold);
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Server Error!!"});
    }

}

const getPendingBooks=async(req,res)=>{
    try{
        const id=req.user.id;
        const user=await User.findOne({_id:id});
        if(!user){
            return res.status(401).json({message:"Unauthorised Access"});
        }
        const pendingBooks=await Book.find({SellerEmail:user.Email});
        return res.status(200).json(pendingBooks);
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Server Error!!"});
    }
}

const addBook=async(req,res)=>{
    try{
        const id=req.user.id;
        const user=await User.findOne({_id:id});
        if(!user){
            return res.status(401).json({message:"Unauthorised Access"});
        }
        const body=req.body;
        await Book.create({BookName:body.BookName,AuthorName:body.AuthorName,Price:body.Price,YearsUsed:body.YearsUsed,BookType:body.BookType,SellerEmail:user.Email,bookCoverURL:body.bookCoverURL});
        return res.status(200).json({message:"Book put on sold succesfully!!"});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Server Error!!"});
    }
}

module.exports={getAllBooks,getParticularBooks,getSoldBooks,getPendingBooks,addBook};