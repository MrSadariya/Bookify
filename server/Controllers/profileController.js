const User=require("../Model/UserModel");

const getProfile=async (req,res)=>{
    try{
        const id=req.user.id;
        const user=await User.findOne({_id:id});
        if(!user){
            return res.status(401).json({message:"Unauthorised Access!!"});
        }
        const info={FullName:user.FullName,Email:user.Email,BooksBought:user.BooksBought,MoneyEarned:user.MoneyEarned,BooksSold:user.BooksSold.length};
        return res.status(200).json(info);
        
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Server Error!!"});
    }

}

module.exports={getProfile};