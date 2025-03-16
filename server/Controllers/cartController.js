const User=require("../Model/UserModel");
const Book=require("../Model/BooksInfo");
const { default: mongoose } = require("mongoose");

const getCartItems=async(req,res)=>{
    try{
        const id=req.user.id;
        const user=await User.findOne({_id:id});
        if(!user){
            return res.status(401).json({message:"Unauthorised Access!!"});
        }
        const items=user.MyCart;
        return res.status(200).json(items);
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Server Error!!"});
    }

}

const addItemToCart=async(req,res)=>{
    try{
        const id=req.user.id;
        const user=await User.findOne({_id:id});
        if(!user){
            return res.status(401).json({message:"Unauthorised Access!!"});
        }
        let bookid=req.body.bookid;
        
        const book=await Book.findOne({_id:bookid});
        if(!book){
            return res.status(400).json({message:"No such book exists!!"});
        }
        if(book.SellerEmail===user.Email){
            return res.status(400).json({message:"You only are selling this book!!"});
        }

        let cartItem=user.MyCart;
        let idx=cartItem.findIndex((ele)=>ele._doc._id.toString()===bookid);
        if(idx===-1){
            user.MyCart.push({...book,count:1});
            await user.save();
        }else{
            return res.status(201).json({message:"Book is already in your cart!!"});
        }

        return res.status(200).json({message:"Book Added to cart succesfully!!"});

    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Server Error!!"});
    }
}

const removeItemFromCart=async (req,res)=>{
    try{

        const id=req.user.id;
        const user=await User.findOne({_id:id});
        if(!user){
            return res.status(401).json({message:"Unauthorised Access!!"});
        }
        const bookName=req.body.bookname;
       
        
        let cartItem=user.MyCart;

        const newCartItem=cartItem.filter((c)=>c._doc.BookName!==bookName);

        user.MyCart=newCartItem;
        await user.save();
        return res.status(200).json({message:"Book removed from cart!!"});

    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Server Error!!"});
    }
}

const handleCheckout=async (req,res)=>{
    try{
        const id=req.user.id;
        const user=await User.findOne({_id:id});
        if(!user){
            return res.status(401).json({message:"Unauthorised Access!!"});
        }
        if(user.MyCart.length===0){
            return res.status(400).json({message:"Cart is already empty"});
        }

        const soldBookIds = user.MyCart.map(item => item._doc._id);

        for (let item of user.MyCart) {
            const seller = await User.findOne({ Email: item._doc.SellerEmail });
            if (!seller) continue;

            seller.BooksSold.push(item);
            seller.MoneyEarned += item._doc.Price;
            await seller.save();
        }

        await Book.deleteMany({ _id: { $in: soldBookIds } });

        await User.updateMany(
            { "MyCart._doc._id": { $in: soldBookIds } },
            { $pull: { MyCart: { "_doc._id": { $in: soldBookIds } } } }
        );        

        user.BooksBought += user.MyCart.length;
        user.MyCart = [];
        await user.save();

        return res.status(200).json({ message: "Checkout successful" });

    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Server Error!!"});
    }

}

const handleItemIncrement=async(req,res)=>{
    return res.status(200);
}

module.exports={getCartItems,addItemToCart,removeItemFromCart,handleCheckout,handleItemIncrement};
