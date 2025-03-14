const User=require("../Model/UserModel");
const jwt=require("jsonwebtoken");

const handleSignup=async (req,res)=>{
    let body=req.body;
   if(!body.FullName || !body.Email || !body.Password){
    return res.status(401).json({message:"Incomplete Information!!"});
   }
   await User.create({FullName:body.FullName,Email:body.Email,Password:body.Password}).then(()=>{
    return res.status(200).json({message: "User registered successfully" });
   }).catch((err)=>{
    console.log("Error:",err);
    res.status(500).json({message:"Server Error"});
   })

}

const handleLogin=async(req,res)=>{
    try{
        let body=req.body;
        if(!body.Email || !body.Password){
            return res.status(401).json({message:"Invalid Information!!"});
        }
        let user=await User.findOne({Email:body.Email ,Password:body.Password});
        if(!user){
            return res.status(401).json({message:"No such user"});
        }
        const userdata={id:user._id,Email:user.Email};

        const token=jwt.sign(userdata,process.env.SECRET_KEY,{ expiresIn: "1h" });

        res.status(200).json({token}); 

    }catch(err){
        console.log("Error:",err);
        res.status(500).json({message:"Server Error"});
    }


}

module.exports={handleSignup,handleLogin};